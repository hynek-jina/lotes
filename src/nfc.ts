import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";
import { Platform } from "react-native";


export const readNfc = async (): Promise<string> => {
  let text = "";
  try {
    let tech = Platform.OS === "ios" ? NfcTech.MifareIOS : NfcTech.NfcA;
    let resp = await NfcManager.requestTechnology(tech, {
      alertMessage: "Začni scanovat",
    });

    let cmd =
      Platform.OS === "ios"
        ? NfcManager.sendMifareCommandIOS
        : NfcManager.transceive;

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
  } catch (ex) {
    console.log(ex.toString());
  }
  console.log("Read NFC output: ", text);
  return text;
};

export const writeNdef = async (message: string): Promise<boolean> => {
  try {
    const tech = await NfcManager.requestTechnology(NfcTech.Ndef, {
      alertMessage: "Hold your device close to the tag you wish to write to.",
    });
    
    const bytes = Ndef.encodeMessage([Ndef.textRecord(message)]);
    await NfcManager.ndefHandler.writeNdefMessage(bytes);
    
    await NfcManager.setAlertMessageIOS("Successfully wrote to NFC tag.");
    await NfcManager.cancelTechnologyRequest();

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
