import React, { Component } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import Color from "../../Config/Color";
import style from "./style";
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = { text: this.props.textInputText };
  }
  render() {
    return (
      <View style={style.mainView}>
        <View style={style.imageView}>
          <Image source={this.props.source} style={style.image} />
        </View>
        <View style={[style.viewText]}>
          <Text style={style.titleText}>{this.props.Title}</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={[this.props.viewText, { flex: 1 }]}>
              <TextInput
                style={{ height: 30 }}
                onChangeText={text => this.setState({ text })}
                value={this.state.text}
              />
            </View>
            <View style={style.imageView2}>
              <TouchableOpacity>
                <Image source={this.props.source2} style={style.image2} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
