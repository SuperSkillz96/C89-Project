import React, {Component} from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import Profile from "../screens/Profile";
import StackNavigator from './StackNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

    constructor() {
        super()
        this.state = {
            theme: 'light'
        }
    }

    componentDidMount() {
        let theme;
        firebase
          .database()
          .ref("/users/" + firebase.auth().currentUser.uid)
          .on("value", function (snapshot) {
            theme = snapshot.val().current_theme;
          });
        this.setState({ light_theme: theme === "light" ? true : false });
    }

    render() {
        let props = this.props;
        return (
            <Drawer.Navigator
                drawerContentOptions = {{
                    activeTintColor: '#E91E63',
                    inactiveTintColor: this.state.light_theme ? 'black': 'white',
                    itemStyle: {marginVertical: 5}
                }} 
                drawerContent = {props => <CustomSideBarMenu {...props} /> }
                screenOptions={{headerShown:false}}>

                <Drawer.Screen
                    name="Home"
                    component={StackNavigator} 
                    options = {{unmountOnBlur: true}}    
                />

                <Drawer.Screen
                    name="Profile"
                    component={Profile}
                    options = {{unmountOnBlur: true}}
                />

                <Drawer.Screen
                    name = 'Logout'
                    component = {Logout}
                    options = {{unmountOnBlur: true}}
                />

            </Drawer.Navigator>
        );
    }
    
};

export default DrawerNavigator;