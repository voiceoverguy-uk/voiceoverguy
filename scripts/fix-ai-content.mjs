import { readFileSync, writeFileSync } from 'fs';

const filePath = 'artifacts/web/src/data/blog-posts.ts';
let content = readFileSync(filePath, 'utf8');

// ─── JOKER PAGE REWRITES ───────────────────────────────────────────────────

// info
content = content.replace(
  /"info": "<p>Love The Dark Knight\? So did I \u2014 that\u2019s why I had to master Heath Ledger\u2019s legendary Joker voice\. Whether it\u2019s a Halloween promo, twisted trailer or character parody, I\u2019ve got the cackle covered\.<\/p>",/,
  `"info": "<p>I have always loved The Dark Knight, so voicing a Joker tribute was something I could not resist. Whether it is a Halloween promo, a twisted trailer or a character parody, I have got the cackle well and truly covered.</p>",`
);

// text1
content = content.replace(
  /"text1": "<h2>What a Joker!<\/h2>\\r\\n<p>I couldn\u2019t resist syncing my voice to one of the most iconic villains of all time\. I\u2019ve studied the laughs, the chaos, and the eerie calm\. Joker\u2019s a character with depth \u2014 and voicing him has been one of my favourite challenges\.<br>\\r\\nYou\u2019ll also find me bringing creepy voices to life for <a href="halloween-voice" target="_blank" title="Halloween Voiceovers">Halloween campaigns<\/a> across TV and radio\. Want something similar\? Check out my <a href="character-voiceover" target="_blank" title="Character Voiceover Showreel">character showreel<\/a> for more\.<\/p>",/,
  `"text1": "<h2>What a Joker!</h2>\\r\\n<p>I could not resist having a go at one of the most iconic villains in cinema history. Heath Ledger\u2019s Joker has a very particular rhythm to it, a mix of charm, menace and total unpredictability, and getting that right was a genuinely enjoyable challenge. You will also find me bringing all kinds of creepy voices to life for <a href=\\"halloween-voice\\" target=\\"_blank\\" title=\\"Halloween Voiceovers\\">Halloween campaigns</a> across TV and radio. If you fancy something similar, take a look at my <a href=\\"character-voiceover\\" target=\\"_blank\\" title=\\"Character Voiceover Showreel\\">character showreel</a> for more.</p>",`
);

// text2
content = content.replace(
  /"text2": "<h2>Incredible Bad Guys<\/h2>\\r\\n<p>Heath Ledger gave us one of the most iconic villains of all time\. And while I\u2019m no Oscar-winner, I\u2019ve been lucky to voice some truly twisted characters over the years\. From <a href="scary-movie-ghost-face-voice" title="Ghost Face Scream Voice">Ghost Face in Scream<\/a> to <a href="https:\/\/www\.voiceoverguy\.co\.uk\/dracula-voiceover-for-halloween" title="Dracula Voiceover">Count Dracula<\/a>, my Halloween roster is full of creepy legends\.<br><br>\\r\\n\\r\\nIf you\u2019re planning a promo, trailer or haunted event, I can provide a Joker-style voice or something even more terrifying\. Why not pair it with a <a href="https:\/\/www\.voiceoverguy\.co\.uk\/spooky-halloween-laughs" title="Spooky Laughs">signature spooky laugh<\/a> or go full <a href="https:\/\/www\.voiceoverguy\.co\.uk\/evil-character-voiceover" title="Evil Character Voice">evil villain<\/a>\? Let\u2019s give your audience the creeps \u2014 in the best possible way\.<\/p>",/,
  `"text2": "<h2>Incredible Bad Guys</h2>\\r\\n<p>Heath Ledger gave us one of the most iconic villains of all time, and while I am no Oscar-winner, I have been lucky to voice some genuinely twisted characters over the years. From <a href=\\"scary-movie-ghost-face-voice\\" title=\\"Ghost Face Scream Voice\\">Ghost Face in Scream</a> to <a href=\\"https://www.voiceoverguy.co.uk/dracula-voiceover-for-halloween\\" title=\\"Dracula Voiceover\\">Count Dracula</a>, my Halloween roster has some properly creepy entries on it.<br><br>\\r\\n\\r\\nIf you are planning a promo, trailer or haunted event, I can provide a Joker-style voice or something even more terrifying. You could pair it with a <a href=\\"https://www.voiceoverguy.co.uk/spooky-halloween-laughs\\" title=\\"Spooky Laughs\\">signature spooky laugh</a> or go the full <a href=\\"https://www.voiceoverguy.co.uk/evil-character-voiceover\\" title=\\"Evil Character Voice\\">evil villain</a> route. Either way, your audience will not forget it.</p>",`
);

