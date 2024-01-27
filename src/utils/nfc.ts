import {getDefaultStore} from 'jotai'
import {Platform} from 'react-native'
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager'
import {nfcModalVisibilityAtom} from '../state/atoms'

export async function readNfc(): Promise<string | null> {
  getDefaultStore().set(nfcModalVisibilityAtom, true)
  let uri: string | null = null

  try {
    const tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA

    await NfcManager.requestTechnology(tech, {
      alertMessage: 'Scan the Lote',
    })

    const cmd =
      Platform.OS === 'ios'
        ? NfcManager.sendMifareCommandIOS
        : NfcManager.transceive

    const data = await cmd([0x3a, 4, 4])
    const payloadLength = parseInt(data.toString().split(',')[1]) - 1 // Subtract 1 to account for the URI identifier byte
    const payloadPages = Math.ceil(payloadLength / 4)
    const startPage = 5
    const endPage = startPage + payloadPages - 1

    const response = await cmd([0x3a, startPage, endPage])
    const bytes = response.toString().split(',')

    for (let i = 3; i < bytes.length; i++) {
      // Start from 1 to skip the URI identifier byte
      if (parseInt(bytes[i]) === 254) {
        break
      }

      uri = uri
        ? uri + String.fromCharCode(parseInt(bytes[i]))
        : String.fromCharCode(parseInt(bytes[i]))
    }

    await NfcManager.cancelTechnologyRequest()
  } catch (ex: any) {
    console.log(ex.toString())
  } finally {
    await NfcManager.cancelTechnologyRequest()
    getDefaultStore().set(nfcModalVisibilityAtom, false)
  }

  if (uri) {
    console.log('Detected URI:', uri)
    const text = uri.replace(/lotes:\/\//g, '')
    console.log('Detected text:', text)
    return text
  } else {
    console.log('No URI detected.')
    return null
  }
}

export const writeNdef = async (
  message: string,
  alert: string
): Promise<boolean> => {
  getDefaultStore().set(nfcModalVisibilityAtom, true)
  try {
    await NfcManager.requestTechnology(NfcTech.Ndef, {
      alertMessage: alert,
    })
    const prefixedMessage = 'lotes://' + message
    const bytes = Ndef.encodeMessage([Ndef.uriRecord(prefixedMessage)])

    await NfcManager.ndefHandler.writeNdefMessage(bytes)

    if (Platform.OS === 'ios') {
      await NfcManager.setAlertMessageIOS('Successfully stored.')
    }
    await NfcManager.cancelTechnologyRequest()
    return true
  } catch (error: any) {
    console.log('WriteNdef error: ', error)
    await NfcManager.cancelTechnologyRequest()
    return false
  } finally {
    getDefaultStore().set(nfcModalVisibilityAtom, false)
  }
}
