import {useAtom} from 'jotai'
import LottieView from 'lottie-react-native'

import {Modal, Text, TouchableOpacity, View} from 'react-native'
import NfcManager from 'react-native-nfc-manager'
import nfcAnimation from '../animations/nfcAnimation.json'
import {nfcModalVisibilityAtom} from '../state/atoms'
import {styles} from '../theme'

export function NfcModal({modalCopy}: {modalCopy: string}): JSX.Element {
  const [modalVisible, setModalVisible] = useAtom(nfcModalVisibilityAtom)

  const handleCancelButtonPress = async (): Promise<void> => {
    await NfcManager.cancelTechnologyRequest()
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
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => {
            void handleCancelButtonPress()
          }}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}
