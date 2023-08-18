import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, Platform } from "react-native";
import styles from "./style";
export default class index extends Component {
  render() {
    return (
      <View
        style={[
          styles.container,
          {
            ...Platform.select({
              ios: {
                zIndex: 9
              }
            })
          }
        ]}
      >
        <View style={styles.imageView}>
          <TouchableOpacity onPress={this.props.onPress}>
            <Image
              source={require("../../Image/back.png")}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
