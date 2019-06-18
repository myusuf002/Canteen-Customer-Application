import React, {Component} from 'react';
import{connect} from 'react-redux';
import {Text, View, Image, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';
import moment from 'moment'
import server from '../../server';
import styles from './styles';
const assets = '../../assets/';

class HistoryScreen extends Component {
  constructor(props){
    super()  

    this.state = {
        id_akun_customer: props.id_customer,
        listOrders: [],
        isLoading: false,
    }
    this._componentDidMountOrder()
  }

  _componentDidMountOrder(){
    return fetch(server.name+'/orders/get/'+this.state.id_akun_customer)
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

  _onRefresh = () => {
    this.setState({refreshing: true});
    this._componentDidMountOrder().then(() => {
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
            <View style={styles.headTitle}>
                <Text style={styles.canteenName}> Orders History </Text>
            </View>
        </View>
      </View>
      <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />}>
        <View  style={styles.body}>
          <View style={[styles.detailGroup, {borderBottomWidth:0}]}>
              <View style={styles.detailProfile}>
                <View style={{flex:1, paddingTop:10, paddingBottom:5, marginLeft:5, marginRight:5}}>
                  {this.state.listOrders.map((order) => {
                      return(<TouchableOpacity 
                          key={order.id_order} 
                          style={[styles.canteenGroup]}  
                         >
                          <View style={styles.canteen}>
                            <View style={styles.canteenProfile}>
                              <Text style={[styles.canteenName, {color:'#f53b50'} ]}>{moment(order.waktu_order).format("hh:mm:ss DD/MM/YY")} </Text>
                              <View style={{flexDirection: 'row'}}>
                                <Text style={[styles.canteenType, {flex:1}]}>id</Text>
                                <Text style={[styles.canteenType, {flex:5}]}>  : {order.id_order}</Text>
                              </View>
                              <View style={{flexDirection: 'row'}}>
                                <Text style={[styles.canteenType, {flex:1}]}>take</Text>
                                <Text style={[styles.canteenType, {flex:5}]}>  : {moment(order.waktu_pengambilan).format(" hh:mm DD/MM/YY")}</Text>
                              </View>
                              <View style={{flexDirection: 'row'}}>
                                <Text style={[styles.canteenType, {flex:1}]}>notes</Text>
                                <Text style={[styles.canteenType, {flex:5}]}>  : {order.catatan}</Text>
                              </View>
                              <View style={{flexDirection: 'row'}}>
                                <Text style={[styles.canteenType, {flex:1}]}>status</Text>
                                <Text style={[styles.canteenType, {flex:5}]}>  : {order.status_order}</Text>
                              </View>
                            </View>
                          </View>      
                        </TouchableOpacity>  
                      )
                    })} 
                </View>
              </View>
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
  }
};


export default connect(mapStateToProps)(HistoryScreen);