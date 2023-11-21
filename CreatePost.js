import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { DropDownPicker } from 'react-native-dropdown-picker';

export default class CreatePost extends Component {

    constructor() {
        super()
        this.state = {
            previewImage: 'image_1',
            fontsLoaded: false,
            dropdownHeight: 0,
        }
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }
    
    componentDidMount() {
        this._loadFontsAsync();
    }

    async addPost() {
        if (this.state.title && this.state.description && this.state.story && this.state.moral) {
          var d = new Date()
          let storyData = {
            preview_image: this.state.previewImage,
            title: this.state.title,
            description: this.state.description,
            story: this.state.story,
            moral: this.state.moral,
            created_on: d.toString(),
            author_uid: firebase.auth().currentUser.uid,
            likes: 0
          }
          await firebase
            .database()
            .ref("/posts/" + (Math.random().toString(36).slice(2)))
            .set(storyData)
            .then(function (snapshot) {
    
            })
          this.props.setUpdateToTrue();
          this.props.navigation.navigate("Feed")
        } 
        else {
          Alert.alert(
            'Error',
            'All fields are required!',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') }
            ],
            { cancelable: false }
          );
        }
    }

    render() {
        if (this.state.fontsLoaded) {
            SplashScreen.hideAsync();
            let preview_images = {
              image_1: require("../assets/image_1.jpg"),
              image_2: require("../assets/image_2.jpg"),
              image_3: require("../assets/image_3.jpg"),
              image_4: require("../assets/image_4.jpg"),
              image_5: require("../assets/image_5.jpg"),
              image_6: require("../assets/image_6.jpg"),
              image_7: require("../assets/image_7.jpg"),
            };
            return (
                <View style={styles.container}>
                    <SafeAreaView style={styles.droidSafeArea} />
                    <View style={styles.appTitle}>
                        <View style={styles.appIcon}>
                            <Image
                            source={require("../assets/logo.png")}
                            style={styles.iconImage}
                            ></Image>
                        </View>
                        <View style={styles.appTitleTextContainer}>
                            <Text style={styles.appTitleText}>New Post</Text>
                        </View>
                    </View>
                    <View style={styles.fieldsContainer}>
                        <ScrollView>
                            <Image
                                source={preview_images[this.state.previewImage]}
                                style={styles.previewImage}
                            ></Image>
                            <View style={{ height: RFValue(this.state.dropdownHeight) }}>
                                <DropDownPicker
                                    items = {[
                                        {label: 'Image 1', value: 'image_1'},
                                        {label: 'Image 2', value: 'image_2'},
                                        {label: 'Image 3', value: 'image_3'},
                                        {label: 'Image 4', value: 'image_4'},
                                        {label: 'Image 5', value: 'image_5'},
                                        {label: 'Image 6', value: 'image_6'},
                                        {label: 'Image 7', value: 'image_7'},
                                    ]}

                                    defaultValue = {this.state.previewImage}

                                    containerStyle = {{
                                        height: 40,
                                        borderRadius: 20,
                                        marginBottom: 10,
                                    }}

                                    onOpen = {() => {
                                        this.setState({dropdownHeight: 170})
                                    }}

                                    onClose = {() => {
                                        this.setState({dropdownHeight: 40})
                                    }}

                                    style = {{backgroundColor: 'transparent'}}

                                    itemStyle = {{justifyContent: 'flex-start'}}

                                    dropDownStyle = {{backgroundColor: '#2a2a2a'}}

                                    labelStyle = {{color: 'white'}}

                                    arrowStyle = {{color: 'white'}}

                                    onChangeItem = {item =>
                                        this.setState({previewImage: item.value})
                                    }
                                />
                            </View>
                            <TextInput
                                style={styles.inputFont}
                                onChangeText={caption => this.setState({ caption })}
                                placeholder={"Caption"}
                                placeholderTextColor="white"
                            />
                        </ScrollView>
                        <View>
                            <Button
                                onPress={() => this.addPost()}
                                title="Submit"
                                color="blue"
                            />
                        </View>
                    </View>

                </View>    
            )
        }
    }
}