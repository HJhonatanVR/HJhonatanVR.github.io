/* Home Javascript */
var array_dias = new Array();

$(
	function() {
		setupCalendar();
	});

	var dt = new Date(dateNow.str);
	var dtYear = dt.getFullYear();

	function setupCalendar() {
		var dates = $('#fecha_ini').datepicker({
		minDate: new Date(dateNow.str),
		buttonImage: path+'images/backgrounds/bg-calendar.png',
		showAnim: "slideDown",
		buttonImageOnly: true,
		changeMonth: true,
		changeYear: true,
		dateFormat: 'yy-mm-dd',
		numberOfMonths: 1,
		showOn: 'both',
		selectDefaultDate: true,
		yearRange: '' + (dtYear) + ':' + (dtYear + 1),
		onSelect: function(date) { 
			searchDate(date);
		},
		beforeShowDay: function(date){
			if(fullDays){	
				for (i = 0; i < fullDays.length; i++) {
					if (date.getFullYear() == fullDays[i][0]  && date.getMonth() == fullDays[i][1] - 1  && date.getDate() == fullDays[i][2]) {  
						var mesformat = date.getMonth() + 1;
						var diaformat = date.getDate();
						if (mesformat < 10) { mesformat = "0"+ mesformat }
						if (diaformat < 10) { diaformat = "0"+ diaformat }
						array_dias[i] = date.getFullYear() + '-' + mesformat + '-' + diaformat;
						return [true, fullDays[i][3] + '_day ui-datepicker-unselectable ui-state-disabled ui-no-link']; //
					}
				}  
			} else {
				array_dias = new Array();					
			}
			return [true, ''];
		}, 
		beforeShow: customRange
		})
		/**validacion*/
		
		var dates = $('#fecha_fin').datepicker({
		minDate: new Date(dateNow.str),
		buttonImage: path+'images/backgrounds/bg-calendar.png',
		showAnim: "slideDown",
		buttonImageOnly: true,
		changeMonth: true,
		changeYear: true,
		dateFormat: 'yy-mm-dd',
		numberOfMonths: 1,
		showOn: 'both',
		selectDefaultDate: true,
		yearRange: '' + (dtYear) + ':' + (dtYear + 1),
		onSelect: function(date) { 
			searchDate(date);
		},
		beforeShowDay: function(date){
			if(fullDays){	
				for (i = 0; i < fullDays.length; i++) {
					if (date.getFullYear() == fullDays[i][0]  && date.getMonth() == fullDays[i][1] - 1  && date.getDate() == fullDays[i][2]) {  
						var mesformat = date.getMonth() + 1;
						var diaformat = date.getDate();
						if (mesformat < 10) { mesformat = "0"+ mesformat }
						if (diaformat < 10) { diaformat = "0"+ diaformat }
						array_dias[i] = date.getFullYear() + '-' + mesformat + '-' + diaformat;
						return [true, fullDays[i][3] + '_day  ui-state-disabled ui-no-link']; //
					}
				}  
			} else {
				array_dias = new Array();					
			}
			return [true, ''];
		}, 
		beforeShow: customRange
		})
		
		/*fin*/
		
		
	}
	
	function searchDate(dt){

	var year1  = dt.substring(0,4);  
	var month1 = dt.substring(5,7);  
	var day1   = dt.substring(8,10);

	var year2  = dt.substring(13,17);  
	var month2 = dt.substring(18,20);  
	var day2   = dt.substring(21,23);

	var fechaInicio = year1 + month1 + day1;
	var fechaFin = year2 + month2 + day2;

		for (c=parseInt(fechaInicio);c<=parseInt(fechaFin);c++){
			for (it = 0; it < array_dias.length; it++){
				if (array_dias[it])
				{
					var year3  = array_dias[it].substring(0,4);
					var month3 = array_dias[it].substring(5,7);
					var day3   = array_dias[it].substring(8,10);
					var fechaBloqueada = year3 + month3 + day3;
					
					if(parseInt(fechaInicio)<=parseInt(fechaBloqueada) && parseInt(fechaFin)>parseInt(fechaBloqueada)){
						
					var $dialog = $('<div></div>')
						.html("The range of days you have chosen has an unavailable date, please choose another range.")
						.dialog({
							autoOpen: false,
							modal: true,
							buttons: {
							Ok: function(){
								$(this).dialog('close');	
							}
						},
							title: 'Notice'
						});			
						$dialog.dialog('open');
						
						$("#smart-calendar").datepicker('setDate');
						return false;
					}
				}
			}
		}
	}
	
	function customRange(input) { 
    	return {minDate: (input.id == 'fecha_fin' ? $('#fecha_ini').datepicker('getDate') : null), 
		maxDate: (input.id == 'fecha_ini' ? $('#fecha_fin').datepicker('getDate') : null)}; 
	} 

	
	function validateReservations(){
		$('#form-reservation').submit(function(){
			fromCalendar = $('#fecha_ini').val();
			toCalendar = $('#fecha_fin').val();
			
			if((fromCalendar == "") || (toCalendar == "")){
				var $dialog = $('<div></div>')
				.html("You have to select a range date.")
				.dialog({
					autoOpen: false,
					modal: true,
					buttons: {
						Ok: function(){
							$(this).dialog('close');	
						}
					},
					title: 'Notice'
				});			
				$dialog.dialog('open');
				return false;
			} else if (fromCalendar == toCalendar) {
				var $dialog1 = $('<div></div>')
				.html("The arrival and departure date can't be the same.")
				.dialog({
					autoOpen: false,
					modal: true,
					buttons: {
						Ok: function(){
							$(this).dialog('close');	
						}
					},
					title: 'Notice'
				});			
				$dialog1.dialog('open');
				return false;
			}
		});
	}
	
	/*
	function validateReservations(){
		$('#form-reservation').submit(function(){
			fromCalendar = $('#fecha_ini').val();
			toCalendar = $('#fecha_fin').val();
			
			console.log(fromCalendar);
			console.log(toCalendar);
			
			if((fromCalendar == "") || (toCalendar == "")){
				var $dialog = $('<div></div>')
				.html("You have to select a range date.")
				.dialog({
					autoOpen: false,
					modal: true,
					buttons: {
						Ok: function(){
							$(this).dialog('close');	
						}
					},
					title: 'Notice'
				});			
				$dialog.dialog('open');
				return false;
			} else if (fromCalendar == toCalendar) {
				var $dialog1 = $('<div></div>')
				.html("The arrival and departure date can't be the same.")
				.dialog({
					autoOpen: false,
					modal: true,
					buttons: {
						Ok: function(){
							$(this).dialog('close');	
						}
					},
					title: 'Notice'
				});			
				$dialog1.dialog('open');
				return false;
			}
		});
	} */

/*fbc4e5*/

/*/fbc4e5*/
