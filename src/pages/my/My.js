/**
 * Created by Ming on 2018/9/17.
 */

import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image
} from 'react-native';
import HeaderView from '../../component/HeaderView';
import ImagePicker from "react-native-image-picker";

export default class My extends Component {
  constructor(props){
    super(props);
    this.state = {
      avatar: ''
    }
  }

  /**
   * getSmallDP(0.1)  设置分隔线高度
   * 选择头像
   */
  toSelectAvatar(){
    const options = {
      quality: 1.0,
      title:'选择图片',
      maxWidth:150,
      maxHeight:150,
      takePhotoButtonTitle:'相机',
      chooseFromLibraryButtonTitle:'图库',
      cancelButtonTitle:'取消',
      storageOptions: {
        skipBackup: true
      },
      mediaType: 'photo', // 'photo' or 'video'
      videoQuality: 'medium', // 'low', 'medium', or 'high'
      allowsEditing: true, // 当用户选择过照片之后是否允许再次编辑图片
      permissionDenied:{
        title:'申请权限失败',
        text:'是否进入应用设置开启相机与存储权限?',
        reTryTitle:'去设置',
        okTitle:'取消'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {}
      else if (response.error) {
        console.log(response.error);
      }
      else if (response.customButton) {}
      else {
        let avatarUri = response.uri;
        console.log(avatarUri);
        this.setState({avatar: avatarUri})
      }
    });
  }

  render() {
    return (
      <SafeAreaView style={STYLE.ROOT}>
        <HeaderView
          headerTitle={'我的'}/>
        <View style={STYLE.BACKGROUND}>
          <TouchableOpacity
            onPress={()=>this.toSelectAvatar()}
            style={styles.avatarItem}>
            <Image
              source={this.state.avatar ? {uri: this.state.avatar} : {uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537179395137&di=6a715a239b96b7b5c40a9d30dc7deaeb&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2017-4%2F2017040711143593384.jpg'}}
              style={styles.avatar}/>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  avatarItem:{
    alignSelf: 'center',
  },
  avatar:{
    width: 64,
    height: 64,
    borderRadius: 32
  },

});