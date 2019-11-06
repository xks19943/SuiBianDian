/**
 * Created by Ming on 2019/7/11.
 */

import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView
} from 'react-native';

import HeaderView from '../../component/HeaderView';

export default class Classify extends Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <SafeAreaView style={STYLE.ROOT}>
        <HeaderView
          headerTitle={'分类'}/>
        <View style={STYLE.BACKGROUND}>

        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  }
});