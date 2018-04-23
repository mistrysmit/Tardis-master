/**
 * @flow
 */

import * as React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';
import { onPress } from '../../store/actions/login';


type Props = {
  login: string,
  loginFail: boolean,
  loginSuccess: boolean,
  loginInProgress: boolean,
  onPress:Function
};

type State = {
  username: string,
  password:string
}

class Login extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  //If found already logged in send to Home (to KeyFob)
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.login && nextProps.login.length > 0) {
      nextProps.navigation.navigate('Home');
    }
    return null;
  }

  render() {
    const {  loginFail, loginInProgress } = this.props;
    const { container, image, rowContainer, text, textField, submit, failText } = styles;
    const { username, password } = this.state;

    return (
      <View style={container}>
        <Image style={image} source={require('./img/tardis.png')} />
        <View style={rowContainer}>
          <TextInput
            style={textField}
            placeholder={'username'}
            onChangeText={(text) => { this.setState((previous) => ({ ...previous, username: text })) }}
          />
        </View>
        <View style={rowContainer}>
          <TextInput
            style={textField}
            placeholder={'password'}
            onChangeText={(text) => { this.setState((previous) => ({ ...previous, password: text })) }}
          />
        </View>
        <View style={rowContainer}>
          <TouchableOpacity
            style={submit}
            onPress={() => { this.props.onPress(username, password) }}
            disabled={loginInProgress}>
            <Text style={text}>Submit</Text>
            {loginInProgress && <ActivityIndicator size="small" color="#0000ff" />}
          </TouchableOpacity>
          {loginFail && <Text style={failText}>Something Went Wrong, Try Again!</Text>
          }

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    flex: 1,
    justifyContent: 'flex-start',
  },
  disabledSubmit: {
    alignItems: 'center',
    backgroundColor: '#b9ccee',
    borderRadius: 4,
    flex: 1,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'center',
    marginLeft: 44,
    marginRight: 44,
    marginTop: 12,
  },
  image: {
    height: 240,
    marginBottom: 44,
    marginTop: 60,
    resizeMode: Image.resizeMode.contain,
    width: 240,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  submit: {
    alignItems: 'center',
    backgroundColor: '#5e81bc',
    borderRadius: 4,
    flex: 1,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'center',
    marginLeft: 44,
    marginRight: 44,
    marginTop: 12,
  },
  text: {
    color: 'white'
  },
  textField: {
    borderColor: 'black',
    borderWidth: 0.5,
    flex: 1,
    marginLeft: 44,
    marginRight: 44,
    marginTop: 12,
    padding: 10,
  },
  failText: {
    color: 'red'
  }
});

const mapStateToProps = state => (
  {
    login: state.login,
    loginFail: state.loginFail,
    loginSuccess: state.loginSuccess,
    loginInProgress: state.loginInProgress
  }
)

const mapDispatchToProps = dispatch => ({
  onPress: (username, password) => dispatch(onPress(username, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);

