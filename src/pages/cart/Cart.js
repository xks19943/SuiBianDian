/**
 * Created by Ming on 2019/7/11.
 */

import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default class Cart extends Component {
  render() {
    return (
      <View style={STYLE.BACKGROUND}>
        <Text>Cart</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  }
});