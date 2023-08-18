import Color from "../../Config/Color";
export default {
  mainView: {
    flexDirection: "row",
    backgroundColor: Color.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: Color.steel,
    borderBottomWidth: 0.2,
    borderTopColor: Color.steel,
    borderTopWidth: 0.2,
   
  },
  image: { width: 23, height: 23, alignItems: "center", resizeMode: "contain" },
  imageView: { flex: 0.05, justifyContent: "center" },
  viewText: { flex: 0.95, justifyContent: "center" },
  addressText: {
    color: Color.black,
    fontSize: 18,
    fontFamily: "uber",
    marginBottom: 5
  }
};
