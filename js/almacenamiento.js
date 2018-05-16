var almacen = {
	/*variables sobre usuario*/
	usuario: null,
	pass: null,
	origen: null,
	myArray: null,


	CreaSINOExiste: function(tx){
										tx.executeSql("CREATE TABLE IF NOT EXISTS usuarios (usuario,pass,origen)");										
									},
    CreaSINOExisteTrampas: function(tx){
										tx.executeSql("CREATE TABLE IF NOT EXISTS trampas (id_trampa,num_trampa,tipo_trampa,ubicacion,observaciones,planta,control,cinturon,activa,descripcion_tipo_trampa,descripcion_planta,cliente,direccion_planta,descripcion_control_trampa)");										
									},									
	error: function(){
										//alert("Error al acceder a la Base de Datos");
										navigator.notification.alert("Error al acceder a la Base de Datos", null, "Error", "Aceptar");
									},
	Correcto: function(){
										//alert("Reserva guardada en espera de sincronización");
										navigator.notification.alert("Ejecución satisfactoria", null, "Correcto", "Aceptar");
									},
    GuardadoCorrectoLocal: function(){
										//alert("Reserva guardada en espera de sincronización");
										navigator.notification.alert("Se guardo la información en el dispositivo", null, "Correcto", "Aceptar");
									},
/*FUNCION PARA GUARDAR EN BASE DE DATOS LOS USUARIO QUE SE TRAEN DEL WEB SERVICE*/
	guardarUsuario: function(myArray){	
		almacen.myArray	= myArray;        
			almacen.db = window.openDatabase("ItaSHRT","1.0","ItaSHRT Storage",20000);
			almacen.db.transaction(almacen.GuardarUsuario, almacen.error, null);
			
		},
									GuardarUsuario: function(tx)
									{
										tx.executeSql("CREATE TABLE IF NOT EXISTS usuarios (usuario,pass,origen)");
										    for(i = 0; i<almacen.myArray.length; i++) 
										    {
										    	if((almacen.myArray[i] != "") && (almacen.myArray[i] != undefined))
										    	{
										    		tx.executeSql("INSERT INTO usuarios (usuario,pass,origen) VALUES ('"+almacen.myArray[i]+"')");
    											}
        									}
									},
 /*FUNCION PARA LEER EN BASE DE DATOS EN ESPECIFICO EL NUMERO DE USUARIO QUE ESTAN EN LA TABLA USUARIOS*/
	leerNumeroUsuarios: function(){ 
			almacen.db = window.openDatabase("ItaSHRT","1.0","ItaSHRT Storage",20000);    
			almacen.db.transaction(almacen.CreaSINOExiste, almacen.error, null);    
			almacen.db.transaction(almacen.ConsultaNumeroDeUsuario, almacen.error, null);  
		},
									ConsultaNumeroDeUsuario: function(tx){
										tx.executeSql("SELECT count(*) as filas FROM usuarios", [], function(tx2, t){
											for(i = 0; i < t.rows.length; i++){
												$("#NumUsuarios").val("" + t.rows.item(i).filas); 
										

												/*navigator.notification.confirm("Personas: " + t.rows.item(i).pr + "\n"
																			   + "Días: " + t.rows.item(i).di + "\n"
																			   + "Tipo de Habitación: " + t.rows.item(i).th,
																			  function(btn){
																				  if(btn == 1) navigator.vibrate(500);
																				  if(btn == 2) navigator.notification.beep(1);
																			  }, "Tabla Reservas","Vibrar,Sonar,Cancelar");*/
												//server.sincronizar(t.rows.item(i).pr,t.rows.item(i).di,t.rows.item(i).th);
												//alert("id_ext: " + t.rows.item(i).id_ext);
												//navigator.notification.alert("id_ext: " + t.rows.item(i).id_ext, null, "Correcto", "Aceptar");
											}

//navigator.notification.alert("almacen.numerodefilas: " + almacen.numerodefilas, null, "Correcto", "Aceptar");
										});
										
									},	
//FUNCION PARA BUSCAR EL USUARIO Y CONTRASEÑA DE USUARIO EN LOCAL SI ES QUE LO ENCUENTRA EN LOCAL VA Y LO CONSULTA EN EL WEBSERVICE 		
		leerinformacionUsuario: function(tx){
			almacen.db = window.openDatabase("ItaSHRT","1.0","ItaSHRT Storage",20000);
			almacen.db.transaction(almacen.CreaSINOExiste, almacen.error, null);
			almacen.db.transaction(almacen.leerinfoUsuario, almacen.error, null);

	},
									leerinfoUsuario: function(tx){
										
									tx.executeSql("SELECT usuario,pass,origen FROM usuarios where upper(usuario) = upper('" +$('#txtusuario').val()+ "') and upper(pass) = upper('" +$('#txtcontrasena').val()+ "')", [], function(tx2, t){
									var encontroUsuario = 0;
									var usuariof = "";
									var origenf = "";
											for(i = 0; i < t.rows.length; i++)
									{
									encontroUsuario= 1;
									usuariof = t.rows.item(i).usuario;
									origenf = t.rows.item(i).origen;
									}

										if(encontroUsuario == 0)
										{
											navigator.notification.alert("Verifique su usuario y contraseña", null, "Advertencia", "Aceptar");
										}
										else if(encontroUsuario >= 1)
										{											
									/////		
									///Area autentificacion base de datos
									/////
									almacen.numero_Empleado_Que_Revisa =  $('#txtnumero_Empleado_Que_Revisa').val();
									$.ajax({
									                method: 'POST',
									                url: 'http://servidoriis.laitaliana.com.mx/LM/wsshregistrotrampas/WebService1.asmx/validaNumeroEmpleado',              
									                data: {numeroEmpleado: almacen.numero_Empleado_Que_Revisa},
									                dataType: "json",
									                success: function (msg){
									                    $.mobile.loading("hide");
									                    $.each(msg,function(i,item){
									                    	if(msg[i].Respuesta == "encontro")
									                            {                             										                        		
									                        		$("#Nombre_empleado_conf").val(""+ msg[i].Nombre);
									                        		$("#Nombre_empleado").text(""+ msg[i].Nombre);	

									                        		$("#Numero_empleado_conf").val(""+ $('#txtnumero_Empleado_Que_Revisa').val());
									                        		$("#Numero_empleado").text(""+ $('#txtnumero_Empleado_Que_Revisa').val());									                        		

									                        		window.localStorage.setItem("Nombre_usuario_revisa",""+ msg[i].Nombre);
									                        		window.localStorage.setItem("Numero_usuario_revisa",""+$('#txtnumero_Empleado_Que_Revisa').val());
									                        		window.localStorage.setItem("usuario",usuariof);
																	window.localStorage.setItem("origen",origenf);

																	$("#Origen").text("" + window.localStorage.getItem("origen").toUpperCase());
																	$("#Origen_conf").val("" + window.localStorage.getItem("origen").toUpperCase());

																	$('#txtusuario').val(""); 
									        						$('#txtcontrasena').val("");
									        						$('#txtnumero_Empleado_Que_Revisa').val("");									        						
									 								window.location.href = '#MenuOpciones';        
									                            }
									                            else
									                            {
																	navigator.notification.alert("Verifique el número de empleado.",null,"Error","Aceptar");///*PARAMOVIL
									                            }
									                    	
									                    }); 
									         
									        },
									        error: function(jq, txt){
									                    //alert("Error al migrar los usuarios del servidor, cierre y vuelva a abrir la aplicación para reintentar actualizar ó verifique su cobertura" +jq + txt.responseText);///*PARAWEB
									                    navigator.notification.alert("Error al migrar los usuarios del servidor, cierre y vuelva a abrir la aplicación para reintentar actualizar ó verifique su cobertura" + jq + txt.responseText,null,"Error al migrar verifique su cobertura","Aceptar");///*PARAMOVIL
									                }
									            });
									/////



										}
									//navigator.notification.alert("almacen.numerodefilas: " + almacen.numerodefilas, null, "Correcto", "Aceptar");
																			});
										
										},
/*ALMACEN LA INFORMACION DE LAS TRAMPAS EN EL CELULAR*/
		guardarTRAMPA: function(myArray){
		almacen.myArray	= myArray;        
			almacen.db = window.openDatabase("ItaSHRT","1.0","ItaSHRT Storage",20000);
			almacen.db.transaction(almacen.GuardarTrampa, almacen.error, null);
			
		},
									GuardarTrampa: function(tx){
										tx.executeSql("CREATE TABLE IF NOT EXISTS trampas (id_trampa,num_trampa,tipo_trampa,ubicacion,observaciones,planta,control,cinturon,activa,descripcion_tipo_trampa,descripcion_planta,cliente,direccion_planta,descripcion_control_trampa)");
										    //navigator.notification.alert("longitud " +almacen.myArray.length ,null,"Listo","Aceptar");      
										    for(i = 0; i<almacen.myArray.length; i++) 
										    {
										    	if((almacen.myArray[i] != "") && (almacen.myArray[i] != undefined))
										    	{
										    		tx.executeSql("INSERT INTO trampas (id_trampa,num_trampa,tipo_trampa,ubicacion,observaciones,planta,control,cinturon,activa,descripcion_tipo_trampa,descripcion_planta,cliente,direccion_planta,descripcion_control_trampa) VALUES ('"+almacen.myArray[i]+"')");
    											}
        									}        
									},		
/*FUNCION PARA LEER EN BASE DE DATOS*/
	leerTrampa: function(){
			
			almacen.db = window.openDatabase("ItaSHRT","1.0","ItaSHRT Storage",20000);
			almacen.db.transaction(almacen.CreaSINOExisteTrampas, almacen.error, null);
			almacen.db.transaction(almacen.ConsultaTrampa, almacen.error, null);
		},
									ConsultaTrampa: function(tx){
										tx.executeSql("SELECT count(*) as filas FROM trampas", [], function(tx2, t){
											for(i = 0; i < t.rows.length; i++){
												$("#Num_trampas_en_local").val("" + t.rows.item(i).filas); 
										

												/*navigator.notification.confirm("Personas: " + t.rows.item(i).pr + "\n"
																			   + "Días: " + t.rows.item(i).di + "\n"
																			   + "Tipo de Habitación: " + t.rows.item(i).th,
																			  function(btn){
																				  if(btn == 1) navigator.vibrate(500);
																				  if(btn == 2) navigator.notification.beep(1);
																			  }, "Tabla Reservas","Vibrar,Sonar,Cancelar");*/
												//server.sincronizar(t.rows.item(i).pr,t.rows.item(i).di,t.rows.item(i).th);
												//alert("id_ext: " + t.rows.item(i).id_ext);
												//navigator.notification.alert("id_ext: " + t.rows.item(i).id_ext, null, "Correcto", "Aceptar");
											}

//navigator.notification.alert("almacen.numerodefilas: " + almacen.numerodefilas, null, "Correcto", "Aceptar");
										});
										
		},
/*FUNCION PARA ELIMINAR CATALOGO DE LAS TRAMPAS EN BASE DE DATOS DEL CELULAR*/
		eliminarTrampas: function(tx){
			almacen.db = window.openDatabase("ItaSHRT","1.0","ItaSHRT Storage",20000);
			almacen.db.transaction(almacen.CreaSINOExisteTrampas, almacen.error, null);
			almacen.db.transaction(almacen.EliminarTrampas, almacen.error, null);
		},
									EliminarTrampas: function(tx){
									tx.executeSql("DELETE FROM trampas");
	},
/*FUNCION PARA LEER EN BASE DE DATOS DEL CELULAR*/
		LeerInformacionTRAMPA: function(tx){
			almacen.db = window.openDatabase("ItaSHRT","1.0","ItaSHRT Storage",20000);
			almacen.db.transaction(almacen.CreaSINOExisteTrampas, almacen.error, null);
			almacen.db.transaction(almacen.leerinformacionTRAMPA, almacen.error, null);

	},
									leerinformacionTRAMPA: function(tx){

									tx.executeSql("SELECT descripcion_planta,direccion_planta,descripcion_tipo_trampa,tipo_trampa,descripcion_control_trampa,ubicacion,cinturon,control,planta FROM trampas where upper(id_trampa) = upper('" +$('#txt_id_trampa').val()+ "')", [], function(tx2, t){
									var encontroTRAMPA = 0;
											for(i = 0; i < t.rows.length; i++){
									encontroTRAMPA= 1;
									navigator.vibrate(500);
									navigator.notification.beep(1)
									$("#CODIGO_PLANTA").text(t.rows.item(i).planta);
									$("#DESCRIPCION_PLANTA").text(t.rows.item(i).direccion_planta);
									$("#DIRECCION_PLANTA").text(t.rows.item(i).direccion_planta);
									$("#TIPO_TRAMPA").text(t.rows.item(i).tipo_trampa);
									$("#CONTROL_TRAMPA").text(t.rows.item(i).control);
									$("#CINTURON").text(t.rows.item(i).cinturon);
									$("#DESCRIPCION_TIPO_TRAMPA").text(t.rows.item(i).descripcion_tipo_trampa);
		                            $("#DESCRIPCION_CONTROL_TRAMPA").text(t.rows.item(i).descripcion_control_trampa);
		                            $("#UBICACION").text(t.rows.item(i).ubicacion);
                                          
										

												/*navigator.notification.confirm("Personas: " + t.rows.item(i).pr + "\n"
																			   + "Días: " + t.rows.item(i).di + "\n"
																			   + "Tipo de Habitación: " + t.rows.item(i).th,
																			  function(btn){
																				  if(btn == 1) navigator.vibrate(500);
																				  if(btn == 2) navigator.notification.beep(1);
																			  }, "Tabla Reservas","Vibrar,Sonar,Cancelar");*/
												//server.sincronizar(t.rows.item(i).pr,t.rows.item(i).di,t.rows.item(i).th);
												//alert("id_ext: " + t.rows.item(i).id_ext);
												//navigator.notification.alert("ubicacion: " + t.rows.item(i).id_ext, null, "Correcto", "Aceptar");
											}
									if(encontroTRAMPA == 0)
									{
										navigator.notification.alert("Sin resultados verifique el ID del Extintor", null, "Advertencia", "Aceptar");
									}
										});	
	}										
}																		