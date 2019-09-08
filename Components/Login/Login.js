import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';
import {
  TouchableHighlight
} from 'react-native-gesture-handler';
import {
  logIn
} from '../../actions';
import 
  logInClient from "../../Utils/loginClient";
import 
  logInCaretaker from '../../Utils/loginCaretaker';

const initialState = {
  user: '',
  username: '',
  password: '',
}

export class Login extends Component {
  state = initialState;

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async () => {
    const {
      username,
      password,
      user
    } = this.state
    if (user === 'client') {
      const userId = await logInClient(username, password)
      return userId
    } else {
      const userId = await logInCaretaker(username, password)
      return userId
    }
  }

  render() {
    return ( < View style = {
        styles.container
      } >
      <View style = {
        styles.headerContainer
      } >
      <Text style = {
        styles.header
      } > Log In </Text> </View > <View style = {
        styles.routes
      } >
      <TouchableHighlight underlayColor = "black"
      accessibilityLabel = "Tap me to log in to your client account."
      accessible = {
        true
      }
      onPress = {
        () => this.setState({
          user: 'client'
        })
      }
      style = {
        styles.touchExpander
      } >
      <Text style = {
        styles.button
      } > I 'm a Client</Text> </TouchableHighlight > </View> <View style = {
        styles.routes
      } >
      <TouchableHighlight underlayColor = "black"
      accessibilityLabel = "Tap me to log in to your caretaker account."
      accessible = {
        true
      }
      onPress = {
        () => this.setState({
          user: 'caretaker'
        })
      }
      style = {
        styles.touchExpander
      } >
      <Text style = {
        styles.button
      } > I 'm a Caretaker</Text> </TouchableHighlight > </View> <TextInput style = {
        styles.input
      }
      placeholder = "Username"
      onChangeText = {
        value => this.handleChange('username', value)
      }
      placeholderTextColor = "maroon" / >
      <TextInput style = {
        styles.input
      }
      placeholder = "Password"
      onChangeText = {
        value => this.handleChange('password', value)
      }
      placeholderTextColor = "maroon" / >
      <View style = {
        styles.routes
      } >
      <TouchableHighlight underlayColor = "black"
      accessibilityLabel = "Tap me to log in to your account."
      accessible = {
        true
      }
      onPress = {this.handleSubmit}
      style = {
        styles.touchExpander
      } >
      <Text style = {
        styles.button
      }> Log In </Text> </TouchableHighlight > </View> </View >
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logIn: (user => dispatch(logIn(user)))
});

export default connect(null, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  headerContainer: {
    borderBottomColor: 'maroon',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 10
  },
  header: {
    fontSize: 45,
    fontFamily: 'Didot'
  },
  routes: {
    flexDirection: 'column',
    backgroundColor: 'maroon',
    width: '90%',
    height: '10%',
    borderRadius: 30,
    justifyContent: 'space-evenly',
    margin: 5,
  },
  button: {
    color: 'white',
    fontSize: 35,
    fontFamily: 'Didot',
    textAlign: 'center',
    marginTop: 10,
    height: 50,
  },
  input: {
    width: '90%',
    height: 80,
    fontSize: 25,
    fontFamily: 'Didot',
    paddingLeft: 5,
    margin: 10,
    backgroundColor: 'lightgray',
    color: 'black'
  },
  touchExpander: {
    height: '90%',
    borderRadius: 30,
    width: '100%'
  },
});