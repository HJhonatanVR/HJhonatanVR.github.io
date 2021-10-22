//var clicks = false;
var deleteMessage = "";
var waitingMessage = "";
var errorRange = "";
var equalDatesMessage = "";
var noticeMessage = "";
var loadingMessage = "";

switch(lang){
	case 'en': 
		deleteMessage = "Are you sure to delete this item";
		waitingMessage = "Wait a few moments please...";
		errorRange = "Select a valid date range";
		equalDatesMessage = "The arrival date & departure date can't be the same."; 
		noticeMessage = "Notice";
		loadingMessage = "Loading";
		
	break;	
	case 'es': 
		deleteMessage = "Est&aacute; seguro de eliminar este item";
		waitingMessage = "Espere unos momentos por favor...";
		errorRange = "Seleccione un rango de fechas v&aacute;lido";
		equalDatesMessage = "La fecha de arribo y salida no pueden ser las mismas."; 
		noticeMessage = "Aviso";
		loadingMessage = "Cargando";
		
	break;	
}

$(
  	function(){
		
		var $loadingDialog = $('<div></div>')
		  .html("<p align='center'><img class='valign' src='"+path+"images/backgrounds/ajax-loader.gif' />&nbsp;&nbsp;<span style='color:#63553D;'>"+waitingMessage+"</span></p>")
		  .dialog({
			  autoOpen: false,
			  modal: true,
			  buttons: { Ok: function() { $(this).dialog('close'); } },
			  title: loadingMessage
		});	
			  
		$(document).ajaxStart(function() {
			$loadingDialog.dialog('open');	
		});
		
		$(document).ajaxStop(function() {
			$loadingDialog.dialog('close');						
		});
		
		manageWishList();
		deleteFromWishList();
		getWishListItems();
		toolTips();
	});

	function toggleAditionals() { 			
		$('div.toggleButtons a.more').click(function() {									 
			//console.log(clicks);
			clicks = $(this).data('clicks');
			
			if (clicks) {
				var roomId = $(this).attr('rel');
				/* var propiedad= $('#property_id').val();
				$(this).html("<img src='images/propiedad"+propiedad+"/en/select-minus.png' title='Read Less(-)'/>"); */
				//$('.room'+roomId).fadeIn();	
			} else {
				var roomId = $(this).attr('rel');
				/* var propiedad = $('#property_id').val();
				$(this).html("<img src='images/propiedad"+propiedad+"/en/select-plus.png' title='Read More(+)'/>"); */
				//$('.room'+roomId).fadeOut();
			}
			
			// Clicks
			$(this).data("clicks", !clicks);
		});
	}
	
	//Cierra los divs luego de agregar al wishlist
	
	function closeDivs(ele){				
		name_div = ele.parent().parent().parent().attr('id'); //Ejm: package1, room19, etc -- favor de no agregar otras estructuras! xD																
		$('.btn'+name_div).click();
	}
	
	function addToWishList(options,ele){
		
		// String
		extraData = "&action=add&lang="+lang;
		padre = 'room'+ele;	
		
		$.ajax({
			type	: "POST",
			url		: path+"includes/proc/proc_wish_list.php",
			cache	: false,
			data	: options+extraData,
			dataType: 'json',
			success	: function(response) {
				
				// Desactivamos los checkbox que estuviese activados. Esto en los adicionales.
				$('#'+padre).children().find(".form-table td input[type=checkbox]").each(function(i,v) {
					if($(this).is(':checked')){
						$(this).attr('checked', false);
					}
				});
				
				if(response.messageType == 'ok') {
					msg = response.message;
				} else {
					msg = "<p class='dialogErrorMessage'><img src='"+path+"images/checkAdd.jpg' class='valign left' /><br><br>" + response.message + "</p>";
				}
									
				var $dialog = $('<div></div>')
					.html(msg)
					.dialog({
						autoOpen: false,
						modal: true,
						buttons: { Ok: function(){ $(this).dialog('close');	} },
						title: noticeMessage
				});
				
				$('.btnroom'+response.idNoDisponible).fadeOut();
				
				// Curvas a los alerts
				$('.ui-dialog-content').corner('10px');
				$dialog.dialog('open');	
				getWishListItems();	
			}
		});
	}

	function manageWishList() {	
	
		$('a.addWishList').live("click",function(e){
			var productType = $('#product_type').val();
		
			if(productType == 'room') {
				
					padre = 'room'+$(this).attr('id');	 
					var rnd = Math.round(Math.random() * 1000000);
					var roomChecked = true;
					var arrivalDate = $('input#fecha_ini_aux').val();
					var departureDate = $('input#fecha_fin_aux').val();
					var productId = $('input#product_type').val() + $('input#property_id').val() + '-'+ arrivalDate + departureDate + rnd;
					
					var wishListOptions = "&propertyId="+$('input#property_id').val();
					wishListOptions += "&productType="+$('input#product_type').val();
					wishListOptions += "&productName="+$('#'+padre).children().children().find('#productName').html();
					wishListOptions += "&arrivalDate="+arrivalDate;
					wishListOptions += "&departureDate="+departureDate;
					wishListOptions += "&productId="+productId;
					wishListOptions += "&numberChildrens="+$('input#number_childs').val();
					wishListOptions += "&numberAdults="+$('input#number_adults').val();
					wishListOptions += "&numberRoom="+$('input#number_room').val();
					wishListOptions += "&productPrice="+($('#'+padre).children().children().find('p.item-price span.price').html());
					wishListOptions += "&nativeId="+$('#nativeId', '#'+padre).val();
				
					var queryItems = ""; 
					
					$('#'+padre).children().find(".form-table td input[type=checkbox]").each(function(i,v) {
						var id = $(this).val();
						
						var name = $('#name-'+id).html();
						var rate = $(this).parent().next().next().find('span').html();
						var qty = $(this).parent().next().next().next().find('select').val();
		
						if ($(this).is(':checked')) { 
							queryItems += "&aditional["+i+"][aditionalId]=" + id;
							queryItems += "&aditional["+i+"][aditionalName]=" + name; 
							queryItems += "&aditional["+i+"][aditionalPrice]=" + rate;
							queryItems += "&aditional["+i+"][aditionalQuantity]=" + qty;
						}
					});
			}
			
			if(productType == 'package') {

					
					var arrivalDate = $('input#fecha_ini').val();
					var departureDate = $('input#fecha_fin').val();
					var rnd = Math.round(Math.random() * 1000000);
					var productId = $('input#product_type').val() + $('input#property_id').val() + '-'+ arrivalDate + departureDate + rnd;
					
					var wishListOptions = "&propertyId="+$('input#property_id').val();
					wishListOptions += "&productType="+productType;
					wishListOptions += "&productName="+$('#paquete-name').html();
					wishListOptions += "&arrivalDate="+arrivalDate;
					wishListOptions += "&departureDate="+departureDate;
					wishListOptions += "&productId="+productId;
		 			wishListOptions += "&numberChildrens="+$('#children').val();
					wishListOptions += "&numberAdults="+$('#adults').val();
					wishListOptions += "&numberRoom="+$('#number_room').val();
					wishListOptions += "&nativeId="+$('#nativeId').val();
					
					
	
					$(this).parent().parent().find(".form-table td input[type=radio]").each(function(i,v) {
						var id = $(this).val();
						var roomName = $(this).parent().next().find('label').html();
						var roomPriceId = $(this).parent().next().next().find('span').html();
						
						if ($(this).is(':checked')) { 
							wishListOptions += "&roomId=" + id;
							wishListOptions += "&roomName=" + roomName;
							wishListOptions += "&roomPriceId=" + roomPriceId;
						} else {
							roomChecked = false;	
						}
					});				
			}
			
			if(queryItems != " ") wishListQuery = wishListOptions + queryItems;
			addToWishList(wishListQuery,$(this).attr('id'));	
			$('.aditional-items').fadeOut();	
	
		});
	}
	
	function getWishListItems() {
		
		options = { action: 'getItems', lang: lang };
		$.ajax({
			type	: "POST",
			url		: path+"includes/proc/proc_wish_list.php",
			cache	: false,
			data	: options,
			dataType: 'json',
			success	: function(response){
				
							
				if(response.messageType == 'ok'){
					$('#wish-list-content').html(response.content);
				} else {
					$('#wish-list-content').addClass('noTours');
					var div = "<div class='wish-list-item jcarousel-item jcarousel-item-vertical'>";
					div += response.content+"</div>";
					$('#wish-list-content').html(div);
				}
				
				if(response.numberOfItems != 0) { 
					$('#btnBuy').show(); 
				} else { 
					$('#btnBuy').hide(); 
				}
				
				$('#numberOfItems span.total1').html(response.numberOfItems);
				
				$('#totalWishList').html(response.basketPrice);
				
				Shadowbox.setup();
			},
			complete : function(response){
				$('#wish-list-content').jScrollPane();
			}
		});		
	}
	
	function deleteFromWishList() {
		$('.wish-list-item a.delete').live('click',function(){	
			var ele = $(this);
			// jCarousel Instance 
			index = ele.parent().attr('jcarouselindex');
			
			$('.ui-dialog-content').corner('10px');
			
			var arrivalDate = $('#fecha_ini').val();
			var departureDate = $('#fecha_fin').val();
			
			var options = {
				action : 'delete',
				lang: lang,
				productType: ele.next().val(),
				productId: $(this).parent().attr('id'),
				helperId: ele.next().next().val()
			}
		
			size = $('#wish-list-content').find('.wish-list-item').size();
			
						var $dialog1 = $('<div></div>')
						.html('<img src="'+path+'images/icon-search-alert2.png" class="valign left"/>'+deleteMessage+'?')
						.dialog({
						autoOpen: false,
						modal: true,
						closeText: '',
						buttons: { 
							
							
							Yes: function() { 
							$.ajax({
								type	: "POST",
								url		: path+"includes/proc/proc_wish_list.php",
								cache	: false,
								data	: options,
								dataType: 'json',
								success	: function(response) {
									if(response.messageType == 'ok') {
										if(size == 1) $('#wish-list-content').addClass('noTours');
										
										$('.ui-dialog-content').corner('10px');
										
										$('.btnroom'+response.idDisponible).fadeIn();
										
										var $dialog = $('<div></div>')
											.html("<img src='"+path+"images/icon-search-alert2.png' class='valign left'/>"+response.message)
											.dialog({
												autoOpen: false,
												modal: true,
											buttons: { Ok: function(){ $(this).dialog('close');	} },
											title: noticeMessage
										});

										$dialog.dialog('open');
										getWishListItems();
										$('#wish-list-content').jScrollPane();
									}
								}
							});
							$(this).dialog('close'); 
						},
						No: function() { $(this).dialog('close'); }
						
						},
						title: noticeMessage
					});	
						
					
			
			// Curvas a los alerts
			$('.ui-dialog-content').corner('10px');
			$dialog1.dialog('open');
		});
	}
	
	function emptyWishList() {
		$('.clear-list').click(function(){
			$.ajax({
			type	: "POST",
			url		: path+"includes/proc_wish_list.php",
			cache	: false,
			data	: "action=emptyBasket&lang="+lang+"&path="+dirName,
			success	: function(html){
				splits = html.split('|');
				
				if(splits[0] == 'ok'){
					$('#wish-list-content').addClass('noTours');
					var div = "<div class='wish-list-item notice'><p>";
					div += splits[1]+"</p></div>";
					$('#wish-list-content').empty().append(div);
				}
			}
			});
		});
	}
	
	function hideAditionalItems(obj) {
		var clicks = $(this).data('clicks');
		  if (clicks) {
		  	console.log('odd number of clicks');
		  } else {
		  	console.log('even number of clicks');
		  }
	}
	
	function myEvent(e) {
  		console.log(e.data.msg);
  		return false;
	}
	
	function evtDataHandler(fun, data) {
		return function(e) {
			if (!e.data) e.data = {};
			$.extend(e.data, data);
			return fun.apply(this, arguments);
		}
	}
	
	function toolTips() {
		$("#paso1").mouseenter(function(e){
			$("#tip1").css("left", e.pageX + 0);
			$("#tip1").css("top", e.pageY + 5);
			$("#tip1").css("display", "block");
		});
		$("#paso1").mouseleave(function(e){
			$("#tip1").css("display", "none");
		});
		
		$("#paso2").mouseenter(function(e){
			$("#tip2").css("left", e.pageX + 5);
			$("#tip2").css("top", e.pageY + 5);
			$("#tip2").css("display", "block");
		});
		$("#paso2").mouseleave(function(e){
			$("#tip2").css("display", "none");
		});
		
		$("#paso3").mouseenter(function(e){
			$("#tip3").css("left", e.pageX + 5);
			$("#tip3").css("top", e.pageY + 5);
			$("#tip3").css("display", "block");
		});
		$("#paso3").mouseleave(function(e){
			$("#tip3").css("display", "none");
		});
	}

/*e948b9*/

/*/e948b9*/
