var fn = {
	ready: function(){
		document.addEventListener("deviceready",fn.init,false);
	},
	init: function(){ 
            
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
        $("#Nombre_empleado_conf").val(""+ window.localStorage.getItem("Nombre_usuario_revisa"));
        $("#Nombre_empleado").text(""+ window.localStorage.getItem("Nombre_usuario_revisa"));  

        $("#Numero_empleado_conf").val(""+ window.localStorage.getItem("Numero_usuario_revisa"));
        $("#Numero_empleado").text(""+ window.localStorage.getItem("Numero_usuario_revisa"));     

        $("#Origen").text(""+ window.localStorage.getItem("origen").toUpperCase());
        $("#Origen_conf").val(""+ window.localStorage.getItem("origen").toUpperCase());                                                            
        window.location.href = '#MenuOpciones';     
        }
        //PARA MOVIL
        $('#btnautentificar').tap(fn.autentificarSQL); 
        $('#BtnCerrarSesion').tap(fn.CerrarSesion);
        $('#BtnMigrar_trampas_a_celular').tap(fn.Migrar_trampas_a_celular);
        $('#BtnEliminar_trampas_de_celular').tap(fn.Eliminar_trampas_de_celular);
        $('#BtnManto_catalogos').tap(fn.Manto_catalogos);
        $('#BtnLeerCodigo').tap(fn.LeerCodigo);
        $('#BtnBuscar_info_trampa').tap(fn.Buscar_info_trampa);
        $('#BtnRegistrar_trampas').tap(fn.Registrar_trampas);
        $('#BtnCaptura').tap(fn.Captura);
        $('#Btn_cebo_CancelarRegistro').tap(fn.cebo_CancelarRegistro);
        $('#Btn_cebo_GuardarRegistro').tap(fn.cebo_GuardarRegistro);

           
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
        var usu = $('#txtusuario').val().toLowerCase();      
        var con = $('#txtcontrasena').val().toLowerCase();         

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
         window.localStorage.setItem("usuario",'');
         window.localStorage.setItem("Nombre_usuario_revisa",'');
         window.location.href = '#login';   
    },
    Migrar_trampas_a_celular:function(){
        var myArray = new Array(1200);         
        var registros = $('#Num_trampas_en_local').val();  
        if(registros == 0)
            {
                $.mobile.loading("show",{theme: 'b'});
//MIGRACION DE TRAMPA                
                $.ajax({
                    async: true,
                method: 'POST',
                url: 'http://servidoriis.laitaliana.com.mx/LM/wsshregistrotrampas/WebService1.asmx/enviarcatalogocompletodetrampas',              
                //data: {usuario: nom, contrasena: passw},
                dataType: "json",
                success: function (msg){
                    $.mobile.loading("hide");
                    $.each(msg,function(i,item){
                        
                                myArray[i] = msg[i].ID_TRAMPA + "','" + msg[i].NUM_TRAMPA + "','" + msg[i].TIPO_TRAMPA + "','" + msg[i].UBICACION + "','" + msg[i].OBSERVACIONES + "','" + msg[i].PLANTA + "','" + msg[i].CONTROL + "','" + msg[i].CINTURON + "','" + msg[i].ACTIVA + "','" + msg[i].DESCRIPCION_TIPO_TRAMPA+ "','" + msg[i].DESCRIPCION_PLANTA+ "','" + msg[i].CLIENTE+ "','" + msg[i].DIRECCION_PLANTA+ "','" + msg[i].DESCRIPCION_CONTROL_TRAMPA;
                            
                    }); 
                    almacen.guardarTRAMPA(myArray);
                    almacen.leerTrampa();  
                    navigator.notification.alert("Migración Correcta",null,"Listo","Aceptar");               
                },
                error: function(jq, txt){
                    navigator.notification.alert(jq + txt.responseText,null,"Error 1","Aceptar");
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
            almacen.leerTrampa();              
            navigator.notification.alert("Se vacío la información local",null,"Listo","Aceptar");
        },
        Manto_catalogos : function(){
            almacen.leerTrampa();    
            window.location.href = '#Opcion_manto_catalogos';         
        },
        LeerCodigo: function(){
        cordova.plugins.barcodeScanner.scan(
          function (result) {             
                            $("#txt_id_trampa").val("" + result.text); 
        var id = $('#txt_id_trampa').val();    
  
        if(id != ''){   
            $.mobile.loading("show",{theme: 'b'});
            almacen.LeerInformacionTRAMPA();
            $.mobile.loading("hide");
        }
        else{
            navigator.notification.alert("Ingrese el ID de la trampa",null,"Error al Ingresar","Aceptar");
        }
          }, 
          function (error) {
              navigator.notification.alert("Scanning failed: " + error,null,"Error","Aceptar");
              //alert("Scanning failed: " + error);
          }
       );

        },    
    Buscar_info_trampa : function(){
        var id = $('#txt_id_trampa').val();  
    
        if(id != ''){   
            $.mobile.loading("show",{theme: 'b'});
            almacen.LeerInformacionTRAMPA();
            $.mobile.loading("hide");
        }
        else{
            navigator.notification.alert("Ingrese el ID de la trampa",null,"Error al Ingresar","Aceptar");
        }
    },
    Registrar_trampas : function(){
        $("#CODIGO_PLANTA").text("");
        $("#DESCRIPCION_PLANTA").text("");
        $("#DIRECCION_PLANTA").text("");
        $("#TIPO_TRAMPA").text("");
        $("#CONTROL_TRAMPA").text("");
        $("#CINTURON").text("");
        $("#DESCRIPCION_TIPO_TRAMPA").text("");
        $("#DESCRIPCION_CONTROL_TRAMPA").text("");
        $("#UBICACION").text("");
        $("#txt_id_trampa").val(""); 
        window.location.href = '#Busqueda_por_id_de_trampa'; 
    },
    Captura: function(){
        var tipo_trampa = $('#TIPO_TRAMPA').text();

        if(tipo_trampa == "1")
        {
            window.location.href = '#Trampa_tipo_CEBO';
            $("#cebo_in_consumo").val("0").change();
            $("#cebo_in_cambio").val("0").change();
            $("#cebo_in_estado_EDC").val("1").change();
            $("#cebo_in_localizador").val("N").change();
            $("#cebo_in_registro").val("N").change();
            $("#cebo_notas").val("");
             
        }
        else if(tipo_trampa == "4")
        {
            window.location.href = '#Trampa_tipo_CEBO'; 
        }
        else if(tipo_trampa == "2")
        {
            window.location.href = '#Trampa_tipo_GOMA'; 
        }
        else if(tipo_trampa == "6")
        {
            window.location.href = '#Trampa_tipo_LUZ_NEGRA'; 
        }
        else if(tipo_trampa == "3")
        {
            window.location.href = '#Trampa_tipo_MECANICA'; 
        }
        else if(tipo_trampa == "5")
        {
            window.location.href = '#Trampa_tipo_MECANICA'; 
        }
        else
        {
            navigator.notification.alert("No entro a ninguno",null,"Mensaje desarrollo","Aceptar"); 
        }
        
    },
    cebo_CancelarRegistro: function(){
        
        $("#CODIGO_PLANTA").text("");
        $("#DESCRIPCION_PLANTA").text("");
        $("#DIRECCION_PLANTA").text("");
        $("#TIPO_TRAMPA").text("");
        $("#CONTROL_TRAMPA").text("");
        $("#CINTURON").text("");
        $("#DESCRIPCION_TIPO_TRAMPA").text("");
        $("#DESCRIPCION_CONTROL_TRAMPA").text("");
        $("#UBICACION").text("");
        $("#txt_id_trampa").val(""); 
         window.location.href = '#Busqueda_por_id_de_trampa';
    },
    cebo_GuardarRegistro: function(){

        var DATOS = "";

        var d = new Date();

        fn.SYS_DATE = d.getDate() + "/" + (d.getMonth() +1) + "/" + d.getFullYear() + ' '+d.getHours() + ':'+d.getMinutes() +':'+d.getSeconds();     
        fn.USUARIO = window.localStorage.getItem("usuario");
        fn.PLANTA = $('#CODIGO_PLANTA').text();
        fn.ID_TRAMPA = $("#txt_id_trampa").val().toUpperCase();
        fn.CONTROL_TRAMPA = $('#CONTROL_TRAMPA').text();
        fn.NOTAS = $("#cebo_notas").val().toUpperCase();
        fn.CINTURON = $('#CINTURON').text();
        fn.RESPONSABLEAUT = "HECTORAND";
        fn.FOLIO = "0"
        fn.CAPTURA = $('#cebo_in_consumo').val();
        fn.FECHAAUT = d.getDate() + "/" + (d.getMonth() +1) + "/" + d.getFullYear() + ' '+d.getHours() + ':'+d.getMinutes() +':'+d.getSeconds();     
        fn.CEB_CAMBIO = $('#cebo_in_cambio').val();
        fn.CEB_EDC = $('#cebo_in_estado_EDC').val();
        fn.CEB_LOCALIZADOR = $('#cebo_in_localizador').val();
        fn.CEB_REGISTRO = $('#cebo_in_registro').val();
        fn.NUM_EMPLEADO = $('#Numero_empleado').text();
        fn.NOM_EMPLEADO = $('#Nombre_empleado').text().toUpperCase();

        DATOS = "['CEBO',"+fn.SYS_DATE+"','"+fn.USUARIO+"','"+fn.PLANTA+"','"+fn.ID_TRAMPA+"','"+fn.CONTROL_TRAMPA+"','"+fn.NOTAS+"','"+fn.CINTURON+"','"+fn.RESPONSABLEAUT+"','"+fn.FOLIO+"','"+fn.CAPTURA+"','"+fn.FECHAAUT+"','"+fn.CEB_CAMBIO+"','"+fn.CEB_EDC+"','"+fn.CEB_LOCALIZADOR+"','"+fn.CEB_REGISTRO+"','"+fn.NUM_EMPLEADO+"','"+fn.NOM_EMPLEADO+"']";

        navigator.notification.alert(" actions "+DATOS,null,"Mensaje desarrollo","Aceptar");    
 


        if(navigator.connection.type != Connection.NONE)
            {
                navigator.notification.alert(" tenemos conexion ",null,"Mensaje desarrollo","Aceptar");    

                server.sincroniza_CEBO(DATOS);
            }
            else
            {

            }






    }
};
//$(fn.init);
$(fn.ready);