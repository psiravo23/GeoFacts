import React from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {AsyncStorage} from 'react-native';
const jsonData = require("./Facts.json");


class VillanovaTourScreen extends React.Component {

    constructor(props) {
      super(props)
      var date = new Date().toLocaleString();
      this.state = {timeStamp: date, currLong:"", currLat: "", building: "", fact: ""};

      this.handlePress = this.handlePress.bind(this);
      this.calcDistance = this.calcDistance.bind(this);
      this.calRandomFact = this.calRandomFact.bind(this);
      this.findGPSCords = this.findGPSCords.bind(this);
    }

    findGPSCords() {
       navigator.geolocation.getCurrentPosition(
        (position) => {
           this.setState({currLong: position.coords.longitude, currLat: position.coords.latitude}, this.handlePress);
        },
        (error) => this.setState({error: error.message}),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
     }

    async handlePress(){
        try {
            var CEER = await AsyncStorage.getItem("CEER");
            var Bartley = await AsyncStorage.getItem("Bartley");
            var Mendel = await AsyncStorage.getItem("Mendel");
            var Falvey = await AsyncStorage.getItem("Falvey");
            CEER = JSON.parse(CEER);
            Bartley = JSON.parse(Bartley);
            Mendel = JSON.parse(Mendel);
            Falvey = JSON.parse(Falvey);
        }
        catch (error){
        }
          var CeerDist = this.calcDistance(this.state.currLong,this.state.currLat,CEER["Longitude"], CEER["Latitude"]);
          var BartDist = this.calcDistance(this.state.currLong,this.state.currLat,Bartley["Longitude"], Bartley["Latitude"]);
          var MendDist = this.calcDistance(this.state.currLong,this.state.currLat,Mendel["Longitude"], Mendel["Latitude"]);
          var FalveyDist = this.calcDistance(this.state.currLong,this.state.currLat,Falvey["Longitude"], Falvey["Latitude"]);

          var distances = [CeerDist,BartDist,MendDist,FalveyDist];
          var minValue = Math.min(...distances);
          distances = {"CEER": CeerDist, "Bartley":BartDist, "Mendel":MendDist, "Falvey":FalveyDist};

          //Find key of minimum distance value
          var minKey;
          for (var key in distances){
            if (distances[key] == minValue){
              minKey = key;
            }
          }

          try {
            var closestBuilding = await AsyncStorage.getItem(minKey);
            closestBuilding = JSON.parse(closestBuilding);
          }
          catch (error){
          }

          var randomFact = this.calRandomFact(closestBuilding.Facts);

          this.setState({building:minKey, fact:randomFact});
    }

    calcDistance(currLong,currLat,long,lat){
      var distance = Math.sqrt(Math.pow(currLong-long,2)+Math.pow(currLat-lat,2));

      return distance;
    }

    calRandomFact(Facts){
      var randIndex = Math.floor(Math.random()* Facts.length);
      return Facts[randIndex];
    }
    render(){
      return (
          <View>
            <View style={styles.screenContainer}>
            <Text style={styles.title}> Vilanova University Interactive Tour </Text>
              <Button
                  onPress={this.findGPSCords}
                  title="Tell Me About My Location"
              />
              <Text> {this.state.currLong} {this.state.currLat} </Text>
              <Text> {this.state.building}</Text>
              <Text> {this.state.fact}</Text>
            </View>
            <View style={styles.timeStampText}>
              <Text> {this.state.timeStamp} </Text>
            </View>
          </View>
      );
    }

}

export default class App extends React.Component {

    async componentDidMount(){

        try {

          const time = await AsyncStorage.getItem("timeStamp");
          if(time == null){
            await AsyncStorage.setItem("timeStamp", new Date().toLocaleString());
            await AsyncStorage.multiSet([["CEER", JSON.stringify(jsonData[0])],["Bartley", JSON.stringify(jsonData[1])],["Mendel", JSON.stringify(jsonData[2])], ["Falvey",JSON.stringify(jsonData[3])]]);
          }

        }
        catch (error){
        }
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
  },
  textInput: {
    margin: 15,
    height: 40,
    width: 200,
    borderWidth: 1
  },
  title: {
    fontSize:20
  }
});
