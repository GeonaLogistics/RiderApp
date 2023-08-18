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
    elevation: 3,
  },
  view:{flexDirection:'row',alignSelf: 'center',borderColor: Color.steel,borderWidth: 0.5,borderRadius: 10,margin: 10,},
  optionView:{flexDirection:'column',flex:33.33,},
  image:{height:25,width:25,alignSelf:'center',margin: 10,resizeMode:'contain'},
  text:{fontSize:16,fontFamily:'uber-b',alignSelf:'center',color:Color.black,marginTop: 20,marginBottom: 5,},
};
