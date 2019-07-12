/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
} from 'react-native';
import './src/global/GlobalRegister';
import LoadingView from './src/component/LoadingView';
import AppNavigator from './src/pages/main/AppNavigator';

import {createStore, compose, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './src/redux/reducers';


const middleWares = [thunk];

const storeEnhancers = compose(
  applyMiddleware(...middleWares),
  (window && window.__REDUX_DEVTOOLS_EXTENSION__) ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f)=>f,
);


const store = createStore(reducers, {}, storeEnhancers);



class App extends Component{
  componentWillMount() {
    $ui.setRoot(this);
  }

  showLoading(){
    this.loadingView && this.loadingView.show();
  }

  closeLoading(){
    this.loadingView && this.loadingView.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={STYLE.BACKGROUND}>
          <StatusBar
            backgroundColor={COLOR.primaryDarkColor}/>
          <AppNavigator
            ref={(r)=>this.appNavigator = r}/>
          <LoadingView
            ref={r=>this.loadingView = r}
            onClose={()=>this.closeLoading()}/>
        </View>
      </Provider>
    );
  }
}


export default App;
