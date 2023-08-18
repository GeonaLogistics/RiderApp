import React, { Component } from "react";
import MapView from 'react-native-maps';
import styles from "./style";
import Color from "../../Config/Color";
import { View, StatusBar, Image, Text, TouchableOpacity } from "react-native";
import container from "../../Styles/Container/style";
import Back from "../../Component/Back/index";
import Button from "../../Component/Button/index";
import Modal from "react-native-modal";
import IconText from "../../Component/IconText/index";
export default class index extends Component {
  state = {
    isModalVisible: false
  };

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });
  _toggleModal2 = () =>
    this.props.navigation.navigate("Home", this._toggleModal);
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
        <Back onPress={() => this.props.navigation.navigate("HomeLetsGo")} />
        {/* sub view */}
        <View style={styles.container}>
          <View style={styles.subContainerView}>
            <View style={{ margin: 15 }}>
              {/* first row */}
              <View style={{ flexDirection: "row" }}>
                {/* profile pic */}
                <View style={{ flex: 0.2, alignItems: "center" }}>
                  <View style={styles.imageProfileView}>
                    <Image
                      source={require("../../Image/Pic.png")}
                      style={styles.imageProfile}
                    />
                  </View>
                </View>
                {/* profile name */}
                 {/* profile name */}
                 <View style={styles.textProfileView}>
                  <Text style={styles.textProfile}>Sam Lincan</Text>
                  <View style={{ flexDirection: "row", marginLeft: 10,flex:1}}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate("Rating")}
                    >
                      {/* <View style={{backgroundColor:'red' }}> */}
                        <Image
                          source={require("../../Image/star.png")}
                          style={[styles.imageProfile,{height:16,width:16}]}
                        />
                      {/* </View> */}
                    </TouchableOpacity>
                    <Text style={[styles.titleText, { marginHorizontal: 5,fontSize:14 }]}>
                      4.2
                    </Text>
                  </View>
                </View>
                {/* msg,call */}
                <View style={{ flex: 0.25, marginVertical: 10 }}>
                  <View
                    style={{
                      alignSelf: "flex-end",
                      flexDirection: "row",
                      marginHorizontal: 2
                    }}
                  >
                    <TouchableOpacity
                      style={{ marginRight: 20 }}
                      onPress={() => this.props.navigation.navigate("Chat")}
                    >
                      <View
                        style={{
                          height: 18,
                          width: 18,
                          justifyContent: "center"
                        }}
                      >
                        <Image
                          source={require("../../Image/msg.png")}
                          style={styles.imageProfile}
                        />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 10 }}>
                      <View
                        style={{
                          height: 20,
                          width: 20,
                          justifyContent: "center"
                        }}
                      >
                        <Image
                          source={require("../../Image/phone.png")}
                          style={styles.imageProfile}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* 2nd row */}
              <View style={{ marginVertical: 20 }}>
                <IconText
                  source={require("../../Image/picupicon.png")}
                  Address="Prahalad nagar. S.G.Highway"
                />
                <IconText
                  source={require("../../Image/destination-icon.png")}
                  Address="1003, Abhishree Adroit, India"
                />
              </View>
              {/* 3rd row */}
              <View style={styles.view}>
                <View style={styles.optionView}>
                  <Image
                    source={require("../../Image/sedan-car-model.png")}
                    style={styles.image}
                  />
                </View>
                <View style={styles.optionView}>
                  <Text style={styles.titleText}>DISTANCE</Text>
                  <Text style={styles.text}>0.5 km</Text>
                </View>
                <View style={styles.optionView}>
                  <Text style={styles.titleText}>TIME</Text>
                  <Text style={styles.text}>2 Min</Text>
                </View>
                <View style={styles.optionView}>
                  <Text style={styles.titleText}>PRICE</Text>
                  <Text style={styles.text}>$ 10.00</Text>
                </View>
              </View>
            </View>
            <Button
              Text="Cancel Request"
              onPress={()=>this.props.navigation.navigate("Home")}
              textStyle={{ fontFamily: "uber", fontSize: 16 }}
              viewStyle={{ marginBottom: 20 }}
            />
          
          </View>
        </View>
      </View>
    );
  }
}
