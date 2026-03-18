<?php require_once 'guyadmin/app/init.php';?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

   <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>David Attenborough Script Generator | VoiceoverGuy</title>
  <meta name="description" content="Try the David Attenborough Script Generator. Type a scene and get a nature-style narration. Created by Guy Harris – the UK’s top Attenborough voice soundalike">
  <link rel="canonical" href="https://www.voiceoverguy.co.uk/attenborough-script-generator">
  <meta property="og:title" content="David Attenborough Script Generator | VoiceoverGuy">
  <meta property="og:description" content="Type a quirky scenario and watch it turn into a nature-style narration. Then get the real VoiceoverGuy to voice it like Attenborough!">
  <meta property="og:image" content="https://www.voiceoverguy.co.uk/assets/images/attenborough-script-generator.jpg">
  <meta property="og:url" content="https://www.voiceoverguy.co.uk/attenborough-script-generator">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="David Attenborough Script Generator | VoiceoverGuy">
  <meta name="twitter:description" content="Enter a fun wildlife scene and hear it narrated in Attenborough’s style. Then book Guy Harris – the UK’s leading Attenborough voice.">
  <meta name="twitter:image" content="https://www.voiceoverguy.co.uk/assets/images/attenborough-script-generator.jpg">
 



<link href="assets/css/all.css" rel="stylesheet">
     <script type="text/javascript" src="assets/fancybox/lib/jquery-1.10.1.min.js"></script>
	
	
  <meta name="audio" content="https://www.voiceoverguy.co.uk/attenborough-voice/assets/audio/david-attenborough-demo-25-guy-harris.mp3">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "David Attenborough Script Generator",
    "url": "https://www.voiceoverguy.co.uk/attenborough-script-generator",
    "description": "Use the David Attenborough Script Generator to transform any scene into a nature-style voiceover script. Then book Guy Harris – the UK's trusted Attenborough voice.",
    "inLanguage": "en-GB"
  }
  </script>
	

	   <style>
  

    #copyBtn {
      position: absolute;
      bottom: -27px;
      right: 40px;
      font-size: 1.8rem;
      background-color: transparent;
      border: none;
      color: #999999;
      box-shadow: none;
    }
    #copyBtn:hover {
      color: #ffffff;
    }

    /* Padding and margin overrides for info-box and demo-wrapper */
    .info-box {
      padding-top: 15px;
      padding-bottom: 20px;
    }

    .info-box h3 {
      margin-top: 0;
      margin-bottom: 10px;
    }

    .info-box ul {
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .demo-wrapper {
      margin-top: 10px;
    }
  </style>
	  <link rel="stylesheet" href="/attenborough-voice/style-3.css">
	</head>
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
<div class="col-md-12" style="text-align: center" >


<!--
TEXT HERE
-->

    <h1>David Attenborough Script Generator</h1>
    <h2 style="margin-top: 10px;">A Fun, Free Attenborough-Style Script Generator by UK Voiceover Artist Guy Harris</h2>
    <p class="subtitle">Type a short scenario. Watch it transform into an Attenborough-style script.<br><a href="/david-attenborough-voice" title="David Attenborough Voiceover">get the real VoiceoverGuy</a> to voice it and make it sound awesome.</p>

    <div class="textarea-wrapper">
      <textarea id="userInput" placeholder="Describe a natural moment or quirky wildlife scene... eg. Two penguins arguing on an iceberg" style="height: 60px;"></textarea>
		<br>
      <span id="wordCount" class="word-count-bottom">0/25 words</span>
      <div id="popup" class="popup">25 words max! 🛑</div>
    </div>

    <button id="generateBtn">🎙️ Generate</button>

    <div id="output" style=" position: relative;
  width: 100%;
  max-width: 800px;" > 
      <div id="outputContent"><span class="text-muted">Your story will appear here...</span></div>
      <button id="copyBtn" class="hidden" style="display: none !important;" title="Copy Script">📋</button>
    </div>

    <button id="newScenarioBtn" class="hidden">🔄 New Scenario</button>

    <div class="info-box">
    <p>🎬 The UK's Leading David Attenborough Voiceover Artist</p>
    <p>Guy Harris - Renowned for his distinctive narration style as <strong> Attenborough </strong></p>
    <ul>
      <li><span class="star">⭐</span> Direct the session and get your script read right 1st time!</li>
      <li><span class="star">⭐</span> Receive a broadcast quality Wav file polished and ready to work with!</li>
      <li><span class="star">⭐</span> Listen to Guy’s David Attenborough demo:</li>
    </ul>
    <div class="demo-wrapper">
      <div id="demoPlayerWrapper">
        <audio id="realGuyDemo" controls>
          <source src="/attenborough-voice/assets/audio/david-attenborough-demo-25-guy-harris.mp3" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
<br><a href="https://www.voiceoverguy.co.uk/contact-guy" target="_blank" rel="noopener noreferrer" style="color: #fff; text-decoration: underline;">
  Book <span style="color:#d42027;">Guy</span> Now!
</a>
      </div>
    </div>
  </div>
  

  <script src="/attenborough-voice/script-2.js"></script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "AudioObject",
    "name": "David Attenborough Demo – Guy Harris",
    "description": "A short David Attenborough-style demo voiced by Guy Harris.",
    "author": {
      "@type": "Person",
      "name": "Guy Harris",
      "url": "https://www.voiceoverguy.co.uk"
    },
    "thumbnailUrl": "https://www.voiceoverguy.co.uk/assets/images/aattenborough-script-generator.jpg",
    "contentUrl": "https://www.voiceoverguy.co.uk/attenborough-voice/assets/audio/david-attenborough-demo-25-guy-harris.mp3",
    "encodingFormat": "audio/mpeg",
    "duration": "PT1M26S",
    "uploadDate": "2025-10-04",
    "inLanguage": "en-GB",
    "isAccessibleForFree": true,
    "keywords": "Attenborough, voiceover, demo, Guy Harris",
    "publisher": {
      "@type": "Organization",
      "name": "VoiceoverGuy",
      "url": "https://www.voiceoverguy.co.uk"
    }
  }
  </script>
</body>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the David Attenborough Script Generator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It's a fun tool that turns your scene into a nature-style voiceover script using AI. You can then get professional voice actor Guy Harris to voice it like Attenborough."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get the script voiced by a real person?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Once your script is generated, you can book Guy Harris – the UK's leading Attenborough-style voiceover artist – to narrate it for you."
        }
      },
      {
        "@type": "Question",
        "name": "Is this just for fun or for commercial use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The generator is free to play with, but you can commission a polished, studio-quality recording for professional projects."
        }
      }
    ]
  }
  </script>
	
	
</div>
</div>
</div>
</div>








<div id="parallax">
<div class="container">





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

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "David Attenborough Script Generator",
  "applicationCategory": "Creative Tool",
  "operatingSystem": "Web",
  "creator": {
    "@type": "Person",
    "name": "Guy Harris"
  },
  "description": "A free online script generator that creates David Attenborough-style narration text from user prompts, by UK voiceover artist Guy Harris.",
  "url": "https://www.voiceoverguy.co.uk/attenborough-script-generator"
}
</script>


<?php include("assets/inc/footer.php"); ?>
    
</body>
</html>