import React, {Component} from 'react';
import{connect} from 'react-redux';
import {Text, View, Image, TextInput, TouchableOpacity, ScrollView, RefreshControl, Alert} from 'react-native';
import moment from 'moment'
import styles from './styles';
import server from '../../server';
const assets = '../../assets/';

class HomeScreen extends Component {
    constructor(props){
      super()
      this.state = {
        id_customer: props.id_customer,
        search : "",
        listTenant: [],
        listNotifications: [],
        refreshing: false,
        clear : false
      }

      this._componentDidMount()
      this._componentDidMountNotifications()
      this._getKeyword = this._getKeyword.bind(this)
      this._searchKeyword = this._searchKeyword.bind(this)
    }

    _onPressRead(id) {
      
      fetch(server.name+'/notifications/read/'+id)
        .then((response) => response.json())
        .then((responseJson) => {
          this._componentDidMountNotifications()
        })
        .catch((error) =>{
          console.error(error);
          Alert.alert("Something wrong")
        });
      
    }
    _componentDidMountNotifications(){
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
    _getKeyword(keyword){
      this.setState({
        search: keyword
      })
    }
  
    _searchKeyword(){
      this.setState({
        clear:!this.state.clear,
      })
      this.props.navigation.navigate('Search', {search: this.state.search})
    }
  
    _componentDidMount(){
      return fetch(server.name+'/tenant')
        .then((response) => response.json())
        .then((responseJson) => {
  
          this.setState({
            isLoading: false,
            listTenant: responseJson.items,
          }, function(){
            // console.log(responseJson.items)
          });
  
        })
        .catch((error) =>{
          console.log(error);
          Alert.alert("Something wrong")
        });
    }

    render() {  
      this._componentDidMountNotifications()
      return (
        <View style={styles.container}>     
        <View style={styles.head}>
          <View  style={styles.headMiddle}>
            <View style={styles.groupInput}>
              <Image style={styles.iconInput} source={require(assets+'icons/search.png')}  />
              <TextInput 
                  style={styles.textInput}
                  placeholder={"Search"} 
                  value={!this.state.clear ? this.state.search : null}
                  onChangeText={this._getKeyword}
                  onSubmitEditing={this._searchKeyword}
              ></TextInput>
            </View>
          </View>
        </View>
        <ScrollView 
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />}
          >
          <View>
            {this.state.listNotifications.map((item, index) => 
              {if (item.status){
                return(
                  <TouchableOpacity 
                    key={item.id_notifikasi_customer} 
                    style={[styles.canteenGroup, {backgroundColor:'#f53b50'}]}  
                    onPress={() => this._onPressRead(item.id_notifikasi_customer)}>
                    <View style={styles.canteen}>
                      <View style={styles.canteenProfile}>
                        <Text style={[styles.canteenName,  {color:'#ffffff' }]}>{item.judul} </Text>
                        <Text style={{fontSize:10, color:"#ffffff" }}> {moment(item.tanggal_notifikasi).format("hh:mm DD/MM/YY")} </Text>
                      </View>
                    </View>      
                  </TouchableOpacity> 
                )
              }} 
            )}
          </View>
          <View style={styles.body}>
            <View style={{flex:1, alignItems:'center'}}>
              {this.state.listTenant.map((item) => 
                <TouchableOpacity 
                  key={item.id_tenant} 
                  style={styles.canteenGroup}  
                  onPress={() => this.props.navigation.navigate('Tenant', {tenant: item})
                }>
                  <View style={styles.canteen}>
                    <View style={styles.canteenImage}>
                        <Image style={{width: 98, height: 98, borderRadius:10}} source={{uri: item.foto_tenant }}></Image>
                    </View>
                    <View style={styles.canteenProfile}>
                      <Text style={styles.canteenName}> {item.nama_tenant} </Text>
                      <Text style={styles.canteenType}> {item.kategori_tenant} </Text>
                      <Text style={styles.canteenTeenant}>Tenant {item.no_tenant}</Text>
                    </View>
                  </View>      
                </TouchableOpacity>  
              )}
            </View>
          </View>
        </ScrollView>
  
        <View  style={styles.nav}>
          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Home')}    
            style={styles.navGroup}
          >
            <Image style={styles.navImage} source={require(assets+'icons/home-alt.png')}  />
            <Text style={[styles.navText, styles.textActive]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity  
            onPress={() => this.props.navigation.navigate('Order')} 
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
export default connect(mapStateToProps)(HomeScreen);