
import { useAtom } from 'jotai'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { nfcModalVisibilityAtom } from '../state/atoms'
import { styles } from '../theme'

export function NfcModal({modalCopy}: {modalCopy: string}): JSX.Element {
  
  const [modalVisible, setModalVisible] = useAtom(nfcModalVisibilityAtom)

  const handleCancelButtonPress = (): void => {
    setModalVisible(false)
  }

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.nfcModal}>
        <Text> {modalCopy}</Text>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleCancelButtonPress}>
          <Text style={styles.buttonText}>Cancel</Text>
          <Text>test</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}
