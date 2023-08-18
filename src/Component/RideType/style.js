import Color from '../../Config/Color';
export default {
    mainView: { flexDirection: 'row', marginVertical: 10, },
    image: { height: 50, width: 70, alignItems: 'center', resizeMode: 'contain', margin: 5, },
    imageView: { flex: 0.25, justifyContent: 'center', },
    viewText: { flexDirection: 'column', flex: 0.52, justifyContent: 'flex-end', },
    distanceText: { color: 'red', fontSize: 14, fontFamily: 'uber', },
    typeText: { color: Color.black, fontSize: 16, fontFamily: 'uber-b', marginBottom: 5 },
    viewPriceText: { flexDirection: 'column', flex: 0.23, justifyContent: 'center', },
    priceText: { color: Color.black, fontSize: 15, fontFamily: 'uber-b', alignSelf: 'flex-end', },
    timeText: { color: Color.steel, fontSize: 14, fontFamily: 'uber', alignSelf: 'flex-end', },
}