import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Color from "../../Config/Color";
import style from "./style";
import Icon from "react-native-vector-icons/Ionicons";
export default class index extends Component {
  render() {
    return (
      <View style={[style.mainView,this.props.mainView]}>
        <View style={[style.viewText, this.props.viewText]}>
          <Text style={[style.addressText, this.props.addressText]}>
            {this.props.Title}
          </Text>
        </View>
        <View style={style.imageView}>
          <TouchableOpacity>
            <Icon
              name="ios-arrow-forward"
              size={25}
              style={[
                {
                  alignSelf: "flex-start",
                  color: Color.steel
                },
                this.props.iconStyle
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
