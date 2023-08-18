import React, { Component } from "react";
import MapView from 'react-native-maps';
import styles from "./style";
import Color from "../../Config/Color";
import {
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { Drawer } from "native-base";
import SideBar from "../../Screen/SideMenu/index";
let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;
import IconText from "../../Component/IconTextInput/index";
import NearBy from "../../Component/IconText/index";
import container from "../../Styles/Container/style";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class index extends Component {
  render() {
    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={<SideBar navigation={this.props.navigation} />}
        onClose={() => this.drawer._root.close()}
      >
        <View style={container.container}>
          <StatusBar barStyle="dark-content" />
          <Back onPress={() => this.props.navigation.navigate("PickUp")} />
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 23.032068,
              longitude: 72.525192,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          />

          <View
            style={{
              marginTop: 40,
              position: "absolute",
              flex: 1,
              marginLeft: 15,
              ...Platform.select({
                ios: {
                  zIndex: 9
                }
              })
            }}
          >
            <TouchableOpacity
              style={{
                position: "absolute",
              }}
              //onPress={()=>this.props.navigation.openDrawer()}
              onPress={() => this.drawer._root.open()}
            >
              <Image
                source={require("../../Image/menu.png")}
                style={{
                  width: 55,
                  height: 55
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <View style={styles.subContainerView}>
              <View style={{ margin: 15 }}>
                <IconText
                  Title="PICKUP"
                  textInputText="My current location"
                  source={require("../../Image/picupicon.png")}
                  viewText={{
                    borderBottom: Color.frost,
                    borderBottomWidth: 0.3
                  }}
                  addressText={{ marginBottom: 10 }}
                />

                <IconText
                  Title="DESTINATION"
                  textInputText="1003, Abhishree Adroit, India"
                  source={require("../../Image/destination-icon.png")}
                  source2={require("../../Image/cancel-icon.png")}
                />
              </View>
              <View
                style={{
                  shadowOffset: { width: 10, height: 10 },
                  shadowColor: Color.gray,
                  // shadowOpacity: 0.3,
                  elevation: 1,
                  borderTopColor: Color.steel,
                  borderTopWidth: 0.3
                }}
              >
                <View style={{ margin: 15 }}>
                  <Text style={{ color: Color.steel, fontSize: 14 }}>
                    NEARBY LOCATIONS
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("HomeLetsGo")}
                  >
                    <NearBy
                      Address="Mansi Circle,Vastrapur"
                      source={require("../../Image/destination-icon.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("HomeLetsGo")}
                  >
                    <NearBy
                      Address="Premvat Food Park"
                      source={require("../../Image/destination-icon.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("HomeLetsGo")}
                  >
                    <NearBy
                      Address="Vastrapur Park"
                      source={require("../../Image/destination-icon.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("HomeLetsGo")}
                  >
                    <NearBy
                      Address="Vastrapur Lack"
                      source={require("../../Image/destination-icon.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("HomeLetsGo")}
                  >
                    <NearBy
                      Address="Punjab Parotha House"
                      source={require("../../Image/destination-icon.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Drawer>
    );
  }
}
Drawer.defaultProps.styles.mainOverlay.elevation = 0;
