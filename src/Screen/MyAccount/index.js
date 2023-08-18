import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import container from "../../Styles/Container/style";
let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;
import Color from "../../Config/Color";
import Icon from "react-native-vector-icons/Ionicons";
import style from "./style";
import Text2Icon from "../../Component/Text2Icon";
import Button from "../../Component/Button/index";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
export default class index extends Component {
  constructor() {
    super();
    this.state = {
      isDateTimePickerVisible: false,
      choseDate: ""
    };
  }

  _showDateTimePicker = () => {
    this.setState({
      isDateTimePickerVisible: true
    });
  };

  _handleDatePicked = datetime => {
    this.setState({
      isDateTimePickerVisible: false,
      choseDate: moment(datetime).format("DD-MM-YYYY")
    });
  };
  _hideDateTimePicker = () => {
    this.setState({
      isDateTimePickerVisible: false
    });
  };
  render() {
    return (
      <View style={[container.container, { flexDirection: "column" }]}>
        <View style={{ width: width,backgroundColor:'#000' }}>
            <View
              style={{
                marginHorizontal: 15,
                marginTop: 40,
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
                      color: "#fff",
                      
                    },
                    this.props.iconStyle
                  ]}
                />
              </TouchableOpacity>
              <View style={{ flexDirection: "row",marginBottom:20}}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text
                    style={{
                      fontSize: 24,
                      fontFamily: "uber",
                      color: Color.white,
                    
                    }}
                  >
                   My Account
                  </Text>
                </View>
                <View style={[style.imageProfileView,]}>
                  <Image
                    source={require("../../Image/Pic.png")}
                    style={style.imageProfile}
                  />
                </View>
              </View>
            </View>
       
        </View>
        <View />

        <KeyboardAvoidingView
          style={style.keyboardAvoidContainer}
          behavior="padding"
        >
          <ScrollView>
            <Text2Icon Title="Level" Text="Gold Member" mainView={{marginVertical:10}}/>
            <Text2Icon Title="Name" Text="Larry johanson"/>
            <Text2Icon Title="Email" Text="Larry.johanson.com" />
            <Text2Icon Title="Gender" Text="Male" />
            <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    mode={"date"}
                  />
            <Text2Icon Title="Birthday" Text={this.state.choseDate} onPress={this._showDateTimePicker}/>
            <Text2Icon Title="Phone Number" Text="+0123 456 7890"/>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
