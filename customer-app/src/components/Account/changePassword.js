import React, {Component} from 'react';
import{connect} from 'react-redux';
import {Text, View, Image, TouchableOpacity, ScrollView, TextInput, Alert} from 'react-native';
import server from '../../server';
import styles from './styles';
const assets = '../../assets/';

class ChangePasswordScreen extends Component {
  constructor(props){
    super()  

    this.state = {
        username: props.username,
        old_password: '',
        new_password: '',
        account: [],
        clear: false,
        isLoading: false,
    }
    this._changePassword = this._changePassword.bind(this)
    this._getNewPassword = this._getNewPassword.bind(this)
    this._getOldPassword = this._getOldPassword.bind(this)
    this._componentDidChangePassword = this._componentDidChangePassword.bind(this)
  }

  _getNewPassword(keyword){
    this.setState({
      new_password: keyword
    })
  }

  _getOldPassword(keyword){
    this.setState({
      old_password: keyword
    })
  }

 
  _changePassword(){
    fetch(server.name+'/account/login', {
        method:'POST',
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          'username': this.state.username,
          'password': this.state.old_password
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            account: responseJson.items,
          });
          if(this.state.account.length == 1){
            let account = this.state.account[0]
            console.log("account:")
            console.log(account)
            Alert.alert(
                'Change Password',
                'Are you sure to change password ?',
                [
                  {text: 'Cancel'},
                  {text: 'Change', onPress: () => this._componentDidChangePassword()},
                ],
                {cancelable: false},
            ); 
            }    
            else{
                Alert.alert("Wrong old password.")
            }
        })
        .catch((error) =>{
          console.log(error);
          Alert.alert("Something wrong")
        });
  }

  _componentDidChangePassword(){
    fetch(server.name+'/account/password/change', {
        method:'POST',
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          'username': this.state.username,
          'password': this.state.new_password
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                old_password: "",
                new_password: "",
                clear:!this.state.clear,
            }) 
            Alert.alert('Password changed.')
            this.props.navigation.navigate('Account')
        })
        .catch((error) =>{
          console.log(error);
          Alert.alert("Something wrong")
        });
    }
  render() {
    return (
      <View style={styles.container}>     
      <View style={styles.head}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.headSide}>
          <Image style={styles.headImage} source={require(assets+'icons/back.png')}  />
        </TouchableOpacity>
        <View  style={styles.headMiddle}>
            <View style={styles.headTitle}>
                <Text style={styles.canteenName}> Change Password </Text>
            </View>
        </View>
      </View>
      <ScrollView  style={{marginTop: 10}}>
        <View  style={styles.body}>
          <View style={styles.groupInput}>
            <Image style={styles.iconInput} source={require(assets+'icons/password.png')}  />
            <TextInput 
                style={styles.textInput}
                placeholder={"Old Password"} 
                value={!this.state.clear ? this.state.old_password : null}
                onChangeText={this._getOldPassword}
                secureTextEntry = {true}
            ></TextInput>
          </View>
          <View style={styles.groupInput}>
            <Image style={styles.iconInput} source={require(assets+'icons/password.png')}  />
            <TextInput 
                style={styles.textInput}
                placeholder={"New Password"} 
                value={!this.state.clear ? this.state.new_password : null}
                onChangeText={this._getNewPassword}
                secureTextEntry = {true}
            ></TextInput>
          </View>
          <TouchableOpacity style={styles.buttonInput}   
          onPress={() => this._changePassword()} >
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    );
  }
  }

function mapStateToProps(state){
  return {
    username: state.username,
  }
};


export default connect(mapStateToProps)(ChangePasswordScreen);