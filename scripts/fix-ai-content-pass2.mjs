import { readFileSync, writeFileSync } from 'fs';

const filePath = 'artifacts/web/src/data/blog-posts.ts';
const lines = readFileSync(filePath, 'utf8').split('\n');

function replaceLine(lineNum, newContent) {
  lines[lineNum - 1] = newContent;
}

function findLine(searchStr) {
  const idx = lines.findIndex(l => l.includes(searchStr));
  if (idx === -1) throw new Error(`Could not find: ${searchStr}`);
  return idx + 1;
}

// ─── JOKER text1 ──────────────────────────────────────────────────────────
// Uses curly apostrophe U+2019
const jokerText1Line = findLine('\u2019ve studied the laughs');
console.log('Joker text1 at line:', jokerText1Line);
replaceLine(jokerText1Line,
  `    "text1": "<h2>What a Joker!</h2>\\r\\n<p>I could not resist having a go at one of the most iconic villains in cinema history. Heath Ledger\u2019s Joker has a very particular rhythm to it, a mix of charm, menace and total unpredictability, and getting that right was a genuinely enjoyable challenge. You will also find me bringing all kinds of creepy voices to life for <a href=\\"halloween-voice\\" target=\\"_blank\\" title=\\"Halloween Voiceovers\\">Halloween campaigns</a> across TV and radio. If you fancy something similar, take a look at my <a href=\\"character-voiceover\\" target=\\"_blank\\" title=\\"Character Voiceover Showreel\\">character showreel</a> for more.</p>",`
);

// ─── PRO VOICE OVER info <p1> fix ────────────────────────────────────────
const proInfoLine = findLine('<p1>Discover why a professional voiceover');
console.log('Pro VO info at line:', proInfoLine);
replaceLine(proInfoLine,
  `    "info": "<p>Discover why a professional voiceover is worth the investment, and what you actually get when you choose quality over a cheaper alternative.</p>",`
);

// ─── TIPS text1 ───────────────────────────────────────────────────────────
const tipsText1Line = findLine('Voiceover acting can be a lucrative career');
console.log('Tips text1 at line:', tipsText1Line);
replaceLine(tipsText1Line,
  `    "text1": "<h2><b>Becoming a Voiceover Actor: Navigating AI Challenges</b></h2>\\r\\n<p>\\r\\nGetting into voiceover is genuinely exciting, but it does take some work to get established. The industry has changed quite a bit with the rise of AI-generated voices, and that is something anyone starting out today needs to think about. The good news is that real character, personality and adaptability are still things AI cannot replicate particularly well.\\r\\n</p>",`
);

// ─── TIPS ntext1 ─────────────────────────────────────────────────────────
const tipsNtext1Line = findLine('<strong>Join a Voiceover Agency:</strong>');
console.log('Tips ntext1 at line:', tipsNtext1Line);
replaceLine(tipsNtext1Line,
  `    "ntext1": "<br><p>\\r\\n<strong>Get in front of agencies.</strong>\\r\\nOnce you have a demo reel you are proud of, start approaching voiceover agencies. They will not take everyone, but having representation makes a real difference in terms of getting in front of the right clients. Take the feedback you get along the way, even a rejection with a reason is useful.<br><br>\\r\\n<strong>Put yourself forward for work.</strong>\\r\\nAuditions, self-tape submissions, online casting platforms. The more you put yourself out there, the more you get a feel for what clients are looking for and the better your reads tend to get.\\r\\n</p>",`
);

// ─── TIPS ntext2 ─────────────────────────────────────────────────────────
const tipsNtext2Line = findLine('<strong>Stay Up-to-Date with the Latest Trends:</strong>');
console.log('Tips ntext2 at line:', tipsNtext2Line);
replaceLine(tipsNtext2Line,
  `    "ntext2": "<br><p>\\r\\n<strong>Keep up with where the industry is going.</strong>\\r\\nAI voices are improving, and some clients are already using them for certain types of work. The way to stay relevant is to focus on what human voices bring to a project that AI genuinely cannot yet match, which is personality, instinct and the ability to respond to a director. Read our thoughts on <a href=\\"human-voice-over-vs-ai\\" title=\\"humans vs AI technology\\">Humans vs AI technology</a> if you want to dig into that subject more.<br><br>\\r\\n<strong>Be patient with the process.</strong>\\r\\nVoiceover is not an overnight career. It takes time to build a body of work, find your niche and get repeat clients. The people who keep going, keep improving and stay genuinely interested in the craft tend to be the ones who make it work long term.\\r\\n</p>",`
);

writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Pass 2 complete');
