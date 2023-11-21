import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fontsLoaded: false
        }
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }
    
    componentDidMount() {
        this._loadFontsAsync();
    }

    toggleSwitch() {
        const previous_state = this.state.isEnabled;
        const theme = !this.state.isEnabled ? "dark" : "light";
        var updates = {};
        updates[
          "/users/" + firebase.auth().currentUser.uid + "/current_theme"
        ] = theme;
        firebase
          .database()
          .ref()
          .update(updates);
        this.setState({ isEnabled: !previous_state, light_theme: previous_state });
    }

    render() {

        if(this.state.fontsLoaded) {
            return (
                <View style={styles.container}>
                  <SafeAreaView style={styles.droidSafeArea} />
                  <View style={styles.appTitle}>
                      <Image
                        source={require("../assets/logo.png")}
                        style={styles.appIcon}
                      ></Image>
                      <Text style={styles.appTitleText}>{`Storytelling \n App`}</Text>
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => this.signInWithGoogleAsync()}>
                      <Image
                        source={require("../assets/google_icon.png")}
                        style={styles.googleIcon}
                      ></Image> 
                      <Text style={styles.googleText}>Sign in with Google</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.cloudContainer}>
                    <Image source={require('../assets/cloud.png')} style={styles.cloudImage}>
                    </Image>
                  </View>
                </View>
              );
        }
        else {
            return(
                <View style = {{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Button title = 'Sign in with Google'
                            onPress = {() => this.signInWithGoogleAsync()}></Button>
                </View>
            )
        }
    }
}