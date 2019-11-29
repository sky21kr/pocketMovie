import React from "react";
import { AsyncStorage } from "react-native";
import Loading from "./Loading";
import axios from "axios";

const API_KEY = "2bf00f660b1a6a3ffeb6e06ac270cce3";
const NAVER_CLIENT_ID = "KqPsntd1hcPJ8FUPBGqN";
const NAVER_CLIENT_SECRET = "0GRb3uya1U";

// const option = {
//   query: "겨울왕국"
// };

// request.get(
//   {
//     uri: "https://openapi.naver.com/v1/search/movie", //xml 요청 주소는 https://openapi.naver.com/v1/search/image.xml
//     qs: option,
//     headers: {
//       "X-Naver-Client-Id": NAVER_CLIENT_ID,
//       "X-Naver-Client-Secret": NAVER_CLIENT_SECRET
//     }
//   },
//   function(err, res, body) {
//     let json = JSON.parse(body); //json으로 파싱
//     console.log(json);
//   }
// );

export default class extends React.Component {
  state = {
    isLoading: true
  };
  getNaverApi = async () => {
    fetch("https://openapi.naver.com/v1/search/movie.json?query='겨울왕국 2'", {
      headers: {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_SECRET
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json.items[0].image);
      });
  };
  getMovieList = async () => {
    axios
      .get(
        `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${API_KEY}&targetDt=20191129`
      )
      .then(response => {
        for (var i = 0; i < 10; i++) {
          console.log(
            response.data.boxOfficeResult.dailyBoxOfficeList[i].movieNm
          );
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.getMovieList();
    this.getNaverApi();
  }
  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <Weather temp={Math.round(temp)} condition={condition} />
    );
  }
}
