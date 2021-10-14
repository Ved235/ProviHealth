import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./navigation/drawernavigator";
import LoadingScreen from './screens/loadingScreen';

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      switcher: false
    }
  }
render(){
  if(this.state.switcher === false){
  return (
    <LoadingScreen />      
  );
  }
  else{
    return(
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
    )
  }
}
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        switcher: true,
      });
    }, 4700);
  }
}

