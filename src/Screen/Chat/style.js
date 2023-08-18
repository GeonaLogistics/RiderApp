import Color from "../../Config/Color";

export default {
  input: {
    margin: 5,
    borderColor: Color.whiteSmoke,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontSize: 15,
    fontFamily: "uber",
    backgroundColor: Color.white
  },
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    color: "white"
  },
  keyboardAvoidContainer: {
    flex: 1,
    backgroundColor: Color.white
  },
  item: {
    color: Color.white,
    fontSize: 14,
    margin: 5,
    fontFamily:'uber'
    //backgroundColor: Color.black,
  },
  imageProfileView: {
    borderRadius: 30,
    height:60,
    width: 60,
    justifyContent: "flex-end",
    //margin: 5,
    alignSelf: 'center',
   
  },
  imageProfile: { flex: 1, alignSelf: "center", resizeMode: "contain" }
};
