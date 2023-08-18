import React, { Component } from 'react'
import Navigation from './src/Navigation/index'
import { LogBox } from 'react-native';

import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font';
import * as Sentry from '@sentry/react-native';



export default class App extends Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false
    };
    LogBox.ignoreLogs(['Remote debugger']);

  }


  async componentDidMount() {
    await Font.loadAsync({
      "uber": require("./assets/fonts/OpenSans-Regular.ttf"),
      "uber-l": require("./assets/fonts/UberMoveText-Light.ttf"),
      "uber-r": require("./assets/fonts/UberMoveText-Regular.ttf"),
      "uber-b": require("./assets/fonts/UberMoveText-Bold.ttf"),
    });
    this.setState({ fontLoaded: true });
  }
  render() {
    console.disableYellowBox = true;
    if (this.state.fontLoaded) {
      return <Navigation />;
    } else {
      return <AppLoading />;
    }
  }
}
