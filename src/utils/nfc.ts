import {Platform} from 'react-native'
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager'

export const readNfc = async (): Promise<string> => {
  let text = ''
  let resp: number[] | string | null = null
  try {
    const tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA
    resp = await NfcManager.requestTechnology(tech, {
      alertMessage: 'Scan the Lote',
    })

    const cmd =
      Platform.OS === 'ios'
        ? NfcManager.sendMifareCommandIOS
        : NfcManager.transceive

    resp = await cmd([0x3a, 4, 4])
    const payloadLength = parseInt(resp.toString().split(',')[1])
    const payloadPages = Math.ceil(payloadLength / 4)
    const startPage = 5
    const endPage = startPage + payloadPages - 1

    resp = await cmd([0x3a, startPage, endPage])
    const bytes = resp.toString().split(',')

    for (let i = 0; i < bytes.length; i++) {
      if (i < 5) {
        continue
      }

      if (parseInt(bytes[i]) === 254) {
        break
      }

      text = text + String.fromCharCode(parseInt(bytes[i]))
    }

    await NfcManager.cancelTechnologyRequest()
  } catch (ex: any) {
    console.log(ex.toString())
  }
  if (resp) {
    await NfcManager.cancelTechnologyRequest()
  }

  return text
}

export const writeNdef = async (
  message: string,
  alert: string
): Promise<boolean> => {
  try {
    await NfcManager.requestTechnology(NfcTech.Ndef, {
      alertMessage: alert,
    })

    const bytes = Ndef.encodeMessage([Ndef.textRecord(message)])
    await NfcManager.ndefHandler.writeNdefMessage(bytes)

    await NfcManager.setAlertMessageIOS('Successfully stored.')
    await NfcManager.cancelTechnologyRequest()

    return true
  } catch (error: any) {
    console.log(error)
    return false
  }
}
