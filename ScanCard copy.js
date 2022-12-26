import React from 'react'
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import nfcManager, {NfcEvents, NfcTech} from 'react-native-nfc-manager';


export default function ScanCard(props) {
    async function readTag() {
        try {
            await nfcManager.requestTechnology(NfcTech.Ndef)
            const tag = await nfcManager.getTag()
            console.warn('Tag found', tag)
        } catch (ex) {
            console.warn('oups', ex)
        } finally {
            nfcManager.cancelTechnologyRequest()
        }
    }
    return (
        <View style={styles.container}>
            <Text>Lightning notes Validator</Text>
            <TouchableOpacity onPress={readTag}>
                <Text>SCAN</Text>
            </TouchableOpacity>
        </View>
    )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});