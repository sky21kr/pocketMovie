import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default class RankUI extends Component {
  static defaultProps = {
    name: "",
    imgur: "",
    overview: "",
    _onPress: () => null
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={style.lowContainer}>
        <View style={style.leftContainer}>
          <TouchableOpacity onPress={this.props._onPress}>
            <Image
              style={style.poster}
              source={{
                uri: `https://image.tmdb.org/t/p/original/${this.props.imgur}`
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={style.rightContainer}>
          <View style={style.rightUpContainer}>
            <TouchableOpacity onPress={this.props._onPress}>
              <Text style={style.name}>{this.props.name}</Text>
            </TouchableOpacity>
          </View>
          <View style={style.rightDownContainer}>
            <TouchableOpacity onPress={this.props._onPress}>
              <Text style={style.overview}>
                {this.props.overview.length < 60
                  ? `${this.props.overview}`
                  : `${this.props.overview.substring(0, 57)}...\n `}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  title: {
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  lowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 20
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  rightContainer: {
    flex: 2
  },
  rightUpContainer: {
    flex: 1,
    paddingTop: 15,
    justifyContent: "center",
    marginLeft: 20
  },
  rightDownContainer: {
    flex: 3,
    paddingTop: 20,
    paddingBottom: 10,
    padding: 15
  },
  poster: {
    resizeMode: "cover",
    flex: 10,
    width: "40%",
    height: 40,
    paddingHorizontal: 58,
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
