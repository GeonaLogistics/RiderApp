import Color from "../../Config/Color";
let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;
import {Dimensions} from "react-native";
export default{
    cardView:{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        marginTop: height/4.2,
        marginHorizontal: 15,
        backgroundColor: Color.white,
        justifyContent: "center",
        alignSelf: 'center',
        flex: 1,
        borderRadius: 10,
        opacity: 1,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: Color.whiteSmoke,
        //  shadowOpacity: 1,
        elevation: 2
      }
}