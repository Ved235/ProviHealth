import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Button,
  ScrollView,
} from 'react-native';
import { Header } from 'react-native-elements';
import { Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import SongScreen from './songScreen';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      butttonType: '',
      popVisible: false,
      quotes: '',
      quotesPerson: '',
    };
  }
  mood = (buttonName) => {
    if (buttonName === 'Focused') {
      this.setState({
        butttonType: buttonName,
        quotes: 'Where Focus Goes Energy Flows',
        quotesPerson: '-Tony Robbins',
      });
    }
    if (buttonName === 'Calm') {
      this.setState({
        butttonType: buttonName,
        quotes: 'Calmness is the cradle of power',
        quotesPerson: '-Josiah Glibert Holland',
      });
    }
    if (buttonName === 'Sleepy') {
      this.setState({
        butttonType: buttonName,
        quotes: 'Sleep is that golden chain that ties health and our bodies together',
        quotesPerson: '-Thomas Dekker',
      });
    }
    if (buttonName === 'Anxious') {
      this.setState({
        butttonType: buttonName,
        quotes: 'Do not be anxious about tomorrow, for tomorrow will be anxious for itself. Let the days own trouble be sufficient for the day.',
        quotesPerson: '-Jesus Christ',
      });
    }
  };
  render() {
    return (
      <SafeAreaProvider>
        <View
          style={{
            backgroundColor: '#253334',
            height: windowHeight,
            flex: 1,
          }}>
          <Modal
            isVisible={this.state.popVisible}
            onBackdropPress={() =>
              this.setState({
                popVisible: false,
              })
            }
            deviceHeight={1000}
            deviceWidth={500}
            customBackdrop={false}>
            <View
              style={{
                backgroundColor: 'white',
                width: windowWidth - 50,
                height: windowHeight / 4.2,
                borderRadius: 10,
              }}>
              <Image
                source={require('../assets/music.png')}
                style={{
                  width: 50,
                  height: 50,
                  alignSelf: 'center',
                  marginTop: -20,
                }}
              />
              <Text style={styles.modalTitle}>{this.state.butttonType}</Text>
              <Text style={styles.modalQuote}>{this.state.quotes}</Text>
              <Text style={styles.modalQuote}>{this.state.quotesPerson}</Text>
              <TouchableOpacity>
                <Text
                  style={styles.modalButtonText}
                  onPress={() => {
                    this.props.navigation.navigate('Music');
                    this.setState({ popVisible: false });
                  }}>
                  Listen to Music
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <Header
            placement="center"
            backgroundColor="#2a3839"
            leftComponent={
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.toggleDrawer();
                }}>
                <Image
                  source={require('../assets/menu.png')}
                  style={{
                    width: 30,
                    height: 30,
                    marginTop: 5,
                  }}
                />
              </TouchableOpacity>
            }
            centerComponent={
              <Image
                source={require('../assets/logo.png')}
                style={{ width: 40, height: 40 }}
              />
            }
          />
          <ScrollView showsVerticalScrollIndicator={true}>
            <Text style={styles.headingMain}>Welcome Back!</Text>
            <Text style={styles.heading2}>How are you feeling?</Text>

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={styles.moodButton}
                onPress={() => {
                  this.mood('Focused');
                  this.setState({ popVisible: true });
                }}>
                <Image
                  style={[
                    styles.moodImage,
                    {
                      tintColor:
                        this.state.butttonType === 'Focused' ? 'blue' : 'black',
                    },
                  ]}
                  source={require('../assets/focus.png')}
                />
                <Text style={styles.moodText}>Focus</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.moodButton}
                onPress={() => {
                  this.mood('Calm');
                  this.setState({ popVisible: true });
                }}>
                <Image
                  style={[
                    styles.moodImage,
                    {
                      tintColor:
                        this.state.butttonType === 'Calm' ? 'blue' : 'black',
                    },
                  ]}
                  source={require('../assets/calm.png')}
                />
                <Text style={styles.moodText}>Calm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.moodButton}
                onPress={() => {
                  this.mood('Sleepy');
                  this.setState({ popVisible: true });
                }}>
                <Image
                  style={[
                    styles.moodImage,
                    {
                      tintColor:
                        this.state.butttonType === 'Sleepy' ? 'blue' : 'black',
                    },
                  ]}
                  source={require('../assets/moon.png')}
                />
                <Text style={styles.moodText}>Sleep</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.moodButton}
                onPress={() => {
                  this.mood('Anxious');
                  this.setState({ popVisible: true });
                }}>
                <Image
                  style={[
                    styles.moodImage,
                    {
                      tintColor:
                        this.state.butttonType === 'Anxious' ? 'blue' : 'black',
                    },
                  ]}
                  source={require('../assets/anxious.png')}
                />
                <Text style={styles.moodText}>Anxious</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.div}>
              <Text style={styles.divMain}>Meditation 101</Text>
              <Text style={styles.div2}>
                Benefits and a {'\n'}Beginner's How-To{' '}
              </Text>
              <Image
                style={styles.divImage}
                source={require('../assets/meditation.png')}
              />
              <TouchableOpacity
                style={styles.divButton}
                onPress={() => {
                  this.props.navigation.navigate('Health Tips');
                }}>
                <Text
                  style={{ color: 'white', textAlign: 'center', marginTop: 4 }}>
                  read more...
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.div, { marginBottom: 80 }]}>
              <Text style={styles.divMain}>Exercises</Text>
              <Text style={styles.div2}>
                Basics of Exercise for {'\n'}Beginners{' '}
              </Text>
              <Image
                style={styles.divImage}
                source={require('../assets/runner.png')}
              />
              <TouchableOpacity
                style={styles.divButton}
                onPress={() => {
                  this.props.navigation.navigate('Health Tips');
                }}>
                <Text
                  style={{ color: 'white', textAlign: 'center', marginTop: 4 }}>
                  read more...
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaProvider>
    );
  }
}
const styles = StyleSheet.create({
  headingMain: {
    fontWeight: 'bold',
    fontSize: 25,
    marginLeft: 20,
    marginTop: 10,
    color: 'white',
    textAlign: 'center',
  },
  divMain: {
    fontSize: 25,
    marginLeft: 25,
    fontFamily: 'Georgia',
    marginTop: 15,
  },
  div: {
    backgroundColor: 'white',
    borderRadius: 25,
    width: 310,
    height: 180,
    alignSelf: 'center',
    marginTop: 35,
  },
  div2: {
    marginLeft: 25,
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop: 10,
  },
  divImage: {
    width: 100,
    height: 100,
    alignSelf: 'flex-end',
    marginTop: -50,
  },
  divButton: {
    backgroundColor: '#253334',
    width: 100,
    marginLeft: 20,
    marginTop: -15,
    height: 30,
    borderRadius: 10,
  },
  heading2: {
    color: 'lightgrey',
    marginLeft: 20,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingBottom: 10,
  },
  moodButton: {
    marginTop: 10,
    backgroundColor: 'white',
    width: 53,
    height: 50,
    borderRadius: 10,
    marginLeft: 20,
  },
  moodImage: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    marginTop: 5,
  },
  moodText: {
    fontSize: 11,
    textAlign: 'center',
    color: 'white',
    marginTop: 5,
  },
  modalQuote: {
    fontSize: 13,
    fontWeight: '',
    textAlign: 'center',
  },
  modalTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  modalButtonText: {
    textAlign: 'center',
    marginTop: windowHeight / 22,
    fontWeight: 'bold',
    color: '#fa6065',
    fontSize: 15,
  },
});
