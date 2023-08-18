import React, { Component } from "react";
import { Text, View, Image,TouchableOpacity } from "react-native";
import Color from "../../Config/Color";
import style from "./style";
export default class index extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
      <View style={style.mainView}>
        <View style={style.imageView}>
          <Image
            source={this.props.Source}
            style={style.image}
          />
        </View>
        <View style={[style.viewText, this.props.viewText]}>
          <Text style={style.distanceText}>{this.props.Distance}</Text>
          <Text style={[style.typeText, this.props.typeText]}>
            {this.props.RideType}
          </Text>
        </View>
        <View style={[style.viewPriceText, this.props.viewPriceText]}>
          <Text style={[style.priceText,this.props.priceText]}>{this.props.Price}</Text>
          <Text style={[style.timeText, this.props.timeText]}>
            {this.props.Time}
          </Text>
        </View>
      </View>
      </TouchableOpacity>
    );
  }
}
