import React, { Component } from "react";
import { Text, View, Dimensions, TouchableOpacity, Image, StatusBar } from "react-native";
import Color from "../../Config/Color";
import style from "./style";
import container from "../../Styles/Container/style";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2Text from "../../Component/Icon2Text/index";
import List from "../../Component/Text2Icon/index";
import AsyncStorage from '@react-native-async-storage/async-storage'
import TextIcon from '../../Component/TextIcon/index';
let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;



export default class index extends Component {



  constructor(props) {
    super(props)
    this.state = {
      amount: "",
      email: "",
      mobile: ""

    }
  }

  async componentDidMount() {



    this.getprices()

  }


  getprices = async () => {

    try {

      var emailadd = await AsyncStorage.getItem('@setuseremail')
      var umobile = await AsyncStorage.getItem('@setMobile')
      this.setState({ email: emailadd, mobile: umobile })

    }
    catch (error) {
      // Error saving data
      console.log("Error saving Data")
    }


    fetch('https://expressalllogistics.com/logistics/getwallet.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({



        cuser_mobile: umobile




      })
    }).then((response) => response.json())
      .then((responseJson) => {
        var code = responseJson.Tripcode;
        var amt = responseJson.amount;


        if (code == 1) {
          this.setState({ amount: amt })
        }
        else {
          alert("An Error Occured")
        }


      })
  }





  render() {

    function numFormatter(num) {
      if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
      } else if (num > 1000000) {
        return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
      } else if (num < 900) {
        return num; // if value < 1000, nothing to do
      }
    }

    return (
      <View style={{ flex: 1, backgroundColor: Color.whiteSmoke }}>
        <StatusBar
          barStyle="light-content"
        />
        <View style={{ backgroundColor: Color.black, height: height / 2.5 }}>
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
                  },
                  this.props.iconStyle
                ]}
              />
            </TouchableOpacity>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <View style={{ flex: 0.65, justifyContent: "center" }}>
                <Text
                  style={{
                    fontSize: 28,
                    fontFamily: "uber-b",
                    color: Color.white
                  }}
                >
                  My Wallet
                </Text>
              </View>
              <View
                style={{
                  flex: 0.35,
                  justifyContent: "center",
                  borderRadius: 30,
                  borderColor: Color.coal,
                  alignSelf: "flex-end",
                  backgroundColor: Color.coal
                }}
              >
                <View style={{ flexDirection: "row", margin: 10 }}>
                  <View
                    style={{
                      justifyContent: "center",
                      flex: 0.4,
                      alignItems: "center"
                    }}
                  >
                    <TouchableOpacity>
                      <Image
                        source={require("../../Image/naira.png")}
                        style={{ height: 22, width: 22 }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{ justifyContent: "center", flex: 0.6 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.white,
                        fontFamily: "uber-b"
                      }}
                    >
                      ₦ {numFormatter(this.state.amount)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginTop: height / 5.3, }}>
          {/* <List Title="Payment Methods" mainView={{ marginVertical: 10 }} viewText={{ flex: 0.6 }} onPress={() => this.props.navigation.navigate("Payment")} />*/}
          <List Title="Top up" Text="" onPress={() => this.props.navigation.navigate("WalletPayment")} />
          {/*<List Title="Integral Mall" Text="4500" />*/}
        </View>
        <View style={style.cardView}>
          <Icon2Text
            source={require("../../Image/cashDollor.png")}
            Title="Wallet"
            Address=""
            mainView={{ margin: 15 }}
            titleText={{ color: Color.black, fontSize: 16 }}
            addressText={{ color: Color.gray }}
            imageStyle={{ height: 55, width: 55 }}
            imageView={{ flex: 0.3 }}
          />

          <View style={{ flexDirection: "row", margin: 20 }}>
            <View style={{ flex: 0.7 }}>
              <Text
                style={{ color: Color.steel, fontSize: 12, fontFamily: "uber" }}
              >
                BALANCE
              </Text>
              <Text
                style={{
                  color: Color.pink,
                  fontSize: 24,
                  fontFamily: "uber-b"
                }}
              >
                ₦ {numFormatter(this.state.amount)}
              </Text>
            </View>
            <View style={{ flex: 0.3 }}>
              <Text
                style={{ color: Color.steel, fontSize: 12, fontFamily: "uber" }}
              >

              </Text>
              <Text
                style={{
                  color: Color.black,
                  fontSize: 20,
                  fontFamily: "uber-b"
                }}
              >

              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
