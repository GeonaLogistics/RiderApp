import Color from "../../Config/Color";

export default {
  keyboardAvoidContainer: {
    flex: 1,
    backgroundColor: Color.whiteSmoke
  },
  item: {
    color: Color.white,
    fontSize: 14,
    margin: 5,
    fontFamily: "uber"
    //backgroundColor: Color.black,
  },
  imageProfileView: {
    borderRadius: 30,
    height: 60,
    width: 60,
    justifyContent: "flex-end",
    //margin: 5,
    alignSelf: "center",
    margin: 10
  },
  imageProfile: { flex: 1, alignSelf: "center", resizeMode: "contain" }
};
