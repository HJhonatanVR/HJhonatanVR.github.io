/*
* Description: Funciones y métodos para Inkaterra
* Proyect: Hotel Inkaterra
* Date: 26/03/2012
* Author: Junihor Moran
* Version: 1.0
*/


//Funciones y métodos generales
var host = 'http://'+window.location.host; //Capturar el Host //
$(document).on('ready', function(){
	if($(".shadowbox").length > 0){
		Shadowbox.setup(".shadowbox", {
			gallery: "gallery"
		});
	}

	if($("body.single-nature_conservations").length > 0){
		if($("#mediaPressReview").length > 0) {
			console.log('sighting');
			MyApp.natureSightings.init();
		}      
	}
	$('.current-menu-item').parent().show();

	$("a.link").each( function(ele){
		$(this).attr("title","link" + (ele + 1));
	});

	$("nav.hotel-menu").each( function(ele){
		$(this).attr("id","link" + (ele+1));
	});

	var currentSliderContainer = null;
	var currentSlideClick = false;

	 $('a.link').on('click', function() {
		var aparece = $(this).attr('title').replace('undefined', '');
		//$("nav.hotel-menu").hide();

		$("nav.hotel-menu").each(function(){
			var obj = $(this);
			if(obj.attr("id") != aparece){
				obj.stop(true,true).slideUp(450);
			}else{
				obj.stop(true,true).delay(400).slideToggle(450);
			}
		});

	});

	if($(".elevatezoom").length >0){
	   $(".elevatezoom").each(function(){
		   var id_img = $(this).attr('id');
		   $("#"+id_img).elevateZoom({
			   zoomType	: "inner",
			   loadingIcon: true,
			   cursor: "zoom-in",
			   showLens: true,
			   zoomLevel: 1,
			   lensSize: 400
			   //scrollZoom: true, //allow zoom on mousewheel, true to activate
			   //scrollZoomIncrement: 0.1
		   });
	   })

	}
	if($(".nature-profile-detail").length){
		MyApp.natureProfiles.init();
	}

	if($(".nature-list").length){
		MyApp.natureList.init();
	}

	if($(".entry-content.guest-comments").length){
		MyApp.guestComments.init();
	}
});

function moverArrow(val){
	var arrow = $("img","#arrowPage");

	if(val == 1){
		$("#secondary a").hover(function(){
			var lft = $(this).attr("data-arrow");
			arrow.stop(true,true).animate({
				left : lft
			},500);
			//console.warning();
		});

		moverArrow(3);
	}

	if(val == 2){
		var lft = arrow.attr("data-arrow");
		arrow.stop(true,true).animate({
			left : lft
		},500);
	}

	if(val == 3){
		$(".hotel-menu").hover(function(){
			var lft = $(this).attr("data-arrow");
			arrow.stop(true,true).animate({
				left : lft
			},500);
			//console.warning();
		});
	}

}


