import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import nfcManager from 'react-native-nfc-manager';


export default function App() {
  const [hasNfc, setHasNfc] = React.useState(null)
  React.useEffect(() => {
    async function checkNfc() {
      setHasNfc(await nfcManager.isSupported())
    }
    checkNfc()
  })

  if (hasNfc === null) {
    return <View style={styles.container}>
    <Text>Nejede ti NFC</Text>
  </View>
  } else if (!hasNfc) {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});