// bottomText
content = content.replace(
  /"bottomText": "<h2>Let\u2019s put a smile on that script<\/h2>\\r\\n<p>Need a spooky Joker voice for a Halloween promo or a villainous campaign\? I\u2019ll record it fast from my broadcast studio\. Send over the script or just your idea \u2014 I\u2019ll make it sinister\. <a href="contact-guy" title="Contact VoiceoverGuy">Get in touch<\/a> and let\u2019s add a little chaos to your next project\.<\/p>",\s*\n\s*"rawDate": "July 2014"/,
  `"bottomText": "<h2>Let\u2019s put a smile on that script</h2>\\r\\n<p>Need a spooky Joker voice for a Halloween promo or a villainous campaign? I will record it fast from my broadcast studio. Send over the script or just your idea and I will make it sinister. <a href=\\"contact-guy\\" title=\\"Contact VoiceoverGuy\\">Get in touch</a> and let us add a little chaos to your next project.</p>",\n    "rawDate": "July 2014"`
);

// ─── PRO VOICE OVER VS CHEAPER ALTERNATIVE (ID 954) ──────────────────────

// info - fix <p1> typo
content = content.replace(
  /"info": "<p1>Discover why a professional voiceover is worth the investment in our comparison of a pro vs a cheaper alternative\.\r\n<\/p>",/,
  `"info": "<p>Discover why a professional voiceover is worth the investment, and what you actually get when you choose quality over a cheaper alternative.</p>",`
);

// text1 - remove AI bullet list
content = content.replace(
  /"text1": "<h2><b>A Pro Voice Over vs Cheaper Alternative<\/b><\/h2>\\r\\n<p>\\r\\n<strong>Experience and Expertise:<\/strong> A professional voiceover artist has years of experience and training, as well as a deep understanding of the nuances of voice work and can be available at short notice with it being a full time job for them\.<br>\\r\\n<strong>High-Quality Audio:<\/strong> A professional voiceover artist has access to state-of-the-art equipment and recording studios, which ensures that your audio will be of the highest quality possible\. This is crucial for ensuring that your message is clear and easy to understand\.<br>\\r\\n<strong>Quick Turnaround Time:<\/strong> Professional voiceover artists are used to working under tight deadlines and can often deliver your project within a matter of hours\. This quick turnaround time ensures that your project stays on schedule and meets your deadline\.<br>\\r\\n<\/p>",/,
  `"text1": "<h2><b>A Pro Voice Over vs Cheaper Alternative</b></h2>\\r\\n<p>\\r\\nWhen you book a professional voiceover artist, you are getting someone who does this full time. That means years of experience reading all kinds of scripts, a proper broadcast-quality studio, and a genuine understanding of how delivery, pacing and tone affect the finished product.<br><br>\\r\\nYou also get a fast turnaround. Most jobs come back within hours, not days. A cheaper alternative might save money upfront, but if the audio is not right, you end up redoing it and paying twice.\\r\\n</p>",`
);

// text2 - remove AI bullet list
content = content.replace(
  /"text2": "<p>\\r\\n<strong>Customization:<\/strong> A professional voiceover artist can work with you to create a voice that matches your specific needs and goals\. This level of customization ensures that your voiceover will be unique and tailored to your project\.<br>\\r\\n<strong>Reliability:<\/strong> Professional voiceover artists take their work seriously and are committed to delivering high-quality results every time\. This level of reliability ensures that you can trust your voiceover artist to deliver the results you need, when you need them\.<br>\\r\\n<strong>Attention to Detail:<\/strong> A professional voiceover artist pays attention to every detail of your project, from the tone and inflection of the voice to the pacing and timing of the delivery\. This level of attention to detail ensures that your message is delivered with the perfect balance of clarity and emotion\.<br>\\r\\n\\r\\n<\/p>",\s*\n\s*"image": "professional-voice-over-vs-cheaper-alternative-voiceover\.jpg",/,
  `"text2": "<p>\\r\\nA good voiceover artist also adapts. Every project is different and a professional will take direction, try different reads and get the tone right for your specific brief. That flexibility is something you rarely get from a budget option or a text-to-speech tool.<br><br>\\r\\nThe difference usually shows up in the subtleties. Timing, energy, the way a pause lands. Getting that right is what makes an ad memorable rather than just functional.\\r\\n</p>",\n    "image": "professional-voice-over-vs-cheaper-alternative-voiceover.jpg",`
);

