import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  FlatList,
  StatusBar
} from "react-native";
import container from "../../Styles/Container/style";
let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;
import Color from "../../Config/Color";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/AntDesign";
import IconText from "../../Component/Icon2Text/index";
import style from "./style";
export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
            id:'0',
            Source:require("../../Image/checked.png"),
            Title:"System",
            Address:"Your booking #1234 has been suc..",
        },
        {
          id:'01',
          Source:require("../../Image/checked.png"),
          Title:"System",
          Address:"Your booking #1234 has been suc..",
        },
        {
          id:'02',
          Source:require("../../Image/coupon.png"),
          Title:"System",
          Address:"Invite Friends- Get 2 Coupons each!",
        },
        {
          id:'03',
          Source:require("../../Image/coupon.png"),
          Title:"System",
          Address:"Invite Friends- Get 2 Coupons each!",
        },
        {
          id:'04',
          Source:require("../../Image/Close.png"),
          Title:"System",
          Address:"Your booking #45678 has been suc..",
        },
        {
          id:'05',
          Source:require("../../Image/checked.png"),
          Title:"System",
          Address:"Your booking  #21234 has been suc..",
      },
      ]
    };
  }
  _keyExtractor = (item, index) => item.id;
  _renderItem = ({ item }) => (
   
    <View style={{borderBottomWidth:0.3,borderBottomColor:Color.steel }}>
    <View style={{ margin: 15}}>
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate("HomeUp")}
    >
      <IconText
        Title={item.Title}
        titleText={{ color: Color.black, fontFamily: "uber-b" }}
        Address={item.Address}
        addressText={{ fontSize: 14 }}
        source={item.Source}
      />
    </TouchableOpacity>
    </View>
  </View>
   
  );
  render() {
    return (
      <View style={[container.container]}>
      <StatusBar
            barStyle="light-content"
          />
        <View style={{ flex: 1 }}>
          <View style={{ width: width, height: height / 3.7 }}>
            <ImageBackground
              source={require("../../Image/halfbg.png")}
              style={{ flex: 1 }}
            >
              <View
                style={{
                  marginHorizontal: 15,
                  marginTop: 45,
                  marginBottom: 40
                }}
              >
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Home")}
                >
                  <Icon
                    name="ios-arrow-back"
                    size={25}
                    style={[
                      {
                        alignSelf: "flex-start",
                        color: "#fff"
                        //marginTop:40
                      },
                      this.props.iconStyle
                    ]}
                  />
                </TouchableOpacity>
                <View style={{ flexDirection: "row", marginTop: 15 }}>
                  <View style={{ flex: 0.85, justifyContent: "center" }}>
                    <Text
                      style={{
                        fontSize: 28,
                        fontFamily: "uber-b",
                        color: Color.white,
                        marginVertical: 10
                      }}
                    >
                      Notification
                    </Text>
                  </View>
                  <View
                    style={{
                       flex: 0.15,
                      justifyContent: "center",
                      borderRadius: 110,
                      borderColor: Color.gray,
                      borderWidth: 2,
                      alignSelf: "flex-end",
                      backgroundColor: "rgba(96, 96, 96, 0.8)"
                    }}
                  >
                   <TouchableOpacity>
                      <Icon2
                        name="delete"
                        size={25}
                        style={[
                         style.icon2,
                          this.props.iconStyle
                        ]}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
          <FlatList
              data={this.state.data}
              horizontal={false}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
         
        </View>
      </View>
    );
  }
}
