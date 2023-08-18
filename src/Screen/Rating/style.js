import Color from "../../Config/Color";
import { Col } from "native-base";
export default {
  imageProfileView: {
    borderRadius: 45,
    height: 90,
    width: 90,
    // justifyContent: "flex-end",
    //margin: 5,
    alignSelf: "center",
    backgroundColor: Color.white
  },
  imageProfile: { flex: 1, alignSelf: "center", resizeMode: "contain" },
  text: {
    textAlign: "center",
    fontSize: 14,
    color: Color.black,
    fontFamily: "uber"
  },
  input: {
    margin: 5,
    borderColor: Color.steel,
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 15,
    fontFamily: "uber",
    height:120,
    backgroundColor: Color.whiteSmoke,
    textAlignVertical: 'top',
    padding:10,
    lineHeight: 23,
    
  },
};
