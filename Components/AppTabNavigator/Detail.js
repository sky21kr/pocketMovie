import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Icon } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView, ScrollView } from "react-navigation";
import axios from "axios";
import * as API from "../../API_Key.js";

const API_KEY2 = API.getAPI_KEY2(); // 줄거리 받아오기

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: []
    };
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-reorder" style={{ color: tintColor }} />
    )
  };

  _AllKeys = async () => {
    try {
      tempKey = await AsyncStorage.getAllKeys();
      this.setState({
        key: tempKey
      });
    } catch (error) {}
  };

  _onPressButton = async title => {
    await this._AllKeys(); // 현재 키 this.state.key 에 초기화
    for (var value of this.state.key) {
      if (value == title) {
        Alert.alert(
          "알림",
          `즐겨찾기에 있는 영화입니다.`,
          [
            {
              text: "넹"
            }
          ],
          { cancelable: true }
        );
        return;
      }
    }

    AsyncStorage.setItem(title, title);

    Alert.alert(
      "알림",
      `즐겨찾기에 추가되었습니다.`,
      [
        {
          text: "넹"
        }
      ],
      { cancelable: true }
    );

    await this._AllKeys();

    var temp = {
      title: "",
      backdrop_path: ""
    };
    var tempList = [];
    currkeys = this.state.key;

    for (let i = 0; i < currkeys.length; i++) {
      temp = {
        title: "",
        backdrop_path: ""
      };
      temp.title = currkeys[i];
      await axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY2}&query=${temp.title}&language=ko-KR&page=1`
        )
        .then(response => {
          temp.backdrop_path = response.data.results[0].backdrop_path;
          tempList.push(temp);

          if (i == this.state.key.length - 1) {
            this.props.navigation.navigate("WantToWatchTab", {
              keys: tempList
            });
          }
        });
    }
  };

  componentDidMount() {
    this._AllKeys();
  }

  render() {
    const { navigation } = this.props;
    var title = navigation.getParam("title", ""); // title 변수를 전달 받아옴, default 값은 "" 으로 설정
    var overview = navigation.getParam("overview", ""); // overview 변수를 전달 받아옴, default 값은 "" 으로 설정
    var release_date = navigation.getParam("release_date", "");
    var url = navigation.getParam("url", "");
    var back = navigation.getParam("back", "");

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.container1}>
            <View style={styles.posterContainer}>
              <View style={styles.backgroundContainer}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/original${back}`
                  }}
                  style={styles.posterBack}
                />
              </View>
              <View style={styles.overlay}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/original${url}`
                  }}
                  style={styles.posterFront}
                />
                <View style={styles.posterTitle}>
                  <Text style={styles.Title}>{title}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.container2}>
            <View>
              <Text style={styles.name}>{title}</Text>
            </View>
            <View style={styles.lowContainer}>
              <Text style={styles.overview}>{release_date}</Text>
              <View style={styles.buttonLayout}>
                <TouchableOpacity onPress={() => this._onPressButton(title)}>
                  <AntDesign name="star" color="yellow" style={styles.button} />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.overview}>{overview}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  container1: {
    flex: 1,
    backgroundColor: "black"
  },
  container2: {
    flex: 2,
    backgroundColor: "black"
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "flex-start"
  },
  overlay: {
    flexDirection: "row"
  },
  posterContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-end"
  },
  posterTitle: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-end"
  },
  posterBack: {
    width: "100%",
    height: "100%"
  },
  posterFront: {
    marginTop: 100,
    marginLeft: 10,
    marginBottom: 10,
    width: 120,
    height: 160
  },

  buttonLayout: {
    marginLeft: "auto",
    marginRight: 20,
    justifyContent: "space-around",
    flexDirection: "row"
  },
  button: {
    fontSize: 30
  },
  searchContainer: {
    backgroundColor: "black",
    marginLeft: 40,
    marginRight: 40
  },
  input: {
    borderRadius: 10,
    backgroundColor: "#FFF",
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  inputText: {
    flex: 1
  },
  addBtn: {
    color: "#4169E1"
  },
  imagecontainer: {
    flex: 1
  },
  lowContainer: {
    backgroundColor: "black",
    flex: 1,
    flexDirection: "row"
  },
  leftContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
  },
  rightContainer: {
    flex: 2,
    backgroundColor: "black"
  },
  rightUpContainer: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 35,
    justifyContent: "center",
    marginLeft: 20
  },
  rightDownContainer: {
    flex: 3,
    backgroundColor: "black",
    paddingBottom: 10
  },

  Title: {
    marginLeft: 25,
    marginTop: 10,
    marginBottom: 20,
    fontSize: 25,
    fontWeight: "bold",
    color: "white"
  },
  name: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
    color: "white"
  },
  overview: {
    marginLeft: 5,
    fontSize: 14,
    color: "white"
  }
});
