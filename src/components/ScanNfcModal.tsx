import {useAtom} from 'jotai'
import LottieView from 'lottie-react-native'
import {Modal, Pressable, Text, View} from 'react-native'
import nfcAnimation from '../animations/nfcAnimation.json'
import {nfcModalVisibilityAtom} from '../state/atoms'
import {styles} from '../theme'

export function NfcModal({modalCopy}: {modalCopy: string}): JSX.Element {
  const [modalVisible, setModalVisible] = useAtom(nfcModalVisibilityAtom)

  const handleCancelButtonPress = (): void => {
    setModalVisible(false)
  }

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.nfcModal}>
        <Text style={styles.nfcHeader}>Ready to Scan</Text>
        <View>
          <LottieView
            source={nfcAnimation}
            autoPlay
            loop
            style={{width: 140, height: 140}}
          />
        </View>
        <Text> {modalCopy}</Text>
        <Pressable
          style={styles.secondaryButton}
          onPress={handleCancelButtonPress}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
      </View>
    </Modal>
  )
}
