import React, { Component } from "react";
import {
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from "react-native";
import { Card, CardItem, Icon } from "native-base";
import axios from "axios";
import * as API from "../../API_Key.js";

const API_KEY2 = API.getAPI_KEY2(); // 줄거리 받아오기
const NAVER_CLIENT_ID = API.getNAVER_CLIENT_ID();
const NAVER_CLIENT_SECRET = API.getNAVER_CLIENT_SECRET();

export default class Search extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-search" style={{ color: tintColor }} />
    )
  };

  state = {
    typing: "",
    keyword: "",
    items: [],
    info: [],
    results: []
  };

  getDB = async search => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=840724c8aa8b3b7c4ab68db53310cc9f&query=${search}&language=ko-KR&page=1`
      )
      .then(response => {
        this.setState({ results: response.data.results });
        console.log(response.data.results);
      });
  };

  getNaverApi = async search => {
    fetch(`https://openapi.naver.com/v1/search/movie.json?query="${search}"`, {
      headers: {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_SECRET
      }
    })
      .then(response => response.json())
      .then(json => this.setState({ items: json.items }));
  };

  searching = typing => {
    this.setState({
      keyword: typing,
      typing: ""
    });
    this.getDB(typing);
  };

  _onPressButton = async temp => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY2}&query=${temp}&language=ko-KR&page=1`
      )
      .then(response => {
        var data = response.data.results[0];
        this.props.navigation.navigate("Detail", {
          title: data.title,
          overview: data.overview + "\n\n\n",
          release_date: data.release_date,
          url: data.poster_path,
          back: data.backdrop_path
        });
      });
  };

  render() {
    console.log("1");
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <View style={styles.input}>
              <TextInput
                style={styles.inputText}
                placeholder="Search"
                autoCorrect={false}
                value={this.state.typing}
                onChangeText={typing => this.setState({ typing })}
              />
              <TouchableOpacity
                onPress={() => this.searching(this.state.typing)}
              >
                <Icon name="ios-search" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container}>
            <SafeAreaView>
              <ScrollView>
                <View style={styles.container}>
                  <Card>
                    {this.state.results.map(result => (
                      <View style={styles.lowContainer}>
                        <View style={styles.leftContainer}>
                          <CardItem style={styles.container}>
                            {
                              <TouchableOpacity
                                onPress={() =>
                                  this._onPressButton(result.title)
                                }
                              >
                                <Image
                                  source={{
                                    uri: `https://image.tmdb.org/t/p/original/${result.poster_path}`
                                  }}
                                  style={styles.poster}
                                />
                              </TouchableOpacity>
                            }
                          </CardItem>
                        </View>
                        <View style={styles.rightContainer}>
                          <View style={styles.rightUpContainer}>
                            <TouchableOpacity
                              onPress={() => this._onPressButton(result.title)}
                            >
                              <Text style={styles.name}>{result.title}</Text>
                            </TouchableOpacity>
                          </View>
                          <View style={styles.rightDownContainer}>
                            <CardItem style={styles.container}>
                              <TouchableOpacity
                                onPress={() =>
                                  this._onPressButton(result.title)
                                }
                              >
                                <Text style={styles.overview}>
                                  {result.overview.length < 60
                                    ? `${result.overview}`
                                    : `${result.overview.substring(
                                        0,
                                        57
                                      )}...\n`}
                                </Text>
                              </TouchableOpacity>
                            </CardItem>
                          </View>
                        </View>
                      </View>
                    ))}
                  </Card>
                </View>
              </ScrollView>
            </SafeAreaView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
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
  poster: {
    resizeMode: "cover",
    flex: 10,
    width: "30%",
    height: 160,
    marginLeft: 10,
    paddingHorizontal: 50,
    alignItems: "stretch",
    borderRadius: 7
  },
  name: {
    fontSize: 16,
    color: "white"
  },
  overview: {
    fontSize: 14,
    color: "white"
  }
});
