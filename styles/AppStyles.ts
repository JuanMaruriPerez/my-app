import { StyleSheet } from "react-native";

export default StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 10,
  },
  input_login: {
    width: '80%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", // Fondo del contenedor principal
  },
  container_basic:{
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "#ffffff", // Fondo del contenedor principal
    borderWidth: 1,     // Ancho del borde
    borderColor: "#aaaaaa", // Color del borde
    paddingTop: 20,  // Padding superior
    paddingLeft: 10,  // Padding izquierdo
    paddingRight: 10,
  },
  container_insert:{
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderWidth: 1,     // Ancho del borde
    borderColor: "#aaaaaa", // Color del borde
    padding: 20,
  },
  container_bottom: {
    flex: 1,
    justifyContent: "flex-end",
  },
  imageContainer: {
    backgroundColor: "#ffffff", // Fondo sólido del contenedor de la imagen
    padding: 10, // Espaciado interno si es necesario
  },
  image: {
    width: 200,
    height: 200, // Dimensiones de la imagen
  },
  text: {
    fontSize: 25, // Tamaño del texto
  },
  link: {
    marginTop: 10,
    color: 'blue',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});
