import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Color from "../../Config/Color";
import style from "./style";
import Icon from "react-native-vector-icons/Ionicons";
export default class index extends Component {
  render() {
    return (
      <TouchableOpacity  onPress={this.props.onPress}>
      <View style={[style.mainView,this.props.mainView]}>
      
        <View style={[style.viewText, this.props.viewText]}>
          <Text style={[style.addressText, this.props.addressText]}>       
            {this.props.Title}
          </Text>
        </View>
        <View style={[style.viewTextIcon]}>
   
        <View style={[style.viewText, this.props.viewText2,{flex:0.95,justifyContent:'center'}]}>
          <Text style={[style.addressText, this.props.addressText,{color: Color.steel,alignSelf:'flex-end',marginRight:15}]}>
            {this.props.Text}
          </Text>
        </View>
        <View style={[style.imageView]}>
            <Icon
              name="ios-arrow-forward"
              size={25}
              style={[
                {
                  alignSelf: "flex-end",
                  color: Color.steel
                },
                this.props.iconStyle
              ]}
            />
        </View>
        </View>
      </View>
      </TouchableOpacity>
    );
  }
}
