import { Modal, Text, View } from 'react-native'
import { styles } from '../theme'

export function NfcModal({modalVisible}: {modalVisible: boolean}): JSX.Element {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.nfcModal}>
        <Text> test</Text>
      </View>
    </Modal>
  )
}
