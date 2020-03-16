import React, { Component } from "react";
import {
  StyleSheet,
  View,
  AsyncStorage,
  SafeAreaView,
  ScrollView,
  FlatList
} from "react-native";
import { Icon } from "native-base";
import axios from "axios";

import MyList from "./MyList";
import * as API from "../../API_Key.js";

const API_KEY2 = API.getAPI_KEY2(); // 줄거리 받아오기

export default class App extends Component {
  static defaultProps = {
    title: []
  };

  constructor(props) {
    super(props);
  }

  state = {
    list: [], //영화 제목 list
    results: [], // json 오브젝트
    addDate: [],
    flag: true
  };

  //네비게이션 바
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-star-outline" style={{ color: tintColor }} />
    )
  };

  // 로컬스토리지 초기화
  _AllKeys = async () => {
    try {
      tempKey = await AsyncStorage.getAllKeys();
      this.setState({
        list: tempKey
      });
    } catch (error) {}
  };

  // 초기 스토리지값 불러오기
  setData = async () => {
    try {
      await this._AllKeys(); // 로컬스토리지에서 this.state.list로 이름 받아오기

      var length = this.state.list.length;
      for (let i = 0; i < length; i++) {
        axios
          .get(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY2}&query=${this.state.list[i]}&language=ko-KR&page=1`
          )
          .then(response => {
            var result = this.state.results.concat(response.data.results[0]);
            this.setState({
              results: result
            });
          });
      }
    } catch (error) {
      alert(error);
    }
  };

  componentDidMount() {
    this.setData();
  }

  // 해당 영화에 detail로 이동
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

  // props를 받아온 후 (새로운 데이터 추가된 후) 부터는 초기화면으로 안 감
  componentWillReceiveProps() {
    this.setState({
      flag: false
    });
  }

  render() {
    //AsyncStorage.clear();

    const { navigation } = this.props;
    var addlist = navigation.getParam("keys", ""); // 새로 넘겨 받은 리스트

    const { flag } = this.state;
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <ScrollView>
            <View>
              {flag === true ? (
                <FlatList
                  data={this.state.results}
                  renderItem={({ item }) => {
                    return (
                      <MyList
                        name={item.title}
                        backdrop_path={item.backdrop_path}
                        _onPress={this._onPressButton.bind(
                          this,
                          `${item.title}`
                        )}
                      />
                    );
                  }}
                />
              ) : (
                <FlatList
                  data={addlist}
                  renderItem={({ item }) => {
                    return (
                      <MyList
                        name={item.title}
                        backdrop_path={item.backdrop_path}
                        _onPress={this._onPressButton.bind(
                          this,
                          `${item.title}`
                        )}
                      />
                    );
                  }}
                />
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1
  }
});
