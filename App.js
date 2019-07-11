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
      <View style={STYLE.BACKGROUND}>
        <StatusBar
          backgroundColor={COLOR.primaryDarkColor}/>
        <AppNavigator
          ref={(r)=>this.appNavigator = r}/>
        <LoadingView
          ref={r=>this.loadingView = r}
          onClose={()=>this.closeLoading()}/>
      </View>
    );
  }
}


export default App;