//Metodos Invocados según petición
var MyApp = {
	Main : {
		init : function() {
			var fuente = null,
				alto = null,
				ancho = null;

			//redimension();
            /*
			$('#header-custom img').each(function(i) {
				fuente = $(this).attr('src');
				alto = $(this).attr('height');
				ancho = $(this).attr('width');
				$('<img />').attr({
					'class': 'head-interna',
					'src':fuente,
					'alt':'Inkaterra',
					'width': ancho,
					'height': alto
				}).appendTo('#nivo-slider');
			});
			*/

			if($("h3.titulo-item").length > 0 ){
				$("h3.titulo-item").on("click",function(e){
					e.preventDefault();
					var obj = $(this);
					var detalleitem = $(this).attr('data-detalleitem');
					console.log(detalleitem);

					$("div.detalle-item").each(function(){
						var o = $(this);
						if(obj.attr('data-detalleitem') != o.attr('data-detalleitem')){
							o.stop(true,true).slideUp("fast");
						}
					});
					//$(this).closest('ul.team-list').css({"position":'relative'});
					$("div[data-detalleitem = " + detalleitem +"]").stop(true,true).slideToggle();
					//$("#ourteam").css({ 'height':'100%' })

				})
			}
			
			if($(".rates-hotel").length > 0) {
				$(".rates-hotel > a").on('click',function(e){
					e.preventDefault();
					$(".sub-menu",".rates-hotel").slideToggle();
				})
			}

			MyApp.slideNivo.init();
			MyApp.liveWeather.init();
		}
	},

	//Menu Home
	menuHome : {
		init : function(){

			$(".menu_principal_website").hover(function(){
				moverArrow(1);
			},function(){
				moverArrow(2);
			});// Agregar Cosas Aquí
		}
	},

	//Funcion para el mostrar clima
	liveWeather : {
		init : function() {
			var region = $('#cod-clima').text(); //Capturar el código de region

			this.parameters = {}; //Crear Objeto
			this.parameters.op = 'clima';
			this.parameters.localidad_id = region; // Codigo de Region
			this.getData(this.parameters);
		},
		getData : function(options) {
			$.ajax({
				url : host+"/getWeather.php",
				data : options,
				dataType: 'json',
				success: function(response) {
					var clima = response.clima;
					$('#live-weather-location').html(clima.lugar+'&nbsp;');
					$('#live-weather-temperature').html('&nbsp;'+clima.temperatura+'&deg; C');
					$('#live-weather-img').html('<img src="'+host+'/images/iconos-clima/'+clima.codigo+'.png" id="weather-img"  width="28"  height="28" title="'+clima.estado+'" alt="'+clima.estado+'">');
				}
			});
		}
	},

	//Slider Cabecera
	slideNivo : {
		init : function() {
			var count = $('#nivo-slider img').length;
			//$('#preloading').fadeOut(300);
			if (count > 1) {
				$('#nivo-slider').nivoSlider({
					effect: 'fade',
					controlNav: false,
					directionNav: false,
					pauseOnHover: false,
					pauseTime: 5000
				});
			}
		}
	},

	lang :{
		init: function(){
			$("#wrapperLang").css("display", "none");
			$(".off").css("display", "none");

			$("header #headerRighTop li").toggle(function(){
				//alert("klsajdlk");
				$(this).parent().parent().parent().find("#wrapperLang").slideDown();
				$(this).css("border-bottom", "1px solid #FFFFFF");
				$(".on").css("display", "none");
				$(".off").css("display", "block");
			}, function(){
				$(this).parent().parent().parent().find("#wrapperLang").slideUp();
				$(this).css("border-bottom", "none");
				$(".on").css("display", "block");
				$(".off").css("display", "none");
			});
		}
	},

	//Carrusel de imagenes
	carousel:{
		init: function(){
			jQuery('#mycarousel').jcarousel({
				scroll: 1
			});
		}
	},

	//Galeria de Imagenes
	galleryRhino:{
		init: function(){
			$('.gallery').rhinoslider({
				prevText: '',
				nextText: '',
				showBullets: 'always',
				showControls: 'always',
				slidePrevDirection: 'toRight',
				slideNextDirection: 'toLeft',
				styles: 'position,width,height',
				controlsPlayPause: false
			});
		}
	},

	//ShadowBox
	sBox:{
		init: function(){
			Shadowbox.init();
		}
	},

	//Jcarousel
	carrusel:{
		init: function(){
			$('#mycarousel').jcarousel();
		}
	},

	//ShadowBox
	sMessageBox:{
		init: function(){
			var titulo = $('#tax-except').attr('title');
			var mensaje = $('#msg-sb').html();

			function openMessage() {
				Shadowbox.open({
					player: "html",
					title: titulo,
					content: '<div class="msg-format">'+mensaje+'</div>',
					height: 420,
					width: 355
				});
			}
			Shadowbox.init();

			$('#tax-except').on('click', openMessage);
		}
	},
	natureProfiles: {
		init: function(){
			//Staff
			$(".tit_item_job a").click(function(e){
				e.preventDefault();
				console.log("click");
				var obj = $(this);
				$(".txt_item_job").each(function(){
					var o = $(this);
					if(!o.hasClass("id_content_"+ obj.attr("data-profile"))){
						o.stop(true,true).slideUp("fast");
					}
				});
				$(".id_content_"+ obj.attr("data-profile")).stop(true,true).slideToggle();
			})
		}   
	},
	natureList: {
		init: function() {
			
			$('.flipbook-trigger').fancybox({
				'zoomSpeedIn': 300,
				'zoomSpeedOut': 300,
				'width'       : 1000,
				'overlayShow': true,
				'onComplete' : function(data){
					console.log(data);
					$("#fancybox-content").css("overflow", "hidden");
					$("#fancybox-content div").css("overflow", "hidden");
					/*
					$(".flipbook").each(function(){
						var fbook_id = $(this).attr('id');
						console.log("fbook_id",fbook_id);
						$("#"+fbook_id).turn({
							width: 1022,
							height: 600,
							autoCenter: true,
							page: 2
						});
						
					})*/
				}
			});
			$(".flipbook").each(function(){
				var fbook_id = $(this).attr('id');
				console.log("fbook_id",fbook_id);
				$("#"+fbook_id).turn({
					width: 1022,
					height: 600,
					autoCenter: true,
					page: 2
				});
				$("#"+fbook_id).bind("turning", function(event, page, view) {
					if (page==1) {
						event.preventDefault();
					}else{
						$.each(view, function( index, value ) {
						  MyApp.natureList.cargar_imagen_flipbox("#"+fbook_id,value);
						});
					}
				});
			})

			$(".flipbook-trigger").on("click",function(e){
				e.preventDefault();
				var fbox_id = $(this).attr('data-flipbox');
				var cur_page = $("#flipbook"+fbox_id).turn("page");

				console.log(fbox_id,cur_page);

				if(cur_page == 2) {
					MyApp.natureList.cargar_imagen_flipbox("#flipbook"+fbox_id,2);
					MyApp.natureList.cargar_imagen_flipbox("#flipbook"+fbox_id,3);
				}
			});
		},
		cargar_imagen_flipbox: function(flipboxid, page){
			console.log(flipboxid,page);
			var img = $(flipboxid+ " .p"+page+" img");
			console.log(img);
			if(img.attr('data-imgsrc') != '' ){
				img.attr('src',img.attr('data-imgsrc'));
				img.attr('data-imgsrc','');

				img.attr('width',img.attr('data-width'));
				img.attr('data-width','');
				
				img.attr('height',img.attr('data-height'));
				img.attr('data-height','');
					
			}
		}
	},
	natureSightings: {
	  init: function(){
		$('#mycarouselNews').jcarousel({
		  scroll: 1
		});

		//Reconociendo caja mas alta
		/*$(".listNews").each(function(){
		  var height = $(this).height();
		  if( height > heightBlockMax ) {
				  heightBlockMax = height;
				  $("#left-menu ul.menu").css("height", parseInt(heightBlockMax) + parseInt(150) );
			  }
		});*/

		$(".listNews").hide();
		$(".listNews").first().show();
		$("#mycarouselNews a").first().addClass("active");

		var altoFirts = $(".listNews").first().height();
		var altoMenu = $("#left-menu ul.menu").height();


		if (altoFirts > altoMenu) {
		  $("#left-menu ul.menu").css("height", parseInt(altoFirts) + parseInt(150) );
		  $("#left-menu").attr("rel", parseInt(altoFirts) + parseInt(150) );
		}else{
		  $("#left-menu ul.menu").css("height", parseInt(altoMenu) + parseInt(50) );
		  $("#left-menu").attr("rel", parseInt(altoMenu) + parseInt(150) );
		};


		$("#mycarouselNews a").click(function(e){
		  e.preventDefault();
		  var nodo = $(this).attr("href");

		  $(this).parent().parent().find("a").removeClass("active");
		  $(this).addClass("active");

		  if (!$(nodo).is(":visible")){
			var altoNew = $(nodo).height();

			$(".listNews").stop(true,true).hide();
			$(nodo).stop(true,true).fadeToggle( "slow" );
			if (altoNew > altoMenu) {
			  $("#left-menu ul.menu").css("height", parseInt(altoNew) + parseInt(150) );
			  $("#left-menu").attr("rel", parseInt(altoNew) + parseInt(150) );
			}else{
			  $("#left-menu ul.menu").css("height", parseInt(altoMenu) + parseInt(50) );
			  $("#left-menu").attr("rel", parseInt(altoMenu) + parseInt(150) );
			};

			return false;
		  }
		});
		//Staff
		$(".tit_item_job a").click(function(e){
			e.preventDefault();
			console.log("explore guides");
			var altoMenuGeneralAtrr = $("#left-menu").attr("rel");
			var altoMenuGeneral = $("#left-menu ul.menu").height();
			var obj = $(this);
			var altoAcordion = $(".id_content_"+ obj.attr("rel")).height();

			$(".txt_item_job").each(function(){
			  var o = $(this);
			  if(!o.hasClass("id_content_"+ obj.attr("rel"))){
				o.stop(true,true).slideUp("fast");
				$("#left-menu ul.menu").css("height", altoMenuGeneral);
			  }else{
				$("#left-menu ul.menu").css("height", altoMenuGeneral);
			  }
			});

			$(".id_content_"+ obj.attr("rel")).stop(true,true).slideToggle();

			if (obj.parent().parent().find(".full-height").css("display") == "block" ) {
			  //alert("aca");
				$("#left-menu ul.menu").css("height", altoMenuGeneral);
			}else{
			  //alert("salio");
			  $("#left-menu ul.menu").css("height", altoNewAcordion);
			};
		})
	  }
	},
	guestComments: {
		init: function() {
			var fbook = $("#flipbook").turn({
				width: 583,
				height: 900,
				autoCenter: true,
				display: "single"
			});
			$("#flipbook").hover(function() {
				/* Stuff to do when the mouse enters the element */
				if($("#flipbook").turn("page") == 1){
					$(".fbook-right").fadeIn();
				}
			}, function() {
				/* Stuff to do when the mouse leaves the element */
			});
			$("#flipbook").bind("turned", function(event, page, view) {
				if(page > 1){
					$(".fbook-left").fadeIn();
				}else{
					$(".fbook-left").fadeOut();
				}
				if(page >= 1 && page < $("#flipbook").turn("pages")){
					$(".fbook-right").fadeIn();
				}else{
					$(".fbook-right").fadeOut();
				}
				//console.log("Page: "+page);
			});
			$(".fbook-right").on('click',function(e){
				$("#flipbook").turn('next');
			});
			$(".fbook-left").on('click',function(e){
				$("#flipbook").turn('previous');
			});

		}
	},
    search: {
        init: function(){
            $(".search-trigger a").on('click',function(e){
                e.preventDefault();
                $(".search-form-container").animate().stop();
                $(".search-form-container").slideToggle();
            })
        }
    }
}
MyApp.Main.init();
MyApp.search.init();

