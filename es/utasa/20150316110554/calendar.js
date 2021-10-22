/* Home Javascript */
var array_dias = new Array();
var isIframeExists = true;

if (typeof isIframe === 'undefined') {
	isIframeExists = false;
}

	$(function() {
		setupCalendar();
	});

	var dt = new Date(dateNow.str);
	var dtYear = dt.getFullYear();
	
	function setupCalendar() {
	
	switch(lang){
		case 'en': path = '';
		case 'es': path = '../';	
	}
	
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
		onSelect: function(selectedDate) {
			  var option = this.id == "from" ? "minDate" : "maxDate";
			  var instance = $(this).data("datepicker");
	
			  var date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
			  dates.not(this).datepicker("option", option, date);
			  
			  var date1 = $('#fecha_ini').val();
			  var date2 = $('#fecha_fin').val();
			  
			  var year1  = date1.substring(0,4);  
			  var month1 = date1.substring(5,7);  
			  var day1   = date1.substring(8,10);
			  
			  var year2  = date2.substring(0,4);  
			  var month2 = date2.substring(5,7);  
			  var day2   = date2.substring(8,10);
			  
			  var beginDate = year1 + month1 + day1;

			  var endDate = year2 + month2 + day2;
			  
			  for ( c= parseInt(beginDate); c<= parseInt(endDate); c++){
				  for (it = 0; it < array_dias.length; it++){
					  if (array_dias[it]){	
						  var year3  = array_dias[it].substring(0,4);
						  var month3 = array_dias[it].substring(5,7);
						  var day3   = array_dias[it].substring(8,10);
						  var blockedDate = year3 + month3 + day3;
				  
						  if(parseInt(beginDate) < parseInt(blockedDate) && parseInt(endDate) >= parseInt(blockedDate)){
							  //$(foo).dialog({ autoOpen: false })

							  var $dialog = $('<div></div>')
								  .html('The range of days you have chosen has an unavailable date, please choose another range.')
								  .dialog({
								  autoOpen: false,
								  modal: true,
								  buttons: {
									  Ok: function(){
										  $(this).dialog('close');	
									  }
								  },
								  title: 'Alert'
							  });

							  if (isIframeExists) {
							  	$dialog.dialog('option', 'width', 'auto');
							  }
								  
							  $dialog.dialog('open');

							  $("#toCalendar").datepicker('setDate').val('');
							  return false;
						  }
					  }
				  }
			  }	
		  },
		  beforeShowDay: function(date){
			  for (i = 0; i < fullDays.length; i++) {
				  if (date.getFullYear() == fullDays[i][0]  && date.getMonth() == fullDays[i][1] -1  && date.getDate() == fullDays[i][2]) {  
					  var mesformat = date.getMonth() + 1;
					  var diaformat = date.getDate();
					  if (mesformat < 10) { mesformat = "0"+ mesformat }
					  if (diaformat < 10) { diaformat = "0"+ diaformat }
					  array_dias[i] = date.getFullYear() + '-' + mesformat + '-' + diaformat;
					  return [true, fullDays[i][3] + '_day' + ' ui-datepicker-unselectable ui-state-disabled'];
				  }
			  }  
			  return [true, ''];
		  },
			beforeShow: customRange
		})
	
	/*validacion de fecha final */
	
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
		onSelect: function(selectedDate) {
			  var option = this.id == "from" ? "minDate" : "maxDate";
			  var instance = $(this).data("datepicker");
	
			  var date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
			  dates.not(this).datepicker("option", option, date);
			  
			  var date1 = $('#fecha_ini').val();
			  var date2 = $('#fecha_fin').val();
			  
			  var year1  = date1.substring(0,4);  
			  var month1 = date1.substring(5,7);  
			  var day1   = date1.substring(8,10);
			  
			  var year2  = date2.substring(0,4);  
			  var month2 = date2.substring(5,7);  
			  var day2   = date2.substring(8,10);
			  
			  var beginDate = year1 + month1 + day1;

			  var endDate = year2 + month2 + day2;
			  
			  for ( c= parseInt(beginDate); c<= parseInt(endDate); c++){
				  for (it = 0; it < array_dias.length; it++){
					  if (array_dias[it]){	
						  var year3  = array_dias[it].substring(0,4);
						  var month3 = array_dias[it].substring(5,7);
						  var day3   = array_dias[it].substring(8,10);
						  var blockedDate = year3 + month3 + day3;
				  
						  if(parseInt(beginDate) < parseInt(blockedDate) && parseInt(endDate) > parseInt(blockedDate)){
							  //$(foo).dialog({ autoOpen: false })

							  var $dialog = $('<div></div>')
								  .html('The range of days you have chosen has an unavailable date, please choose another range.')
								  .dialog({
								  autoOpen: false,
								  modal: true,
								  buttons: {
									  Ok: function(){
										  $(this).dialog('close');	
									  }
								  },
								  title: 'Alert'
							  });

						      if (isIframeExists) {
							  	$dialog.dialog('option', 'width', 'auto');
							  }
								  
							  $dialog.dialog('open');

							  $("#toCalendar").datepicker('setDate').val('');
							  return false;
						  }
					  }
				  }
			  }	
		  },
		  beforeShowDay: function(date){
			  for (i = 0; i < fullDays.length; i++) {
				  if (date.getFullYear() == fullDays[i][0]  && date.getMonth() == fullDays[i][1] -1  && date.getDate() == fullDays[i][2]) {  
					  var mesformat = date.getMonth() + 1;
					  var diaformat = date.getDate();
					  if (mesformat < 10) { mesformat = "0"+ mesformat }
					  if (diaformat < 10) { diaformat = "0"+ diaformat }
					  array_dias[i] = date.getFullYear() + '-' + mesformat + '-' + diaformat;
					  return [true, fullDays[i][3] + '_day' + ' ui-state-disabled'];
				  }
			  }  
			  return [true, ''];
		  },
			beforeShow: customRange
		});
	
	
	
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

				if (isIframeExists) {
					$dialog.dialog('option', 'width', 'auto');
				}

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

				if (isIframeExists) {
					$dialog1.dialog('option', 'width', 'auto');
				}

				$dialog1.dialog('open');
				return false;
			}
		});
	}
