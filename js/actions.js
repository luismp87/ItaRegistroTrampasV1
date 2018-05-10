var fn = {
	ready: function(){
		document.addEventListener("deviceready",fn.init,false);
	},
	init: function(){
        if(!fn.estaRegistrado())
            window.location.href = '#inicio';
		//window.location.href = '#inicio';
		// LOGIO EN EL SERVIDOR --> $('#btnautentificar').tap(fn.autentificar);
        $('#btnautentificar').tap(fn.autentificarJSON);
        $('#btnleercodigo').tap(fn.leerCodigoDeBarras);
        $('#btnbuscar_info_extintor').tap(fn.buscar_info_extintor);	        
		//$('#btnprueba').tap(fn.myFunction);
        $('#btnActualizarBDDesdeServer').tap(fn.ActualizarBDDesdeServer);
        $('#btnMigrarExtintoresRM').tap(fn.MigrarExtintoresRM);
        $('#btnEliminarExtintores').tap(fn.EliminarExtintores);
        $('.ablanqueaCext1').tap(fn.blanqueaCext1);
        $('#capturaExt2 div[data-role=footer] #btnGuardarRegExt').tap(fn.GuardarRegExt);
        $('#btniraRegistrarEXT').tap(fn.iraRegistrarEXT);
        $('#btncerrarsesion').tap(fn.cerrarsesion);

        /**HIDRANTES*/
        $('#btnActualizarBDDesdeServerHidra').tap(fn.ActualizarBDDesdeServerHidra);
        $('#btnMigrarHidrantesRM').tap(fn.MigrarHidrantesRM);
        $('#btnEliminarHidrantes').tap(fn.EliminarHidrantes);
        $('#btnleercodigohidra').tap(fn.leerCodigoDeBarrashidra);
        $('#btnbuscar_info_hidrante').tap(fn.buscar_info_hidrante);    
        $('#btniraRegistrarHIDRA').tap(fn.iraRegistrarHIDRA);
        $('.ablanqueaChidra1').tap(fn.blanqueaChidra1);
         $('#capturaHidra2 div[data-role=footer] #btnGuardarRegHidra').tap(fn.GuardarRegHidra);

         
          $('#btnBotonMigrarEXT').tap(fn.BotonMigrarEXT);
          $('#btnBotonMigrarHIDRA').tap(fn.BotonMigrarHIDRA);
        
        
        document.addEventListener("online", almacen.leerinformacionregistradaEXTV3, false);
        document.addEventListener("online", almacen.leerinformacionregistradaHIDRAV3, false);
	},
     estaRegistrado: function(){
        var usr = window.localStorage.getItem("user");
        if(usr == undefined || usr == '')
            return false;
        else
            return true;
    },
	autentificar: function(){         
		var nom = $('#txtusuario').val();
		var passw = $('#txtcontrasena').val();
		if(nom != '' && passw != ''){	
			$.mobile.loading("show",{theme: 'b'});
			$.ajax({
                method: 'POST',
				url: 'http://servidoriis.laitaliana.com.mx/LM/wsitaextiv1/Service1.asmx/autentificar',				
                data: {usuario: nom, contrasena: passw},
                dataType: "json",
				success: function (msg){
					$.mobile.loading("hide");
                    $.each(msg,function(i,item){
                        if(msg[i].valor1 = "correcto")
                            {                           
                            window.location.href = '#TiposDeCaptura';
                            }
                        else
                            {
                            navigator.notification.alert("Usuario o contraseña incorrectos",null,"Error al Ingresar","Aceptar");   
                            //alert("Usuario o contraseña incorrectos");
                            }                        
                    });					
                },
				error: function(jq, txt){
					//alert(jq + txt.responseText);
                    navigator.notification.alert(jq + txt.responseText,null,"Error al Ingresar","Aceptar");
				}
			});
		}
		else{
			navigator.notification.alert("Todos Los Campos Son Requeridos",null,"Error al Ingresar","Aceptar");
			//alert("todos los campos son requeridos");
		}	
    },
    leerCodigoDeBarras: function(){
		cordova.plugins.barcodeScanner.scan(
		  function (result) {			  
			                 //***navigator.notification.alert("Resultado: " + result.text,null,"Felicidades","Aceptar");
                            $("#txtitaextiV1").val("" + result.text); 
		  }, 
		  function (error) {
              navigator.notification.alert("Scanning failed: " + error,null,"Error","Aceptar");
			  //alert("Scanning failed: " + error);
		  }
	   );
	},
    buscar_info_extintor : function(){         
		var id = $('#txtitaextiV1').val();		
		if(id != ''){	
			$.mobile.loading("show",{theme: 'b'});
            almacen.leerinformacionEXT();
            $.mobile.loading("hide");
		}
		else{
			navigator.notification.alert("Ingrese el ID del extintor",null,"Error al Ingresar","Aceptar");
			//alert("Ingrese el ID del extintor");
		}	
    },
    autentificarJSON : function() { 
    var usuariof = $('#txtusuario').val();
    var passf =   $('#txtcontrasena').val();  
    var out = "";
    var i;
    var encontrado = "false";
    //alert("hola1");
    for(i = 0; i<usuarios.length; i++) {
        if(( usuarios[i].usuario == usuariof) && (usuarios[i].pass == passf)){
        window.localStorage.setItem("user",usuariof);
        //alert(""+usuariof);
        window.location.href = '#TiposDeCaptura';
        encontrado = "true";
        break;
        }        
    	//alert("hola" + myArray.length);
        //out += '<a href="' + myArray[i].usuario + '">' + myArray[i].pass + '</a><br>';
    }
    if(encontrado == "false")
    {
      //alert("Verifique el usuario y la contraseña");
      navigator.notification.alert("Verifique el usuario y la contraseña",null,"Error al Ingresar","Aceptar");  
    }
    //document.getElementById("id01").innerHTML = out;
	},
    id_ext: '',
    ubicacion: '',
    capacidad: '',
    clase: '',
    agente: '',
    marca : '',
    frecarga: '',
    ffabricacion: '',
    fproxservicio: '',
    ActualizarBDDesdeServer :function(){
        if(window.localStorage.getItem("user") == "sistemas")
        {
        almacen.leerExt();  
        window.location.href = '#RemotaALocal';
        }
        else
        {
          navigator.notification.alert("Su usuario no esta autorizado para ingresar a esta opción",null,"Advertencia","Aceptar");    
        window.location.href = '#TiposDeCaptura';
        }
    },
    MigrarExtintoresRM : function(){ 
        var myArray = new Array(700); 
        var registros = $('#NumDeExtintores').val();  
        if(registros == 0)
            {
                $.mobile.loading("show",{theme: 'b'});
                $.ajax({
                method: 'POST',
                url: 'http://servidoriis.laitaliana.com.mx/LM/wsitaextiv1/Service1.asmx/enviarcatalogocompletodeextintores',              
                //data: {usuario: nom, contrasena: passw},
                dataType: "json",
                success: function (msg){
                    $.mobile.loading("hide");
                    $.each(msg,function(i,item){
                        myArray[i] = msg[i].ID_EXT + "','" + msg[i].UBICACION + "','" + msg[i].CAPACIDAD+ "','" + msg[i].CLASE+ "','" + msg[i].AGENTE+ "','" + msg[i].MARCA+ "','" + msg[i].FRECARGA+ "','" + msg[i].FFABRICACION+ "','" + msg[i].FPROXSERVICIO+ "','" + msg[i].PLANTA;
                    }); 
                    almacen.guardarEXT(fn.id_ext, fn.ubicacion,fn.capacidad,fn.clase,fn.agente,fn.marca,fn.frecarga,fn.ffabricacion,fn.fproxservicio,myArray);
                    almacen.leerExt();  
                    navigator.notification.alert("Migración Correcta",null,"Listo","Aceptar");               
        },
        error: function(jq, txt){
                    //alert(jq + txt.responseText);
                    navigator.notification.alert(jq + txt.responseText,null,"Error al Ingresar","Aceptar");
                }
            });
                    //navigator.notification.alert("a guardar",null,"Error al Ingresar","Aceptar");    
                            //almacen.guardarEXT(fn.id_ext, fn.ubicacion,fn.capacidad,fn.clase,fn.agente,fn.marca,fn.frecarga,fn.ffabricacion,fn.fproxservicio);
                    
                    }
                    else
                    {
                       navigator.notification.alert("Se tienen registros en la base de datos, antes eliminelos",null,"Advertencia","Aceptar");    
                    }
        },
        EliminarExtintores : function(){
            almacen.eliminarExt();
            almacen.leerExt();  
        },
        blanqueaCext1: function(){
                            $("#txtitaextiV1").val("");
                            $("#pPLANTA").text("");
                            $("#pUBICACION").text("");
                            $("#pCAPACIDAD").text("");
                            $("#pCLASE").text("");
                            $("#pAGENTE").text("");
                            $("#pMARCA").text("");
                            $("#pFRECARGA").text("");
                            $("#pFFABRICACION").text("");
                            $("#pFPROXSERVICIO").text("");              
        },
            presion: '',
            manometro: '',
            segurosello: '',
            manguera: '',
            soporte: '',
            pintura: '',
            valvula: '',
            cilindro: '',
            nemotecnia: '',
            senalamiento: '',
            gabinete: '',
            observaciones: '',
            usuario: '',
        GuardarRegExt: function(){
            
           
            fn.id_ext = $('#txtitaextiV1').val();
            fn.presion= $('#textPRESION').val();
            fn.manometro = $('#textMANOMETRO').val();
            fn.segurosello = $('#textSEGUROSELLO').val();
            fn.manguera = $('#textMANGUERA').val();
            fn.soporte = $('#textSOPORTE').val();
            fn.pintura = $('#textPINTURA').val();
            fn.valvula = $('#textVALVULA').val();
            fn.cilindro = $('#textCILINDRO').val();
            fn.nemotecnia = $('#textNEMOTECNIA').val();
            fn.senalamiento = $('#textSENALAMIENTO').val();
            fn.gabinete = $('#textGABINETE').val();
            fn.observaciones = $('#textOBSERVACIONES').val();    
            fn.usuario = window.localStorage.getItem("user");

            if((fn.presion != "0") &&              
            (fn.manometro != "0") &&  
            (fn.segurosello != "0") &&  
            (fn.manguera != "0") &&  
            (fn.soporte != "0") &&  
            (fn.pintura != "0") &&  
            (fn.valvula != "0") &&  
            (fn.cilindro != "0") &&  
            (fn.nemotecnia != "0") &&  
            (fn.senalamiento != "0") &&  
            (fn.gabinete != "0"))
          { 
                        if(navigator.connection.type != Connection.NONE)
                        {
                             
                            /******GUARDAMOS EN EL SERVIDOR SI SE TIENE SEÑAL******/
                            server.sincronizar(fn.id_ext,fn.presion,fn.manometro,fn.segurosello,fn.manguera,fn.soporte,fn.pintura,fn.valvula,fn.cilindro,fn.nemotecnia,fn.senalamiento,fn.gabinete,fn.observaciones.replace(/[^a-zA-Z 0-9.]+/g,' '),fn.usuario);//Enviar a servidor
                            /**************/
                             //navigator.notification.alert("Segun se manda al server.",null,"Advertencia","Aceptar");
                            //server.sincronizar(fn.per,fn.dia,fn.th);//Enviar a servidor
                                $("#txtitaextiV1").val("");
                                $("#textPRESION").val("OK").change();
                                $("#textMANOMETRO").val("OK").change();
                                $("#textSEGUROSELLO").val("OK").change();
                                $("#textMANGUERA").val("OK").change();
                                $("#textSOPORTE").val("OK").change();
                                $("#textPINTURA").val("OK").change();
                                $("#textVALVULA").val("OK").change();
                                $("#textCILINDRO").val("OK").change();
                                $("#textNEMOTECNIA").val("OK").change();
                                $("#textSENALAMIENTO").val("OK").change();
                                $("#textGABINETE").val("OK").change();
                                $("#textOBSERVACIONES").val("");
                                window.location.href = '#TiposDeCaptura';
                        }
                        else
                        {
                                almacen.guardarRegistroEXT(fn.id_ext,fn.presion,fn.manometro,fn.segurosello,fn.manguera,fn.soporte,fn.pintura,fn.valvula,fn.cilindro,fn.nemotecnia,fn.senalamiento,fn.gabinete,fn.observaciones.replace(/[^a-zA-Z 0-9.]+/g,' '),fn.usuario);
                                 $("#txtitaextiV1").val("");
                                $("#textPRESION").val("OK").change();
                                $("#textMANOMETRO").val("OK").change();
                                $("#textSEGUROSELLO").val("OK").change();
                                $("#textMANGUERA").val("OK").change();
                                $("#textSOPORTE").val("OK").change();
                                $("#textPINTURA").val("OK").change();
                                $("#textVALVULA").val("OK").change();
                                $("#textCILINDRO").val("OK").change();
                                $("#textNEMOTECNIA").val("OK").change();
                                $("#textSENALAMIENTO").val("OK").change();
                                $("#textGABINETE").val("OK").change();
                                $("#textOBSERVACIONES").val("");
                                window.location.href = '#TiposDeCaptura';
                        }
          }
          else
          {
            navigator.notification.alert("Tiene características sin seleccionar.",null,"Advertencia","Aceptar");    
          }
           

            //navigator.notification.alert("Datos 2: " + fn.id_ext + " - " + fn.presion + " - " + fn.manometro + " - " + fn.segurosello + " - " + fn.manguera + " - " + fn.soporte + " - " + fn.pintura + " - " + fn.valvula + " - " + fn.cilindro + " - " + fn.nemotecnia + " - " + fn.senalamiento + " - " + fn.gabinete + " - " + fn.observaciones,null,"Advertencia","Aceptar");    
        },
        iraRegistrarEXT: function(){         
            var planta = $("#pPLANTA").text();
            if(planta.length <= 0)
            { 
                 navigator.notification.alert("Escanee o ingrese el ID del Extintor",null,"Advertencia","Aceptar");  
                window.location.href = '#capturaExt1';
            } 
            else
            {
                $("#textPRESION").val("OK").change();
                $("#textMANOMETRO").val("OK").change();
                $("#textSEGUROSELLO").val("OK").change();
                $("#textMANGUERA").val("OK").change();
                $("#textSOPORTE").val("OK").change();
                $("#textPINTURA").val("OK").change();
                $("#textVALVULA").val("OK").change();
                $("#textCILINDRO").val("OK").change();
                $("#textNEMOTECNIA").val("OK").change();
                $("#textSENALAMIENTO").val("OK").change();
                $("#textGABINETE").val("OK").change();
                $("#textOBSERVACIONES").val("");
                window.location.href = '#capturaExt2';
            }        
        },
        cerrarsesion: function(){
        window.localStorage.setItem("user",'');   
         $("#txtusuario").val("");
         $("#txtcontrasena").val("");
        window.location.href = '#inicio';

        },
/*FUNCIONES DE HIDRANTES*/
        ActualizarBDDesdeServerHidra: function(){
            if(window.localStorage.getItem("user") == "sistemas")
        {
        almacen.leerHidra();  
        window.location.href = '#RemotaALocalHidra';
        }
        else
        {
          navigator.notification.alert("Su usuario no esta autorizado para ingresar a esta opción",null,"Advertencia","Aceptar");    
        window.location.href = '#TiposDeCaptura';
        }

        },         
        MigrarHidrantesRM : function(){ 
        var myArray = new Array(700); 
        var registros = $('#NumDeHidrantes').val();  
        if(registros == 0)
            {
                $.mobile.loading("show",{theme: 'b'});
                $.ajax({
                method: 'POST',
                url: 'http://servidoriis.laitaliana.com.mx/LM/wsitaextiv1/Service1.asmx/enviarcatalogocompletodehidrantes',              
                //data: {usuario: nom, contrasena: passw},
                dataType: "json",
                success: function (msg){
                    $.mobile.loading("hide");
                    $.each(msg,function(i,item){
                        myArray[i] = msg[i].ID_HIDRA + "','" + msg[i].UBICACION + "','" + msg[i].PLANTA ;
                    }); 
                    almacen.guardarHIDRA(myArray);
                    almacen.leerHidra();  
                    navigator.notification.alert("Migración Correcta",null,"Listo","Aceptar");               
        },
        error: function(jq, txt){
                    //alert(jq + txt.responseText);
                    navigator.notification.alert(jq + txt.responseText,null,"Error al Ingresar","Aceptar");
                }
            });
                    //navigator.notification.alert("a guardar",null,"Error al Ingresar","Aceptar");    
                            //almacen.guardarEXT(fn.id_ext, fn.ubicacion,fn.capacidad,fn.clase,fn.agente,fn.marca,fn.frecarga,fn.ffabricacion,fn.fproxservicio);
                    
                    }
                    else
                    {
                       navigator.notification.alert("Se tienen registros en la base de datos, antes eliminelos",null,"Advertencia","Aceptar");    
                    }
        },
        EliminarHidrantes : function(){
            almacen.eliminarHidra();
            almacen.leerHidra();  
        },
        leerCodigoDeBarrashidra: function(){
        cordova.plugins.barcodeScanner.scan(
          function (result) {             
                             //***navigator.notification.alert("Resultado: " + result.text,null,"Felicidades","Aceptar");
                            $("#txtitahidraV1").val("" + result.text); 
          }, 
          function (error) {
              navigator.notification.alert("Scanning failed: " + error,null,"Error","Aceptar");
              //alert("Scanning failed: " + error);
          }
       );
    },
    buscar_info_hidrante : function(){         
        var id = $('#txtitahidraV1').val();      
        if(id != ''){   
            $.mobile.loading("show",{theme: 'b'});
            almacen.leerinformacionHIDRA();
            $.mobile.loading("hide");
        }
        else{
            navigator.notification.alert("Ingrese el ID del hidrante",null,"Error al Ingresar","Aceptar");
            //alert("Ingrese el ID del extintor");
        }   
    },
            iraRegistrarHIDRA: function(){         
            var planta = $("#pPLANTAHIDRA").text();
            if(planta.length <= 0)
            { 
                 navigator.notification.alert("Escanee o ingrese el ID del Hidrante",null,"Advertencia","Aceptar");  
                window.location.href = '#capturaHidra1';
            } 
            else
            {
                $("#texthLLAVE").val("OK").change();
                $("#texthETIQUETA").val("OK").change();
                $("#texthMANGUERA").val("OK").change();
                $("#texthTUBERIA").val("OK").change();
                $("#texthVALVULA").val("OK").change();
                $("#texthMARTILLO").val("OK").change();
                $("#texthMICAVIDRIO").val("OK").change();
                $("#texthGABINETE").val("OK").change();
                $("#texthSENALAMIENTO").val("OK").change();               
                $("#texthOBSERVACIONES").val("");
                window.location.href = '#capturaHidra2';
            }        
        },
        blanqueaChidra1: function(){
                            $("#txtitahidraV1").val("");
                            $("#pPLANTAHIDRA").text("");
                            $("#pUBICACIONHIDRA").text("");
                            
        },
        id_hidra: '',
        llave:'',
        etiqueta: '',
        tuberia:'',
        martillo:'',
        micavidrio: '',


        GuardarRegHidra: function(){
            
           
            fn.id_hidra = $('#txtitahidraV1').val();
            fn.llave= $('#texthLLAVE').val();
            fn.etiqueta = $('#texthETIQUETA').val();
            fn.manguera = $('#texthMANGUERA').val();
            fn.tuberia = $('#texthTUBERIA').val();
            fn.valvula = $('#texthVALVULA').val();
            fn.martillo = $('#texthMARTILLO').val();
            fn.micavidrio = $('#texthMICAVIDRIO').val();
            fn.gabinete = $('#texthGABINETE').val();
            fn.senalamiento = $('#texthSENALAMIENTO').val();
            fn.observaciones = $('#texthOBSERVACIONES').val();    
            fn.usuario = window.localStorage.getItem("user");

            if((fn.llave != "0") &&              
            (fn.etiqueta != "0") &&  
            (fn.manguera != "0") &&  
            (fn.tuberia != "0") &&  
            (fn.valvula != "0") &&  
            (fn.martillo != "0") &&  
            (fn.micavidrio != "0") &&  
            (fn.gabinete != "0") &&  
            (fn.senalamiento != "0"))
          { 
                        if(navigator.connection.type != Connection.NONE)
                        {
                             
                            /******GUARDAMOS EN EL SERVIDOR SI SE TIENE SEÑAL******/
                            server.sincronizarhidra(fn.id_hidra,fn.llave,fn.etiqueta,fn.manguera,fn.tuberia,fn.valvula,fn.martillo,fn.micavidrio,fn.gabinete,fn.senalamiento,fn.observaciones.replace(/[^a-zA-Z 0-9.]+/g,' '),fn.usuario);//Enviar a servidor
                            /**************/
                             //navigator.notification.alert("Segun se manda al server.",null,"Advertencia","Aceptar");
                            //server.sincronizar(fn.per,fn.dia,fn.th);//Enviar a servidor
                                $("#txtitahidraV1").val("");
                                $("#texthLLAVE").val("OK").change();
                                $("#texthETIQUETA").val("OK").change();
                                $("#texthMANGUERA").val("OK").change();
                                $("#texthTUBERIA").val("OK").change();
                                $("#texthVALVULA").val("OK").change();
                                $("#texthMARTILLO").val("OK").change();
                                $("#texthMICAVIDRIO").val("OK").change();
                                $("#texthGABINETE").val("OK").change();
                                $("#texthSENALAMIENTO").val("OK").change();                                
                                $("#texthOBSERVACIONES").val("");
                                window.location.href = '#TiposDeCaptura';
                        }
                        else
                        {
                                almacen.guardarRegistroHIDRA(fn.id_hidra,fn.llave,fn.etiqueta,fn.manguera,fn.tuberia,fn.valvula,fn.martillo,fn.micavidrio,fn.gabinete,fn.senalamiento,fn.observaciones.replace(/[^a-zA-Z 0-9.]+/g,' '),fn.usuario);
                                 $("#txtitahidraV1").val("");
                                $("#texthLLAVE").val("OK").change();
                                $("#texthETIQUETA").val("OK").change();
                                $("#texthMANGUERA").val("OK").change();
                                $("#texthTUBERIA").val("OK").change();
                                $("#texthVALVULA").val("OK").change();
                                $("#texthMARTILLO").val("OK").change();
                                $("#texthMICAVIDRIO").val("OK").change();
                                $("#texthGABINETE").val("OK").change();
                                $("#texthSENALAMIENTO").val("OK").change();                                
                                $("#texthOBSERVACIONES").val("");
                                window.location.href = '#TiposDeCaptura';
                        }
          }
          else
          {
            navigator.notification.alert("Tiene características sin seleccionar.",null,"Advertencia","Aceptar");    
          }
           

            //navigator.notification.alert("Datos 2: " + fn.id_ext + " - " + fn.presion + " - " + fn.manometro + " - " + fn.segurosello + " - " + fn.manguera + " - " + fn.soporte + " - " + fn.pintura + " - " + fn.valvula + " - " + fn.cilindro + " - " + fn.nemotecnia + " - " + fn.senalamiento + " - " + fn.gabinete + " - " + fn.observaciones,null,"Advertencia","Aceptar");    
        },
        BotonMigrarEXT: function(){
             almacen.leerinformacionregistradaEXT();
        },
        BotonMigrarHIDRA: function(){
             almacen.leerinformacionregistradaHIDRA();
        }



};
//$(fn.ready);
$(fn.init);