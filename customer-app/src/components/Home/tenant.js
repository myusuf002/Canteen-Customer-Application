import React, {Component} from 'react';
import{connect} from 'react-redux';
import {Text, View, Image, Alert, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';
import server from '../../server';
import styles from './styles';
const assets = '../../assets/';

class TenantScreen extends Component {
  constructor(props){
    super()
    this.state = {
      tenant : props.navigation.getParam('tenant', {}),
      orders : props.orders,
      refreshing: false,
      listMenu: []
    }
    this._componentDidMount();
    this._calculateTotal = this._calculateTotal.bind(this)
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
 
  _componentDidMount(){
    return fetch(server.name+'/menu/order')
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
  
  _onRefresh = () => {
    this.setState({refreshing: true});
    this._componentDidMount().then(() => {
      this.setState({refreshing: false});
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
        <ScrollView horizontal>
            <View style={styles.headTitle}>
              <Text style={styles.canteenName}> {this.state.tenant.nama_tenant} </Text>
            </View>
          </ScrollView> 
        </View>
  
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Order')}  style={styles.headSide}>
          <Image style={styles.headImage} source={require(assets+'icons/cart.png')}  />
        </TouchableOpacity>
      </View>
      <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />}>
        <View  style={styles.body}>
        
          <View style={styles.detailGroup}>
              <View style={styles.detailProfile}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{flex:4}}>Name</Text>
                  <Text style={{flex:1}}>:</Text>
                  <Text style={{flex:8, color: 'black', fontSize:12}}> {this.state.tenant.nama_tenant} </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{flex:4}}>Phone</Text>
                  <Text style={{flex:1}}>:</Text>
                  <Text style={{flex:8, color: 'black', fontSize:12}}> {this.state.tenant.no_hp} </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{flex:4}}>Category</Text>
                  <Text style={{flex:1}}>:</Text>
                  <Text style={{flex:8, color: 'black', fontSize:12}}> {this.state.tenant.kategori_tenant} </Text>
                </View>                
              </View>
              <View style={styles.detailTenant}>
                <Text style={styles.tenantPlace}>Tenant</Text>
                <Text numberOfLines={1} style={styles.tenantNumber}> {this.state.tenant.no_tenant} </Text>
              </View>
          </View>

          {/* <View style={styles.head}>
            <View  style={styles.headMiddle}>
              <View style={styles.groupInput}>
                <Text>sorting</Text>
              </View>
            </View>
          </View>
          <Text> {this.state.search}</Text> */}
          <View style={{flex:1, alignItems:'center'}}>

          {this.state.listMenu.map((menu) =>  {
            if (menu.status_menu && (menu.id_tenant == this.state.tenant.id_tenant)) return(
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
    </View>
    );
  }
  }

function mapStateToProps(state){
  return {
    orders: state.orders
  }
};

function mapDispatchToProps(dispatch){
  return {
      increase_Order: (orders, total) => dispatch({'type':'INCREASE_ORDER', 'params':{'orders':orders, 'total':total}}),
      decrease_Order: (orders, total) => dispatch({'type':'DECREASE_ORDER', 'params':{'orders':orders, 'total':total}}),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TenantScreen);