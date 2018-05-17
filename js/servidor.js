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

				navigator.notification.alert("DATOS: " + server.DATOS,null,"Mensaje desarrollo","Aceptar");     
				

/*
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
				*/

}				


};