function Borrar(valor){
	if(document.getElementById("textfield").value==valor)
	{
		document.getElementById("textfield").value="";
	}
}

function Escribir(valor){
	if(document.getElementById("textfield").value=="")
	{
		document.getElementById("textfield").value=valor;
	}
}

function validarEmail(valor) {
	if (/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/.test(valor)){
		alert("La dirección de email " + valor + " es correcta.")
		return (true);
	} else {
		alert("La dirección de email es incorrecta.");
		return (false);
	}
}

$(document).ready(function(){
	$("select[name=Hotels]").val("").change();
	$(".menu_principal_website").hover(function(){
		$(".hotel-menu").stop(true,true);
	},function(){
		$(".hotel-menu").stop(true,true).delay(1000).slideUp(450);
	});

	$("input[name=captcha-101], select[name=Hotels]").on("change",function(){
		$("input[name=value_hotel]").val($("select[name=Hotels]").val());
	});
});

var altoleft = $(".entry-content").height() + 60;
var altoright =$("#left-menu ul.menu").height();
if (altoleft>altoright)
{
$("#left-menu ul.menu").css("height",altoleft);
}else{
$("#left-menu ul.menu").css("height",altoright);
	}

//valiar centrado de botones con respecto a la imagen

var altogaleria= $(".content-gallery").height()
var anchogaleria=$(".content-gallery").height()


 jQuery(document).ready(function() {
	jQuery('div.menu-menu_media_en-container > ul > li > a').live('click', function(e){
		   if(jQuery(this).parent().children('ul').length > 0){
				   e.preventDefault();
		   }
   });
 });
