var showedMessages = 0;
var showedUpdate = false;


$(document).ready(function() {
	var URL = jQuery(location).attr('href');
	$.getJSON("json/timeline.json", function(data) {
		//texto para el timeline
		for(var i=0;i<data.partners.length;i++){

			//avatar 
			var image = document.createElement("img");
			image.src = URL.split("index.html")[0]+"images/"+data.partners[i].avatar+".jpg";
			image.width= '70';
			image.height= '70';
			document.getElementById("tabs-1").appendChild(image);

			//autor y titulo del mensaje
	    	var node = document.createElement("p");
	    	node.setAttribute("id","autor"+i);
			var name = document.createTextNode(data.partners[i].autor+": "+data.partners[i].titulo);
			node.appendChild(name);
			document.getElementById("tabs-1").appendChild(node);

			//botón para leer la informacion del mensaje
			var button = document.createElement("input");
			button.setAttribute("type", "button");
			button.setAttribute("value", "Leer más");
			button.setAttribute("class", "button");
			button.setAttribute("id", "infoButton"+i);
			document.getElementById("autor"+i).appendChild(button);

			//contenido del mensaje
			var node2 = document.createElement("p");
			node2.setAttribute("id","info"+i);
			node2.setAttribute("class","info");
			var info = document.createTextNode(data.partners[i].contenido+" "+data.partners[i].fecha);
			node2.appendChild(info);
			document.getElementById("tabs-1").appendChild(node2);
			$("#info"+i).hide();
	    }
	    //numero de mensajes mostrados sin actualizar
	    showedMessages = data.partners.length;

	    //evento click sobre el boton de información del mensaje
	    $(".button").click(function(){
	    	var index = $(this).attr("id").split("infoButton")[1];
	    	$("#info"+index).show();
	    });

	    $.getJSON("json/update.json", function(data) {
	    	var line = $("#update").html();
	    	$("#update").html(line+data.partners.length);
			//texto para el timeline
			$("#update").click(function(){
				if(!showedUpdate){
					for(var m=0;m<data.partners.length;m++){

						//avatar 
						var image = document.createElement("img");
						image.src = URL.split("index.html")[0]+"images/"+data.partners[m].avatar+".jpg";
						image.width= '70';
						image.height= '70';
						document.getElementById("tabs-1").appendChild(image);
						//variable para los nuevos id
						var e = m+showedMessages;
						//autor y titulo del mensaje
						var node = document.createElement("p");
						node.setAttribute("id","autor"+e);
						var name = document.createTextNode(data.partners[m].autor+": "+data.partners[m].titulo);
						node.appendChild(name);
						document.getElementById("tabs-1").appendChild(node);

						//botón para leer la informacion del mensaje
						var button = document.createElement("input");
						button.setAttribute("type", "button");
						button.setAttribute("value", "Leer más");
						button.setAttribute("class", "button");
							
						button.setAttribute("id", "infoButton"+e);
						document.getElementById("autor"+e).appendChild(button);

						//contenido del mensaje
						var node2 = document.createElement("p");
						node2.setAttribute("id","info"+e);
						node2.setAttribute("class","info");
						var info = document.createTextNode(data.partners[m].contenido+" "+data.partners[m].fecha);
						node2.appendChild(info);
						document.getElementById("tabs-1").appendChild(node2);
						$("#info"+e).hide();
					}
					//una vez mostrados los mensajes evito que los muestren mas de una vez y quito el aviso
					showedUpdate = true;
					$("#update").hide();
				}
				//muestra información del boton al pulsarlo
				$(".button").click(function(){
					console.log();
			    	var index = $(this).attr("id").split("infoButton")[1];
			    	$("#info"+index).show();
			    });	
			});
		});

	});
	    
	$.getJSON("json/myline.json", function(data) {
	    //texto para mis mensajes enviados
	    console.log("longitud = "+data.length);
	    for(var k=0;k<data.myMessages.length;k++){

	    	var node = document.createElement("p");
			var textnode = document.createTextNode(data.myMessages[k].titulo+": "+data.myMessages[k].contenido+" "+data.myMessages[k].fecha);
			node.appendChild(textnode);
			document.getElementById("tabs-2").appendChild(node);
	    }

	});

});