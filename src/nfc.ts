import NfcManager, { NfcTech, NfcV, nfcManager, IsoDepHandler } from "react-native-nfc-manager";
import { Platform, Alert } from "react-native";

export const readNfc = async (): Promise<string> => {
  let text = "";
  let resp: number[] | string | null = null;
  try {
    let tech = Platform.OS === "ios" ? NfcTech.MifareIOS : NfcTech.NfcV;
    resp = await NfcManager.requestTechnology(tech, {
      alertMessage: "Scan the Lote",
    });

    // let cmd =
    //   Platform.OS === "ios"
    //     ? NfcManager.sendMifareCommandIOS
    //     : NfcManager.transceive;
    let cmd = NfcManager.transceive;

    resp = await cmd([0x3a, 4, 4]);
    let payloadLength = parseInt(resp.toString().split(",")[1]);
    let payloadPages = Math.ceil(payloadLength / 4);
    let startPage = 5;
    let endPage = startPage + payloadPages - 1;

    resp = await cmd([0x3a, startPage, endPage]);
    let bytes = resp.toString().split(",");

    for (let i = 0; i < bytes.length; i++) {
      if (i < 5) {
        continue;
      }

      if (parseInt(bytes[i]) === 254) {
        break;
      }

      text = text + String.fromCharCode(parseInt(bytes[i]));
    }

    NfcManager.cancelTechnologyRequest();
  } catch (ex: any) {
    console.log(ex.toString());
  }
  if (resp) {
    NfcManager.cancelTechnologyRequest();
  }

  return text;
};

export const writeNdef = async (
  message: string,
  alert: string
): Promise<boolean> => {
  try {
    const tech = await NfcManager.requestTechnology(NfcTech.NfcV, {
      alertMessage: alert,
    });

    const bytes = NfcV.encodeMessage([NfcV.textRecord(message)]);

    await NfcManager.ndefHandler.writeNdefMessage(bytes);

    await NfcManager.setAlertMessageIOS("Successfully stored.");
    await NfcManager.cancelTechnologyRequest();

    return true;
  } catch (error: any) {
    console.log(error);
    return false;
  }
};

function failSilently(todo: () => any) {
  try {
    return todo()
  } catch (e) {
    // nothing
  }
}
await NfcManager.start()

export async function readTag() {
  try {
    if (!NfcManager.isEnabled) {
      Alert.alert("Nfc not enabled", "", [{
        text: "to settings", onPress: () => {
          NfcManager.goToNfcSetting()
        }
      }, { text: "cancel" }])
      return null
    }

    const ntech = await NfcManager.requestTechnology(NfcTech.IsoDep)
    if(!ntech){
      console.log("ntech null")
      return
    }

    NfcManager.isoDepHandler.transceive()

  } catch(error) {
    console.error("error while reading tag", error)
  }
}

export const writeTag = async (success: boolean){

}