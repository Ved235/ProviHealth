import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import Icon from 'react-native-ionicons';
import { Audio } from 'expo-av';
import Modal from 'react-native-modal';

const audioBookPlaylist = [
  {
    title: 'The Calming World',
    author: 'Benjamin Tissot',
    source: 'BenSound',
    uri:
      require('../assets/songs/anxious.mp3'),
    imageSource:
      'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',
  },
  {
    title: 'Uplifiting the mood',
    author: 'McFunkypants',
    source: 'SoundCloud',
    uri:
      require('../assets/songs/calm.mp3'),

    imageSource:
      'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',
  },
];

export default class SongScreen extends React.Component {
  state = {
    isPlaying: false,
    playbackInstance: null,
    currentIndex: 0,
    volume: 1.0,
    isBuffering: false,
    popVisible: true,
  };

  renderFileInfo() {
    const { playbackInstance, currentIndex } = this.state;
    return playbackInstance ? (
      <View style={styles.trackInfo}>
        <Text style={[styles.trackInfoText, styles.largeText]}>
          {audioBookPlaylist[currentIndex].title}
        </Text>
        <Text style={[styles.trackInfoText, styles.smallText]}>
          {audioBookPlaylist[currentIndex].author}
        </Text>
        <Text style={[styles.trackInfoText, styles.smallText]}>
          {audioBookPlaylist[currentIndex].source}
        </Text>
      </View>
    ) : null;
  }

  // update the Stylesheet object

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.albumCover}
          source={require('../assets/forest.jpg')}
        />
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.control}
            onPress={this.handlePreviousTrack}>
            <Image
              source={require('../assets/fast-backward.png')}
              style={{ width: 20, height: 20, marginTop: 15 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.control}
            onPress={this.handlePlayPause}>
            {this.state.isPlaying ? (
              <Image
                source={require('../assets/pause.png')}
                style={{ width: 48, height: 48 }}
              />
            ) : (
              <Image
                source={require('../assets/play.png')}
                style={{ width: 48, height: 48 }}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.control}
            onPress={this.handleNextTrack}>
            <Image
              source={require('../assets/fast-forward.png')}
              style={{ width: 20, height: 20, marginTop: 15 }}
            />
          </TouchableOpacity>
        </View>
        {this.renderFileInfo()}
      </View>
    );
  }

  async componentDidMount() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true,
      });

      this.loadAudio();
    } catch (e) {
      console.log(e);
    }
    
  }
  async loadAudio() {
    const { currentIndex, isPlaying, volume } = this.state;

    try {
      const playbackInstance = new Audio.Sound();

      const source = audioBookPlaylist[currentIndex].uri;

      const status = {
        shouldPlay: isPlaying,
        volume,
      };

      playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
      await playbackInstance.loadAsync(source, status, false);
      this.setState({ playbackInstance });
    } catch (e) {
      console.log(e);
    }
  }

  onPlaybackStatusUpdate = (status) => {
    this.setState({
      isBuffering: status.isBuffering,
    });
  };
  handlePlayPause = async () => {
    const { isPlaying, playbackInstance } = this.state;
    isPlaying
      ? await playbackInstance.pauseAsync()
      : await playbackInstance.playAsync();

    this.setState({
      isPlaying: !isPlaying,
    });
  };

  handlePreviousTrack = async () => {
    let { playbackInstance, currentIndex } = this.state;
    if (playbackInstance) {
      await playbackInstance.unloadAsync();
      currentIndex < audioBookPlaylist.length - 1 && currentIndex > 0
        ? (currentIndex -= 1)
        : (currentIndex = 0);
      this.setState({
        currentIndex,
      });
      this.loadAudio();
    }
  };

  handleNextTrack = async () => {
    let { playbackInstance, currentIndex } = this.state;
    if (playbackInstance) {
      await playbackInstance.unloadAsync();
      currentIndex < audioBookPlaylist.length - 1
        ? (currentIndex += 1)
        : (currentIndex = 0);
      this.setState({
        currentIndex,
      });
      this.loadAudio();
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#253334',
    alignItems: 'center',
    justifyContent: 'center',
  },
  albumCover: {
    width: 250,
    height: 250,
    borderRadius: 120,
  },
  trackInfo: {
    padding: 40,
    backgroundColor: '#253334',
  },
  trackInfoText: {
    textAlign: 'center',
    flexWrap: 'wrap',
    color: '#fff',
  },
  largeText: {
    fontSize: 22,
  },
  smallText: {
    fontSize: 16,
  },
  control: {
    margin: 20,
  },
  controls: {
    flexDirection: 'row',
  },
});
