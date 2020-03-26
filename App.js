import React from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {AsyncStorage} from 'react-native';
let jsonData = require('./Facts.json');


class VillanovaTourScreen extends React.Component {

    constructor(props) {
      super(props)
      var date = new Date().toLocaleString();
      this.state = {timeStamp: date, currLong:"", currLat: ""};

      //this.handlePress = this.handlePress.bind(this);
      this.onChangeCurrLong = this.onChangeCurrLong.bind(this);
      this.onChangeCurrLat = this.onChangeCurrLat.bind(this);
      this.calcDistance = this.calcDistance.bind(this);
    }

    onChangeCurrLong(Long){
      this.setState({currLong:Long});
    }
    onChangeCurrLat(Lat){
      this.setState({currLat:Lat});
    }

    /*
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
          var bartDist = this.calcDistance(this.state.currLong,this.state.currLat,Bartley["Longitude"], Bartley["Latitude"]);
          var MendDist = this.calcDistance(this.state.currLong,this.state.currLat,Mendel["Longitude"], Mendel["Latitude"]);
          var FalveyDist = this.calcDistance(this.state.currLong,this.state.currLat,Falvey["Longitude"], Falvey["Latitude"]);

    }*/

    calcDistance(currLong,currLat,long,lat){
      var distance = Math.sqrt(Math.pow(currLong+long,2)+Math.pow(currLat+lat,2));

      return distance;
    }
    render(){
      return (
          <View>
            <View style={styles.screenContainer}>
            <TextInput
                style={styles.textInput}
                onChangeText={this.onChangeCurrLong}
                defaultValue="Current Longitude"
            />
            <TextInput
                style={styles.textInput}
                onChangeText={this.onChangeCurrLat}
                defaultValue="Current Latitude"
            />
              <Button
                  onPress={this.handlePress}
                  title="Tell Me About My Location"
              />
              <Text> {this.state.currLong} {this.state.currLat} </Text>
              <Text> {this.state.test} </Text>
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
          //const time = await AsyncStorage.getItem("timeStamp");
          //if(time == null){
            //await AsyncStorage.setItem("timeStamp", new Date().toLocaleString());
            console.log(jsonData.Mendel.Latitude);
            //await AsyncStorage.multiSet([["CEER", JSON.stringify(jsonData["CEER"])],["Bartley", JSON.stringify(jsonData["Bartley"])],["Mendel", JSON.stringify(jsonData["Mendel"])], ["Falvey",JSON.stringify(jsonData["Falvey"])]]);
          //}*/
          //await AsyncStorage.clear();
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
});
