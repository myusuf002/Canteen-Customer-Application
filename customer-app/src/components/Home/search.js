import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View, Image, TextInput, Alert, TouchableOpacity, ScrollView} from 'react-native';
import server from '../../server';
import styles from './styles';
const assets = '../../assets/';

class SearchScreen extends Component {
  constructor(props){
    super()
    this.state = {
      search: props.navigation.getParam("search", ""),
      orders: props.orders,      
      refreshing: false,
      listMenu: []
    }
    this._componentDidMount();
    this._getKeyword = this._getKeyword.bind(this)
    this._calculateTotal = this._calculateTotal.bind(this)
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

  _getKeyword(keyword){
    this.setState({
      search: keyword
    })
  }

    render() {  

      let filteringMenu = this.state.listMenu.filter(
        (menu) => {
          return menu.nama_menu.toLowerCase().indexOf(
            this.state.search.toLowerCase()) !== -1;
        }
      );
      return (
        <View style={styles.container}>     
        <View style={styles.head}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.headSide}>
            <Image style={styles.headImage} source={require(assets+'icons/back.png')}  />
          </TouchableOpacity>
          <View  style={styles.headMiddle}>
            <View style={styles.groupInput}>
              <Image style={styles.iconInput} source={require(assets+'icons/search.png')}  />
              <TextInput 
                  style={styles.textInput}
                  placeholder={"Search"} 
                  value={this.state.search}
                  onChangeText={this._getKeyword}
              ></TextInput>
            </View>
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Order')}  style={styles.headSide}>
            <Image style={styles.headImage} source={require(assets+'icons/cart.png')}  />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.body}>

            <View style={{flex:1, alignItems:'center'}}>

            {filteringMenu.map((menu) =>  {
            if (menu.status_menu) return(
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
      get_Keyword: (keyword) => dispatch({'type':'GET_KEYWORD', 'params':{'keyword':keyword}}),
      increase_Order: (orders, total) => dispatch({'type':'INCREASE_ORDER', 'params':{'orders':orders, 'total':total}}),
      decrease_Order: (orders, total) => dispatch({'type':'DECREASE_ORDER', 'params':{'orders':orders, 'total':total}}),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);