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
        $('#Btn_goma_CancelarRegistro').tap(fn.goma_CancelarRegistro);
        $('#Btn_goma_GuardarRegistro').tap(fn.goma_GuardarRegistro);
        $('#Btn_mecanica_CancelarRegistro').tap(fn.mecanica_CancelarRegistro);
        
        
           
        //PARA MOVIL
         //document.addEventListener("online", almacen.leerinformacionregistrada_en_movil, false);
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
                url: 'https://servidoriis.laitaliana.com.mx/LM/wsshregistrotrampas/WebService1.asmx/enviarcatalogocompletodetrampas',              
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
            $("#cebo_in_cambio").val("1").change();
            $("#cebo_in_estado_EDC").val("1").change();
            $("#cebo_in_localizador").val("S").change();
            $("#cebo_in_registro").val("S").change();
            $("#cebo_notas").val("");
             
        }
        else if(tipo_trampa == "4")
        {
            window.location.href = '#Trampa_tipo_CEBO';
            $("#cebo_in_consumo").val("0").change();
            $("#cebo_in_cambio").val("1").change();
            $("#cebo_in_estado_EDC").val("1").change();
            $("#cebo_in_localizador").val("S").change();
            $("#cebo_in_registro").val("S").change();
            $("#cebo_notas").val(""); 
        }
        else if(tipo_trampa == "2")
        {
            window.location.href = '#Trampa_tipo_GOMA'; 
            $("#goma_in_cam_goma").val("1").change();
            $("#goma_in_arana").val("1").change();
            $("#goma_in_c_alemana").val("1").change();
            $("#goma_in_c_americana").val("1").change();
            $("#goma_in_grillo").val("1").change();
            $("#goma_in_escarabajo").val("1").change();
            $("#goma_in_mosquito").val("1").change();
            $("#goma_in_raton").val("1").change();
            $("#goma_in_tijerilla").val("1").change();
            $("#goma_in_Otros").val("1").change();
            $("#goma_in_estado_EDC").val("1").change();
            $("#goma_in_localizador").val("S").change();
            $("#goma_in_registro").val("S").change();
            $("#goma_notas").val("");
        }
        else if(tipo_trampa == "6")
        {
            window.location.href = '#Trampa_tipo_LUZ_NEGRA'; 
        }
        else if(tipo_trampa == "3")
        {
            window.location.href = '#Trampa_tipo_MECANICA'; 
            $("#mecanica_in_arana").val("1").change();
            $("#mecanica_in_c_alemana").val("1").change();
            $("#mecanica_in_c_americana").val("1").change();
            $("#mecanica_in_grillo").val("1").change();
            $("#mecanica_in_escarabajo").val("1").change();
            $("#mecanica_in_mosquito").val("1").change();
            $("#mecanica_in_raton").val("1").change();
            $("#mecanica_in_tijerilla").val("1").change();
            $("#mecanica_in_otros").val("1").change();
            $("#mecanica_in_estado_EDC").val("1").change();
            $("#mecanica_in_localizador").val("S").change();
            $("#mecanica_in_registro").val("S").change();
            $("#mecanica_notas").val("");
            
        }
        else if(tipo_trampa == "5")
        {
             window.location.href = '#Trampa_tipo_MECANICA';
            $("#mecanica_in_arana").val("1").change();
            $("#mecanica_in_c_alemana").val("1").change();
            $("#mecanica_in_c_americana").val("1").change();
            $("#mecanica_in_grillo").val("1").change();
            $("#mecanica_in_escarabajo").val("1").change();
            $("#mecanica_in_mosquito").val("1").change();
            $("#mecanica_in_raton").val("1").change();
            $("#mecanica_in_tijerilla").val("1").change();
            $("#mecanica_in_otros").val("1").change();
            $("#mecanica_in_estado_EDC").val("1").change();
            $("#mecanica_in_localizador").val("S").change();
            $("#mecanica_in_registro").val("S").change();
            $("#mecanica_notas").val("");
            
        }
        else
        {
            navigator.notification.alert("No entro a ninguno",null,"Mensaje desarrollo","Aceptar"); 
        }
        
    },
    cebo_CancelarRegistro: function(){        
        funcion_para_regresar_a_la_busqueda();
    },
    cebo_GuardarRegistro: function(){

        var DATOS = "";

        var d = new Date();

        fn.SYS_DATE = d.getDate() + "/" + (d.getMonth() +1) + "/" + d.getFullYear() + ' '+d.getHours() + ':'+d.getMinutes() +':'+d.getSeconds();     
        fn.USUARIO = window.localStorage.getItem("usuario");
        fn.PLANTA = $('#CODIGO_PLANTA').text();
        fn.ID_TRAMPA = $("#txt_id_trampa").val().toUpperCase();
        fn.CONTROL_TRAMPA = $('#CONTROL_TRAMPA').text();
        fn.NOTAS = $("#cebo_notas").val().replace(/[^a-zA-Z 0-9.]+/g,' ').toUpperCase();
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

        DATOS = "['CEBO','"+fn.SYS_DATE+"','"+fn.USUARIO+"','"+fn.PLANTA+"','"+fn.ID_TRAMPA+"','"+fn.CONTROL_TRAMPA+"','"+fn.NOTAS+"','"+fn.CINTURON+"','"+fn.RESPONSABLEAUT+"','"+fn.FOLIO+"','"+fn.CAPTURA+"','"+fn.FECHAAUT+"','"+fn.CEB_CAMBIO+"','"+fn.CEB_EDC+"','"+fn.CEB_LOCALIZADOR+"','"+fn.CEB_REGISTRO+"','"+fn.NUM_EMPLEADO+"','"+fn.NOM_EMPLEADO+"']"; 


        if(navigator.connection.type != Connection.NONE)
            {
                                server.sincroniza_CEBO(DATOS);
                                
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
            }
            else
            {
                                //le quito a la cadena DATOS los "['CEBO'" y "]"
                                almacen.GuardarRegistro_LOCAL(DATOS.replace("['CEBO',", "").replace("]", ""),"sys_date,usuario,planta,id_trampa,control_trampa,notas,cinturon,responsableaut,folio,captura,fechaaut,ceb_cambio,ceb_edc,ceb_localizador,ceb_registro,num_empleado,nom_empleado");
                            
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
            }

    },
    goma_CancelarRegistro: function(){
        funcion_para_regresar_a_la_busqueda();        
    },
    funcion_para_regresar_a_la_busqueda: function(){
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
        goma_GuardarRegistro: function(){

        var DATOS = "";

        var d = new Date();

        fn.SYS_DATE = d.getDate() + "/" + (d.getMonth() +1) + "/" + d.getFullYear() + ' '+d.getHours() + ':'+d.getMinutes() +':'+d.getSeconds();     
        fn.USUARIO = window.localStorage.getItem("usuario");
        fn.PLANTA = $('#CODIGO_PLANTA').text();
        fn.ID_TRAMPA = $("#txt_id_trampa").val().toUpperCase();
        fn.CONTROL_TRAMPA = $('#CONTROL_TRAMPA').text();
        fn.NOTAS = $("#goma_notas").val().replace(/[^a-zA-Z 0-9.]+/g,' ').toUpperCase();
        fn.CINTURON = $('#CINTURON').text();
        fn.RESPONSABLEAUT = "HECTORAND";
        fn.FOLIO = "0"
        fn.FECHAAUT = d.getDate() + "/" + (d.getMonth() +1) + "/" + d.getFullYear() + ' '+d.getHours() + ':'+d.getMinutes() +':'+d.getSeconds();     
        fn.GOMA_CAM_GOMA = $('#goma_in_cam_goma').val();
        fn.GOMA_ARANA = $('#goma_in_arana').val();
        fn.GOMA_ALEMANA = $('#goma_in_c_alemana').val();
        fn.GOMA_AMERICANA = $('#goma_in_c_americana').val();
        fn.GOMA_GRILLO = $('#goma_in_grillo').val();
        fn.GOMA_ESCARABAJO = $('#goma_in_escarabajo').val();
        fn.GOMA_MOSQUITO = $('#goma_in_mosquito').val();
        fn.GOMA_RATON = $('#goma_in_raton').val();
        fn.GOMA_TIJERILLA = $('#goma_in_tijerilla').val();
        fn.GOMA_OTROS = $('#goma_in_Otros').val();
        fn.GOMA_ESTADO_EDC = $('#goma_in_estado_EDC').val();
        fn.GOMA_LOCALIZADOR = $('#goma_in_localizador').val();
        fn.GOMA_REGISTRO = $('#goma_in_registro').val();
        fn.NUM_EMPLEADO = $('#Numero_empleado').text();
        fn.NOM_EMPLEADO = $('#Nombre_empleado').text().toUpperCase();


        DATOS = "['GOMA','"+fn.SYS_DATE+"','"+fn.USUARIO+"','"+fn.PLANTA+"','"+fn.ID_TRAMPA+"','"+fn.CONTROL_TRAMPA+"','"+fn.NOTAS+"','"+fn.CINTURON+"','"+fn.RESPONSABLEAUT+"','"+fn.FOLIO+"','"+fn.FECHAAUT+"','"+fn.GOMA_CAM_GOMA+"','"+fn.GOMA_ARANA+"','"+fn.GOMA_ALEMANA+"','"+fn.GOMA_AMERICANA+"','"+fn.GOMA_GRILLO+"','"+fn.GOMA_ESCARABAJO+"','"+fn.GOMA_MOSQUITO+"','"+fn.GOMA_RATON+"','"+fn.GOMA_TIJERILLA+"','"+fn.GOMA_OTROS+"','"+fn.GOMA_ESTADO_EDC+"','"+fn.GOMA_LOCALIZADOR+"','"+fn.GOMA_REGISTRO+"','"+fn.NUM_EMPLEADO+"','"+fn.NOM_EMPLEADO+"']"; 


        if(navigator.connection.type != Connection.NONE)
            {
                                server.sincroniza_GOMA(DATOS);
                                
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
            }
            else
            {
                                //le quito a la cadena DATOS los "['CEBO'" y "]"
                                almacen.GuardarRegistro_LOCAL(server.DATOS.replace("['GOMA',", "").replace("]", ""),"sys_date,usuario,planta,id_trampa,control_trampa,notas,cinturon,responsableaut,folio,fechaaut,goma_cam_goma,goma_arana,goma_alemana,goma_americana,goma_grillo,goma_escarabajo,goma_mosquito,goma_raton,goma_tijerilla,goma_otros,goma_estado_edc,goma_localizador,goma_registro,num_empleado,nom_empleado");

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
            }

    },
    mecanica_CancelarRegistro: function(){
        navigator.notification.alert("ss1",null,"Mensaje desarrollo","Aceptar");     

        funcion_para_regresar_a_la_busqueda();
navigator.notification.alert("ss2",null,"Mensaje desarrollo","Aceptar");     

    },
    mecanica_GuardarRegistro: function(){

        var DATOS = "";

        var d = new Date();

        fn.SYS_DATE = d.getDate() + "/" + (d.getMonth() +1) + "/" + d.getFullYear() + ' '+d.getHours() + ':'+d.getMinutes() +':'+d.getSeconds();     
        fn.USUARIO = window.localStorage.getItem("usuario");
        fn.PLANTA = $('#CODIGO_PLANTA').text();
        fn.ID_TRAMPA = $("#txt_id_trampa").val().toUpperCase();
        fn.CONTROL_TRAMPA = $('#CONTROL_TRAMPA').text();
        fn.NOTAS = $("#mecanica_notas").val().replace(/[^a-zA-Z 0-9.]+/g,' ').toUpperCase();
        fn.CINTURON = $('#CINTURON').text();
        fn.RESPONSABLEAUT = "HECTORAND";
        fn.FOLIO = "0"
        fn.FECHAAUT = d.getDate() + "/" + (d.getMonth() +1) + "/" + d.getFullYear() + ' '+d.getHours() + ':'+d.getMinutes() +':'+d.getSeconds();     
        fn.MECA_ARANA = $('#mecanica_in_arana').val();
        fn.MECA_ALEMANA = $('#mecanica_in_c_alemana').val();
        fn.MECA_AMERICANA = $('#mecanica_in_c_americana').val();
        fn.MECA_GRILLO = $('#mecanica_in_grillo').val();
        fn.MECA_ESCARABAJO = $('#mecanica_in_escarabajo').val();
        fn.MECA_MOSQUITO = $('#mecanica_in_mosquito').val();
        fn.MECA_RATON = $('#mecanica_in_raton').val();
        fn.MECA_TIJERILLA = $('#mecanica_in_tijerilla').val();
        fn.MECA_OTROS = $('#mecanica_in_otros').val();
        fn.MECA_ESTADO_EDC = $('#mecanica_in_estado_EDC').val();
        fn.MECA_LOCALIZADOR = $('#mecanica_in_localizador').val();
        fn.MECA_REGISTRO = $('#mecanica_in_registro').val();
        fn.NUM_EMPLEADO = $('#Numero_empleado').text();
        fn.NOM_EMPLEADO = $('#Nombre_empleado').text().toUpperCase();
        

        DATOS = "['MECANICA','"+fn.SYS_DATE+"','"+fn.USUARIO+"','"+fn.PLANTA+"','"+fn.ID_TRAMPA+"','"+fn.CONTROL_TRAMPA+"','"+fn.NOTAS+"','"+fn.CINTURON+"','"+fn.RESPONSABLEAUT+"','"+fn.FOLIO+"','"+fn.FECHAAUT+"','"+fn.MECA_ARANA+"','"+fn.MECA_ALEMANA+"','"+fn.MECA_AMERICANA+"','"+fn.MECA_GRILLO+"','"+fn.MECA_ESCARABAJO+"','"+fn.MECA_MOSQUITO+"','"+fn.MECA_RATON+"','"+fn.MECA_TIJERILLA+"','"+fn.MECA_OTROS+"','"+fn.MECA_ESTADO_EDC+"','"+fn.MECA_LOCALIZADOR+"','"+fn.MECA_REGISTRO+"','"+fn.NUM_EMPLEADO+"','"+fn.NOM_EMPLEADO+"']"; 


        if(navigator.connection.type != Connection.NONE)
            {
                                server.sincroniza_MECANICA(DATOS);
                                
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
            }
            else
            {
                                //le quito a la cadena DATOS los "['CEBO'" y "]"
                                almacen.GuardarRegistro_LOCAL(DATOS.replace("['MECANICA',", "").replace("]", ""),"sys_date,usuario,planta,id_trampa,control_trampa,notas,cinturon,responsableaut,folio,fechaaut,meca_arana,meca_alemana,meca_americana,meca_grillo,meca_escarabajo,meca_mosquito,meca_raton,meca_tijerilla,meca_otros,meca_estado_edc,meca_localizador,meca_registro,num_empleado,nom_empleado");
                            
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
            }
    }
};
//$(fn.init);
$(fn.ready);