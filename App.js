import { StatusBar } from 'expo-status-bar';
//implementacion de librerias para los elementos necesarios
import { StyleSheet, Text, View, FlatList, Button, TextInput, Alert, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useState } from 'react'

let productos = [
  { nombre: "Galleta Amor ", categoria: "Snacks", precioCompra: 0.90, precioVenta: 1.10, id: 20 },
  { nombre: "Galleta Amor ", categoria: "Snacks", precioCompra: 0.90, precioVenta: 1.10, id: 12 }


];

//validar si una persona existe
let esNuevo = true;
// contador para elegir el indice del arrego 
let indice_selectionado = -1


export default function App() {

  // variables de estado para ingresar los productos
  const [txt_codigo, setCodigo] = useState();
  const [txt_nombre, setNombre] = useState();
  const [txt_categoria, setCategoria] = useState();
  const [txt_p_compra, setCompra] = useState();
  const [txt_p_venta, setVenta] = useState();
  const [numElementos, setElementos] = useState(productos.length);
  //declaracion de variable para utilizar el modal
  const [modalVisible, setModalVisible] = useState(false);
  //creacion de la propiedad 




  let ItemProductos = (props) => {

    return (

      <View  >
      
        <TouchableOpacity style={styles.itemProducto}
        //el tochable sirve para hacer boton a culquier elemento
          onPress={() => {
            setNombre(props.producto.nombre);
            setCategoria(props.producto.categoria);
            setCompra(props.producto.precioCompra);
            setCodigo(props.producto.id);
            setVenta(props.producto.precioVenta)
            esNuevo = false;
            indice_selectionado = props.indice;

          }}


        >



          <View style={styles.item_indice} >
            <Text style={styles.texto_principal} > {props.producto.id + "  "}</Text>
          </View>

          <View style={styles.item_contenido} >
            <Text style={styles.texto_principal}> {props.producto.nombre}   {props.producto.precioVenta + "$"}    </Text>

            <Text style={styles.textoSecundario}>  {props.producto.categoria}</Text>
          </View>

          <View style={styles.item_botones}>

            <Modal
              // modal sirve para mostrar una pantalla sobrepuesta de la principal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}

            >

              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}> Desea eliminar el Producto ?</Text>

                  <Pressable
                  //sirve para hacer boton a un objeto que tenga funcionalidad onpress igual que el TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.modalText}> Cancelar</Text>

                  </Pressable>

                  <Pressable
                    style={[styles.button, styles.buttonEliminar]}

                    onPress={() => {
                      setModalVisible(!modalVisible)
                      indice_selectionado = props.indice
                      //funcion para borrar elementos
                      productos.splice(indice_selectionado, 1)
                      setElementos(productos.length)


                    }}

                  >
                    <Text style={styles.modalText}> Aceptar</Text>

                  </Pressable>



                </View>

              </View>


            </Modal>





            <Button
              title='X'
              color="#e63946"

              onPress={() => {

                setModalVisible(true)


              }}


            />





          </View>
        </TouchableOpacity>




      </View>

    )


  }

  //funcion para limpiar campos 

  let limpiar = () => {
    setCategoria(null);
    setCodigo(null);
    setNombre(null);
    setCompra(null);
    setVenta(null);
    esNuevo = true;
  }

  //funcion para validar productos

  let existeProducto = () => {
    for (let i = 0; i < productos.length; i++) {

      if (productos[i].id == txt_codigo) {
        return true
      }
    }

    return false;

  }
  //funcion para validar campos vacios

  let camposVacios = () => {


    if (txt_categoria == null || txt_nombre == null || txt_codigo == null || txt_p_compra == null || txt_p_venta == null) {
      return true
    }


    return false;
  }

  //funcion agregar productos

  let guardaProducto = () => {
    //validaciones para  agregar un nuevo producto
    if (esNuevo) {
      if (camposVacios()) {
        Alert.alert("INFO", "Existen Campos vacios");
      }
      else if (existeProducto()) {
        Alert.alert("INFO", "Ya existe un producto con este codigo:" + txt_codigo);
      }


      else {

        let producto = { nombre: txt_nombre, categoria: txt_categoria, precioCompra: txt_p_compra, precioVenta: txt_p_venta, id: txt_codigo }

        productos.push(producto);
      }
    }
    else {
      //solo estos campos se pueden editar una vez ya creado el producto
      productos[indice_selectionado].nombre = txt_nombre;
      productos[indice_selectionado].categoria = txt_categoria;
      productos[indice_selectionado].precioCompra = txt_p_compra;
    }
    limpiar();
    setElementos(productos.length);

  }

  //parte visual
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.area_cabecera}>

          <View  >
            <Text style={styles.titulo} >PRODUCTOS</Text>
          </View>

          <TextInput

            style={styles.txt}
            value={txt_codigo}
            placeholder="Codigo : "
            onChangeText={setCodigo}
            keyboardType="numeric"
            editable={esNuevo}


          />

          <TextInput
            //para el nombre del producto
            style={styles.txt}
            value={txt_nombre}
            placeholder="Nombre: "
            onChangeText={setNombre}



          />


          <TextInput
            style={styles.txt}
            value={txt_categoria}
            placeholder="Categoria "
            onChangeText={setCategoria}


          />

          <TextInput
            style={styles.txt}
            value={txt_p_compra}
            placeholder="Precio Compra"
            keyboardType="numeric"
            onChangeText={(txt) => {

              setCompra(txt);
              setVenta((parseFloat(txt) * 1.20).toFixed(2));
            }}


          />


          <TextInput
            style={styles.txt}
            value={txt_p_venta}
            placeholder="Precio Venta"
            editable={false}






          />

          <View style={styles.area_botones}>
            <Button

              title='Guardar'
              color="#cdcba6"
              onPress={() => {

                guardaProducto();


              }}

            />

            <Button

              color="#cdcba6"
              title='Nuevo'
              onPress={() => {
                limpiar();
              }} />

          </View>

          <View style={styles.elementos}>
            <Text style={styles.elementos}>  Elementos : {numElementos}</Text>
          </View>

        </View>

      </ScrollView>



      <View style={styles.area_contenido}>
        <FlatList
          data={productos}

          renderItem={(elementos) => {

            return <ItemProductos

              indice={elementos.index}
              producto={elementos.item}

            />


          }}

          keyExtractor={(item) => {
            return item.id;
          }}

        />

      </View>


      <View style={styles.area_footer}>

        <Text>Autor: Gustavo Contreras © </Text>

      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cad7e8',
    flexDirection: "column",
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 10

  },
  area_cabecera: {
    flex: 4,
    justifyContent: "center",
    //backgroundColor: "red"
  },
  texto_principal: {

    fontSize: 20,
    marginBottom: 10,



  },
  textoSecundario: {
    fontStyle: "italic",
    fontSize: 16
  }

  ,
  precio: {
    fontWeight: "bold",
    fontSize: 16
  },

  itemProducto: {
    flexDirection: "row",
    backgroundColor: "#55849e",
    borderColor: "#cdcba6",
    borderWidth: 4,
    padding: 12,
    marginBottom: 12,
    borderRadius: 20


  },

  infoProducto: {
    fontSize: 18,
    fontStyle: "italic"
  },

  area_botones: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly"

  },

  area_contenido: {

    flex: 6

  },
  item_indice: {

    flex: 2,
    justifyContent: "center",
    alignContent: "center",


  }
  ,

  item_contenido: {

    flex: 7,
    paddingLeft: 2

  },

  item_botones: {

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 2,

  },
  txt: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "gray",
    paddingTop: 5,
    paddingHorizontal: 5,
    marginBottom: 8


  },

  area_footer:
  {

    flex: 1,
    alignItems: "flex-end"

  },

  titulo: {

    textAlign: "center",
    fontSize: 24,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  elementos: {
    fontWeight: "bold",
    fontSize: 18,
    padding: 3,
    flex: 2,
    alignItems: "flex-end"
  },


  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },

  modalView: {

    
    flexDirection: "row",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5


  },
  button: {
    borderRadius: 20,
    padding: 7,
    elevation: 2,
    margin : 2
  },

  buttonEliminar: {
    backgroundColor: "#e63946",
    
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    flex :3,
    marginBottom: 15,
    textAlign: "center"
  }



});
