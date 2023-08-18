import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
  TextInput,
  StatusBar
} from "react-native";
import container from "../../Styles/Container/style";
let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;
import Color from "../../Config/Color";
import Icon from "react-native-vector-icons/Ionicons";
import style from "./style";
export default class componentName extends Component {
  constructor(props) {
    super(props);
    //   this.state = {
    //     email: "",
    //     getText:""
    //   };
    // }
    // handleEmail = text => {
    //   this.setState({ email: text });
    //   getText:text
    // };
    // login = (email, pass) => {
    //   alert("email: " + email + " password: " + pass);
    // };
    (this.array = []),
      (this.state = {
        arrayHolder: [],
        textInput_Holder: ""
      });
  }

  componentDidMount() {
    this.setState({ arrayHolder: [...this.array] });
  }

  joinData = () => {
    this.array.push({ title: this.state.textInput_Holder });
    this.setState({ arrayHolder: [...this.array] });
    this.setState({
      textInput_Holder: ""
    });
  };
  render() {
    return (
      <View style={[container.container, { flexDirection: "column" }]}>
        <StatusBar barStyle="light-content" />
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
                onPress={() => this.props.navigation.navigate("BookingReq")}
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
                <View style={{ flex: 0.75, justifyContent: "center" }}>
                  <Text
                    style={{
                      fontSize: 28,
                      fontFamily: "uber-b",
                      color: Color.white,
                      marginVertical: 10
                    }}
                  >
                    Sam Lincan
                  </Text>
                </View>
                <View style={[style.imageProfileView, { flex: 0.25 }]}>
                  <Image
                    source={require("../../Image/Pic.png")}
                    style={style.imageProfile}
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View />

        <KeyboardAvoidingView
          style={style.keyboardAvoidContainer}
          behavior="padding"
        >
          <Text
            style={{
              color: Color.gray,
              alignSelf: "center",
              margin: 15,
              fontSize: 12,
              fontFamily: "uber"
            }}
          >
            Today at 4:00PM
          </Text>
          <FlatList
            data={this.state.arrayHolder}
            width="100%"
            extraData={this.state.arrayHolder}
            keyExtractor={index => index.toString()}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: "#fff",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  margin: 10
                }}
              >
                <View style={{ flex: 0.7, alignItems: "flex-end", margin: 3 }}>
                  <ImageBackground
                    style={{ flex: 1 }}
                    source={require("../../Image/Rectangle.png")}
                  >
                    <Text style={style.item}>{item.title}</Text>
                  </ImageBackground>
                </View>
              </View>
            )}
          />
          <View
            style={{ flexDirection: "row", backgroundColor: Color.whiteSmoke }}
          >
            <View style={{ flex: 0.9 }}>
              <TextInput
                placeholder="Type a Message.."
                onChangeText={data => this.setState({ textInput_Holder: data })}
                style={style.input}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{ flex: 0.1 }}>
              <TouchableOpacity
                onPress={this.joinData}
                activeOpacity={0.7}
                style={style.button}
              >
                <Image
                  source={require("../../Image/chatEnter.png")}
                  style={{
                    width: 20,
                    height: 20,
                    alignSelf: "flex-end",
                    marginVertical: 15,
                    marginHorizontal: 10
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
