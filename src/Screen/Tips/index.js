import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  Platform
} from "react-native";
import Color from "../../Config/Color";
import Header from "../../Component/Header/index";
import Button from "../../Component/Button/index";
import style from "./style";
let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;
export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      tabsFlag: 1
    };
  }
  onchangetabs(i) {
    var that = this;
    that.setState({
      tabsFlag: i
    });
    console.log(i);
  }

  render() {
    return (
      <View style={{ backgroundColor: Color.black, flex: 1 }}>
        <Header title="Tips"  onPress={() => this.props.navigation.navigate("Rating")}/>
        <View
          style={{
            backgroundColor: Color.white,
           // height: height / 1.3,
            marginHorizontal:width/30,
            marginTop:height/15,
            marginBottom:height/35,
            borderRadius: 10,
            flex:1,
            borderColor: Color.steel,
            borderWidth: 2,
            shadowOpacity: "0.3",
            elevation: 3,
            
          }}
        >
          <View
            style={{
              marginTop: height / 9,
              justifyContent: "center",
              flex: 1
            }}
          >
            <Text style={[style.text,{fontFamily:'uber-b'}]}>Sam Lincan</Text>
            <Text style={[style.text, { fontSize: 12, color: Color.gray }]}>
              123:INO
            </Text>
            <Text
              style={[
                style.text,
                { fontSize: 20, marginHorizontal: 50, marginTop: 30 }
              ]}
            >
              Wow! A 5 star !
            </Text>
            <Text
              style={[
                style.text,
                { fontSize: 20, marginHorizontal: 50, marginBottom: 30 }
              ]}
            >
              Wanna add tip for Sam?
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View
                style={{
                  margin: 10,
                  backgroundColor:
                    this.state.tabsFlag == 0 ? Color.purple : Color.white,
                  borderRadius: 30,
                  height: 60,
                  width: 60,
                  justifyContent:'center'
                }}
              >
                <TouchableOpacity onPress={() => this.onchangetabs(0)}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 22,
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                      fontFamily: "uber",
                      margin:5,
                      fontWeight: this.state.tabsFlag == 0 ? "bold" : "normal",
                      color:
                        this.state.tabsFlag == 0 ? Color.white : Color.black
                    }}
                  >
                    $1
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  margin: 10,
                  backgroundColor:
                    this.state.tabsFlag == 1 ? Color.purple : Color.white,
                  borderRadius: 30,
                  height: 60,
                  width: 60,
                  justifyContent:'center'
                }}
              >
                <TouchableOpacity onPress={() => this.onchangetabs(1)}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 22,
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                      fontFamily: "uber",
                      margin:5,
                      fontWeight: this.state.tabsFlag == 1 ? "bold" : "normal",
                      color:
                        this.state.tabsFlag == 1 ? Color.white : Color.black
                    }}
                  >
                    $2
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  margin: 10,
                  backgroundColor:
                    this.state.tabsFlag == 2 ? Color.purple : Color.white,
                  borderRadius: 30,
                  height: 60,
                  width: 60,
                  justifyContent:'center'
                }}
              >
                <TouchableOpacity onPress={() => this.onchangetabs(2)}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 22,
                      paddingVertical: 5,
                      paddingHorizontal: 5,
                      fontFamily: "uber",
                      margin:5,
                      fontWeight: this.state.tabsFlag == 2 ? "bold" : "normal",
                      color:
                        this.state.tabsFlag == 2 ? Color.white : Color.black
                    }}
                  >
                    $5
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity>
              <Text
                style={[
                  style.text,
                  {
                    fontSize: 15,
                    color: Color.pink,
                    textDecorationLine: "underline",
                    marginVertical: 30
                  }
                ]}
              >
                Choose other amount
              </Text>
            </TouchableOpacity>
            <View style={{ justifyContent: "flex-end", flex: 1 }}>
              <Button
                Text="Done"
                viewStyle={{ backgroundColor: Color.purple }}
                onPress={()=>this.props.navigation.navigate("BookingReq")}
              />
              <Button
                Text="Maybe next time"
                viewStyle={{ backgroundColor: Color.white, marginVertical: 0 }}
                textStyle={{ color: Color.steel }}
                onPress={()=>this.props.navigation.navigate("BookingReq")}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            marginTop: height /7,
            marginHorizontal: 100,
            alignContent: "center",
            elevation: 4
          }}
        >
          <View style={[style.imageProfileView]}>
            <Image
              source={require("../../Image/Pic.png")}
              style={style.imageProfile}
            />
          </View>
          
        </View>
      </View>
    );
  }
}
