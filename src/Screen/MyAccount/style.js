import Color from "../../Config/Color";

export default {
  keyboardAvoidContainer: {
    flex: 1,
    backgroundColor: Color.whiteSmoke,
  },
  item: {
    color: Color.white,
    fontSize: 14,
    margin: 5,
    fontFamily: "uber"
    //backgroundColor: Color.black,
  },
  imageProfileView: {
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "flex-end",
    //margin: 5,
  //  alignSelf: "center",
    margin: 10,
  },
  imageProfile: { flex: 1, alignSelf: "center", resizeMode: "contain" }
};
