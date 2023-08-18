import Color from '../../Config/Color'
export default {
  container: {
    flex: 1,
    backgroundColor: Color.white,
    position: "absolute",
    marginTop: 40,
    marginLeft: 15,
    opacity: 1,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: Color.steel,
    shadowOpacity: 0.3,
    elevation: 3,
    borderRadius: 45,
    borderColor: Color.steel
  },
  image: {
    width: 20,
    height: 20,
    alignItems: "center",
    resizeMode: "contain",
    margin: 10
  },
  imageView: { flex: 0.15, justifyContent: "center" }
};
