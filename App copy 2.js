import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import nfcManager from 'react-native-nfc-manager';
import ScanCard from './ScanCard';


function App() {
  const [hasNfc, setHasNfc] = React.useState(null)
  React.useEffect(() => {
    async function checkNfc() {
      const supported = await nfcManager.isSupported()
      if (supported) {
        await nfcManager.start()
      }
      setHasNfc(supported)
    }
    checkNfc()
  }, [])

  if (hasNfc === null) {
    return null
  } else if (!hasNfc) {
    return (
      <View style={styles.container}>
      <Text>Nejede ti NFC</Text>
    </View>
    );
  }
  return (
    <ScanCard />
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

export default App