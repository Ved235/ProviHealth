import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Button,
  UIManager,
  Platform,
  LayoutAnimation,
  ScrollView,
} from 'react-native';
import { Header } from 'react-native-elements';
import { Dimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
class ExpandableItemComponent extends Component {
  //Custom Component for the Expandable List
  constructor() {
    super();
    this.state = {
      layoutHeight: null,
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.item.isExpanded) {
      this.setState(() => {
        return {
          layoutHeight: null,
        };
      });
    } else {
      this.setState(() => {
        return {
          layoutHeight: 0,
        };
      });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.layoutHeight !== nextState.layoutHeight) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <View>
        {/*Header of the Expandable List Item*/}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.props.onClickFunction}
          style={styles.header}>
          <Text style={styles.headerText}>{this.props.item.category_name}</Text>
        </TouchableOpacity>
        <View
          style={{
            height: this.state.layoutHeight,
            overflow: 'hidden',
          }}>
          {/*Content under the header of the Expandable List Item*/}
          {this.props.item.subcategory.map((item, key) => (
            <TouchableOpacity key={key} style={styles.content}>
              <Text style={styles.text}>{item.val}</Text>
              <View style={styles.separator} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

export default class ArticleScreen extends React.Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.state = { listDataSource: CONTENT };
  }
  updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...this.state.listDataSource];
    array[index]['isExpanded'] = !array[index]['isExpanded'];
    this.setState(() => {
      return {
        listDataSource: array,
      };
    });
    console.log(this.state.listDataSource);
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
          <ScrollView>
            {this.state.listDataSource.map((item, key) => (
              <ExpandableItemComponent
                key={item.category_name}
                onClickFunction={this.updateLayout.bind(this, key)}
                item={item}
              />
            ))}
          </ScrollView>
        </View>
      </SafeAreaProvider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#F5FCFF',
  },
  topHeading: {
    paddingLeft: 10,
    fontSize: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 16,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
});
const CONTENT = [
  {
    isExpanded: true,
    category_name: 'Limit sugary drinks',
    subcategory: [
      {
        id: 1,
        val:
          'Discoveries from a few examinations highlight that sugar-concentrated refreshments increases odds of coronary illnesses',
      },
    ],
  },
  {
    isExpanded: true,
    category_name: 'Get enough sleep',
    subcategory: [
      {
        id: 2,
        val:
          'Poor sleep can disrupt your digestion system, and reduce your physical and mental performance by increasing stress.',
      },
    ],
  },
  {
    isExpanded: true,
    category_name: 'Stay hydrated',
    subcategory: [
      {
        id: 3,
        val:
          'Drinking water is the most ideal approach to remain hydrated, as its liberated from fats and added substances',
      },
    ],
  },
  {
    isExpanded: true,
    category_name: 'Do exercise',
    subcategory: [
      {
        id: 4,
        val:
          'Doing vigorous exercise, or cardio, is perhaps everything thing you can manage for your psychological and physical health. We ought to basically complete 150 minutes of moderate force action every week',
      },
      {
        id: 5,
        val:
          '1. Lunges'
      },
      {
        id: 5,
        val:
          '     10 on each leg'
      },
      {
        id: 6,
        val:
          '2. Pushups'
      },
            {
        id: 5,
        val:
          '     10 times'
      },
      {
        id: 7,
        val:
          '3. Squats'
      },
            {
        id: 5,
        val:
          '     15 times'
      },
      {
        id: 8,
        val:
          '4. Burpees'
      },
            {
        id: 5,
        val:
          '     2 sets'
      },
      {
        id: 2,
        val:
          '5. Plank'
      },
            {
        id: 5,
        val:
          '     45 sec'
      },
    ],
  },
  {
    isExpanded: true,
    category_name: 'Meditate',
    subcategory: [
      {
        id: 15,
        val:
          'Stress negatively affects your wellbeing. It can influence your glucose levels, food decisions and more. Meditation is an approach to assist with countering pressure and work on your wellbeing',
      },
    ],
  },
];
