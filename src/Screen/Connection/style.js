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
    // backgroundColor: "red",
    width: width
  },
  subContainerView: {
    backgroundColor: Color.white,
    width: width,
    borderLeftColor: Color.steel,
    borderRightColor: Color.steel,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    opacity: 1,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "#CBCBCB",
    //  shadowOpacity: 1,
    elevation: 3,
  },
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: width,
    position: 'absolute',
    top: 30
  },
  offlineText: { color: '#fff' },
  view: { flexDirection: 'row', alignSelf: 'center', },
  optionView: { flexDirection: 'column', flex: 33.33, },
  image: { height: 40, width: 40, alignSelf: 'center', marginVertical: 5, resizeMode: 'contain' },
  text: { fontSize: 14, fontFamily: 'uber', alignSelf: 'center', marginVertical: 5, color: Color.steel },

};
