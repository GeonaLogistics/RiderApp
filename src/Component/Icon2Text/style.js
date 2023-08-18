import Color from '../../Config/Color';
export default{
    mainView:{flexDirection:'row',marginVertical: 10,},
    image:{width:30,height:30,alignItems:'center', resizeMode: 'contain',},
    imageView:{flex:0.15,justifyContent:'center'},
    viewText:{flexDirection:'column',flex:0.85,justifyContent:'center'},
    titleText:{color:Color.steel,fontSize:14,fontFamily:'uber',marginVertical:5},
    addressText:{color:Color.black,fontSize:16,fontFamily:'uber',marginBottom:5},
}