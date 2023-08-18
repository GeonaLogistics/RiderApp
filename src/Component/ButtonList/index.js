import React, { Component } from "react";
import Styles from "./style";
import { Text, View, TouchableOpacity, Image } from "react-native";

export default class index extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={[Styles.viewStyle, this.props.viewStyle]}>
          <View style={{ flex: 0.2, justifyContent: "center" }}>
            <Image
              source={this.props.source1}
              style={[{ height:22, width: 30,alignSelf:'center', },this.props.Image]}
            />
          </View>
          <View style={{ flex: 0.6 }}>
            <Text style={[Styles.textStyle, this.props.textStyle]}>
              {this.props.Text}
            </Text>
          </View>
          <View style={{ flex: 0.2, justifyContent: "center" }}>
            <Image
              source={this.props.source2}
              style={{ height: 22, width: 22,alignSelf:'center', }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
