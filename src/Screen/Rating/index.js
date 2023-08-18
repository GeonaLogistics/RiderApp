import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  StatusBar,
  ScrollView
} from "react-native";
import Color from "../../Config/Color";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../../Component/Header/index";
import Button from "../../Component/Button/index";
import { Rating } from "react-native-ratings";
import style from "./style";
let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;
export default class componentName extends Component {
  ratingCompleted(rating) {
    console.log("Rating is: " + rating);
  }
  render() {
    return (
      <View style={{ backgroundColor: Color.black, flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <Header
          title="Rating"
          onPress={() => this.props.navigation.navigate("BookingReq")}
         // style={{marginBottom:50}}
        />
        <View
          style={{
            backgroundColor: Color.white,
           // height: height / 1.3,
            // marginHorizontal: 10,
            // marginBottom:20,
            // marginTOp:30,
            flex:1,
            marginHorizontal:width/30,
            marginTop:height/15,
            marginBottom:height/35,
            borderRadius: 10,
            borderColor: Color.steel,
            borderWidth: 2,
            shadowOpacity: "0.3",
            elevation: 3,
            
          }}
        >
        <ScrollView style={{flex:1}}>
          <View style={{ marginTop: height / 20, justifyContent: "center" }}>
            <Text style={[style.text,{marginTop:20}]}>Sam Lincan</Text>
            <Text style={[style.text, { fontSize: 12, color: Color.gray }]}>
              123:INO
            </Text>
            <Text style={[style.text, { fontSize: 16, marginVertical: 20 }]}>
              How is your trip?
            </Text>
            <Text
              style={[
                style.text,
                { fontSize: 14, color: Color.gray, marginHorizontal: 50 }
              ]}
            >
              Your feedback will help improve driving experience
            </Text>

            <Rating
              onFinishRating={this.ratingCompleted}
              style={{ paddingVertical: 10, marginTop: 10 }}
            />

            <View style={{ margin: 15 }}>
              <TextInput
                placeholder="Additional Comments…"
                style={style.input}
                underlineColorAndroid="transparent"
                multiline={true}
              />
            </View>
           
          </View>
         
         
          </ScrollView>
          <View style={{ justifyContent: "flex-end"}}>
          <Button
              Text="Submit Review"
              viewStyle={{ backgroundColor: Color.purple, }}
              onPress={()=>this.props.navigation.navigate("Tips")}
            />
            </View>
        </View>
        
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            marginTop: height/ 7,
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
