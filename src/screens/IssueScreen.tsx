import {useNavigation} from '@react-navigation/native'
import {useAtom} from 'jotai'
import {useState} from 'react'
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {useApiCalls} from '../api'
import {loteAmountAtom} from '../state/atoms'
import {styles} from '../theme'
import {writeNdef} from '../utils/nfc'

function Issue(): JSX.Element {
  const [temporaryLoteAmount, setTemporaryLoteAmount] = useAtom(loteAmountAtom)
  const navigation = useNavigation()

  const [activeButton, setActiveButton] = useState(true)

  const {createLnurl} = useApiCalls()

  const handleButtonClick = (): void => {
    setActiveButton(false)
    setTimeout(() => {
      void (async () => {
        const createdLnurl = await createLnurl(temporaryLoteAmount)
        await writeNdef(
          createdLnurl,
          `Store ${temporaryLoteAmount.toLocaleString()} sats`
        )
        navigation.goBack()
        setActiveButton(true)
      })()
    }, 3000)
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text>Set amount for your new Lote</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            const parsedNumber = Number(text)
            if (isNaN(parsedNumber)) return

            setTemporaryLoteAmount(parsedNumber)
          }}
          value={String(temporaryLoteAmount)}
          autoFocus
          keyboardType="numeric"
        />

        <View style={styles.buttonContainer}>
          {activeButton ? (
            <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
              <Text style={styles.buttonText}>✍️ Issue Lote</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.buttonDisabled}>
              <Text style={styles.buttonText}>... Issuing Lote</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  )
}

export default Issue
