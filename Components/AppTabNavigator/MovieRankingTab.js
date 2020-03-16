import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  AsyncStorage
} from "react-native";
import { Icon } from "native-base";
import axios from "axios";
import RankUI from "./RankUI";
import * as API from "../../API_Key.js";

const API_KEY = API.getAPI_KEY1(); // 영하 순위 받아오기
const API_KEY2 = API.getAPI_KEY2(); // 줄거리 받아오기

export default class MovieRankingTab extends Component {
  state = {
    rankingList: []
  };
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-trophy" style={{ color: tintColor }} />
    )
  };

  getMovieList = async date => {
    axios
      .get(
        `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${API_KEY}&targetDt=${date}`
      )
      .then(response => {
        var ranking = response.data.boxOfficeResult.dailyBoxOfficeList;

        var infos = []; // 전체 정보

        var info = {
          // 객체 생성
          name: "",
          url: "",
          overview: ""
        };

        // 랭킹 순으로 이름 정보 가져오기
        for (let i = 0; i < 10; i++) {
          info.name = ranking[i].movieNm;
          infos.push(info);
          info = {
            name: "",
            url: "",
            overview: ""
          };
        }

        // 영화이름으로 포스터 url, 줄거리 가져오기
        for (let i = 0; i < 10; i++) {
          name = infos[i].name;
          axios
            .get(
              `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY2}&query=${name}&language=ko-KR&page=1`
            )
            .then(response => {
              infos[i].url = response.data.results[0].poster_path;
              infos[i].overview = response.data.results[0].overview;
              if (i == 9) {
                this.setState({
                  rankingList: infos
                });
              }
            });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  printData = async key => {
    value = await AsyncStorage.getItem(key);
    console.log(value);
  };

  componentDidMount() {
    var month = new Date().getMonth() + 1; //Current Month
    if (month < 10) {
      month = "0" + month;
    }
    var day = new Date().getDate() - 1; // 어제 일짜
    if (day == 1) {
      day = 30;
      month = month - 1;
      if (month == 0) {
        month == 12;
      }
    } else if (day < 10) {
      day = "0" + day;
    }
    var year = new Date().getFullYear(); //Current Year
    var date = year + "" + month + day;
    this.getMovieList(date);
  }

  //눌렀을 때 디테일 텝으로 이동
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
    return (
      <SafeAreaView style={style.container}>
        <ScrollView>
          <FlatList
            data={this.state.rankingList}
            renderItem={({ item }) => {
              return (
                <View>
                  <RankUI
                    name={item.name}
                    imgur={item.url}
                    overview={item.overview}
                    _onPress={this._onPressButton.bind(this, `${item.name}`)}
                  />
                </View>
              );
            }}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  }
});
