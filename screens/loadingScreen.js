import React, { Component } from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Splash extends Component {
  async componentDidMount() {
    // You can load api data or any other thing here if you want
    const data = await this.navigateToHome();
    if (data !== null) {
      this.props.navigation.navigate('Home');
    }
  }
  navigateToHome = async () => {
    // Splash screen will remain visible for 2 seconds
    const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));
    return wait(1000).then(() => this.props.navigation.navigate('Home'));
  };
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/55040-health-loader.gif')}
          style={{
            width: windowWidth,
            height: windowHeight / 2,
          }}
        />
        <Text style={styles.headingText}>Provi Health</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    headingText: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 0,
  },
});
