<?php require_once 'guyadmin/app/init.php';?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
	  
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title><?php echo Config::get('seo20.s1'); ?></title>

    <meta name="description" content="<?php echo Config::get('seo20.s2'); ?>">
    
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@voiceoverman">
<meta name="twitter:title" content="Guy Harris">

<meta name="twitter:description" content="<?php echo Config::get('seo20.s2'); ?>">

<meta name="Robots" content="index, follow">

 

<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

  
<link rel="apple-touch-icon-precomposed" sizes="57x57" href="assets/images/favicon/apple-touch-icon-57x57.png" />
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="assets/images/favicon/apple-touch-icon-114x114.png" />
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="assets/images/favicon/apple-touch-icon-72x72.png" />
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="assets/images/favicon/apple-touch-icon-144x144.png" />
<link rel="apple-touch-icon-precomposed" sizes="60x60" href="assets/images/favicon/apple-touch-icon-60x60.png" />
<link rel="apple-touch-icon-precomposed" sizes="120x120" href="assets/images/favicon/apple-touch-icon-120x120.png" />
<link rel="apple-touch-icon-precomposed" sizes="76x76" href="assets/images/favicon/apple-touch-icon-76x76.png" />
<link rel="apple-touch-icon-precomposed" sizes="152x152" href="assets/images/favicon/apple-touch-icon-152x152.png" />
<link rel="apple-touch-icon-precomposed" sizes="180x180" href="assets/images/favicon/favicon-180.png" />
<link rel="icon" type="image/png" href="assets/images/favicon/favicon-16.png" sizes="16x16">
<link rel="icon" type="image/png" href="assets/images/favicon/favicon-17.png" sizes="17x17">
<link rel="icon" type="image/png" href="assets/images/favicon/favicon-18.png" sizes="18x18">
<link rel="icon" type="image/png" href="assets/images/favicon/favicon-255.png" sizes="255x255">
<link rel="icon" type="image/png" href="assets/images/favicon/favicon-256.png" sizes="256x256">
<link rel="icon" type="image/png" href="assets/images/favicon/favicon-196x196.png" sizes="196x196" />
<link rel="icon" type="image/png" href="assets/images/favicon/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/png" href="assets/images/favicon/favicon-32x32.png" sizes="32x32" />
<link rel="icon" type="image/png" href="assets/images/favicon/favicon-16x16.png" sizes="16x16" />
<link rel="icon" type="image/png" href="assets/images/favicon/favicon-128.png" sizes="128x128" />
<meta name="application-name" content="&nbsp;"/>
<meta name="msapplication-TileColor" content="#FFFFFF" />
<meta name="msapplication-TileImage" content="assets/images/favicon/mstile-144x144.png" />
<meta name="msapplication-square70x70logo" content="assets/images/favicon/mstile-70x70.png" />
<meta name="msapplication-square150x150logo" content="assets/images/favicon/mstile-150x150.png" />
<meta name="msapplication-wide310x150logo" content="assets/images/favicon/mstile-310x150.png" />
<meta name="msapplication-square310x310logo" content="assets/images/favicon/mstile-310x310.png" />



<link rel="canonical" href="https://www.voiceoverguy.co.uk/contact-guy" />

	  
	  <script src="https://www.paypal.com/sdk/js?client-id=BAAMP01Wih3RJwwY9pp3zcmeSuwovmzMaYB2M05VF9QTxY_RJ7nB38i59Sn-SGnDIR1BD2zhuSVkcx1rZU&components=hosted-buttons&disable-funding=venmo&currency=GBP">
</script>
	  
	  
	  
	  <link href="assets/css/all.css" rel="stylesheet">
     <script type="text/javascript" src="assets/fancybox/lib/jquery-1.10.1.min.js"></script>
	
	
	
	
	</head>
     
     
        
