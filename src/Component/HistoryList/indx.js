import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import Color from "../../Config/Color";
import style from "./style";
import Icon from "react-native-vector-icons/AntDesign";
export default class index extends Component {
  render() {
    return (
      <View
        style={
          {
            // backgroundColor: Color.white
            // margin:10
          }
        }
      >
        <View style={style.mainView}>
          <View style={style.imageView}>
            <Image
              source={require("../../Image/picupicon.png")}
              style={style.image}
            />
          </View>
          <View style={[style.viewText, this.props.viewText]}>
            <Text style={[style.addressText, this.props.addressText]}>
              {this.props.pickupAddress}
            </Text>
          </View>
        </View>
        <View style={[style.mainView]}>
          <View style={style.imageView}>
            <Image
              source={require("../../Image/destination-icon.png")}
              style={style.image}
            />
          </View>
          <View style={[style.viewText, this.props.viewText]}>
            <Text style={[style.addressText, this.props.addressText]}>
              {this.props.destinationAddress}
            </Text>
          </View>
        </View>
        <View
          style={[
            style.mainView,
            {
              borderBottomColor: Color.whiteSmoke,
              borderBottomWidth: 0.5,
              borderTopColor: Color.whiteSmoke,
              borderTopWidth: 0.5,
              marginHorizontal: 0,
              paddingVertical: 10
            }
          ]}
        >
          <View style={[style.imageView]}>
            <Image
              source={require("../../Image/badge.png")}
              style={style.image}
            />
          </View>

          <View
            style={[
              style.viewText,
              this.props.viewText,
              { flexDirection: "row" }
            ]}
          >
            <View style={{ flexDirection: "row", flex: 0.45 }}>
              <Text
                style={[
                  style.addressText,
                  this.props.addressText,
                  { fontSize: 18, fontFamily: "uber-b" }
                ]}
              >
                ₦
              </Text>
              <Text
                style={[
                  style.addressText,
                  this.props.priceText,
                  { fontSize: 18, fontFamily: "uber-b" }
                ]}
              >
                {this.props.price}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                flex: 0.5,
                justifyContent: "flex-end"
              }}
            >
              <TouchableOpacity onPress={this.props.onPress}>
                <Text style={[style.addressText, this.props.statusText]}>
                  {this.props.status}
                </Text>
              </TouchableOpacity>
              <View style={style.imageView}>
                {/* <Image source={require('../../Image/picupicon.png')} style={style.image} /> */}
                <TouchableOpacity>
                  <Icon
                    name="right"
                    size={20}
                    style={[
                      {
                        alignSelf: "flex-start",
                        color: Color.steel
                        //marginTop:40
                      },
                      this.props.iconStyle
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