// bottomText
content = content.replace(
  /"bottomText": "<h2><b>Why choose a professional voice over over a cheaper alternative\?<\/b><\/h2>\\r\\n<p>\\r\\nIn this blog, we explore the benefits of choosing a professional voiceover artist over a cheaper alternative\. With years of experience, access to state-of-the-art equipment, and a commitment to delivering high-quality results, a professional voiceover artist can provide you with a customized, reliable, and cost-effective solution\.\\r\\n<\/p>",\s*\n\s*"rawDate": "March 23",/,
  `"bottomText": "<h2><b>Worth the investment</b></h2>\\r\\n<p>\\r\\nIf you are weighing up the options for your next voiceover project, feel free to get in touch. I am happy to provide a short sample from your script so you can hear exactly what you would be getting before you commit.\\r\\n</p>",\n    "rawDate": "March 23",`
);

// ntext1
content = content.replace(
  /"ntext1": "<p>\\r\\n<strong>Versatility:<\/strong> Professional voiceover artists have the ability to deliver a wide range of voices and styles, from character voices to corporate narration\. This level of versatility ensures that your project can be tailored to your specific needs and goals\.<br>\\r\\n<strong>Professionalism:<\/strong> A professional voiceover artist understands the importance of professionalism and will conduct themselves in a way that reflects positively on your brand\. This level of professionalism ensures that your project will be delivered with the utmost care and attention to detail\.<br>\\r\\n<\/p>",\s*\n\s*"ntext2": "<p><br>\\r\\n<strong>Cost-Effective:<\/strong>/,
  `"ntext1": "<p>\\r\\nRange matters too. A professional voiceover artist can move between warm and conversational, authoritative and informative, energetic and playful, depending on what the project calls for. That versatility is hard to replicate with a single generic voice.\\r\\n</p>",\n    "ntext2": "<p><br>\\r\\n<strong>Cost-Effective:`
);

// ntext2
content = content.replace(
  /<strong>Cost-Effective:<\/strong> While a professional voiceover artist may cost more upfront, they often provide a cost-effective solution in the long run\. A high-quality voiceover can last for years, while a low-quality voiceover may need to be redone, costing you time and money in the long run\.<br>\\r\\n<strong>Brand Consistency:<\/strong> A professional voiceover artist can help you establish a consistent brand voice across all of your projects\. This level of consistency ensures that your brand is easily recognizable and helps build trust and credibility with your audience\.<br>\\r\\n<\/p>",\s*\n\s*"ntext3": "",\s*\n\s*"ntext4": "",\s*\n\s*"nimage1": "professional-voice-over-vs-cheaper-alternative-voiceover-studio\.jpg",/,
  `</strong> While a professional voiceover artist may cost more upfront, the quality tends to hold up over time. If you are producing content that needs to work for years, whether that is an ad campaign, a product video or an e-learning course, having a consistent voice across all of it makes a real difference to how professional the whole thing feels.<br>\\r\\n</p>",\n    "ntext3": "",\n    "ntext4": "",\n    "nimage1": "professional-voice-over-vs-cheaper-alternative-voiceover-studio.jpg",`
);

// ─── TIPS FOR BECOMING A VOICEOVER ACTOR (ID 955) ────────────────────────

// text1
content = content.replace(
  /"text1": "<h2><b>Becoming a Voiceover Actor: Navigating AI Challenges<\/b><\/h2>\\r\\n<p>\\r\\nBecoming a voiceover actor is a dream for many people who want to use their voice to convey emotions and stories\. Voiceover acting can be a lucrative career for those who are passionate about it and have the talent and dedication to succeed\. However, with the advent of AI technology, the voiceover industry is undergoing a transformation, and it\u2019s becoming more competitive than ever\. In this article, we will discuss how to become a voiceover actor and the difficulties faced with AI technology coming in\.\\r\\n<\/p>",/,
  `"text1": "<h2><b>Becoming a Voiceover Actor: Navigating AI Challenges</b></h2>\\r\\nGetting into voiceover is genuinely exciting, but it does take some work to get established. The industry has changed quite a bit with the rise of AI-generated voices, and that is something anyone starting out today needs to think about. The good news is that real character, personality and adaptability are still things AI cannot replicate particularly well.\\r\\n</p>",`
);

