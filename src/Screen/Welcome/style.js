import { Dimensions } from "react-native";
import Color from "../../Config/Color";
let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height / 2.5;
export default {
  image: { height: height, width: width },
  viewStyle: { justifyContent: "center", flex: 1, margin: 15 },
  titleText: {
    fontSize: 32,
    color: Color.black,
    fontWeight: "600",
    alignSelf: "center",
    marginVertical: 10
  },
  subTitleText: {
    textAlign: "center",
    fontSize: 18,
    marginVertical: 10,
    color: Color.gray
  },
  linkText: {
    textDecorationLine: "underline",
    color: Color.pink,
    textAlign: "center",
    fontSize: 20,
    margin: 25
  }
};
