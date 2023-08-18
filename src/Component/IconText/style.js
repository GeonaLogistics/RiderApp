import Color from '../../Config/Color';
export default {
    mainView: { flexDirection: 'row', marginVertical: 10, },
    image: { width: 23, height: 23, alignItems: 'center', resizeMode: 'contain', },
    imageView: { flex: 0.1, justifyContent: 'center' },
    viewText: { flex: 0.9, justifyContent: 'center' },
    addressText: { color: Color.black, fontSize: 13, fontFamily: 'uber', marginBottom: 5 },
}