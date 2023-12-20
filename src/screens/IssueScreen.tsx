import {useNavigation} from '@react-navigation/native'
import {useAtom} from 'jotai'
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {useApiCalls} from '../api'
import {loteAmountAtom, isFetchingAtom} from '../state/atoms'
import {styles} from '../theme'
import {writeNdef} from '../utils/nfc'

function Issue(): JSX.Element {
  const [isFetching, setIsFetching] = useAtom(isFetchingAtom)
  const [temporaryLoteAmount, setTemporaryLoteAmount] = useAtom(loteAmountAtom)
  const navigation = useNavigation()

  const {createLnurl} = useApiCalls()

  const handleButtonClick = (): void => {
    setIsFetching(true)
    setTimeout(() => {
      void (async () => {
        const createdLnurl = await createLnurl(temporaryLoteAmount)
        await writeNdef(
          createdLnurl,
          `Store ${temporaryLoteAmount.toLocaleString()} sats`
        )
        navigation.goBack()
        setIsFetching(false)
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
          <TouchableOpacity
            style={styles.button}
            onPress={handleButtonClick}
            disabled={isFetching}
          >
            <Text style={styles.buttonText}>
              {isFetching ? '✍️ Issuing ...' : '✍️ Issue Lote'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default Issue