// text2
content = content.replace(
  /"text2": "<h2><b>Tips to consider<\/b><\/h2>\\r\\n<p>\\r\\n<strong>Develop Your Voice:<\/strong>\\r\\nTo become a voiceover actor, you need to have a unique and expressive voice that can bring characters and stories to life\. The first step in becoming a voiceover actor is to develop your voice\. You can do this by practicing speaking exercises such as tongue twisters and breathing exercises\. You can also take vocal lessons from a professional voice coach to improve your diction, intonation, and clarity\.<br>\\r\\n<strong>Build Your Portfolio:<\/strong>\\r\\nTo showcase your voiceover skills, you need to build a portfolio that demonstrates your range and versatility\. You can start by creating a demo reel that highlights your voiceover skills\. A demo reel should showcase a variety of genres such as commercials, animation, and narration\. It should also demonstrate your ability to convey emotions and bring characters to life\.\\r\\n<\/p>",/,
  `"text2": "<h2><b>Tips to consider</b></h2>\\r\\n<p>\\r\\n<strong>Develop your voice.</strong>\\r\\nWork on your delivery, not just how your voice sounds. Practising reading scripts aloud, working with a voice coach, or even just recording yourself and listening back honestly will all help improve your diction, pacing and range. The goal is flexibility, being able to adapt your delivery to different briefs and styles.<br><br>\\r\\n<strong>Build your demo reel.</strong>\\r\\nYou will need examples of your work before anyone will book you. A good demo reel covers a range of styles, commercials, narration, character voices, whatever best represents what you can do. Keep it short, keep it varied, and lead with your strongest material.\\r\\n</p>",`
);

// bottomText
content = content.replace(
  /"bottomText": "<h2><b>In summary\?<\/b><\/h2>\\r\\n<p>\\r\\nIn conclusion, becoming a voiceover actor requires hard work, dedication, and perseverance\. The voiceover industry is undergoing a transformation with the advent of AI technology, and voiceover actors need to adapt to stay relevant\. By developing your voice, building your portfolio, joining a voiceover agency, attending auditions, staying up-to-date with the latest trends, and being persistent and resilient, you can increase your chances of success in this competitive field\. While AI technology may pose challenges, it also presents opportunities for innovation and growth\. By embracing new technologies and continuing to develop your skills, you can thrive as a voiceover actor in the ever-evolving landscape of the industry\.\\r\\n<\/p>",/,
  `"bottomText": "<h2><b>Final thoughts</b></h2>\\r\\nGetting established in voiceover takes time and a willingness to keep improving. AI is genuinely changing parts of the industry, but there is still a lot of work out there for voices with real personality and range. The artists who keep developing, stay curious and treat every job as a chance to do something good are the ones who tend to do well.\\r\\n</p>",`
);

// ntext1
content = content.replace(
  /"ntext1": "<br><p>\\r\\n<strong>Join a Voiceover Agency:<\/strong>\\r\\nTo get started in the voiceover industry, you need to get noticed by industry professionals\. One way to do this is to join a voiceover agency\. Voiceover agencies represent voiceover actors and connect them with clients who need voiceover services\. Voiceover agencies can help you get more exposure and access to high-profile projects\. However, getting accepted into an agency can be challenging, and you need to have a strong portfolio and skills to stand out\.<br>\\r\\n<strong>Attend Auditions:<\/strong>\\r\\nAs a voiceover actor, attending auditions is a critical part of your job\. Auditions allow you to showcase your skills and land new projects\. To prepare for an audition, you should practice the script, research the client, and understand the character you\u2019re portraying\. It\u2019s also important to be confident and enthusiastic about your performance\.\\r\\n<\/p>",\s*\n\s*"ntext2": "<br><p>\\r\\n<strong>Stay Up-to-Date/,
  `"ntext1": "<br><p>\\r\\n<strong>Get in front of agencies.</strong>\\r\\nOnce you have a demo reel you are proud of, start approaching voiceover agencies. They will not take everyone, but having representation makes a real difference in terms of getting in front of the right clients. Take the feedback you get along the way, even a rejection with a reason is useful.<br><br>\\r\\n<strong>Put yourself forward for work.</strong>\\r\\nAuditions, self-tape submissions, online casting platforms. The more you put yourself out there, the more you get a feel for what clients are looking for and the better your reads tend to get.\\r\\n</p>",\n    "ntext2": "<br><p>\\r\\n<strong>Stay Up-to-Date`
);

