import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import {AsyncStorage} from 'react-native';



class VillanovaTourScreen extends React.Component {

    constructor(props) {
      super(props)
      var date = new Date().toLocaleString();
      this.state = {timeStamp: date};

      this.findGPSCords = this.findGPSCords.bind(this);
      this.handlePress = this.handlePress.bind(this);
    }

    findGPSCords() {
      navigator.geolocation.getCurrentPosition(
       (position) => {
          this.setState({currLong: position.coords.longitude, currLat: position.coords.latitude}, this.handlePress());
       },
       (error) => this.setState({error: error.message}),
       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
     );
    }

    handlePress(){
        this.setState({isFinished: "finished"});
    }

    render(){
      return (
          <View>
            <View style={styles.screenContainer}>
              <Button
                  onPress={this.findGPSCords}
                  title="Tell Me About My Location"
              />
              <Text> {this.state.currLong} {this.state.currLat} </Text>
              <Text> {this.state.isFinished} </Text>
            </View>
            <View style={styles.timeStampText}>
              <Text> {this.state.timeStamp} </Text>
            </View>
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
      {this.storeBuildings}
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
    alignItems: 'center'
  }
});
