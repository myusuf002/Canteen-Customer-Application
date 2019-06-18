import React, {Component} from 'react';
import{connect} from 'react-redux';
import {Text, View, Image, TextInput, Alert, TouchableOpacity, ScrollView} from 'react-native';
import AsyncStorage from 'AsyncStorage';
import server from '../../server';
import styles from './styles';
const assets = '../../assets/';



class LoginScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      account: [],
      session: [],
      username: "",
      password: "",
      clear : false,
    }
    AsyncStorage.getItem('username', (error, result) => {
      if (result) {
          this.setState({
              username: result
          });
      }
      this._checkSession();
    });
    
    this._getUsername = this._getUsername.bind(this)
    this._getPassword = this._getPassword.bind(this)
    this._checkSession= this._checkSession.bind(this)
  }

  _getUsername(keyword){
    this.setState({
      username: keyword
    })
  }

  _getPassword(keyword){
    this.setState({
      password: keyword
    })
  }

  _checkLastLogin(username){
    return fetch(server.name+'/account/lastlogin/'+username)
      .then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson)
      })
      .catch((error) =>{
        console.log(error);
        Alert.alert("Something wrong")
      });
  }

  
  _authAccount(){
    if(this.state.username!=="" && this.state.password!==""){
      fetch(server.name+'/account/login', {
        method:'POST',
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          'username': this.state.username,
          'password': this.state.password
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            account: responseJson.items,
          });
        })
        .catch((error) =>{
          console.log(error);
          Alert.alert("Something wrong")
        });

      if(this.state.account.length == 1){
        let account = this.state.account[0]
        console.log("account:")
        console.log(account)
        this._checkLastLogin(account.username)
        AsyncStorage.setItem('username', account.username);
        this.props.login_Account(account.id_akun_customer, account.username)
        this.setState({
          account: [],
          session: [],
          username: "",
          password: "",
          clear:!this.state.clear,
        })        
        this.props.navigation.navigate('Home')

      }    
      else{
        Alert.alert("Username and password don't match.")
      }
    }
    else{
     Alert.alert("Please enter your username and password.")
    }
  }

  _onPressButton() {
    Alert.alert('You tapped the button!')
  }

 
  _checkSession(){
    console.log("User session")
    fetch(server.name+'/account/get/'+this.state.username)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.items.length == 1){
          let session = responseJson.items[0]
          
          if(this.state.username===session.username){
            console.log("session:")
            console.log(this.state.username)
            this._checkLastLogin(this.state.username)
            this.props.login_Account(session.id_akun_customer, session.username)    
            this.setState({
              account: [],
              session: [],
              username: "",
              password: "",
              clear:!this.state.clear,
            })   
            this.props.navigation.navigate('Home')
          }
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
  render() {
    return (
      <View style={styles.container}>     
      <ScrollView style={{flex:1, marginTop: 30}}>
        <View style={{alignItems: 'center'}}>
          <Image style={styles.logoImage} source={require(assets+'logo/logo-red.png')}></Image>
        </View>
      </ScrollView>
      <ScrollView  style={{marginTop: 10}}>
        <View  style={styles.body}>
          <View style={styles.groupInput}>
            <Image style={styles.iconInput} source={require(assets+'icons/account.png')}  />
            <TextInput 
                style={styles.textInput}
                placeholder={"Username"} 
                value={!this.state.clear ? this.state.username : null}
                onChangeText={this._getUsername}
            ></TextInput>
          </View>
          <View style={styles.groupInput}>
            <Image style={styles.iconInput} source={require(assets+'icons/password.png')}  />
            <TextInput 
                style={styles.textInput}
                placeholder={"Password"} 
                value={!this.state.clear ? this.state.password : null}
                onChangeText={this._getPassword}
                
                secureTextEntry = {true}
            ></TextInput>
          </View>
          
          <TouchableOpacity style={styles.buttonInput}   
          onPress={() => this._authAccount()} >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <View style={{
            flexDirection:'row', 
            marginLeft:15,
            marginRight:20,
            }}>
            <TouchableOpacity style={{flex:1,}}  onPress={() => this.props.navigation.navigate('Registration')} >
              <Text> Create account </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={{flex:1}}  onPress={() => this.props.navigation.navigate('ForgetPassword')} >
              <Text style={{textAlign:'right'}}> Forgot password? </Text>  
            </TouchableOpacity> */}
          </View>
        </View>
      </ScrollView>
    </View>
    );
  }
}


function mapStateToProps(state){
  return {
    id_customer: state.id_customer,
    username: state.username,
  }
};

function mapDispatchToProps(dispatch){
  return {
      login_Account: (id, username) => dispatch({'type':'LOGIN_ACCOUNT', 'params':{'id':id, 'username':username}}),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);