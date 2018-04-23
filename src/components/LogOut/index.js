/**
 * @flow
 */

import * as React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, AsyncStorage } from 'react-native';
import store from '../../store';
import { login } from '../../store/actions/login';

type Props = {
    navigation:Object
};

export default class LogOut extends React.Component<Props> {
    //perform logout and send to LOGIN navigation
    logOut = () => {
        store.dispatch(login(''));
        AsyncStorage.removeItem('Auth-Token');
        this.props.navigation.navigate('Login');
    }

    render() {
        const { container, button } = styles;
        return (
            <View style={container}>
                <TouchableHighlight style={button} onPress={() => this.logOut()}>
                    <Text>Log Out </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        marginTop: 20,
    },
    button: {
        marginBottom: 5,
        height: 50,
        borderWidth: 1,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:
        {
            fontWeight: 'bold',
        }
});

