<nav class="navbar navbar-inverse no-border-radius" id="main_navbar" role="navigation">
<div class="container-fluid">
    			    
                    <div class="navbar-header">
    				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-1">
    				<span class="sr-only">Toggle navigation</span>
    				<span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
    				</button>
    				<a class="navbar-link navbar-left" href="https://www.voiceoverguy.co.uk" title="VoiceoverGuy Home" ><img src="assets/images/favicon/favicon-128.png" class="menuicon" width="18" height="18" title="VoiceoverGuy Home" alt="VoiceoverGuy Home" > Home</a>
    			    </div>
    			
    			   <div class="collapse navbar-collapse" id="navbar-collapse-1">
                   
<a href="voiceoverguy" title="VoicoverGuy Who" class="navbar-link navbar-left"><i class="fa fa-info"></i>&nbsp;<span class="hidden-sm hidden-md"> Who</span></a>
                      
                    <ul class="nav navbar-nav navbar-left dropdown-onhover">
    				
    				<li class="dropdown-short">
                    
<a data-toggle="dropdown" href="javascript:;" class="dropdown-toggle" aria-expanded="true" title="Voice Demos"><i class="fa fa-microphone"></i>&nbsp;<span class="hidden-sm"> Voice Demos</span><span class="caret"></span></a>
    						
                      <ul class="dropdown-menu HingeUpToDown">
                      
    							
                                <?php echo html_entity_decode(Config::get('seo3.s7')); ?>
                             
    				</ul>
    				</li>
                        
                        <ul class="nav navbar-nav navbar-left dropdown-onhover">
    					
    					
    					<li class="dropdown-short">

<a data-toggle="dropdown" href="javascript:;" class="dropdown-toggle" aria-expanded="true" title="Character Demos"><i class="fa fa-user"></i>&nbsp;<span class="hidden-sm"> Character Demos</span><span class="caret"></span></a>
    						
                         <ul class="dropdown-menu HingeUpToDown " >
    					
                          <?php echo html_entity_decode(Config::get('seo3.s8')); ?>
                             	
    				    </ul>
    					</li>
                        
                        
                        
                        
                        
                        <ul class="nav navbar-nav navbar-left dropdown-onhover">
    				
                           <li class="dropdown-short">

<a data-toggle="dropdown" href="javascript:;" class="dropdown-toggle" aria-expanded="true" title="Video Demos"><i class="fa fa-video-camera"></i>&nbsp;<span class="hidden-sm"> Video</span><span class="caret"></span></a>

    						<ul class="dropdown-menu HingeUpToDown">
    						
                                
                            <?php echo html_entity_decode(Config::get('seo3.s1')); ?>
                             
    						</ul>
    					    </li>
                        
    					
    			
							
							<a href="voiceover-news" title="News &amp; Blog" class="navbar-link navbar-left"><i class="fa fa-newspaper-o"></i>&nbsp;<span class="hidden-sm hidden-md"> News &amp; Blog</span></a>
                
							
							
							<a href="FAQ" title="FAQ's" class="navbar-link navbar-left"><i class="fa fa-question"></i>&nbsp;<span class="hidden-sm hidden-md"> FAQ's</span></a>
                


  
                    
                      
                       
                        



<li class="dropdown-grid nav navbar-nav navbar-right">
<a data-toggle="dropdown" href="javascript:;" onClick="window.location='https://www.voiceoverguy.co.uk/contact-guy';" class="dropdown-toggle"><i class="fa fa-phone"></i>&nbsp;<span class="hidden-sm"> Contact & How Much</span><span class="caret"></span></a>

<div class="dropdown-grid-wrapper" role="menu">
<div class="dropdown-menu col-xs-12 col-sm-6 col-md-6 col-lg-6 HingeUpToDown">

<ul  >
<li>
<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" >
	 <?php echo html_entity_decode(Config::get('seo3.s9')); ?>
	

</div>

<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" >
	 <?php // echo html_entity_decode(Config::get('seo3.s10')); ?>

<img class="img-responsive" style="max-height: 130px;" src="assets/images/voicoverguy-contact.png" alt="Contact VoiceoverGuy" title="Contact VoiceoverGuy"    />

</div>
                                                        

                                        
</li>
    						
<li >
<br />

</li>
</ul>

</div></div></li>





<li class="dropdown-grid nav navbar-nav navbar-right">
<a data-toggle="dropdown" href="javascript:;" class="dropdown-toggle"><i class="fa fa-link"></i>&nbsp;<span class="hidden-sm"> Links</span><span class="caret"></span></a>

<div class="dropdown-grid-wrapper" role="menu">
<div class="dropdown-menu col-xs-12 col-sm-6 col-md-6 col-lg-6 HingeUpToDown">




<ul>
    								<li class="col-sm-12 dropdown-header text-center menu1" >
    									<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                                        
                                         <?php echo html_entity_decode(Config::get('seo3.s4')); ?>
                                 </li>
    							                                
                                                                
                                                                
                                 <li id="myTab" >
                                   <?php  echo html_entity_decode(Config::get('seo3.s2')); ?>
                                 </li>
                                 
                                 
                                 
                                 </ul>


</div></div></li>





                      
                      
                      
                      
                                
                       
               
                        
         
							
			
                        
                        
                          
                        



</div></nav>
						
						
							</div> 
				</div>
			</div>
		</div>
<script type="text/javascript">
  function toggleDiv(divId) {
    $("#" + divId).slideToggle();							
  }
</script>
		
		<script type="text/javascript">
			$(function(){
				$(".search").keyup(function() 
				{ 
					var searchid = $(this).val();
					var dataString = 'search='+ searchid;
					if(searchid!='')
					{
						$.ajax({
							type: "POST",
							url: "search/search.php",
							data: dataString,
							cache: false,
							success: function(html)
							{
								$("#result").html(html).show();
							}
						});
					}return false;    
				});
				
				
				$(document).mouseup(function (e)
				{
					
					jQuery("#result").fadeOut(); 
				});
				
				
				
			});
		</script>

<style type="text/css">
			
			
			.content{
			width:90%;
			max-width:650px;
			margin:0 auto;
			}
			#searchid
			{
			width:100%;
			height:50px;
			border:solid 1px #999;
			padding:20px;
			font-size:14px;
			margin-bottom:21px;
			
			}
			#result
			{
			position:absolute;
			width:90%;
			max-width:650px;
			padding:10px;
			display:none;
			margin-top:-1px;
			border-top:0px;
			overflow:hidden;
			border:1px #999 solid;
			background-color: white;
			max-height:460px;
			overflow:scroll;
			}
			.show
			{
			padding:3px; 
			
			font-size:10px; 
			
			}
			.show:hover
			{
			
			background:#4c66a4;
			color:#FFF;
			cursor:pointer;
			}
			
			
			
		</style>
		
		
		<div class="content" >
			<input  type="text" class="search" id="searchid" placeholder="<?php echo html_entity_decode(Config::get('searchops.s1')); ?>" autocomplete="off" /><br>
			<div id="result" style="z-index:2"></div>
		</div>