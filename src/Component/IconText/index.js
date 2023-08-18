import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import Color from "../../Config/Color";
import style from "./style";
export default class index extends Component {
  render() {
    return (
      <View style={style.mainView}>
        <View style={style.imageView}>
          <Image source={this.props.source} style={style.image} />
        </View>
        <View style={[style.viewText, this.props.viewText]}>
          <Text style={[style.addressText,this.props.addressText]}>{this.props.Address}</Text>
        </View>
      </View>
    );
  }
}
