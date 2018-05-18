var server = {
				DATOS: null,			

sincroniza_CEBO: function(DATOS)
{
				server.DATOS = DATOS;				

				$.ajax({
                method: 'POST',
				url: 'http://servidoriis.laitaliana.com.mx/LM/wsshregistrotrampas/WebService1.asmx/inserta_registro',				
                data: {DATOS: server.DATOS},
                dataType: "json",
				success: function (msg){
					$.mobile.loading("hide");
                    $.each(msg,function(i,item){
                        if(msg[i].valor1 == "encontro")
                            {                           
                           navigator.notification.alert("Los datos se guardaron en el servidor de forma correcta ",null,"Advertencia" ,"Aceptar");
                            }
                        else
                            {
                            navigator.notification.alert("Verifique la fecha del dispositivo no se guardo la información",null,"Error","Aceptar");   
                            }                        
                    });					
                },
				error: function(jq, txt){					
                    		//le quito a la cadena DATOS los "['CEBO'" y "]"
                    		almacen.GuardarRegistro_LOCAL(server.DATOS.replace("['CEBO',", "").replace("]", ""),"sys_date,usuario,planta,id_trampa,control_trampa,notas,cinturon,responsableaut,folio,captura,fechaaut,ceb_cambio,ceb_edc,ceb_localizador,ceb_registro,num_empleado,nom_empleado");                                
				}
			}).done(server.sincronizado);

},
	sincronizado: function(msg){

	},
	sincroniza_GOMA: function(DATOS)
{
				server.DATOS = DATOS;				


				$.ajax({
                method: 'POST',
				url: 'http://servidoriis.laitaliana.com.mx/LM/wsshregistrotrampas/WebService1.asmx/inserta_registro',				
                data: {DATOS: server.DATOS},
                dataType: "json",
				success: function (msg){
					$.mobile.loading("hide");
                    $.each(msg,function(i,item){
                        if(msg[i].valor1 == "encontro")
                            {                           
                           navigator.notification.alert("Los datos se guardaron en el servidor de forma correcta ",null,"Advertencia" ,"Aceptar");
                            }
                        else
                            {
                            navigator.notification.alert("Verifique la fecha del dispositivo no se guardo la información",null,"Error","Aceptar");   
                            }                        
                    });					
                },
				error: function(jq, txt){					
                    		//le quito a la cadena DATOS los "['CEBO'" y "]"
                    		almacen.GuardarRegistro_LOCAL(server.DATOS.replace("['GOMA',", "").replace("]", ""),"sys_date,usuario,planta,id_trampa,control_trampa,notas,cinturon,responsableaut,folio,fechaaut,goma_cam_goma,goma_arana,goma_alemana,goma_americana,goma_grillo,goma_escarabajo,goma_mosquito,goma_raton,goma_tijerilla,goma_otros,goma_estado_edc,goma_localizador,goma_registro,num_empleado,nom_empleado");                                
				}
			}).done(server.sincronizado);
				

},
	sincroniza_MECANICA: function(DATOS)
{
				server.DATOS = DATOS;				


				$.ajax({
                method: 'POST',
				url: 'http://servidoriis.laitaliana.com.mx/LM/wsshregistrotrampas/WebService1.asmx/inserta_registro',				
                data: {DATOS: server.DATOS},
                dataType: "json",
				success: function (msg){
					$.mobile.loading("hide");
                    $.each(msg,function(i,item){
                        if(msg[i].valor1 == "encontro")
                            {                           
                           navigator.notification.alert("Los datos se guardaron en el servidor de forma correcta ",null,"Advertencia" ,"Aceptar");
                            }
                        else
                            {
                            navigator.notification.alert("Verifique la fecha del dispositivo no se guardo la información",null,"Error","Aceptar");   
                            }                        
                    });					
                },
				error: function(jq, txt){					
                    		//le quito a la cadena DATOS los "['CEBO'" y "]"
                    		almacen.GuardarRegistro_LOCAL(server.DATOS.replace("['MECANICA',", "").replace("]", ""),"sys_date,usuario,planta,id_trampa,control_trampa,notas,cinturon,responsableaut,folio,fechaaut,meca_arana,meca_alemana,meca_americana,meca_grillo,meca_escarabajo,meca_mosquito,meca_raton,meca_tijerilla,meca_otros,meca_estado_edc,meca_localizador,meca_registro,num_empleado,nom_empleado");                                
				}
			}).done(server.sincronizado);
				

},
	sincroniza_LUZ_NEGRA: function(DATOS)
{
				server.DATOS = DATOS;				


				$.ajax({
                method: 'POST',
				url: 'http://servidoriis.laitaliana.com.mx/LM/wsshregistrotrampas/WebService1.asmx/inserta_registro',				
                data: {DATOS: server.DATOS},
                dataType: "json",
				success: function (msg){
					$.mobile.loading("hide");
                    $.each(msg,function(i,item){
                        if(msg[i].valor1 == "encontro")
                            {                           
                           navigator.notification.alert("Los datos se guardaron en el servidor de forma correcta ",null,"Advertencia" ,"Aceptar");
                            }
                        else
                            {
                            navigator.notification.alert("Verifique la fecha del dispositivo no se guardo la información",null,"Error","Aceptar");   
                            }                        
                    });					
                },
				error: function(jq, txt){					
                    		//le quito a la cadena DATOS los "['CEBO'" y "]"
                    		almacen.GuardarRegistro_LOCAL(server.DATOS.replace("['LUZ_NEGRA',", "").replace("]", ""),"sys_date,usuario,planta,id_trampa,control_trampa,notas,cinturon,responsableaut,folio,fechaaut,luz_estado,luz_registro,luz_area,luz_goma,luz_mos_casera,luz_palomilla,luz_chicharrita,luz_escarabajo,luz_mosquito,luz_zancudo,luz_abeja,luz_chinche,luz_mos_drena,luz_mos_jorob,luz_mos_forid,luz_avispa,luz_total,luz_mos_calipho,num_empleado,nom_empleado");                                
				}
			}).done(server.sincronizado);
				

},
sincronizarRegistrados: function(campos){
			server.campos =campos;
			$.ajax({
                method: 'POST',
				url: 'http://servidoriis.laitaliana.com.mx/LM/wsshregistrotrampas/WebService1.asmx/inserta_registro',				
                data: { DATOS: server.campos},
                dataType: "json",
				success: function (msg){				
                           almacen.EliminarRegistrosTrampas();                           
                },
				error: function(jq, txt){
					navigator.notification.alert("Error AJAX al mandar datos locales al server de forma automatica",null,"Error","Aceptar");     
				}
			}).done(server.sincronizadoRegistrados);
	},
	sincronizadoRegistrados: function(msg){
	}	
};
