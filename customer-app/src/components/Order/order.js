import React, {Component} from 'react';
import{connect} from 'react-redux';
import {Text, View, Image, TextInput, Alert, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';
import server from '../../server';
import styles from './styles';
const assets = '../../assets/';

class OrderScreen extends Component {
    constructor(props){
      super()
      this.state = {
        id_order: 0,
        orders: props.orders,
        listMenu: []
      }
      this._componentDidMount();
      this._changeTime = this._changeTime.bind(this)
      this._changeTake = this._changeTake.bind(this)
      this._changeMethod = this._changeMethod.bind(this)
      this._calculateTotal = this._calculateTotal.bind(this)
      this._onSubmitOrder = this._onSubmitOrder.bind(this)
    }
    
    
  _calculateTotal(orderedMenu){
      total = 0
      Object.entries(orderedMenu).forEach(([key, value]) => {
        this.state.listMenu.map((menu) =>  {
          if (key == menu.id_menu) 
          total += menu.harga_menu * value
        })
      });
      console.log(total)
      return total
  }

    _addOrder(id){
      order = this.state.orders
      if(order['total_items'] < 20){
        if (!order[id]){order[id] = 0}
        if(order[id] < 10){
          order['total_items'] += 1
          order[id] += 1
          
          this.setState({
            orders: order
          })
          total = this._calculateTotal(order)
          this.props.increase_Order(order, total)
        }
        else{
        Alert.alert('Sorry, Only 10 items per menu you can get.')
        }
      }
      else{
        Alert.alert('Sorry, Only 20 items per order you can get.')
      }
    }

    _subOrder(id){
      order = this.state.orders
      if(order[id] > 0){
        order['total_items'] -= 1
        order[id] -= 1
        this.setState({
          orders: order
        })
        total = this._calculateTotal(order)
        this.props.decrease_Order(order, total)
      }
    }

    _componentDidAddOrder(){
      fetch(server.name+'/orders/add', {
        method:'POST',
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          'id_customer': this.props.id_customer,
          'pengambilan': this.props.take,
          'catatan': this.props.notes
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {
          let id = responseJson.items.insertId
          this.setState({
            id_order: id,
          });
          Object.entries(this.state.orders).forEach(([key, value]) => {
            if(value){
              this._componentDidAddDetailOrder(id, key, value)
              console.log(key+" : "+value)
            }
          });
          this.props.new_Order(this.state.id_order)
          this.props.navigation.navigate('Payment')
        })
        .catch((error) =>{
          console.log(error);
          Alert.alert("Ops, Failed to order.")
        });
    }
    
    _componentDidAddDetailOrder(id_order, id_menu, qty){
      console.log("Mount Detail "+id_menu+" : "+qty)
      fetch(server.name+'/orders/detail/add', {
        method:'POST',
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          'id_order': id_order,
          'id_menu': id_menu,
          'qty': qty
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
    _componentDidUpdateDetailOrder(){
      fetch(server.name+'/orders/detail/remove/'+this.props.id_order)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("Update Detail Order")
          console.log(responseJson)
          console.log(this.state.orders)
          Object.entries( this.state.orders).forEach(([key, value]) => {
            if(value){
              this._componentDidAddDetailOrder(this.state.id_order, key, value)
              console.log(key+" : "+value)
            }
          });
        })
        .catch((error) =>{
          console.log(error);
        });
    }
    _componentDidUpdateOrder(){
      fetch(server.name+'/orders/update', {
        method:'POST',
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          'id_order': this.props.id_order,
          'id_customer': this.props.id_customer,
          'pengambilan': this.props.take,
          'catatan': this.props.notes
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {
          this._componentDidUpdateDetailOrder()
          this.props.navigation.navigate('Payment')
        })
        .catch((error) =>{
          console.log(error);
          Alert.alert("Ops, Failed to order.")
        });
    }

    _onSubmitOrder() {
      console.log("On Submit Order")
      console.log(this.state.orders)
      console.log(this.props.orders)
      if(this.state.id_order == 0){
        this._componentDidAddOrder()        
      }
      else{
        this._componentDidUpdateOrder()
      }
    }

    _changeMethod(){
      method = ''
      if (this.props.method == 'Cash') method = 'T-Cash'
      else  method = 'Cash'
      
      Alert.alert(
        'Payment method',
        'Change to '+method+' ?',
        [
          {text: 'Cancel'},
          {text: 'OK', onPress: () => {
            this.props.change_Method(method)
            this.props.change_Take(0)
          }},
        ],
        {cancelable: false},
      );
      
    }

    _changeTime(){
      Alert.alert(
        'Take order time',
        'Change order time ?',
        [
          {text: '1 Hours', onPress: () => this.props.change_Take(1)},
          {text: '2 Hours', onPress: () => this.props.change_Take(2)},
          {text: '3 Hours', onPress: () => this.props.change_Take(3)},
        ],
        {cancelable: false},
      );
    }
    _changeTake(){
      if (this.props.method == 'Cash') {
        Alert.alert("Sorry, this feature for T-Cash only.")
      }else {
        Alert.alert(
          'Take order time',
          'Change order time ?',
          [
            {text: 'Cancel'},
            {text: 'Ok', onPress:this._changeTime },
          ],
          {cancelable: false},
        );
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

    _onRefresh = () => {
      this.setState({refreshing: true});
      this._componentDidMount().then(() => {
        this.setState({refreshing: false});
      });
    }
    render() {
      let cashMethod = (<TouchableOpacity 
      style={[styles.buttonInput, {flex:7}]}   onPress={this._onSubmitOrder} >
      <Image 
      style={{width:40, height:40, marginLeft:5 }} 
      source={require(assets+'icons/cash.png')}  />
      <Text style={[styles.buttonText]}> {this.props.total > 0 ? "Rp. "+this.props.total : "Nothing here"}</Text>
    </TouchableOpacity>)
      
      let tcashMethod = (<TouchableOpacity 
        style={[styles.buttonInput, {flex:7}]}   onPress={this._onSubmitOrder} >
        <Image 
        style={{width:40, height:40, marginLeft:5 }} 
        source={require(assets+'icons/t-cash.png')}  />
        <Text style={[styles.buttonText]}> {this.props.total > 0 ? "Rp. "+this.props.total : "Nothing here"}</Text>
      </TouchableOpacity>)
      
      if(this.props.total){
        return (
          <View style={styles.container}>     
          <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />}>
            <View style={styles.body}>
              <View style={{flex:1, alignItems:'center'}}>
                {this.state.listMenu.map((menu) =>  {
                  if (menu.status_menu && (this.state.orders[menu.id_menu] > 0)) return(
                    <View key={menu.id_menu} style={styles.menuGroup}>
                      <View style={styles.menu}>
                        <View style={styles.menuImage}>   
                          <Image style={{width: 98, height: 98, borderRadius:10}} source={{uri: menu.foto_menu }}></Image> 
                        </View>
                        <View style={styles.menuProfile}>
                          <Text style={styles.menuName}> {menu.nama_menu} </Text>
                          <Text style={styles.menuType}> {menu.kategori_menu} </Text>
                          <View style={{flex:1, flexDirection:'row'}}>
                            <Text style={styles.menuPrice}>Rp. {menu.harga_menu} </Text>
                            <View style={{flex:1,  flexDirection:'row', alignItems:'flex-end', justifyContent: 'flex-end'}}>
                              <TouchableOpacity 
                                style={styles.cancelButton} 
                                onP onPress={this._subOrder.bind(this, menu.id_menu)
                              }>
                                  <Text style={styles.orderText}>-</Text>
                              </TouchableOpacity>
                              <View style={styles.orderNumber}>
                                  <Text style={{color: 'black', fontWeight: 'bold', textAlign:'center'}}>
                                    {this.state.orders[menu.id_menu] ? this.state.orders[menu.id_menu] : 0 }
                                  </Text>
                              </View>
                              <TouchableOpacity style={styles.orderButton} onP onPress={this._addOrder.bind(this, menu.id_menu)}>
                                  <Text style={styles.orderText}>+</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>      
                    </View> 
                  ) 
                }        
                )}
              </View>
           
            </View>
          </ScrollView>
  
          <View  style={styles.nav}>      
            <View style={{flex:7, paddingLeft:10, paddingRight:5}}>
              <View>
                <TextInput 
                    placeholder={"Add notes"} 
                    onChangeText={this.props.get_Notes}
                ></TextInput>
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
            <TouchableOpacity 
              onPress={this._changeTake}
              style={{borderLeftWidth:1, borderLeftColor: '#eee', width:40,height:50}}>
              <Image 
                style={{width:35, height:35, marginTop:10,marginLeft:5 }} 
                source={require(assets+'icons/options.png')}  />
            </TouchableOpacity>
          </View>
  
          <View  style={styles.nav}>      
            { this.props.method =='Cash'? cashMethod : tcashMethod }
      
            <TouchableOpacity 
              onPress={this._changeMethod}
              style={{borderLeftWidth:1, borderLeftColor: '#eee', width:40,height:50}}>
              <Image 
                style={{width:35, height:35, marginTop:10,marginLeft:5 }} 
                source={require(assets+'icons/options.png')}  />
            </TouchableOpacity>
          </View>
          
          <View  style={styles.nav}>
            <TouchableOpacity 
              onPress={() => this.props.navigation.navigate('Home')}    
              style={styles.navGroup}
            >
              <Image style={styles.navImage} source={require(assets+'icons/home.png')}  />
              <Text style={styles.navText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity  
              onPress={() => this.props.navigation.navigate('Order')} 
              style={styles.navGroup}
            >
              <Image style={styles.navImage} source={require(assets+'icons/order-alt.png')}  />
              <Text style={[styles.navText, styles.textActive]}>Order</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('Notifications')} style={styles.navGroup}>
              <Image style={styles.navImage} source={require(assets+'icons/notifications.png')}  />
              <Text style={styles.navText}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('Account')} style={styles.navGroup}>
              <Image style={styles.navImage} source={require(assets+'icons/account.png')}  />
              <Text style={styles.navText}>Account</Text>
            </TouchableOpacity>
          </View>
        </View>
        );
      }else{
        return (
          <View style={styles.container}>     
          <ScrollView>
            <View style={styles.body}>
              <View style={{flex:1, alignItems:'center', paddingLeft:25, paddingRight:25}}>
                <Image style={{width:200, height:200}} source={require(assets+'images/hungry.png')} ></Image>
                <Text>Feel hungry?</Text>
                <Text>Please find a food to order.</Text>  
              </View>
            </View>
          </ScrollView>
  
          
          
          <View  style={styles.nav}>
            <TouchableOpacity 
              onPress={() => this.props.navigation.navigate('Home')}    
              style={styles.navGroup}
            >
              <Image style={styles.navImage} source={require(assets+'icons/home.png')}  />
              <Text style={styles.navText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity  
              onPress={() => this.props.navigation.navigate('Order')} 
              style={styles.navGroup}
            >
              <Image style={styles.navImage} source={require(assets+'icons/order-alt.png')}  />
              <Text style={[styles.navText, styles.textActive]}>Order</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('Notifications')} style={styles.navGroup}>
              <Image style={styles.navImage} source={require(assets+'icons/notifications.png')}  />
              <Text style={styles.navText}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('Account')} style={styles.navGroup}>
              <Image style={styles.navImage} source={require(assets+'icons/account.png')}  />
              <Text style={styles.navText}>Account</Text>
            </TouchableOpacity>
          </View>
        </View>
        );
      }
      
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
      new_Order: (id) => dispatch({'type':'NEW_ORDER', 'params':{'id_order':id}}),
      increase_Order: (orders, total) => dispatch({'type':'INCREASE_ORDER', 'params':{'orders':orders, 'total':total}}),
      decrease_Order: (orders, total) => dispatch({'type':'DECREASE_ORDER', 'params':{'orders':orders, 'total':total}}),
      change_Method: (method) => dispatch({'type':'CHANGE_METHOD', 'params':{'method':method}}),
      change_Take: (take) => dispatch({'type':'CHANGE_TAKE', 'params':{'take':take}}),
      get_Notes: (notes) => dispatch({'type':'GET_NOTES', 'params':{'notes':notes}}),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);