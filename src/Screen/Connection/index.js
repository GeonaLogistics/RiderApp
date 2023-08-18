import React, { Component } from "react";
import MapView from 'react-native-maps';
import styles from "./style";
import Color from "../../Config/Color";
import { View, StatusBar, Image, Text, TouchableOpacity } from "react-native";
import container from "../../Styles/Container/style";
import Back from "../../Component/Back/index";
import Button from "../../Component/Button/index";
import RideType from "../../Component/RideType/index";
export default class index extends Component {
  render() {

    return (
      <View style={styles.offlineContainer}>
        <Text style={styles.offlineText}>No Internet Connection</Text>
      </View>
    );
  }
}
