import React, { Component } from "react";
import { Text, View, Image,TouchableOpacity } from "react-native";
import Button from '../../Component/Button/index';
import Color from '../../Config/Color'
import style from './style'
import container from '../../Styles/Container/style'
export default class index extends Component {
  render() {
    return (
      <View style={container.container}>
        <Image
          source={require("../../Image/welcome.png")}
          style={style.image}
        />
        <View style={style.viewStyle}>
          <Text
            style={style.titleText}
          >
            Hi, nice to meet you!
          </Text>
          <Text style={style.subTitleText}>Choose your location to start find restaurants around you.</Text>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignUp')}>
        <Button Text="Use current location"
          textStyle={{color:Color.green,fontSize:18}}
          viewStyle={{backgroundColor:Color.white,borderColor:Color.green,borderWidth:2,margin:25}}
        />
        </TouchableOpacity>
        <TouchableOpacity>
        <Text style={style.linkText}>Select it manually</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}
