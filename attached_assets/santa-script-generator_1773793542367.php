<?php require_once 'guyadmin/app/init.php';?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

   <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Santa Script Generator | VoiceoverGuy</title>
  <meta name="description" content="Try the Santa Script Generator. Type some info about who the message is for and receive a message back from Santa. Created by Guy Harris – the UK’s Voice of Santa">
  <link rel="canonical" href="https://www.voiceoverguy.co.uk/santa-script-generator">
  <meta property="og:title" content="Santa Script Generator | VoiceoverGuy">
  <meta property="og:description" content="Type some info about who the message is for and receive a message back from Santa. Created by Guy Harris – the UK’s Voice of Santa">
  <meta property="og:image" content="https://www.voiceoverguy.co.uk/assets/images/santa-script-generator.jpg">
  <meta property="og:url" content="https://www.voiceoverguy.co.uk/santa-script-generator">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Santa Script Generator | VoiceoverGuy">
  <meta name="twitter:description" content="Type some info about who the message is for and receive a message back from Santa. Created by Guy Harris – the UK’s Voice of Santa">
  <meta name="twitter:image" content="https://www.voiceoverguy.co.uk/assets/images/santa-script-generator.jpg">
 



<link href="assets/css/all.css" rel="stylesheet">
     <script type="text/javascript" src="assets/fancybox/lib/jquery-1.10.1.min.js"></script>
	
	
  <meta name="audio" content="https://www.voiceoverguy.co.uk/attenborough-voice/assets/audio/voice-demo-guy-harris-santa.mp3">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Santa Script Generator",
    "url": "https://www.voiceoverguy.co.uk/santa-script-generator",
    "description": "Use the Santa Script Generator to transform any scene into a nature-style voiceover script. Then book Guy Harris – the UK's trusted Santa voice.",
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

    <h1>Santa Script Generator</h1>
    <h2 style="margin-top: 10px;">A Free Santa message generator by The UK's Voice of Santa, Guy Harris</h2>
    <p class="subtitle">Type some info about who the message is for and receive a message back from Santa.<br>Get the <a href="/santa-voice" title="Santa Voiceover">Real Santa by VoiceoverGuy</a> to voice it and make it sound festive!</p>

    <div class="textarea-wrapper">
      <textarea id="userInput" placeholder="Please give details of who the message is for..." style="height: 60px;"></textarea>
		<br>
      <span id="wordCount" class="word-count-bottom">0/75 words</span>
      <div id="popup" class="popup">75 words max! 🛑</div>
    </div>

    <button id="generateBtn">🎙️ Generate</button>

    <div id="output" style=" position: relative;
  width: 100%;
  max-width: 800px;" > 
      <div id="outputContent"><span class="text-muted">Your Santa message will arrive here...</span></div>
      <button id="copyBtn" class="hidden" title="Copy Script">📋 Copy Text</button>
    </div>

    <div id="buttonWrapper" style="display: flex; justify-content: center; gap: 10px; margin-top: 5px;">
      <button id="newScenarioBtn" class="hidden">🔄 New Scenario</button>
    </div>

    <div class="info-box">
    <p>🎬 The UK's Leading Santa Voiceover Artist</p>
    <p>If you'd like it reading, copy the text and drop Santa a line on the <a href="https://www.voiceoverguy.co.uk/contact-guy" title="Contact Guy Harris" style="text-decoration: underline; color: #fff;"><strong>contact page</strong></a>.</p>
    <ul>
      <li><span class="star">⭐</span> Book the UK's voice of Santa of your script!</li>
      <li><span class="star">⭐</span> Broadcast quality audio files from the North Pole</li>
      <li><span class="star">⭐</span> Listen to Father Christmas in action.Santa demo:</li>
    </ul>
    <div class="demo-wrapper">
      <div id="demoPlayerWrapper">
        <audio id="realGuyDemo" controls>
          <source src="/attenborough-voice/assets/audio/voice-demo-guy-harris-santa.mp3" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
<br><a href="https://www.voiceoverguy.co.uk/contact-guy" target="_blank" rel="noopener noreferrer" style="color: #fff; text-decoration: underline;">
  Book <span style="color:#d42027;">Guy</span> Now!
</a>
      </div>
    </div>
  </div>
  

  <script src="/attenborough-voice/script-1.js"></script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "AudioObject",
    "name": "Santa Demo – Guy Harris",
    "description": "A short Santa-style demo voiced by Guy Harris.",
    "author": {
      "@type": "Person",
      "name": "Guy Harris",
      "url": "https://www.voiceoverguy.co.uk"
    },
    "thumbnailUrl": "https://www.voiceoverguy.co.uk/assets/images/santa-script-generator.jpg",
    "contentUrl": "https://www.voiceoverguy.co.uk/attenborough-voice/assets/audio/voice-demo-guy-harris-santa.mp3",
    "encodingFormat": "audio/mpeg",
    "duration": "PT1M26S",
    "uploadDate": "2025-10-04",
    "inLanguage": "en-GB",
    "isAccessibleForFree": true,
    "keywords": "father-christmas, free santa messages, father christmas messages",
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
        "name": "What is the Santa Script Generator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It's a fun tool that turns your text and input into a fantastic message from Santa. Then, why not copy it and have Santa voice it for you?"
        }
      },
      {
        "@type": "Question",
        "name": "Can I get the script voiced by Santa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Once your script is generated, you can book Guy Harris – the UK's Voice of Santa to read it for you."
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

<?php include("assets/inc/footer.php"); ?>

<script>
  const copyBtn = document.getElementById("copyBtn");
  const outputContent = document.getElementById("outputContent");

  copyBtn.addEventListener("click", () => {
    const range = document.createRange();
    range.selectNode(outputContent);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    try {
      document.execCommand("copy");
      copyBtn.innerText = "✅ Copied!";
      setTimeout(() => {
        copyBtn.innerText = "📋 Copy Text";
      }, 2000);
    } catch (err) {
      copyBtn.innerText = "❌ Failed";
    }

    window.getSelection().removeAllRanges();
  });
</script>
    
</body>
</html>