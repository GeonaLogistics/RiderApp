import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StatusBar
} from "react-native";
import styles from "./style";
import Texts from "../../Component/Text/index";
import Color from "../../Config/Color";
import AsyncStorage from '@react-native-async-storage/async-storage'

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

var mobile = ""

export default class index extends Component {

  constructor(props) {
    super(props);
    this.state = {


      firstname: "",
      lastname: ""
    };
  }

  ratingCompleted(rating) {
    console.log(rating);
  }






  render() {
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        {/* <StatusBar barStyle="light-content" /> */}
        <ScrollView>
          <View style={{ flex: 1 }}>
            {/* <ImageBackground
              source={require("../../Image/D_Rectangle.png")}
              style={{ height: height / 3.7 }}
            > */}
            <View
              style={{
                backgroundColor: Color.black
                // borderBottomLeftRadius: 50,
                // borderBottomRightRadius: 100
              }}
            >
              <View
                style={[
                  {
                    //justifyContent:"center",
                    alignSelf: "center",
                    flex: 1,
                    // marginRight:30,
                    marginTop: 35,
                    marginBottom: 30
                  }
                ]}
              >
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("MyAccount")}
                >
                  <View
                    style={{
                      alignSelf: "center",
                      marginBottom: 0,
                      width: 90,
                      height: 90,
                      borderRadius: 45,
                      borderColor: Color.white,
                      borderWidth: 1.5,
                      backgroundColor: Color.white,
                      justifyContent: "center"
                    }}
                  >
                    <Image
                      source={require("../../Image/pics.png")}
                      style={[
                        {
                          width: 88,
                          height: 88,
                          alignSelf: "center",
                          //padding: 2,
                          resizeMode: "contain",

                        }
                      ]}
                    />
                  </View>
                </TouchableOpacity>
                <View style={{ alignSelf: "center" }}>
                  <Text
                    style={[
                      {
                        color: "#fff",
                        fontSize: 18,
                        textAlign: "center",
                        fontFamily: "uber",
                        marginTop: 20
                      }
                    ]}
                  >


                  </Text>
                </View>
              </View>
            </View>
            {/* </ImageBackground> */}
            <View
              style={{
                marginHorizontal: 15,
                marginTop: 10,
                backgroundColor: "#fff"
              }}
            >
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Home")}
              >
                <View style={styles.rowView}>
                  <View style={styles.imageView}>
                    <Image
                      source={require("../../Image/home.png")}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textView}>
                    <Texts Text="Home" extraTextStyle={styles.TitleText} />
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Recipient")}
              >
                <View style={styles.rowView}>
                  <View style={styles.imageView}>
                    <Image
                      source={require("../../Image/home.png")}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textView}>
                    <Texts Text="Shop Groceries" extraTextStyle={styles.TitleText} />
                  </View>
                </View>
              </TouchableOpacity>



              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("MyWallet")}
              >
                <View style={styles.rowView}>
                  <View style={styles.imageView}>
                    <Image
                      source={require("../../Image/MyWallet.png")}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textView}>
                    <Texts Text="My Wallet" extraTextStyle={styles.TitleText} />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("History")}
              >
                <View style={styles.rowView}>
                  <View style={styles.imageView}>
                    <Image
                      source={require("../../Image/history.png")}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textView}>
                    <Texts Text="Ride History" extraTextStyle={styles.TitleText} />
                  </View>
                </View>
              </TouchableOpacity>
              {/*
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Notification")}
              >
                <View style={styles.rowView}>
                  <View style={styles.imageView}>
                    <Image
                      source={require("../../Image/notification.png")}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textView}>
                    <Texts
                      Text="Notification"
                      extraTextStyle={styles.TitleText}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Unassigned")}
              >
                <View style={styles.rowView}>
                  <View style={styles.imageView}>
                    <Image
                      source={require("../../Image/inviteFriends.png")}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textView}>
                    <Texts
                      Text="Unassigned Orders"
                      extraTextStyle={styles.TitleText}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              */}
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Settings")}
              >
                <View style={styles.rowView}>
                  <View style={styles.imageView}>
                    <Image
                      source={require("../../Image/settings.png")}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textView}>
                    <Texts Text="Settings" extraTextStyle={styles.TitleText} />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("SignIn")}
              >
                <View style={styles.rowView}>
                  <View style={styles.imageView}>
                    <Image
                      source={require("../../Image/logout.png")}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textView}>
                    <Texts Text="Logout" extraTextStyle={styles.TitleText} />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
