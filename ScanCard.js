import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, Alert, Platform, TouchableOpacity, View, SafeAreaView, TouchableWithoutFeedback } from 'react-native'
import nfcManager, { NfcEvents, NfcTech } from 'react-native-nfc-manager'

class App extends Component {
    constructor(props){
        super(props),

        this.state = {
            log: '',
            text: ''
        }
    }
    

    onChangeText = (text) => {
        this.setState({
            text
        })
    }
    writeData = () => {

    }

    readData = () => {

    }

    render() {
        return (
            <SafeAreaView style={styles.cointainer}>
                <TextInput 
                style={styles.textInput} 
                onChange={this.onChangeText} 
                autoComplete='off' 
                autoCapitalize='none' 
                autoCorrect='false' 
                placeholderTextColor='#888888' 
                placeholder='Enter text here' />

                <TouchableOpacity
                onPress={this.writeData}
                style={styles.buttonWrite}>
                    <Text style={styles.buttonText}>Write</Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={this.readData}
                style={styles.buttonRead}>
                    <Text style={styles.buttonText}>Read</Text>
                </TouchableOpacity>

            </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    textInput: {
        marginLeft: 20,
        marginRight: 20,
        height: 50,
        marginBottom: 10,
        textAlign: 'center',
        color: black,
    },
    buttonWrite: {
        marginLeft: 20,
        marginRight: 20,
        height: 50,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: '#9D2235'
    },
    buttonRead: {
        marginLeft: 20,
        marginRight: 20,
        height: 50,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: '#006C5B'
    },
    buttonText: {
        color: white,

    }
})

export default App;