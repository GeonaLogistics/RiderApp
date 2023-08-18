import Color from "../../Config/Color";
import { Dimensions } from "react-native";
let width = Dimensions.get("window").width;
export default {
  container: {
    flex: 1,
    backgroundColor: Color.white,
    position: "absolute",
    width: "80%",
    alignSelf: "center",
    margin: 50,
    opacity: 1,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: Color.steel,
    shadowOpacity: 0.3,
    elevation: 3,
    borderRadius: 45,
    borderColor: Color.steel
  },
  subContainerView: {
    //position: "absolute",
    top: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: "red",
    width: width,

  },
  image: { width: 20, height: 20, alignItems: "center", resizeMode: "contain" },
  imageView: { flex: 0.15, justifyContent: "center" },
  viewText: { flexDirection: "column", flex: 0.85, justifyContent: "center" },
  titleText: {
    color: Color.steel,
    fontSize: 14,
    fontFamily: "uber",
    marginVertical: 5
  },
  addressText: {
    color: Color.black,
    fontSize: 16,
    fontFamily: "uber",
    marginBottom: 5,
    elevation: 7
  },
  image2: {
    width: 20,
    height: 20,
    alignItems: "flex-end",
    resizeMode: "contain",
    marginBottom: 5
  },
  imageView2: { alignSelf: "flex-end", flex: 0.1 }
};
