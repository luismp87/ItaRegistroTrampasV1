var fn = {
	ready: function(){
		document.addEventListener("deviceready",fn.init,false);
	},
	init: function(){ 
    //$('#textREVISO').val(""+ window.localStorage.getItem("Nombre_usuario_revisa"));          
        if(window.localStorage.getItem("ya_se_migraron_usuarios") != "SI")
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
        $('#BtnCerrarSesion').tap(fn.CerrarSesion);
        $('#BtnMigrar_trampas_a_celular').tap(fn.Migrar_trampas_a_celular);
        $('#BtnEliminar_trampas_de_celular').tap(fn.Eliminar_trampas_de_celular);
                   
        
        //PARA MOVIL
         document.addEventListener("online", almacen.leerinformacionregistrada_en_movil, false);
        ////////////
 
	},
        btnMigrarUsuarios: function(){    
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
                    window.localStorage.setItem("ya_se_migraron_usuarios","SI");
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
        var usr = window.localStorage.getItem("usuario");
        if(usr == undefined || usr == '' || usr == null)
        {
            return false;
        }
        else
        {
            return true;
        }
    },
    CerrarSesion:function(){
         window.localStorage.setItem("user",'');
         window.localStorage.setItem("revisa",'');
         window.location.href = '#login';   
    },
    Migrar_trampas_a_celular:function(){
        var myArray = new Array(1200); 
        var myArray2 = new Array(15); 
        var registros = $('#Num_trampas_en_local').val();  
        if(registros == 0)
            {
                $.mobile.loading("show",{theme: 'b'});
//MIGRACION DE TRAMPA                
                $.ajax({
                method: 'POST',
                url: 'http://servidoriis.laitaliana.com.mx/LM/wsshregistrotrampas/WebService1.asmx/enviarcatalogocompletodetrampas',              
                //data: {usuario: nom, contrasena: passw},
                dataType: "json",
                success: function (msg){
                    $.mobile.loading("hide");
                    $.each(msg,function(i,item){
                        myArray[i] = msg[i].ID_TRAMPA + "','" + msg[i].NUM_TRAMPA + "','" + msg[i].TIPO_TRAMPA + "','" + msg[i].UBICACION + "','" + msg[i].OBSERVACIONES + "','" + msg[i].PLANTA + "','" + msg[i].CONTROL + "','" + msg[i].CINTURON + "','" + msg[i].ACTIVA ;
                    }); 
                    almacen.guardarTRAMPA(myArray);
                    almacen.leerTrampa();  
                    navigator.notification.alert("Migración Correcta",null,"Listo","Aceptar");               
                },
                error: function(jq, txt){
                    navigator.notification.alert(jq + txt.responseText,null,"Error 1","Aceptar");
                }
                    });
//MIGRACION DE TIPO_TRAMPA
                $.ajax({
                method: 'POST',
                url: 'http://servidoriis.laitaliana.com.mx/LM/wsshregistrotrampas/WebService1.asmx/enviarcatalogocompletodetipos_de_trampas',              
                dataType: "json",
                success: function (msg){
                    $.mobile.loading("hide");
                    $.each(msg,function(i,item){
                        myArray2[i] = msg[i].TIPO_TRAMPA + "','" + msg[i].DESCRIPCION;
                    }); 
                    almacen.guardarTIPO_TRAMPA(myArray2);
                    almacen.leerTipo_Trampa();  
                },
                error: function(jq, txt){
                    navigator.notification.alert(jq + txt.responseText,null,"Error 2","Aceptar");
                }
                    });
                    }
                    else
                    {
                       navigator.notification.alert("Se tienen registros en la base de datos, antes eliminelos",null,"Advertencia","Aceptar");    
                    }

    },
        Eliminar_trampas_de_celular : function(){
            almacen.eliminarTrampas();
            almacen.eliminarTipos_Trampas();
            almacen.leerTrampa();  
            almacen.leerTipo_Trampa(); 
            navigator.notification.alert("Se vacío la información local",null,"Listo","Aceptar");
        }

};
//$(fn.init);
$(fn.ready);