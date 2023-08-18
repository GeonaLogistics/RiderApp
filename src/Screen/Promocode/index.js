import React, { Component } from "react";
import MapView from 'react-native-maps';
import styles from "./style";
import Color from "../../Config/Color";
import {
  View,
  StatusBar,
  Image,
  Text,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import container from "../../Styles/Container/style";
import Back from "../../Component/Back/index";
import Button from "../../Component/Button/index";
import RideType from "../../Component/RideType/index";
export default class index extends Component {
  render() {
    return (
      // Main View
      <View style={container.container}>
        <StatusBar barStyle="dark-content" />
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 23.032068,
            longitude: 72.525192,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
        
          <Back onPress={() => this.props.navigation.navigate("BookingReq")} />
          {/* sub view */}
          <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
        >
          {/* <View style={styles.container}> */}
            <View style={styles.subContainerView}>
              <Text style={styles.text}>PROMO CODE</Text>
              <View style={{ margin: 15 }}>
                <View style={styles.view}>
                  <View
                    style={{
                      flex: 0.2,
                      borderRightWidth: 0.5,
                      borderRightColor: Color.steel,
                      justifyContent: "center"
                    }}
                  >
                    <Image
                      style={styles.image}
                      source={require("../../Image/promoCode.png")}
                    />
                  </View>
                  <View style={{ flex: 0.8 }}>
                    <TextInput
                      placeholder="Promo code"
                      placeholderTextColor={Color.steel}
                      style={{ margin: 10, fontFamily: "uber", fontSize: 16 }}
                    />
                  </View>
                </View>
                <Button
                  Text="Apply"
                  onPress={() => this.props.navigation.navigate("BookingReq")}
                />
              </View>
            </View>
          {/* </View> */}
         </KeyboardAvoidingView>
      </View>
    );
  }
}
