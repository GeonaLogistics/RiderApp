import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Color from "../../Config/Color";
import Icon from "react-native-vector-icons/Ionicons";
export default class componentName extends Component {
  render() {
    return (
      <View style={[{ backgroundColor: "#000",},this.props.style]}>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 15,
            marginVertical: 40,
          }}
        >
            <TouchableOpacity
             onPress={this.props.onPress}
            >
              <Icon
                name="ios-arrow-back"
                size={25}
                style={[
                  {
                    alignSelf: "flex-start",
                    color: "#fff"
                  },
                  this.props.iconStyle
                ]}
              />
            </TouchableOpacity>
          <View style={{flex:1}}>
            <Text
              style={{ color: Color.white, fontFamily: "uber-b", fontSize: 15,alignSelf:'center'}}
            >
             {this.props.title}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
