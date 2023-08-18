import { Dimensions } from "react-native";
import Color from "../../Config/Color";
let width = Dimensions.get("window").width;
export default {
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
    width: width
  },
  subContainerView: {
    backgroundColor: Color.white,
    width: "90%",
    borderColor: Color.steel,
    borderWidth: 1,
    borderRadius: 15,
    opacity: 1,
    marginBottom: 30,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "#CBCBCB",
    shadowOpacity: 0.3,
    elevation: 3
  },
  view: { flexDirection: "row", alignSelf: "center" },
  optionView: { flexDirection: "column", flex: 0.25 },
  imageProfileView: {
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    margin: 5
  },
  imageProfile: { flex: 1, alignSelf: "center", resizeMode: "contain" },
  image: {
    height: 40,
    width: 60,
    alignSelf: "center",
    marginVertical: 5,
    resizeMode: "contain"
  },
  textProfileView: {
    flexDirection: "column",
    flex: 0.55,
    marginVertical: 5,
    backgroundColor: "#fff"
  },
  textProfile: {
    fontFamily: "uber-b",
    color: Color.black,
    fontSize: 14,
    marginTop: 2,
    marginLeft: 10,
    justifyContent: "center"
  },
  titleText: {
    fontSize: 12,
    fontFamily: "uber",
    alignSelf: "center",
    marginVertical: 3,
    color: Color.steel
  },
  text: {
    fontSize: 12,
    fontFamily: "uber",
    alignSelf: "center",
    marginVertical: 3,
    color: Color.black
  }
};
