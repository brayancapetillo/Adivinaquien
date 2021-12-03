const express = require('express');
const app = express();

const morgan = require('morgan')
const db = require('./databases')

const server = require('http').Server(app)
const io = require('socket.io')(server);


app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.get('/consultaperso/:id',async (req,res)=>{

    const id = req.params.id

    const result = await db.query("select * from staticspersonales where id_user = ?",[id])

    if(!result){
        console.log("que pedoooooo")
    }

    res.json({
        status:true,
        staticsPersFecha:result,
        message:"simon carnal consulta por id"
    })

})





app.post('/staticspersoninsert',async (req,res) =>{ //funcion flecha

    const registrar= req.body

    console.log(registrar)

    const result = await db.query("insert into staticspersonales SET ?",[registrar])
    
    if(!result.insertId){
        return res.json({
            status:false,
            message:"no se qe pedo statics personales"
        })
    }

    res.json({
        status:true,
        message:"Te has Registrado statics personales"
    })

    
    
});






app.post('/staticsinsertar',async (req,res) =>{ //funcion flecha

    const staticsinsertar= req.body

    console.log(staticsinsertar)

    const result = await db.query("update statics set wins=?, loos=?,games=?  where id_user=?;",[staticsinsertar.wins,staticsinsertar.loos,staticsinsertar.games,staticsinsertar.id_user])

    console.log(result)

    if(!result.affectedRows){
        return res.json({
            status:false,
            message:"no se qe pedo registrarstatics"
        })
    }



    res.json({
        status:true,
        message:"Te has Registrado statics"
    })
});




app.post('/registrar',async (req,res) =>{ //funcion flecha

    const registrar= req.body

    console.log(registrar)

    const result = await db.query("insert into user SET ?",[registrar])
    
    if(!result.insertId){
        return res.json({
            status:false,
            message:"no se qe pedo registrar"
        })
    }

    const insertstatic= await db.query("insert into statics SET ?",[{id_user:result.insertId,wins:0,loos:0,games:0}])

    if(!insertstatic.affectedRows){
        return res.json({
            status:false,
            message:"no se qe pedo insert"
        })
    }

    console.log(result)

    



    res.json({
        status:true,
        message:"Te has Registrado"
    })
});


app.get('/users',async function (req, res){

    const users = await db.query('select * from user')

    if(!users){
        console.log("que pedoooooo")
    }

    res.json({
        status:true,
        userinfo:users,
        message:"simon carnal users"
    })
});


app.get('/statics',async function (req, res){

    const statis = await db.query('select * from statics')

    if(statis){
        console.log("que pedoooooo")
    }

    res.json({
        status:true,
        statusInfo:statis,
        message:"simon carnal statis"
    })
});


app.get('/staticsglobales',async function (req, res){

    const statis = await db.query('select * from staticsfull order by wins desc')

    res.json({
        status:true,
        statusInfo:statis,
        message:"simon carnal statis"
    })
});


app.get('/personajes',async function(req,res){
    const personajes = await db.query('select * from personajesview')

    if(!personajes){
        console.log("NOOO")
    }

    res.json({
        status:true,
        personajes: personajes,
        message:"simon carnal"
    });
});



io.on('connection', (socket) => {

    const idHandShake = socket.id;

    const { nameRoom } = socket.handshake.query;

    socket.join(nameRoom);  // Se une a una sala

    console.log(`Hola dispositivo ${idHandShake} conectado a --> ${nameRoom}`);


    socket.on("myper", (idp) => {
        console.log(idp)
        socket.to(nameRoom).emit("recper",idp)
    })

    socket.on("mypers", (idp) => {
        console.log(idp)
        socket.to(nameRoom).emit("recpers",idp)
    })

    socket.on("question", (msg) => {
        console.log(msg)
        socket.to(nameRoom).emit("response",msg)
    })

    socket.on("sendres", (msg) => {
        console.log(msg)
        socket.to(nameRoom).emit("sendresp",msg)
    })

    socket.on("habilitar", (msg) => {
        console.log(msg)
        socket.to(nameRoom).emit("app",msg)
    })
    
    

    socket.on('disconnect', () => {

        console.log('user disconected');

        if(nameRoom=="inicio"){

            count--

            console.log(count)

            socket.to(nameRoom).emit("unavailable", count)

        }

    });
})



server.listen(3000, () =>{
console.log('Server on port:',3000);})


