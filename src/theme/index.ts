import { Dimensions, StyleSheet } from 'react-native'
import { colors } from './colors'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  button: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
    flex: 1,
  },
  buttonDisabled: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: colors.disabled,
    borderRadius: 5,
    flex: 1,
  },
  secondaryButton: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: colors.secondary,
    borderRadius: 5,
    flex: 1,
  },
  test: {
    marginVertical: 20,
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: colors.buttonText,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  alertButtonText: {
    color: colors.alert,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryText: {
    fontSize: 10,
    fontWeight: '100',
    fontStyle: 'italic',
  },
  link: {
    color: colors.secondary,
    textAlign: 'center',
  },
  buttonLink: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonSpace: {
    margin: 10,
  },
  sectionHeader: {
    color: colors.text,
    fontWeight: 'bold',
    textAlign: 'center',
    height: 24,
  },
  redText: {
    color: colors.alert,
  },
  right: {
    position: 'absolute',
    top: 40,
    right: 4,
  },
  left: {
    position: 'absolute',
    top: 40,
    left: 4,
  },
  header: {
    // height: 80,
    width: '100%',
    borderBottomColor: '#333',
    color: colors.primary,
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nfcHeader: {
    color: 'grey',
    fontSize: 24,
    textAlign: 'center',
  },
  subHeader: {
    height: 80,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: 340,
  },
  callout: {
    position: 'absolute',
    bottom: 0,
    height: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nfcModal: {
    backgroundColor: colors.background,
    position: 'absolute',
    bottom: 0,
    left: 20,
    padding: 20,
    alignItems: `center`,
    justifyContent: `center`,
    width: Dimensions.get(`window`).width - 40,
    borderRadius: 5,
  },
})
