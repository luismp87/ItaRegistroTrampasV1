var fn = {
	ready: function(){
		document.addEventListener("deviceready",fn.init,false);
	},
	init: function(){ 
    //$('#textREVISO').val(""+ window.localStorage.getItem("revisa"));          
        if(window.localStorage.getItem("yamigrousuarios") != "SI")
        {          
        fn.btnMigrarUsuarios();  
        }
        
 
        if(fn.estaRegistrado() == false)
        {
        window.location.href = '#login';      
        }
        else
        {
        //$("#textORIGEN").text("Origen de usuario: " + window.localStorage.getItem("origen").toUpperCase());
        //window.location.href = '#Registro';     
        }
        //PARA MOVIL
        $('#btnautentificar').tap(fn.autentificarSQL);          
        
        //PARA MOVIL
         document.addEventListener("online", almacen.leerinformacionregistrada_en_movil, false);
        ////////////
 
	},
        btnMigrarUsuarios: function(){    
        navigator.notification.alert("intentando migrar usuarios",null,"Mensaje desarrollo","Aceptar");     
        var myArray = new Array(60); 
        var registros = $('#NumUsuarios').val();  
        if(registros == 0)
            {
                $.mobile.loading("show",{theme: 'b'});
                $.ajax({
                method: 'POST',
                url: 'http://servidoriis.laitaliana.com.mx/LM/wsshregistrotrampas/WebService1.asmx/enviarcatalogocompletodeusuarios',              
                //data: {usuario: nom, contrasena: passw},
                dataType: "json",
                success: function (msg){
                    $.mobile.loading("hide");
                    $.each(msg,function(i,item){
                        myArray[i] = msg[i].usuario + "','" + msg[i].pass + "','" + msg[i].origen;
                    }); 
                    almacen.guardarUsuario(myArray);
                    almacen.leerNumeroUsuarios();  
                    window.localStorage.setItem("yamigrousuarios","SI");
                    navigator.notification.alert("Migración Correcta de Usuarios",null,"Listo","Aceptar");               
        },
        error: function(jq, txt){
                    //alert("Error al migrar los usuarios del servidor, cierre y vuelva a abrir la aplicación para reintentar actualizar ó verifique su cobertura" +jq + txt.responseText);///*PARAWEB
                    navigator.notification.alert("Error al migrar los usuarios del servidor, cierre y vuelva a abrir la aplicación para reintentar actualizar ó verifique su cobertura" + jq + txt.responseText,null,"Error al migrar verifique su cobertura","Aceptar");///*PARAMOVIL
                }
            });
                    //navigator.notification.alert("a guardar",null,"Error al Ingresar","Aceptar");    
                            //almacen.guardarEXT(fn.id_ext, fn.ubicacion,fn.capacidad,fn.clase,fn.agente,fn.marca,fn.frecarga,fn.ffabricacion,fn.fproxservicio);
                    
                    }
                    else
                    {
                       //alert("Se tienen registros en la base de datos, antes eliminelos"); ///*PARAWEB
                       navigator.notification.alert("Se tienen registros en la base de datos, antes eliminelos",null,"Advertencia","Aceptar");///*PARAMOVIL    
                    }
        
    },
        autentificarSQL: function(){
        var usu = $('#txtusuario').val();      
        var con = $('#txtcontrasena').val();         

        if((usu != '') || (con != '')){   
            $.mobile.loading("show",{theme: 'b'});
            almacen.leerinformacionUsuario();
            $.mobile.loading("hide");
        }
        else{
            navigator.notification.alert("Ingrese los datos requeridos",null,"Error al Ingresar","Aceptar");///*PARAMOVIL
            //alert("Ingrese los datos requeridos");///*PARAWEB
        }   
    },
    estaRegistrado: function(){
        var usr = window.localStorage.getItem("user");
        if(usr == undefined || usr == '' || usr == null)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
};
//$(fn.init);
$(fn.ready);