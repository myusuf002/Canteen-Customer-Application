import React, {Component} from 'react';
import {Text, View, Image, TextInput, Alert, TouchableOpacity, ScrollView} from 'react-native';
import styles from './styles';
const assets = '../../assets/';



class RegistrationSSOScreen extends Component {
  constructor(){
    super()
    this.state = {
      account: [],
      username: "",
      password: "",
      message: "Wrong Username"
    }
    this._getUsername = this._getUsername.bind(this)
    this._getPhonenumber = this._getPhonenumber.bind(this)
    this._getPassword = this._getPassword.bind(this)
    this._searchKeyword = this._searchKeyword.bind(this)
  }

  _getUsername(keyword){
    this.setState({
      username: keyword
    })
  }
  _getPhonenumber(keyword){
    this.setState({
      phonenumber: keyword
    })
  }
  _getPassword(keyword){
    this.setState({
      password: keyword
    })
  }

  _searchKeyword(){
    Alert.alert('You are '+this.state.username+",\nYour password is "+this.state.password)
  }

  _onPressButton() {
    Alert.alert('You tapped the button!')
  }

  render() {
    return (
      <View style={styles.container}>     
      <View style={styles.head}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.headSide}>
            <Image style={styles.headImage} source={require(assets+'icons/back.png')}  />
        </TouchableOpacity>
        <Text style={styles.headTitle}>Sign Up with SSO</Text>
      </View> 
      <ScrollView style={{flex:1, marginTop: 30}}>
        <View style={{alignItems: 'center'}}>
          <Image style={styles.logoName} source={require(assets+'logo/name-red.png')}></Image>
        </View>
      </ScrollView>
      <ScrollView  style={{marginTop: 10}}>
        <View  style={styles.body}>

          <View style={styles.groupInput}>
            <Image style={styles.iconInput} source={require(assets+'icons/account.png')}  />
            <TextInput 
                style={styles.textInput}
                placeholder={"Username"} 
                onChangeText={this._getUsername}
            ></TextInput>
          </View>
          <View style={styles.groupInput}>
            <Image style={styles.iconInput} source={require(assets+'icons/password.png')}  />
            <TextInput 
                style={styles.textInput}
                placeholder={"Password"} 
                onChangeText={this._getUsername}
                secureTextEntry = {true}
            ></TextInput>
          </View>
          
          <TouchableOpacity style={styles.buttonInput}   onPress={() => {
            Alert.alert("This feature is not available now.")
            this.props.navigation.navigate('Registration')  
            } 
          } >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    );
  }
}
export default RegistrationSSOScreen;