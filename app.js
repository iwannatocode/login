const express = require( "express" );
const fs = require( "fs" ).promises;
const app = express();


app.set( 'views', 'views' );
app.set( 'view engine', 'ejs' );

app.use( express.static('static'));
app.use( express.urlencoded({extended:true}) );
app.use( express.json() );

// accede a la pagina de inicio
app.get( '/', (req, res, next)=>{   
     res.render( 'index' );
     res.end();
});

//accede a la pag del registro cuando pinchas el link
app.get( '/regist',  (req, res, next)=>{
    res.render( 'regist' );
    res.end();
});

//compruebas q estes registrado o no
app.get( '/pag', async(req, res, next)=>{
    try {
        let user, pasw, array;
        user = req.query.user;
        pasw = req.query.pasw;
        array = await read_document();
        for( let i = 1; i <= array[0].total_users; i++ ){            
            if( user == array[i].user ){
                if( pasw == array[i].pasw ){
                    res.send( "<h1 style='color:green; text-align: center; margin-top: 80px; font-size: 80px;'> Working on it...</h1>" )
                }
            }            
            //console.log( array[i].user + '  '+ array[i].pasw );
        }
        res.send( "<h1 style='color:red; text-align: center; margin-top: 80px; font-size: 60px;'> no estas registrado papasito</h1>" )
    }
    catch(err){
    }    
});


//te registra en la pagina
app.post( '/regist', async (req, res, next)=>{
   try{ 
       let user, pasw, array, index, result;
        user = req.body.user;
        pasw = req.body.pasw;
        array =  await read_document();
        array[0].total_users += 1;
        index = array[0].total_users;
        array[index] = { user:  user, pasw: pasw };
        result =  JSON.stringify( array );
        await write_document( result );
        console.log( "ok" );
        res.render( 'index' );
    }
    catch(err){ 
        console.log( err );
    }
});



app.listen(1313);




//------------------------------------------------------------------------
// esta es la funcion q lee el txt y lo almacena en la var array
const read_document = async ()=>{
    try{
        const document = await fs.readFile( './users.txt' );
        return  JSON.parse(document);
    }
    catch(err){
         console.log( err );
        return err;
        
    }
}

//esta es la funcion q escribe( guarda los datos ) en el txt
const write_document = async ( result )=>{
    try{
        await fs.writeFile( './users.txt', result );
    }
    catch(err){ 
            console.log( err );
    }
}