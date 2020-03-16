import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { CardItem } from "native-base";

export default class MyList extends Component {
  static defaultProps = {
    name: "",
    backdrop_path: "",
    _onPress: () => null
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.lowContainer}>
        <View style={styles.leftContainer}>
          <CardItem style={styles.container}>
            {
              <TouchableOpacity onPress={this.props._onPress}>
                <Image
                  style={styles.poster}
                  source={{
                    uri: `https://image.tmdb.org/t/p/original/${this.props.backdrop_path}`
                  }}
                />
              </TouchableOpacity>
            }
          </CardItem>
        </View>
        <View style={styles.rightContainer}>
          <CardItem style={styles.container}>
            <View style={styles.container}>
              <TouchableOpacity onPress={this.props._onPress}>
                <Text style={styles.textStyle}>{this.props.name}</Text>
              </TouchableOpacity>
            </View>
          </CardItem>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1
  },
  lowContainer: {
    marginLeft: 15,
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
  poster: {
    resizeMode: "cover",
    flex: 10,
    width: "40%",
    height: 80,
    paddingHorizontal: 58,
    alignItems: "stretch",
    borderRadius: 7
  },
  textStyle: {
    fontSize: 16,
    color: "white"
  }
});
