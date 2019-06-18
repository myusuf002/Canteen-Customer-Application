import React, {Component} from 'react';
import {createAppContainer, createStackNavigator, DrawerActions} from 'react-navigation'
import {fromLeft} from 'react-navigation-transitions'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

// PAGES
import LoginScreen from './src/components/Login/login'
import ForgetPasswordScreen from './src/components/Login/forgetPassword'
import RegistrationScreen from './src/components/Login/registration'
import RegistrationSSOScreen from './src/components/Login/registrationSSO'

import HomeScreen from './src/components/Home/home'
import TenantScreen from './src/components/Home/tenant'
import SearchScreen from './src/components/Home/search'

import OrderScreen from './src/components/Order/order'
import PaymentScreen from './src/components/Order/payment'

import NotificationsScreen from './src/components/Notifications/notifications'

import AccountScreen from './src/components/Account/account'
import ChangePasswordScreen from './src/components/Account/changePassword'
import HistoryOrdersScreen from './src/components/Account/historyOrders'
import HistoryPaymentsScreen from './src/components/Account/historyPayments'

// NAVIGATIONS
const RootStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    ForgetPassword: {
      screen: ForgetPasswordScreen,
    },
    Registration: {
        screen: RegistrationScreen,
      },
    RegistrationSSO: {
        screen: RegistrationSSOScreen,
      },
      Home: {
        screen: HomeScreen,
      },
      Tenant: {
        screen: TenantScreen,
      },
      Search: {
        screen: SearchScreen,
      },
      Order: {
        screen: OrderScreen,
      },
      Payment: {
        screen: PaymentScreen,
      },
      Notifications: {
        screen: NotificationsScreen,
      },
      Account: {
        screen: AccountScreen,
      },
      ChangePassword: {
        screen: ChangePasswordScreen,
      },
      HistoryOrders: {
        screen: HistoryOrdersScreen,
      },
      HistoryPayments: {
        screen: HistoryPaymentsScreen,
      },
  }, {
    initialRouteName: 'Login',
    headerMode: 'none',
    transitionConfig: () => fromLeft(),
  }
);



// REDUX
const initialState = {
  id_customer: 0,
  id_order: 0,
  username: null,
  notes: "nothing.",
  method: "Cash",
  total: 0,
  take: 0,
  orders: {"total_items":0},
}


const reducer = (state=initialState, action) =>{
    switch(action.type){
      case 'NEW_ORDER':
        return {
          id_customer: state.id_customer,
          id_order: action.params.id_order,
          username: state.username,
          notes: state.notes,
          method: state.method,
          orders: state.orders,
          total: state.total,
          take: state.take,
        }
      case 'INCREASE_ORDER':
        return {
          id_customer: state.id_customer,
          id_order: state.id_order,
          username: state.username,
          notes: state.notes,
          method: state.method,
          orders: action.params.orders,
          total: action.params.total,
          take: state.take,
        }
      case 'DECREASE_ORDER':
        return{
          id_customer: state.id_customer,
          id_order: state.id_order,
          username: state.username,
          notes: state.notes,
          method: state.method,
          orders: action.params.orders,
          total: action.params.total,
          take: state.take,
        }
      case 'GET_KEYWORD':
        return{search: action.params.keyword}
      case 'CHANGE_TAKE':
        return {
          id_customer: state.id_customer,
          id_order: state.id_order,
          username: state.username,
          notes: state.notes,
          method: state.method,
          orders: state.orders,
          total: state.total,
          take: action.params.take,
        }
      case 'CHANGE_METHOD':
        return {
          id_customer: state.id_customer,
          id_order: state.id_order,
          username: state.username,
          notes: state.notes,
          method: action.params.method,
          orders: state.orders,
          total: state.total,
          take: state.take,
        }
      case 'GET_NOTES':
        return {
          id_customer: state.id_customer,
          id_order: state.id_order,
          username: state.username,
          notes: action.params.notes,
          method: state.method,
          orders: state.orders,
          total: state.total,
          take: state.take,
        }
      case 'RESET_ORDER':
        return {
          id_customer: state.id_customer,
          id_order: 0,
          username: state.username,
          notes: "nothing.",
          method: "Cash",
          total: 0,
          take: 0,
          orders: {"total_items":0},
        }
      case 'LOGIN_ACCOUNT':
        return {
          id_customer: action.params.id,
          id_order: state.id_order,
          username: action.params.username,
          notes: "nothing.",
          method: "Cash",
          total: 0,
          take: 0,
          orders: {"total_items":0},
        }
      case 'LOGOUT_ACCOUNT':
        return {
          id_customer: 0,
          id_order: 0,
          username: null,
          notes: "nothing.",
          method: "Cash",
          total: 0,
          take: 0,
          orders: {"total_items":0},
        }
    }
    return state;
};

const store = createStore(reducer);

// MAIN
const AppContainer = createAppContainer(RootStack);
export default class App extends Component{
  render(){
    return(
      <Provider store={store}>
          <AppContainer />
      </Provider>
    );
  }
};