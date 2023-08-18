import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import Color from "../../Config/Color";
import style from "./style";
export default class index extends Component {
  render() {
    return (
      <View style={[style.mainView,this.props.mainView]}>
        <View style={[style.imageView,this.props.imageView]}>
          <Image source={this.props.source} style={[style.image,this.props.imageStyle]} />
        </View>
        <View style={[style.viewText, this.props.viewText]}>
          <Text style={[style.titleText,this.props.titleText]}>{this.props.Title}</Text>
          <Text style={[style.addressText,this.props.addressText]}>{this.props.Address}</Text>
        </View>
      </View>
    );
  }
}
