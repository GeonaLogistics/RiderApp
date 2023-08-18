import React, { Component } from "react";
import { Text, View } from "react-native";

export default class index extends Component {
  render() {
    return (
      <View style={[this.props.viewStyle]}>
        <Text style={[{ fontSize: 16, color: "#000",marginVertical:10,fontFamily:'uber'},this.props.extraTextStyle]}>{this.props.Text}</Text>
      </View>
    );
  }
}
