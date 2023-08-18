import {Dimensions} from 'react-native'
let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;
import Color from "../../Config/Color";
export default{
    cardView:{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        marginTop: height / 3,
        marginHorizontal: 20,
        backgroundColor: Color.white,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        borderRadius: 10,
        elevation: 3,
        shadowOffset: { height: 10, width: 10 },
        shadowOpacity: 0.3,
        shadowColor: Color.steel
        //  borderColor: Color.steel,
        //  borderWidth: 2
      }
}