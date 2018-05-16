var server = {
				DATOS: null,			

sincroniza_CEBO: function(DATOS)
{
				server.DATOS = DATOS;				

navigator.notification.alert(" servidor "+server.DATOS,null,"Mensaje desarrollo","Aceptar");    

				$.ajax({
                method: 'POST',
				url: 'http://servidoriis.laitaliana.com.mx/LM/wsshregistrotrampas/WebService1.asmx/inserta_registro',				
                data: {DATOS: DATOS},
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
                            //alert("Usuario o contraseña incorrectos");
                            }                        
                    });					
                },
				error: function(jq, txt){					
                    /*navigator.notification.alert("Error de comunicación, se guarda la información en el dispositivo",null,"Error 785","Aceptar");

                    almacen.guardarRegistroEXT(server.id_ext,server.presion,server.manometro,server.segurosello,server.manguera,server.soporte,server.pintura,server.valvula,server.cilindro,server.nemotecnia,server.senalamiento,server.gabinete,server.observaciones.replace(/[^a-zA-Z 0-9.]+/g,' '),server.usuario);
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
