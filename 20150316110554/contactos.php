<?php 

$cuerpo = "<p>Datos de la Persona que hizo una RESERVA:</p><br>";

$cuerpo .= "<p>Fecha de llegada: " . $_POST["ini"] . "</p><br>";
$cuerpo .= "<p>Fecha de Salida: " . $_POST["sali"] . "</p><br>";


$cuerpo .= "<p>Nombre: " . $_POST["text1"] . "</p><br>";
$cuerpo .= "<p>E-mail: " . $_POST["text2"] . "</p><br>";
$cuerpo .= "<p>Procedencia: " . $_POST["text3"] . "</p><br>";
$cuerpo .= "<p>Tipo de habitacion: " . $_POST["text4"] . "</p><br>";
$cuerpo .= "<p>Comentario: " . $_POST["text5"] . "</p><br>";

  
$cuerpo = utf8_decode($cuerpo);
mail("jhonatan_rosas25@hotmail.com","RESERVA PAGINA UTASAINNPUNO",$cuerpo,"MIME-Version: 1.0\nContent-type: text/html; X-Mailer: PHP/".phpversion()."; charset=iso-8859-1\nFrom: UTASAINNPUNO <reservas@utasainnpuno.com>\n");

?>
<h2> THANK YOU !</h2> 

<p>Your reservation has been sent , within a period of 24 hours we will confirm your reservation and send a message to mail that you put in your reservation.</p> 

<p><span style="color:red;font-size:150%;font-weight:bold;"><?php print $email; ?></span></p> 




<script type='text/javascript'> 

document.write('<p class="details"><a href="javascript:history.go(-2);">Volver a la pagina de inicio.</a></p>'); 

</script> 

<script type='text/javascript'> 

setTimeout('history.go(-2)', 9000); 

</script> 