<style>
	
	#price1 {display: none;}
	#price2 {display: none;}
	#price3 {display: none;}
	#price4 {display: none;}
	#price5 {display: none;}
	
	
	input[type=text], input[type=email], textarea {
    border:1px solid #ccc;
    padding:8px;
    margin:2px 0;
    font-size:13px;
    font-family:Arial, Helvetica, sans-serif;
    color:#8f8f8f;
    width:250px;
    border-radius:5px;
    box-shadow:inset 0 0 8px #e5e8e7;
}
input[type=submit] {
    border:none;
    padding:8px 25px;
    margin:2px 0;
    font-family:Arial, Helvetica, sans-serif;
    color:#fff;
    background:#0d7963;
    border-radius:5px;
    cursor:pointer;
}
input[type=submit]:hover {
    opacity:0.9;
}

	</style>




    <script>
		
		
		
		
		
		
      function countChar(val) {
        var len = val.value.length;
		  
		
		  var regex = /\s+/gi;
    var wordCount = val.value.trim().replace(regex, ' ').split(' ').length;
		  
		  
		  
	$('#charNum2').text(len);
	$('#wordCount').text(wordCount); 
		  
		  //  $('#count1').text(wordCount); 
		  
		
document.getElementById("count1").value = len;
document.getElementById("count2").value = wordCount;
		  

		  
 if (len <= 1) { 
	 
	 
	 $('#charNum3').text("£49.99"); 
			   
		document.getElementById('price1').style.display = "none";
		document.getElementById('price2').style.display = "none"; 
	    document.getElementById('price3').style.display = "none"; 
	    document.getElementById('price4').style.display = "none"; 
	    document.getElementById('price5').style.display = "none"; 
			   
			   
			   
			   }
		  
		  
		  
    else if (len > 1 && len <250) { 
		$('#charNum3').text("£49.99"); 
		document.getElementById('price1').style.display = "block";
		document.getElementById('price2').style.display = "none";
		document.getElementById('price3').style.display = "none";
		document.getElementById('price4').style.display = "none";
		document.getElementById('price5').style.display = "none"; 
	}
		  
   
		  
		  
	else if (len > 249 && len <450) { 
		
		
		$('#charNum3').text("£74.99"); 
									
		
		document.getElementById('price1').style.display = "none";
		document.getElementById('price2').style.display = "block";
		document.getElementById('price3').style.display = "none";
		document.getElementById('price4').style.display = "none";
		document.getElementById('price5').style.display = "none";
									
									
									}
    else if (len > 449 && len <600) { 
		
		
		$('#charNum3').text("£99.99");
		
		document.getElementById('price1').style.display = "none";
		document.getElementById('price2').style.display = "none";
		document.getElementById('price3').style.display = "block";
		document.getElementById('price4').style.display = "none";
		document.getElementById('price5').style.display = "none";
									
									
									
									}
    else if (len > 599 && len <1000) { 
		
		
		$('#charNum3').text("£139.99");
		
		
		document.getElementById('price1').style.display = "none";
		document.getElementById('price2').style.display = "none";
		document.getElementById('price3').style.display = "none";
		document.getElementById('price4').style.display = "block";
		document.getElementById('price5').style.display = "none";
									
									 
									 
									 }
		  
		  
		  
    else{ 
		
		$('#charNum3').text("Submit script for a quote");
		document.getElementById('price1').style.display = "none";
		document.getElementById('price2').style.display = "none";
		document.getElementById('price3').style.display = "none";
		document.getElementById('price4').style.display = "none";
		document.getElementById('price5').style.display = "block";
									
		
		
		
		
		}
		  
		  
      };
		
		
		
    </script>
    
    
<script type="text/javascript">
$(function() {

$(".submit").click(function() {


	
	//var res = str.replace("Microsoft", "W3Schools");
	
	var myStr = $("#message").val();
    var newStr = myStr.replace(/&/g, "and");
	
    var message = newStr;
	
	
	var name = $("#name").val();
	var email = $("#email").val();
	
	     
	
    var dataString = 'message='+ message + '&name=' + name + '&email=' + email;
	
	
	
	if(message=='' || name=='' || email=='')
	{
	$('.success').fadeOut(200).hide();

    $('.error').fadeOut(200).show();
		
   
	}
	
	
	else
	{
	$.ajax({
	type: "POST",
    url: "process-form.php",
    data: dataString,
    success: function(){
	$('.success').fadeIn(200).show();
    $('.error').fadeOut(200).hide();
	$('.submit').fadeOut(200).hide();
	
		
   }
});




	}
		

    return false;
	});



});
</script>






<body>
  
  
<!-- Start Top Menu -->
<div class="container-fluid">
<div class="row">
<div class="col-md-12" id="maintopnav" >
			       
<nav class="topnav">
<?php include("assets/inc/socials.php"); ?>
</nav>

</div>
</div>
</div>
<!-- End Top Menu -->
    




<div class="container">
<div class="row">
<div class="col-md-12">

<a href="https://www.voiceoverguy.co.uk" title="Guy Harris - Voiceover Guy">
<img alt="Guy Harris - Voiceover Guy" title="Guy Harris - Voiceover Guy" class="img-responsive" id="newlogo"  src="assets/images/guy-harris-voiceover.png" />
</a> 
<br>
<div class="container"> <?php include("assets/inc/menu.php"); ?></div>
    

</div></div></div>










<div id="parallax">
<div class="container">
	
	
	
<div class="row">
<div class="col-md-6" >
<?php echo html_entity_decode(Config::get('seo20.s3')); ?>
</div>

<div class="col-md-6" >
<?php echo html_entity_decode(Config::get('seo20.s4')); ?>
</div>
</div>
	
		
<div class="row">
<div class="col-md-6" >
	

	
	
<?php echo html_entity_decode(Config::get('seo20.s5')); ?>
	
	<br>
	
	
<script>
  paypal.HostedButtons({
    hostedButtonId: "88CKT5NKL3DJ6",
  }).render("#paypal-container-88CKT5NKL3DJ6")
</script>
	<div id="paypal-container-88CKT5NKL3DJ6"></div>

</div>

<div class="col-md-6" >
<?php echo html_entity_decode(Config::get('seo20.s6')); ?>
	
	
</div>
</div>
	
	






<?php include("assets/inc/applinks.php"); ?>   

</div><!-- End Containerr-->


<!-- Start Footer-->
<div class="container-fluid">
<div class="row">
<div class="col-md-12" id="newfooter">

<?php echo html_entity_decode(Config::get('seo28.s1')); ?>
   
<?php include("assets/inc/socials.php"); ?>
<br> </div></div></div></div>
<!-- End Footer-->

</div>

 <?php include("assets/inc/footer.php"); ?>
    
</body>
</html>