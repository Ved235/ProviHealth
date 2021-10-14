import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './tabnavigator';
import ArticleScreen from '../screens/articleScreen';


const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Health Tips" component={ArticleScreen} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
