import React, {Component} from 'react';
import{connect} from 'react-redux';
import {Text, View, Image, Alert, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';
import moment from 'moment'
import server from '../../server';
import styles from './styles';
const assets = '../../assets/';

class NotificationsScreen extends Component {
    constructor(props){
      super()
      this.state = {
        id_customer: props.id_customer,
        listNotifications: [],
        refreshing: false,
      }
      
      this._componentDidMount();
    }

    
    _onPressRead(id) {
      
      fetch(server.name+'/notifications/read/'+id)
        .then((response) => response.json())
        .then((responseJson) => {
          this._componentDidMount()
        })
        .catch((error) =>{
          console.error(error);
          Alert.alert("Something wrong")
        });
      
    }
    _componentDidMount(){
      return fetch(server.name+'/notifications/get/'+this.state.id_customer)
        .then((response) => response.json())
        .then((responseJson) => {
  
          this.setState({
            isLoading: false,
            listNotifications: responseJson.items,
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
      let total = 0
      {this.state.listNotifications.map((item) => 
          {if(item.status)total += 1}
      )}
      // Alert.alert(this.state.status +" "+this.props.navigation.getParam("status", 0))
      console.log("Notifications")
      console.log(this.state.orders)
      
      return (
        <View style={styles.container}>     
        <View style={styles.head}>
        <TouchableOpacity style={styles.headSide}>
          <Text style={{color:'#f53b50', fontSize:20, fontWeight: 'bold' }}>{total? total: "Cc"}</Text>
        </TouchableOpacity>
        <View  style={styles.headMiddle}>
        <ScrollView horizontal>
            <View style={styles.headTitle}>
              <Text style={styles.canteenName}> Notifications </Text>
            </View>
          </ScrollView> 
        </View>
  
        {/* <TouchableOpacity onPress={() => this._onPressDelete()}  style={styles.headSide}>
          <Image style={styles.headImage} source={require(assets+'icons/trash.png')}  />
        </TouchableOpacity> */}
      </View>
        <ScrollView  refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />}>
          <View style={styles.body}>
            <View style={{flex:1, alignItems:'center'}}>
              {this.state.listNotifications.map((item) => 
                <TouchableOpacity 
                  key={item.id_notifikasi_customer} 
                  style={[styles.canteenGroup, item.status ? {backgroundColor:'#f53b50' } : {}]}  
                  onPress={() => this._onPressRead(item.id_notifikasi_customer)}>
                  <View style={styles.canteen}>
                    <View style={styles.canteenProfile}>
                      <Text style={[styles.canteenName, item.status ? {color:'#ffffff' } : {color:'#f53b50'} ]}>{item.judul} </Text>
                      <Text style={{fontSize:10, color:'black'}}>   {moment(item.tanggal_notifikasi).format("hh:mm DD/MM/YY")} </Text>
                      <Text style={[styles.canteenType,  item.status ? {color:'#ffffff' } : {}]}> {item.pesan} </Text>
                    </View>
                  </View>      
                </TouchableOpacity>  
              )}
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
            <Image style={styles.navImage} source={require(assets+'icons/notifications-alt.png')}  />
            <Text style={[styles.navText, styles.textActive]}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => this.props.navigation.navigate('Account', this.state)} style={styles.navGroup}>
            <Image style={styles.navImage} source={require(assets+'icons/account.png')}  />
            <Text style={styles.navText}>Account</Text>
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


export default connect(mapStateToProps)(NotificationsScreen);