// ntext2
content = content.replace(
  /<strong>Stay Up-to-Date with the Latest Trends:<\/strong>\\r\\nThe voiceover industry is constantly evolving, and it\u2019s essential to stay up-to-date with the latest trends and technology\. With the advent of AI technology, voiceover actors need to be adaptable and flexible\. It\u2019s important to understand how AI technology works and how it\u2019s changing the voiceover industry\. Voiceover actors need to be open to new technology and willing to embrace it as part of their career\.<br>\\r\\n<strong>Challenges Faced with AI Technology:<\/strong>\\r\\nAs mentioned, AI technology is transforming the voiceover industry\. AI technology can generate realistic-sounding voiceovers that mimic human voices\. This technology can also create custom voices, which can be used for personalized voice experiences for consumers\. However, this also means that voiceover actors face competition from AI-generated voiceovers\. Voiceover actors need to adapt and find ways to stand out in a competitive industry\. See our post on <a href="human-voice-over-vs-ai" title="humans vs AI technology">Humans vs AI technology<\/a>\.<br>\\r\\n<strong>Be Persistent and Patient:<\/strong>\\r\\nBecoming a voiceover actor is not an overnight success story\. It takes time, dedication, and patience\. Voiceover actors need to be persistent and keep working on their skills and portfolio\. It\u2019s also essential to be open to feedback and take criticism constructively\. Remember that rejection is part of the job, and it\u2019s important not to take it personally\.\\r\\n<\/p>"/,
  `</strong>Keep up with where the industry is going.</strong>\\r\\nAI voices are improving, and some clients are already using them for certain types of work. The way to stay relevant is to focus on what human voices bring to a project that AI genuinely cannot yet match, which is personality, instinct and the ability to respond to a director. Read our thoughts on <a href=\\"human-voice-over-vs-ai\\" title=\\"humans vs AI technology\\">Humans vs AI technology</a> if you want to dig into that subject more.<br><br>\\r\\n<strong>Be patient with the process.</strong>\\r\\nVoiceover is not an overnight career. It takes time to build a body of work, find your niche and get repeat clients. The people who keep going, keep improving and stay genuinely interested in the craft tend to be the ones who make it work long term.\\r\\n</p>"`
);

// ─── SPEAKING TIME CALCULATOR ─────────────────────────────────────────────
content = content.replace(
  /making it an invaluable resource for public speakers/,
  'making it a great resource for public speakers'
);

// ─── BULK EM DASH REPLACEMENT IN CONTENT FIELDS ───────────────────────────
// Only replace on lines that are content fields (text1, text2, info, bottomText, ntext1-4)
const emDash = '\u2014';
const targetFieldPrefixes = ['"text1":', '"text2":', '"info":', '"bottomText":', '"ntext1":', '"ntext2":', '"ntext3":', '"ntext4":'];

const lines = content.split('\n');
let emDashCount = 0;
const processedLines = lines.map(line => {
  const isContentField = targetFieldPrefixes.some(prefix => line.trimStart().startsWith(prefix));
  if (isContentField && line.includes(emDash)) {
    const before = line;
    // Replace " — " (space em dash space) with ", "
    let updated = line.replace(/ \u2014 /g, ', ');
    // Also catch em dash with no surrounding space (like "precise—Guy")
    updated = updated.replace(/\u2014/g, ', ');
    if (updated !== before) emDashCount++;
    return updated;
  }
  return line;
});

const result = processedLines.join('\n');

// Sanity check: count remaining em dashes in content fields
let remaining = 0;
processedLines.forEach(line => {
  const isContentField = targetFieldPrefixes.some(prefix => line.trimStart().startsWith(prefix));
  if (isContentField && line.includes(emDash)) remaining++;
});

writeFileSync(filePath, result, 'utf8');
console.log(`Em dashes replaced in ${emDashCount} content field lines`);
console.log(`Remaining em dashes in content fields: ${remaining}`);
