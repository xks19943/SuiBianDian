/**
 * Created by xiaoming on 2017/6/8.
*/
import React,{Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default class NavButton extends Component{
    render(){
        if(this.props.data.type == 'text'){
            return(
                <TouchableOpacity
                  style={{height: 44,justifyContent: 'center',alignItems: 'center',paddingHorizontal:15}}
                  onPress={this.props.data.onPress}>
                  <Text style={[{fontSize: FONTSIZE.normal,color: COLOR.whiteColor},
                  this.props.data.style]}>
                    {this.props.data.text ? this.props.data.text : '标题'}
                    </Text>
                </TouchableOpacity>
            )
        }else if(this.props.data.type == 'image'){
            return(
                <TouchableOpacity
                  onPress={this.props.data.onPress}
                  style={{height:44,justifyContent: 'center',alignItems:'center',paddingHorizontal:15}}>
                  <Image
                    source={this.props.data.uri}
                    style={[{width: 9,height:14,resizeMode:'contain'},this.props.data.style]}/>
                </TouchableOpacity>
            )
        } if(this.props.data.type == 'icon'){
            return(
                <TouchableOpacity
                  style={{height: 44,justifyContent: 'center',alignItems: 'center',paddingHorizontal:15}}
                  onPress={this.props.data.onPress}>
                  <Icon
                    name={this.props.data.name ? this.props.data.name : 'arrow-back' }
                    color={COLOR.whiteColor}
                    style={[{fontSize: 24},this.props.data.style]}/>
                </TouchableOpacity>
            )
        }

    }
}
