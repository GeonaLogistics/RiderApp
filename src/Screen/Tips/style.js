import Color from "../../Config/Color";
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
  imageProfile: { flex: 1, alignSelf: "center", resizeMode: "contain"},
  text: {
    textAlign: "center",
    fontSize: 14,
    color: Color.black,
    fontFamily: "uber"
  },
  input: {
    margin: 5,
    borderColor: Color.whiteSmoke,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontSize: 15,
    fontFamily: "uber",
    height:120,
    backgroundColor: Color.whiteSmoke
  },
};
