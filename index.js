const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const path = require('path');

//setting app 
app.set('port', process.env.PORT || 3001);

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));


    let datos = [{
        "id":"0", 
        "nombre": "Juan Perez",
        "hora":"10:00",
        "dia":"Martes",
        "fono" : "9876553",
        "email":"Juanperez@gmail.com",
        "edad" : "27", 
        "MotivoConsulta": "Asesoria legal"
    },
    {

        "id": "1",
        "nombre": "Marcelo Jiroca",
        "hora": "12:00",
        "dia": "Lunes",
        "fono":"1238123",
        "email":"MarceloJiroc@gmail.com",
        "edad":"30",
        "MotivoConsulta":"Asesoria"

    }
];

   

//router
app.get('/Tabla',(req,res)=>{
    res.json(datos);

});


//POST
app.post('/nuevaRuta', (req, res)=>{
    const datosRecibidos = req.body;

    //verificar si la hora y el dia son iguales 
    const duplicado = datos.some(dato => dato.hora === datosRecibidos.hora && dato.dia === datosRecibidos.dia);

    if (duplicado) {
        res.status(400).json({ error: 'Error: la hora y el dia coinciden con un dato existente'});
    } else {

        //Si no hay duplicados
        datos.push(datosRecibidos);
        res.json({ mensaje: 'Datos recibidos correctamente', datos: datosRecibidos});
        
    }

    //console.log(datosRecibidos);
});


//servicio HTTP
/*app.listen(app.get('port'), ()=>{
    console.log(`Funcionando correctamente! ${app.get('port')}`);
} );*/

const sslServer = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, 'certification','key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'certification','cert.pem')),
    },
    app

);

sslServer.listen(app.get('port'), ()=>{
    console.log(`Funcionando correctamente! ${app.get('port')}`);
});

