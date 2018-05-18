var almacen = {
	/*variables sobre usuario*/
	usuario: null,
	pass: null,
	origen: null,
	myArray: null,
	DATOS: null,
	CAMPOS: null,


	CreaSINOExiste: function(tx){
										tx.executeSql("CREATE TABLE IF NOT EXISTS usuarios (usuario,pass,origen)");										
									},
    CreaSINOExisteTrampas: function(tx){
										tx.executeSql("CREATE TABLE IF NOT EXISTS trampas (id_trampa,num_trampa,tipo_trampa,ubicacion,observaciones,planta,control,cinturon,activa,descripcion_tipo_trampa,descripcion_planta,cliente,direccion_planta,descripcion_control_trampa)");										
									},
	CreaSINOExisteRegistro: function(tx){
										tx.executeSql("CREATE TABLE IF NOT EXISTS registro (sys_date,usuario,planta,id_trampa,control_trampa,notas,cinturon,responsableaut,folio,captura,fechaaut,ceb_cambio,ceb_edc,ceb_localizador,ceb_registro,luz_estado,luz_registro,luz_area,luz_goma,luz_mos_casera,luz_palomilla,luz_chicharrita,luz_escarabajo,luz_mosquito,luz_zancudo,luz_abeja,luz_chinche,luz_mos_drena,luz_mos_jorob,luz_mos_forid,luz_avispa,luz_total,meca_arana,meca_alemana,meca_americana,meca_grillo,meca_escarabajo,meca_mosquito,meca_raton,meca_tijerilla,meca_otros,meca_estado_edc,meca_localizador,meca_registro,goma_cam_goma,goma_arana,goma_alemana,goma_americana,goma_grillo,goma_escarabajo,goma_mosquito,goma_raton,goma_tijerilla,goma_otros,goma_estado_edc,goma_localizador,goma_registro,luz_mos_calipho,num_empleado,nom_empleado)");										
									},
    GuardadoCorrectoLocaldeRegistro: function(){										
										navigator.notification.alert("Problemas de conexion, En cuanto se restablezca se guardara el registro en el servidor", null, "Advertencia", "Aceptar");																				
									},																		
	error: function(){
										//alert("Error al acceder a la Base de Datos");
										navigator.notification.alert("Error al acceder a la Base de Datos", null, "Error", "Aceptar");
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
										
									tx.executeSql("SELECT usuario,pass,origen FROM usuarios where upper(usuario) = upper('" +$('#txtusuario').val().toLowerCase()+ "') and upper(pass) = upper('" +$('#txtcontrasena').val().toLowerCase()+ "')", [], function(tx2, t){
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
									$("#DESCRIPCION_PLANTA").text(t.rows.item(i).descripcion_planta);
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
										navigator.notification.alert("Sin resultados verifique el ID de la TRAMPA", null, "Advertencia", "Aceptar");
									}
										});	
	},
	GuardarRegistro_LOCAL: function(DATOS,CAMPOS){
		almacen.DATOS = DATOS;
		almacen.CAMPOS = CAMPOS;
		//navigator.notification.alert("DATOS: " + DATOS,null,"Mensaje desarrollo","Aceptar");    
		//navigator.notification.alert("CAMPOS: " + CAMPOS,null,"Mensaje desarrollo","Aceptar"); 

			almacen.db = window.openDatabase("ItaSHRT","1.0","ItaSHRT Storage",20000);
			almacen.db.transaction(almacen.CreaSINOExisteRegistro, almacen.error, null);
			almacen.db.transaction(almacen.guardarRegistro_LOCAL, almacen.error, almacen.GuardadoCorrectoLocaldeRegistro); 
	},
									guardarRegistro_LOCAL: function(tx){
										tx.executeSql("CREATE TABLE IF NOT EXISTS registro (sys_date,usuario,planta,id_trampa,control_trampa,notas,cinturon,responsableaut,folio,captura,fechaaut,ceb_cambio,ceb_edc,ceb_localizador,ceb_registro,luz_estado,luz_registro,luz_area,luz_goma,luz_mos_casera,luz_palomilla,luz_chicharrita,luz_escarabajo,luz_mosquito,luz_zancudo,luz_abeja,luz_chinche,luz_mos_drena,luz_mos_jorob,luz_mos_forid,luz_avispa,luz_total,meca_arana,meca_alemana,meca_americana,meca_grillo,meca_escarabajo,meca_mosquito,meca_raton,meca_tijerilla,meca_otros,meca_estado_edc,meca_localizador,meca_registro,goma_cam_goma,goma_arana,goma_alemana,goma_americana,goma_grillo,goma_escarabajo,goma_mosquito,goma_raton,goma_tijerilla,goma_otros,goma_estado_edc,goma_localizador,goma_registro,luz_mos_calipho,num_empleado,nom_empleado)");
										tx.executeSql("INSERT INTO registro ("+ almacen.CAMPOS +") VALUES ("+almacen.DATOS+")");       
									},
