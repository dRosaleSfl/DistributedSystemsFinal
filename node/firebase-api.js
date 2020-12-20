const express = require('express');
var cors = require('cors')
const app = express(), bodyParser = require("body-parser");
port = 3000;
app.use(cors())

app.use(bodyParser.json());

// Firebase
const admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: " https://console.firebase.google.com/u/0/project/ebri-music/firestore/data~2Fbiblioteca~2F8SMUqlqYcG5FNpQU75ND "
});
// Base de Datos
let basededatos = admin.firestore();

app.get('/', (req, res) => {
    res.send('Firebase API Works!');
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

// Colecciones
let coleccionBiblioteca = basededatos.collection("biblioteca");
let coleccionPerfil = basededatos.collection("perfil");

//-----------------------------BIBLIOTECA---------------------
// artista
app.post('/artista', (req, res) => {

  /*console.log(req.body.item.name);
  
  console.log(req.body.item.duration_ms);
  
  console.log(req.body.item.artists[0].name);*/
  var aartista=req.body.item.artists[0].name;
 // var dduracion=req.body.item.duration_ms;
// console.log(req.body.item.album.images[0].url);
  var dduracion=req.body.item.id;
  var rola=req.body.item.name;
  var fotoo =req.body.item.album.images[0].url;
  console.log(aartista);
  console.log(dduracion);
  console.log(rola);
  console.log(fotoo);
  coleccionBiblioteca.doc().set({
      foto:fotoo,
      artista:aartista,
      duracion:dduracion,
      nombre_cancion:rola
  }).then(result => {
    res.json({ result: `${JSON.stringify(result)}` });
}).catch(err => {
    res.json({ error: `${err}` });
});
});
app.get('/obtenerartistas', (req, res) => {
  coleccionBiblioteca.get().then(result => {
      var datos = [];
      result.forEach(item => {
          datos.push({
            artista:item.data().artista,
            duracion:item.data().duracion,
            nombre_cancion:item.data().nombre_cancion,
            foto:item.data().foto,
          });
      });
      res.send(datos);
  }).catch(err => {
      res.json({ error: `${err}` });
  });
});
app.post('/elimarartista', (req, res) => {
  
  var dduracion=req.body.item.duracion;
  console.log(dduracion);
  coleccionBiblioteca.doc(dduracion).delete().then(result => {
      result.forEach(item => {
          datos.push({
            artista:item.data().artista,
            duracion:item.data().duracion,
            nombre_cancion:item.data().nombre_cancion,
            foto:item.data().foto,
          });
      });
      res.send(datos);
  }).catch(err => {
      res.json({ error: `${err}` });
  });
});

//----------------------------PERFIL-----------------------

//agregar info
app.post('/agregarInfo', (req, res) => {
    var datos = req.body.perfil;
    coleccionPerfil.doc().set({
        nombre_usuario: datos.nombre_usuario,
        nombre: datos.nombre,
        ape_mat: datos.ape_mat,
        ape_pat: datos.ape_pat,
        correo: datos.correo,
        descripcion: datos.descricion,
        facebook: datos.facebook,
        nacimiento: datos.fecha_nac,
        id: datos.id,
        instagram: datos.instagram,
        profesion: datos.profesion,
        telefono: datos.telefono,
        twitter: datos.twitter,
        foto: datos.foto
    }).then(result => {
        res.json({ result: `${JSON.stringify(result)}` });
    }).catch(err => {
        res.json({ error: `${err}` });
    });
});

//mostrar info
app.get('/obtenerInfo', (req, res) => {
    coleccionPerfil.get().then(result => {
        var datos = [];
        result.forEach(item => {
            datos.push({
                id: item.id,
                nombre_usuario: item.data().nombre_usuario,
                nombre: item.data().nombre,
                ape_pat: item.data().ape_pat,
                ape_mat: item.data().ape_mat,
                correo: item.data().correo,
                descripcion: item.data().descripcion,
                facebook: item.data().facebook,
                instagram: item.data().instagram,
                twitter: item.data().twitter,
                telefono: item.data().telefono,
                fecha_nac: item.data().nacimiento,
                profesion: item.data().profesion,
                imgURL: item.data().foto
            });
        });
        res.send(datos);
    }).catch(err => {
        res.json({ error: `${err}` });
    });
});