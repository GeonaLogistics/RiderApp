import React, { Component } from "react";
import { Text, View, Dimensions, TouchableOpacity, StatusBar, TextInput, StyleSheet, Button, Alert } from "react-native";
import Color from "../../Config/Color";
import style from "./style";
import container from "../../Styles/Container/style";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2Text from "../../Component/Icon2Text/index";
import List from "../../Component/Text2Icon/index";
import ButtonList from "../../Component/ButtonList/index";
import TextIcon from "../../Component/TextIcon/index";
import PaystackWebView from "react-native-paystack-webview";
import AsyncStorage from '@react-native-async-storage/async-storage'



let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;
export default class index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      amount: "",
      email: "",
      mobile: "",
      push: false,


    }
  }

  async componentDidMount() {

    try {

      var emailadd = await AsyncStorage.getItem('@setuseremail')
      var umobile = await AsyncStorage.getItem('@setMobile')
      this.setState({ email: emailadd, mobile: umobile })

    }
    catch (error) {
      // Error saving data
      console.log("Error saving Data")
    }
  }



  topUp = () => {

    if (this.state.amount === "") {
      alert("Please enter an amount")
    }
    else {
      this.setState({ push: true })

      alert("Thank you")
    }

  }





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
              <View style={{ flex: 0.5, justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("MyWallet")}>
                  <Text
                    style={{
                      alignSelf: "flex-end",
                      color: Color.white,
                      fontSize: 16,
                      fontFamily: 'uber'
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
                  Top Up Wallet
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
            Image={{ height: 30, marginHorizontal: 15, alignSelf: 'center' }}
          />
        </View>
        <View style={style.cardView}>
          <Icon2Text
            source={require("../../Image/cashDollor.png")}
            Title="Credit Wallet "
            Address=""
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
              Add Cash to Wallet
            </Text>

            <TextInput label="Amount" style={styles.textinput} placeholder="Amount" underlineColorAndroid={'transparent'} onChangeText={(val) => this.setState({ amount: val })} />

            <TextInput label="Email Address" style={styles.textinput} value={this.state.email} underlineColorAndroid={'transparent'} onChangeText={(val) => this.setState({ email: val })} />

            <TextInput keyboardType="numeric" label="Enter Phone No" style={styles.textinput} value={this.state.mobile} underlineColorAndroid={'transparent'} onChangeText={(val) => this.setState({ mobile: val })} />
            {/*
            <Button
              Text="Top Up"
              title="Top Up"
              viewStyle={{
                backgroundColor: Color.black,
                color: '#ffffff',
                borderRadius: 0,
                borderColor: Color.white,
                marginTop: 10,
                marginBottom: 0,
                marginHorizontal: 0
              }}
              textStyle={{ color: Color.black }}
              onPress={() => this.topUp()}

            />

*/}



            <PaystackWebView
              buttonText="Pay Now"
              showPayButton={true}
              paystackKey="pk_test_13ced433b5a50a6ccb21eb05047e8a24f4166ca4"
              amount={this.state.amount}
              billingEmail={this.state.email}
              billingMobile={this.state.mobile}
              billingName="Ndubueze Victor"
              ActivityIndicatorColor="green"
              refNumber={Math.floor((Math.random() * 1000000000) + 1)}
              onSuccess={(tranRef) => { console.log(tranRef) }}
              SafeAreaViewContainer={{ marginTop: 5 }}
              SafeAreaViewContainerModal={{ marginTop: 5 }}
              onCancel={(e) => {
                // handle response here
                alert("You cancelled")
              }}
              onSuccess={(e) => {
                // handle response here

                var status = e.transactionRef.status
                var reference = e.transactionRef.trxref
                var amount = this.state.amount;
                var user_mobile = this.state.mobile


                fetch('https://expressalllogistics.com/logistics/wallet.php', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({


                    cstatus: status,
                    creference: reference,
                    camount: amount,
                    cuser_mobile: user_mobile




                  })
                }).then((response) => response.json())
                  .then((responseJson) => {
                    var code = responseJson.Tripcode;

                    if (code == 1) {
                      Alert.alert(
                        "Transaction Successful",
                        "Wallet has been credited",
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          { text: "OK", onPress: () => this.props.navigation.navigate("MyWallet") }
                        ]
                      );
                    }
                    else {
                      alert("An Error Occured")
                    }


                  })


              }}
              autoStart={false}
            />
          </View>
        </View>
      </View>
    );
  }
}





const styles = StyleSheet.create({
  regForm: {
    padding: 20
  },
  textinput: {


    marginBottom: 30,
    color: '#000000',
    borderColor: '#000000',
    borderWidth: 1,
    padding: 10,
    fontSize: 12
  },
  centralize: {
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    marginVertical: 10

  }
});