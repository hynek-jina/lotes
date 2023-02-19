import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";

export const readNfc = async () => {
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
    bytes = resp.toString().split(",");

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
  console.log("Read NFC output: ", text)
  return text
  
};

// export const writeNdef = async (message) => {
//   try {
//     await NfcManager.requestTechnology(NfcTech.Ndef);

//     const bytes = Ndef.encodeMessage([Ndef.textRecord(message)]);

//     if (bytes) {
//       await NfcManager.ndefHandler.writeNdefMessage(bytes);
//     }
//   } catch (ex) {
//     console.warn(ex);
//   } finally {
//     NfcManager.cancelTechnologyRequest();
//   }
// };

export const writeNdef = async (message) => {
    try {
      const tech = await NfcManager.requestTechnology(NfcTech.Ndef, {
        alertMessage: "Hold your device close to the tag you wish to write to.",
      });
  
      const bytes = Ndef.encodeMessage([Ndef.textRecord(message)]);
      await NfcManager.writeNdefMessage(bytes);
  
      await NfcManager.setAlertMessageIOS("Successfully wrote to NFC tag.");
      await NfcManager.cancelTechnologyRequest();
  
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  