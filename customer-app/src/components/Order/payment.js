import React, {Component} from 'react';
import{connect} from 'react-redux';
import {Text, View, Image, Alert, TouchableOpacity, ScrollView} from 'react-native';
import server from '../../server';
import styles from './styles';
const assets = '../../assets/';


class PaymentScreen extends Component {
  constructor(props){
    super()
    this.state = {
      id_customer: props.id_customer,
      id_transaksi: 0,
      id_saldo: 0,
      saldo: 0,
      orders: props.orders,
      id_order: props.id_order,
      status: 'waiting',
      listMenu: [], 
      account: []
    }
    this._componentDidMount()
    this._componentDidMountSaldo()
    this._onSubmitPayment = this._onSubmitPayment.bind(this)
    this._componentDidMountSaldo = this._componentDidMountSaldo.bind(this)
  }

  _componentDidMountSaldo(){
    return fetch(server.name+'/account/saldo/'+this.state.id_customer)
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
            id_saldo: account.id_saldo,
            saldo: account.saldo
          })        
        }
      })
      .catch((error) =>{
        console.error(error);
        Alert.alert("Something wrong")
      });  
  }

  _componentDidAddPayment(status){
    fetch(server.name+'/payment/add', {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'id_order': this.props.id_order,
        'id_customer':  this.props.id_customer,
        'metode':  this.props.method,
        'total':  this.props.total,
        'status': status
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          id_transaksi: responseJson.items.insertId
        });
        this._componentDidAddLogSaldo(responseJson.items.insertId)
        console.log("Add Log")
        console.log(this.state.id_order)
        console.log(responseJson.items.insertId)
        console.log(responseJson)
      })
      .catch((error) =>{
        console.log(error);
      });
  }

  _componentDidUpdateSaldo(){
    
    fetch(server.name+'/account/saldo/update', {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'id_customer':  this.props.id_customer,
        'saldo':  (this.state.saldo - this.props.total)
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(this.state.saldo)
        console.log(this.props.total)
        console.log((this.state.saldo - this.props.total))
        console.log(responseJson)
      })
      .catch((error) =>{
        console.log(error);
      });
  }

  _componentDidAddLogSaldo(id_transaksi){
    
    fetch(server.name+'/account/saldo/log', {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'id_transaksi':  id_transaksi,
        'id_saldo':  this.state.id_saldo,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
      })
      .catch((error) =>{
        console.log(error);
      });
  }

  _componentDidAddNotifications(judul, pesan){
    
    fetch(server.name+'/notifications/add', {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'id_customer':  this.props.id_customer,
        'judul':  judul,
        'pesan': pesan
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
      })
      .catch((error) =>{
        console.log(error);
      });
  }

  _onSubmitPayment() {
    if(this.props.method === "Cash"){
      this._componentDidAddPayment('waiting')
      let judul = "Pay to Cashier"
      let pesan = "You ordered an item for Rp. "+this.props.total+". Please make a payment to the cashier before 30 minutes from now"
      this._componentDidAddNotifications(judul, pesan)
      Alert.alert('Please paid at cashier before 30 minutes.')
      this.props.reset_Order()        
      this.props.navigation.navigate('Home')
    }else{  
      if(this.props.total < this.state.saldo){
        this._componentDidAddPayment('accepted')
        let judul = "Payment Successful"
        let pesan = "Payment for ordering items with total Rp. "+this.props.total+" has been successful"
        this._componentDidAddNotifications(judul, pesan)
        this._componentDidUpdateSaldo()
        Alert.alert('Payment successful.')
        this.props.reset_Order()        
        this.props.navigation.navigate('Home')
      }
      else{
        Alert.alert("T-Cash balance is not enough")
      }
    }
    
  }
 
  _componentDidMount(){
    return fetch(server.name+'/menu')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          listMenu: responseJson.items,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
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
                <Text style={styles.canteenName}> Payment Confirmation </Text>
            </View>
        </View>
      </View>
      <ScrollView>
        <View  style={styles.body}>
        
          <View style={styles.detailGroup}>
              <View style={styles.detailProfile}>
                <Text style={[styles.canteenType, {color: 'black', fontWeight:'bold'}]}>Order ID </Text>
                <Text style={{fontSize:24, fontStyle: 'italic', textAlign:'center'}}>
                  {this.state.id_order}
                </Text>
              </View>
          </View>
          <View style={[styles.detailGroup, {borderBottomWidth:0}]}>
              <View style={styles.detailProfile}>
                <Text style={[styles.canteenType, {color: 'black', fontWeight:'bold'}]}>Order</Text>
                <View style={{flex:1, alignItems:'center', paddingTop:10, paddingBottom:5}}>
                  {this.state.listMenu.map((menu) =>{
                      if(menu.id_menu && (this.state.orders[menu.id_menu] > 0)){
                        return(
                          <View 
                            key={menu.id_menu} 
                            style={{flexDirection: 'row', marginLeft:5, marginRight:5, marginBottom:5}}
                          >
                            <Text style={{flex:1, fontStyle:'italic', fontWeight:'bold', color:'darkgray'}}>
                              {this.state.orders[menu.id_menu]} 
                              </Text>
                            <Text style={{flex:6, fontStyle:'italic', fontWeight:'bold', color:'darkgray'}}>
                              {menu.nama_menu}
                              </Text>
                            <Text style={{flex:3,fontStyle:'italic', fontWeight:'bold', color:'darkgray',}}>
                              Rp. {menu.harga_menu}
                            </Text>
                          </View>
                        )
                      }
                      }) 
                  }
                  
                </View>
              </View>
          </View>
          <View style={{flex:1, alignItems:'center', paddingTop:10, paddingBottom:5}}>
            
            
          </View>
        </View>
      </ScrollView>
      
      <View  style={styles.nav}>      
        <View style={{flex:7, paddingLeft:10, paddingRight:5}}>
          <View>
            <Text style={{fontSize:10, color:"black", fontStyle: 'italic', fontWeight: 'bold'}}>
              Notes
            </Text>
            <Text numberOfLines={2}>{this.props.notes}</Text>
          </View>
        </View>
        <View style={{borderLeftWidth:1, borderLeftColor: '#eee', width:75,height:50, paddingLeft:5, paddingRight:5}}>
          <Text style={{fontSize:10, color:"black", fontStyle: 'italic', fontWeight: 'bold'}}>
            Take
          </Text>
          <Text style={{fontSize:16, color:"#f53b50", textAlign:'center', fontWeight: 'bold'}}>
            { this.props.take ? (this.props.take > 1 ? this.props.take+" hours" : this.props.take+" hour") : "Now" }
          </Text>
        </View>
      </View>
      <View  style={styles.nav}>      
        <View style={{flex:7, paddingLeft:10, paddingRight:5}}>
          <View style={{flexDirection:'row'}}>
            <Text style={{flex:1, fontSize:10, color:"black", fontStyle: 'italic', fontWeight: 'bold'}}>
              Total
            </Text>
            <Text style={{flex:9, fontSize:24, color:"#f53b50", textAlign:'left', fontWeight: 'bold', fontStyle:'italic'}}>   Rp. {this.props.total}
            </Text>
          </View>
        </View>
        <View style={{borderLeftWidth:1, borderLeftColor: '#eee', width:75,height:50, paddingLeft:5, paddingRight:5}}>
          <Text style={{fontSize:10, color:"black", fontStyle: 'italic', fontWeight: 'bold'}}>
            Method
          </Text>
          <Text style={{fontSize:16, color:"#f53b50", textAlign:'center', fontWeight: 'bold'}}>
            { this.props.method }
          </Text>
        </View>
      </View>
      <View  style={styles.nav}>      
        <TouchableOpacity 
          style={[styles.buttonInput, {flex:7}]}   onPress={this._onSubmitPayment} >
          <Text style={[styles.buttonText]}>Pay</Text>
        </TouchableOpacity>
      </View>
      <ScrollView></ScrollView>
    </View>
    );
  }
  }

function mapStateToProps(state){
  return {
    id_order: state.id_order,
    id_customer: state.id_customer,
    notes: state.notes,
    method: state.method,
    take: state.take,
    orders: state.orders,
    total: state.total
  }
};

function mapDispatchToProps(dispatch){
  return {
      reset_Order: () => dispatch({'type':'RESET_ORDER'}),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen);
