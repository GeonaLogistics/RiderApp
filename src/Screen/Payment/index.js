import React, { Component } from "react";
import { Text, View, Dimensions, TouchableOpacity, StatusBar } from "react-native";
import Color from "../../Config/Color";
import style from "./style";
import container from "../../Styles/Container/style";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2Text from "../../Component/Icon2Text/index";
import List from "../../Component/Text2Icon/index";
import ButtonList from "../../Component/ButtonList/index";
import TextIcon from "../../Component/TextIcon/index";
let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;
export default class index extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Color.whiteSmoke }}>
        <StatusBar
            barStyle="light-content"
          />
        <View style={{ backgroundColor: Color.black, height: height / 3.5 }}>
          <View
            style={{
              marginHorizontal: 15,
              marginTop: 45,
              marginBottom: 40
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 0.5 }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("MyWallet")}
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
              </View>
              <View style={{ flex: 0.5,justifyContent:'center' }}>
              <TouchableOpacity  onPress={() => this.props.navigation.navigate("MyWallet")}>
                <Text
                  style={{
                    alignSelf: "flex-end",
                    color: Color.white,
                    fontSize: 16,
                    fontFamily:'uber'
                  }}
                >
                  Done
                </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginTop: 15 }}>
              <View style={{ justifyContent: "center" }}>
                <Text
                  style={{
                    fontSize: 28,
                    fontFamily: "uber-b",
                    color: Color.white
                  }}
                >
                  Payment Method
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ justifyContent: "flex-end", flex: 1, margin: 15 }}>
          <ButtonList
            source1={require("../../Image/plus.png")}
            Text="Add New Method"
            textStyle={{ color: Color.white }}
            viewStyle={{ backgroundColor: Color.black }}
            Image={{height:30,marginHorizontal:15,alignSelf:'center'}}
          />
        </View>
        <View style={style.cardView}>
          <Icon2Text
            source={require("../../Image/cashDollor.png")}
            Title="Cash"
            Address="Default Payment Method"
            mainView={{ margin: 15 }}
            titleText={{ color: Color.black, fontSize: 16 }}
            addressText={{ color: Color.gray }}
            imageStyle={{ height: 55, width: 55 }}
            imageView={{ flex: 0.3 }}
          />
        </View>
        <View style={[style.cardView, { marginTop: height / 2.55 }]}>
          <View style={{ margin: 15 }}>
            <Text
              style={{ fontSize: 16, fontFamily: "uber-b", color: Color.black }}
            >
              CREDIT CARD
            </Text>
            <ButtonList
              source1={require("../../Image/visa.png")}
              Text="**** **** ****  4567"
            />
            <ButtonList
              source1={require("../../Image/paypal.png")}
              Text="abcd.hijk@xyz.com"
              source2={require("../../Image/check-mark.png")}
            />
            <ButtonList
              source1={require("../../Image/mastercard.png")}
              Text="**** **** ****  1234"
            />
          </View>
        </View>
      </View>
    );
  }
}
