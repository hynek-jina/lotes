import {Feather} from '@expo/vector-icons'
import {Text, View} from 'react-native'
import {styles} from '../theme'

type FeatherIconName = React.ComponentProps<typeof Feather>['name']

export function Callout({
  icon,
  copy,
}: {
  icon: FeatherIconName
  copy: string
}): JSX.Element {
  return (
    <View style={styles.callout}>
      <Feather name={icon} size={26} color="black" style={{marginRight: 10}} />
      <Text>{copy}</Text>
    </View>
  )
}
