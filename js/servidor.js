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
                           almacen.GuardarRegistro_LOCAL(server.DATOS.replace("['CEBO',", "").replace("]", ""),"sys_date,usuario,planta,id_trampa,control_trampa,notas,cinturon,responsableaut,folio,captura,fechaaut,ceb_cambio,ceb_edc,ceb_localizador,ceb_registro,num_empleado,nom_empleado");
                            }
                        else
                            {
                            navigator.notification.alert("Verifique la fecha del dispositivo no se guardo la información",null,"Error","Aceptar");   
                            almacen.GuardarRegistro_LOCAL(server.DATOS.replace("['CEBO',", "").replace("]", ""),"sys_date,usuario,planta,id_trampa,control_trampa,notas,cinturon,responsableaut,folio,captura,fechaaut,ceb_cambio,ceb_edc,ceb_localizador,ceb_registro,num_empleado,nom_empleado");
                            }                        
                    });					
                },
				error: function(jq, txt){					
                    navigator.notification.alert("Error de comunicación, se guarda la información en el dispositivo",null,"Error 785","Aceptar");
                    			//le quito a la cadena DATOS los "['CEBO'" y "]"
                                almacen.GuardarRegistro_LOCAL(server.DATOS.replace("['CEBO',", "").replace("]", ""),"sys_date,usuario,planta,id_trampa,control_trampa,notas,cinturon,responsableaut,folio,captura,fechaaut,ceb_cambio,ceb_edc,ceb_localizador,ceb_registro,num_empleado,nom_empleado");

                                /*$("#txtitaextiV1").val("");
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
                                window.location.href = '#TiposDeCaptura';*/
				}
			}).done(server.sincronizado);

},
	sincronizado: function(msg){
		/*if(msg == 1)
		{
			navigator.notification.alert("Los datos guardados se han sincronizado satisfactoriamente", null, "Sincronizado", "Aceptar");
			almacen.gurdarHistorial(server.pr,server.di,server.th);//Guardar en Historial
		}
		else
		{
			navigator.notification.alert("Hubo un error al intentar sincronizar los datos guardados", null, "Error", "Aceptar");
		}*/
		//navigator.notification.alert("Los datos se guardaron en el servidor de forma correcta ", null, "Advertencia", "Aceptar");
	}				


};
