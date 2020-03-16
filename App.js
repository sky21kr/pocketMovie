import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import MainScreen from "./Components/MainScreen";
import Detail from "./Components/AppTabNavigator/Detail";

const AppStackNavigator = createStackNavigator({
  Main: {
    screen: MainScreen // MainScreen 컴포넌트를 네비게이터에 등록
  },
  Datail: {
    screen: Detail
  }
});

export default createAppContainer(AppStackNavigator);
