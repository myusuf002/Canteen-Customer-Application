import React, {Component} from 'react';
import{connect} from 'react-redux';
import {Text, View, Image, Alert, TouchableOpacity, ScrollView} from 'react-native';
import AsyncStorage from 'AsyncStorage';
import moment from 'moment'
import server from '../../server';
import styles from './styles';
const assets = '../../assets/';

class AccountScreen extends Component {
    constructor(props){
      super()
      this.state = {
        id_akun_customer: props.id_customer,
        username: props.username,
        saldo: 0,
        no_hp: 0,
        status_tcash: false,
        isLoading: false,
        account: [],
        listOrders: [],
        listPayments: []
      }
      this._componentDidMountSaldo()
      this._componentDidMountAccount()
      this._componentDidMountOrder()
      this._componentDidMountPayments()
    }

    _componentDidMountSaldo(){
      return fetch(server.name+'/account/saldo/'+this.state.id_akun_customer)
        .then((response) => response.json())
        .then((responseJson) => {
  
          this.setState({
            isLoading: false,
            account: responseJson.items,
          }, function(){
  
          });
          if(this.state.account.length == 1){
            let account = this.state.account[0]
            console.log("account:")
            console.log(account)
            this.setState({
              saldo: account.saldo
            })        
    
          }
        })
        .catch((error) =>{
          console.error(error);
          Alert.alert("Something wrong")
        });

        
    }

    _componentDidMountAccount(){
      return fetch(server.name+'/account/get/'+this.state.username)
        .then((response) => response.json())
        .then((responseJson) => {
  
          this.setState({
            isLoading: false,
            account: responseJson.items,
          }, function(){
  
          });
          if(this.state.account.length == 1){
            let account = this.state.account[0]
            console.log("account:")
            console.log(account)
            this.setState({
              no_hp: account.no_hp,
              status_tcash: account.status_tcash,
            })        
    
          }
        })
        .catch((error) =>{
          console.error(error);
          Alert.alert("Something wrong")
        });

        
    }

    _componentDidMountOrder(){
      return fetch(server.name+'/orders/limit/'+this.state.id_akun_customer)
        .then((response) => response.json())
        .then((responseJson) => {
  
          this.setState({
            isLoading: false,
            listOrders: responseJson.items,
          }, function(){
  
          });
  
        })
        .catch((error) =>{
          console.error(error);
          Alert.alert("Something wrong")
        });
    }

    _componentDidMountPayments(){
      return fetch(server.name+'/payment/limit/'+this.state.id_akun_customer)
        .then((response) => response.json())
        .then((responseJson) => {
  
          this.setState({
            isLoading: false,
            listPayments: responseJson.items,
          }, function(){
  
          });
  
        })
        .catch((error) =>{
          console.error(error);
          Alert.alert("Something wrong")
        });
    }
    _onPressLogout() {
      Alert.alert(
        'Sign Out',
        'Are you sure to sign out?',
        [
          {text: 'Cancel'},
          {text: 'OK', onPress: () => {
            this.props.logout_Account()
            AsyncStorage.removeItem('username')
            this.props.navigation.navigate('Login')
          }},
        ],
        {cancelable: false},
      );
      
    }

    _changePassword() {
      this.props.navigation.navigate('ChangePassword')
    }

