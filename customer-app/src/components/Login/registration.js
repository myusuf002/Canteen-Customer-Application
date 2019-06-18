import React, {Component} from 'react';
import {Text, View, Image, TextInput, Alert, TouchableOpacity, ScrollView, } from 'react-native';
import AsyncStorage from 'AsyncStorage';
import styles from './styles';
import server from '../../server';
const assets = '../../assets/';



class RegistrationScreen extends Component {
  constructor(){
    super()
    this.state = {
      no_hp: 0,
      username: "",
      password: "",      
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
      no_hp: keyword
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

  _registAccount(){  
    if(this.state.username!=="" && this.state.password!=="" && this.state.no_hp!==0){
      fetch(server.name+'/account/get/'+this.state.username)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.items.length == 0){
          // Alert.alert(this.state.username+" is unique")
          fetch(server.name+'/account/regist', {
            method:'POST',
            headers: {
              'Accept': 'application/json',
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              'username': this.state.username,
              'password': this.state.password,
              "no_hp": this.state.no_hp
            })
          })
            .then((response) => response.json())
            .then((responseJson) => {
              Alert.alert("Registration is successful")
              AsyncStorage.setItem('username', this.state.username);
              this.props.navigation.navigate('Login')
            })
            .catch((error) =>{
              console.log(error);
              Alert.alert("Something wrong")
            });
        }
        else{
          Alert.alert(this.state.username+" is already exists.")
        }
        // console.log("response:")
        // console.log(responseJson.items)
        // console.log(this.state.session)
        
      })
      .catch((error) =>{
        console.log(error);
        Alert.alert("Something wrong")
      });
    }
    else{
      Alert.alert("Please fill all forms.")
     }
  }
  render() {
    return (
      <View style={styles.container}>     
      <ScrollView style={{flex:1, marginTop: 30}}>
        <View style={{alignItems: 'center'}}>
          <Image style={styles.logoName} source={require(assets+'logo/name-red.png')}></Image>
        </View>
      </ScrollView>
      <ScrollView  style={{marginTop: 10}}>
        <View  style={styles.body}>
          <View style={styles.groupInput}>
            <Image style={styles.iconInput} source={require(assets+'icons/phone.png')}  />
            <TextInput 
                keyboardType='numeric'
                style={styles.textInput}
                placeholder={"Phone Number"} 
                onChangeText={this._getPhonenumber}
            ></TextInput>
          </View>
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
                onChangeText={this._getPassword}
                secureTextEntry = {true}
            ></TextInput>
          </View>
          
          <TouchableOpacity style={styles.buttonInput}   onPress={() => this._registAccount()} >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={{
            flexDirection:'row', 
            marginLeft:15,
            marginRight:20,
            }}>
            <TouchableOpacity style={{flex:1,}}  onPress={() => this.props.navigation.navigate('Login')} >
              <Text> Have account </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1}}  onPress={() => this.props.navigation.navigate('RegistrationSSO')} >
              <Text style={{textAlign:'right'}}> Sign Up SSO </Text>  
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
    );
  }
}
export default RegistrationScreen;