/*FUNCION PARA LEER EN BASE DE DATOS LOS REGISTROS CAPTURADOS Y GUARDADOS EN EL CELULAR*/
		LeerInformacionRegistradaTrampas: function(tx){
			almacen.db = window.openDatabase("ItaSHRT","1.0","ItaSHRT Storage",20000);
			almacen.db.transaction(almacen.CreaSINOExisteRegistro, null, null);			
			almacen.db.transaction(almacen.leerinformaciontegistradaTrampas, null, null);

	},
									leerinformaciontegistradaTrampas: function(tx){
									tx.executeSql("SELECT sys_date,usuario,planta,id_trampa,control_trampa,notas,cinturon,responsableaut,folio,captura,fechaaut,ceb_cambio,ceb_edc,ceb_localizador,ceb_registro,luz_estado,luz_registro,luz_area,luz_goma,luz_mos_casera,luz_palomilla,luz_chicharrita,luz_escarabajo,luz_mosquito,luz_zancudo,luz_abeja,luz_chinche,luz_mos_drena,luz_mos_jorob,luz_mos_forid,luz_avispa,luz_total,meca_arana,meca_alemana,meca_americana,meca_grillo,meca_escarabajo,meca_mosquito,meca_raton,meca_tijerilla,meca_otros,meca_estado_edc,meca_localizador,meca_registro,goma_cam_goma,goma_arana,goma_alemana,goma_americana,goma_grillo,goma_escarabajo,goma_mosquito,goma_raton,goma_tijerilla,goma_otros,goma_estado_edc,goma_localizador,goma_registro,luz_mos_calipho,num_empleado,nom_empleado FROM registro", [], function(tx2, t){
									var campos = "";
									var encontroTRAMPA = 0;
											for(i = 0; i < t.rows.length; i++){
												encontroTRAMPA= 1;							
												campos = campos + "['MASIVO',"+t.rows.item(i).sys_date+"',"+
												"'"+t.rows.item(i).usuario+"',"+
												"'"+t.rows.item(i).planta+"',"+
												"'"+t.rows.item(i).id_trampa+"',"+
												"'"+t.rows.item(i).control_trampa+"',"+
												"'"+t.rows.item(i).notas.replace(/[^a-zA-Z 0-9.]+/g,' ')+"',"+
												"'"+t.rows.item(i).cinturon+"',"+
												"'"+t.rows.item(i).responsableaut+"',"+
												"'"+t.rows.item(i).folio+"',"+
												"'"+t.rows.item(i).captura+"',"+
												"'"+t.rows.item(i).fechaaut+"',"+
												"'"+t.rows.item(i).ceb_cambio+"',"+
												"'"+t.rows.item(i).ceb_edc+"',"+
												"'"+t.rows.item(i).ceb_localizador+"',"+
												"'"+t.rows.item(i).ceb_registro+"',"+
												"'"+t.rows.item(i).luz_estado+"',"+
												"'"+t.rows.item(i).luz_registro+"',"+
												"'"+t.rows.item(i).luz_area+"',"+
												"'"+t.rows.item(i).luz_goma+"',"+
												"'"+t.rows.item(i).luz_mos_casera+"',"+
												"'"+t.rows.item(i).luz_palomilla+"',"+
												"'"+t.rows.item(i).luz_chicharrita+"',"+
												"'"+t.rows.item(i).luz_escarabajo+"',"+
												"'"+t.rows.item(i).luz_mosquito+"',"+
												"'"+t.rows.item(i).luz_zancudo+"',"+
												"'"+t.rows.item(i).luz_abeja+"',"+
												"'"+t.rows.item(i).luz_chinche+"',"+
												"'"+t.rows.item(i).luz_mos_drena+"',"+
												"'"+t.rows.item(i).luz_mos_jorob+"',"+
												"'"+t.rows.item(i).luz_mos_forid+"',"+
												"'"+t.rows.item(i).luz_avispa+"',"+
												"'"+t.rows.item(i).luz_total+"',"+
												"'"+t.rows.item(i).meca_arana+"',"+
												"'"+t.rows.item(i).meca_alemana+"',"+
												"'"+t.rows.item(i).meca_americana+"',"+
												"'"+t.rows.item(i).meca_grillo+"',"+
												"'"+t.rows.item(i).meca_escarabajo+"',"+
												"'"+t.rows.item(i).meca_mosquito+"',"+
												"'"+t.rows.item(i).meca_raton+"',"+
												"'"+t.rows.item(i).meca_tijerilla+"',"+
												"'"+t.rows.item(i).meca_otros+"',"+
												"'"+t.rows.item(i).meca_estado_edc+"',"+
												"'"+t.rows.item(i).meca_localizador+"',"+
												"'"+t.rows.item(i).meca_registro+"',"+
												"'"+t.rows.item(i).goma_cam_goma+"',"+
												"'"+t.rows.item(i).goma_arana+"',"+
												"'"+t.rows.item(i).goma_alemana+"',"+
												"'"+t.rows.item(i).goma_americana+"',"+
												"'"+t.rows.item(i).goma_grillo+"',"+
												"'"+t.rows.item(i).goma_escarabajo+"',"+
												"'"+t.rows.item(i).goma_mosquito+"',"+
												"'"+t.rows.item(i).goma_raton+"',"+
												"'"+t.rows.item(i).goma_tijerilla+"',"+
												"'"+t.rows.item(i).goma_otros+"',"+
												"'"+t.rows.item(i).goma_estado_edc+"',"+
												"'"+t.rows.item(i).goma_localizador+"',"+
												"'"+t.rows.item(i).goma_registro+"',"+
												"'"+t.rows.item(i).luz_mos_calipho+"',"+
												"'"+t.rows.item(i).num_empleado+"',"+
												"'"+t.rows.item(i).nom_empleado+"'"+
												"]";
											}
											

									if(encontroTRAMPA == 0)
									{
									}
									else if(encontroTRAMPA == 1)
									{
										server.sincronizarRegistrados(campos);
									}
										});
	
	},
	EliminarRegistrosTrampas: function(tx){
			almacen.db = window.openDatabase("ItaSHRT","1.0","ItaSHRT Storage",20000);
			almacen.db.transaction(almacen.CreaSINOExisteRegistro, almacen.error, null);
			almacen.db.transaction(almacen.eliminarregistrosTrampas, almacen.error, null);
		},
									eliminarregistrosTrampas: function(tx){
									tx.executeSql("DELETE FROM registro");
	}										
}																		