    render() {  
      console.log(this.props)

      return (
        <View style={styles.container}>     
        <View style={styles.head}>
        {/* <TouchableOpacity style={styles.headSide}>
          <Text style={{color:'#f53b50', fontSize:20, fontWeight: 'bold' }}>{total}</Text>
        </TouchableOpacity> */}
        <View  style={styles.headMiddle}>
        <ScrollView horizontal>
            <View style={styles.headTitle}>
              <Text style={styles.canteenName}>   {this.state.username} </Text>
            </View>
          </ScrollView> 
        </View>
  
        <TouchableOpacity onPress={() => this._onPressLogout()}  style={styles.headSide}>
          <Image style={styles.headImage} source={require(assets+'icons/logout.png')}  />
        </TouchableOpacity>
      </View>
        <ScrollView>
          <View style={styles.body}>
            <View style={{flex:1, alignItems:'center'}}>
              
                <View style={[styles.canteenGroup, {backgroundColor:'#f53b50' }]} >
                  <View style={styles.canteen}>
                    <View>
                        <Image style={{width: 80, height: 80, borderRadius:10}} source={require(assets+'icons/t-cash.png')}></Image>
                    </View>
                    <View style={styles.canteenProfile}>
                      <Text style={[styles.canteenName, {color: '#fff', marginTop:5 }]}> T-Cash </Text>
                      <Text style={[styles.canteenType, {color: '#000', marginBottom:5 , fontWeight:'bold', fontSize:24 }]}> Rp. {this.state.saldo} </Text>
                    </View>
                  </View>      
                </View>  

                <View style={styles.canteenGroup}  >
                  <View style={styles.canteen}>
                    <View style={styles.canteenProfile}>
                      <View style={{paddingBottom:5, marginTop:5, borderBottomWidth:1, borderBottomColor:'#eeeeee'}}>
                        <Text style={{fontSize:20, color:"#f53b50", fontWeight: 'bold'}}>Profile</Text>
                      </View>
                      <View  style={{paddingBottom:10, marginTop:10, borderBottomWidth:1, borderBottomColor:'#eeeeee'}}>
                        <Text style={{fontSize:10, color:"black", fontStyle: 'italic', fontWeight: 'bold'}}>  Username</Text>
                        <Text style={{fontSize:16, color:"#b9b9b9", fontWeight: 'bold', fontStyle: 'italic'}}>    {this.state.username}</Text>
                      </View>
                      <View  style={{paddingBottom:10, marginTop:10, borderBottomWidth:1, borderBottomColor:'#eeeeee'}}>
                        <Text style={{fontSize:10, color:"black", fontStyle: 'italic', fontWeight: 'bold'}}>  Phone number</Text>
                        <Text style={{fontSize:16, color:"#b9b9b9", fontWeight: 'bold', fontStyle: 'italic'}}>    {this.state.no_hp}</Text>
                      </View>
                      <View  style={{paddingBottom:10, marginTop:10}}>
                        <Text style={{fontSize:10, color:"black", fontStyle: 'italic', fontWeight: 'bold'}}>  Password</Text>
                        <TouchableOpacity onPress={() => this._changePassword()}>
                        <Text style={{fontSize:16, color:"#f53b50", fontWeight: 'bold', fontStyle: 'italic'}}>    Change Password</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>      
                </View>  

                <View style={styles.canteenGroup}  >
                  <View style={styles.canteen}>
                    <View style={styles.canteenProfile}>
                      <View style={{paddingBottom:5, marginTop:5, paddingRight:5, borderBottomWidth:1, borderBottomColor:'#eeeeee'}}>
                        <Text style={{fontSize:20, color:"#f53b50", fontWeight: 'bold'}}>Payment History</Text>
                      </View>
                      <View  style={{paddingBottom:10, marginTop:10, paddingLeft:20, borderBottomWidth:1, borderBottomColor:'#eeeeee'}}>
                      {this.state.listPayments.map((payment) => {
                          return(
                            <View key={payment.id_transaksi_order}>
                              <Text style={{fontSize:12, fontStyle: 'italic', marginBottom:5}}>
                              {payment.id_transaksi_order}; {moment(payment.waktu_transaksi_order).format("DD/MM/YY")}; {payment.metode_transaksi_order}; Rp. {payment.total_transaksi_order};  {payment.status_transaksi_order}</Text>
                            </View>
                          )
                        })} 
                      </View>
                      <View style={{paddingBottom:5, marginTop:5, paddingRight:5}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HistoryPayments')}  >
                          <Text style={{fontSize:12, color:"black", fontStyle: 'italic', fontWeight: 'bold', textAlign:'center'}}>  See all</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>      
                </View>  

                <View style={styles.canteenGroup}  >
                  <View style={styles.canteen}>
                    <View style={styles.canteenProfile}>
                      <View style={{paddingBottom:5, marginTop:5, paddingRight:5, borderBottomWidth:1, borderBottomColor:'#eeeeee'}}>
                        <Text style={{fontSize:20, color:"#f53b50", fontWeight: 'bold'}}>Order History</Text>
                      </View>
                      <View  style={{paddingBottom:10, marginTop:10, paddingLeft:10, borderBottomWidth:1, borderBottomColor:'#eeeeee'}}>
                        {this.state.listOrders.map((order) => {
                          return(
                            <View key={order.id_order}>
                              <Text style={{fontSize:12, fontStyle: 'italic', marginBottom:5}}>
                              {order.id_order}; order:{moment(order.waktu_order).format("DD/MM/YY")}; take:{moment(order.waktu_pengambilan).format("DD/MM/YY")}; {order.status_order}</Text>
                            </View>
                          )
                        })} 
                      </View>
                      <View style={{paddingBottom:5, marginTop:5, paddingRight:5}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HistoryOrders')}  >
                          <Text style={{fontSize:12, color:"black", fontStyle: 'italic', fontWeight: 'bold', textAlign:'center'}}>  See all</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>      
                </View>         
            </View>
          </View>
        </ScrollView>
  
        <View  style={styles.nav}>
          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Home', {})}    
            style={styles.navGroup}
          >
            <Image style={styles.navImage} source={require(assets+'icons/home.png')}  />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity  
            onPress={() => this.props.navigation.navigate('Order', {})} 
            style={styles.navGroup}
          >
            <Image style={styles.navImage} source={require(assets+'icons/order.png')}  />
            <Text style={styles.navText}>Order</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => this.props.navigation.navigate('Notifications')} style={styles.navGroup}>
            <Image style={styles.navImage} source={require(assets+'icons/notifications.png')}  />
            <Text style={styles.navText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => this.props.navigation.navigate('Account')} style={styles.navGroup}>
            <Image style={styles.navImage} source={require(assets+'icons/account-alt.png')}  />
            <Text style={[styles.navText, styles.textActive]}>Account</Text>
          </TouchableOpacity>
        </View>
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
      logout_Account: () => dispatch({'type':'LOGOUT_ACCOUNT'}),

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);