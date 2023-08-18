import Color from "../../Config/Color";
export default {
  mainView: {
    flexDirection: "row",
    marginVertical: 10,
    flex:1,
    marginHorizontal: 5,
    alignItems: 'flex-start',
   // backgroundColor: Color.steel,
  },
  image: { width: 23, height: 23, resizeMode: "contain" },
  imageView: { 
      //flex: 0.2 ,
      marginHorizontal: 5,
    },
  viewText: { 
     // flex:0.8
     marginHorizontal: 5,
    // justifyContent: 'center',
   
    },
  addressText: {
    color: Color.black,
    fontSize: 14,
    fontFamily: "uber",
    justifyContent: 'center',
   // marginBottom: 5
  },
  priceText: {
    color: Color.black,
    fontSize: 14,
    fontFamily: "uber",
    justifyContent: 'center',
   // marginBottom: 5
  },
};
