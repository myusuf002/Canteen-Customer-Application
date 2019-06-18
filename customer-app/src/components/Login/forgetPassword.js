import React, {Component} from 'react';
import {Text, View, Image, TextInput, Alert, TouchableOpacity, ScrollView, Button} from 'react-native';
import styles from './styles';
const assets = '../../assets/';



class ForgetPasswordScreen extends Component {
  constructor(){
    super()
    this.state = {
      username: "Username",
      phonenumber: "Phone Number",
      message: "We'll send your password to your phone."
    }
    this._getUsername = this._getUsername.bind(this)
    this._getPhonenumber = this._getPhonenumber.bind(this)
    this._searchKeyword = this._searchKeyword.bind(this)
  }

  _getUsername(keyword){
    this.setState({
      username: keyword
    })
  }

  _getPhonenumber(keyword){
    this.setState({
      numberphone: keyword
    })
  }

  _searchKeyword(){
    Alert.alert('You are '+this.state.username+",\nYour number phone is "+this.state.phonenumber)
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
        <Text style={styles.headTitle}>Forget Password</Text>
      </View>  

      <ScrollView style={{flex:1, marginBottom: -20}}>
        <View style={{alignItems: 'center'}}>
          <Image style={styles.logoImage} source={require(assets+'logo/logo-red.png')}></Image>
        </View>
      </ScrollView>
      <ScrollView  style={{marginTop: 0}}>
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
            <Image style={styles.iconInput} source={require(assets+'icons/phone.png')}  />
            <TextInput 
                style={styles.textInput}
                placeholder={"Phone Number"} 
                onChangeText={this._getPhonenumber}
            ></TextInput>
          </View>
          
          <TouchableOpacity style={styles.buttonInput}   onPress={() => this.props.navigation.navigate('Login')} >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <Text style={styles.textMessage}>{this.state.message}</Text>
        </View>
      </ScrollView>
    </View>
    );
  }
}
export default ForgetPasswordScreen;



