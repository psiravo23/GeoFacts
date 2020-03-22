import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {AsyncStorage} from 'react-native';



class VillanovaTourScreen extends React.Component {

    constructor(props) {
      super(props)
      var date = new Date().toLocaleString();
      this.state = {timeStamp: date};
    }

    render(){
      return (
        <View style={styles.timeStampText}>
          <Text> {this.state.timeStamp} </Text>
        </View>
      );
    }

}

export default class App extends React.Component {

    storeBuildings = async () => {
      try {
        const time = await AsyncStorage.getItem("timeStamp");
        if (time == null){
          await AsyncStorage.setItem("timeStamp", new Date().toLocaleString());
          var jsonData = require("./Facts.json");
        }
        else {
          await AsyncStorage.clear();
        }
      }
      catch (error){
      }
    }

    componentDidMount(){
      {this.storeBuildings()}
    }

    render(){
      return (
        <View style={styles.screenContainer}>
          <VillanovaTourScreen/>
        </View>
      );
    }

}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeStampText: {
    position: 'absolute',
    bottom: 0,
    height: 70,
    fontSize: 15,
  }
});
