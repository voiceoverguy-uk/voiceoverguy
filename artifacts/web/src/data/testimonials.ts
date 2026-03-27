export interface QuoteLink {
  text: string;
  url: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  companyUrl?: string;
  quoteLinks?: QuoteLink[];
}

export const testimonials: Testimonial[] = [
  {
    quote: "Guy is on my Christmas list every year, and the festive season wouldn't be the same without him. His Santa is not just a seasonal audio treat, it's a Christmas miracle. Plus he's the nicest person to deal with, and never, ever naughty.",
    name: "Jay Espindola",
    role: "Producer",
    company: "ITV / GB News",
    quoteLinks: [{ text: "Santa", url: "/santa-voice" }],
  },
  {
    quote: "The most convincing Santa voice we have ever had on our promos and liners. If you're looking for the real Santa, I'm pretty sure he's outsourced the job to Guy Harris.",
    name: "Matt Lomax",
    role: "Head of Sound Design",
    company: "Heart",
    quoteLinks: [{ text: "Santa", url: "/santa-voice" }],
  },
  {
    quote: "A Father Christmas who delivers every single year, even those last minute panic buys are no bother! Whether your list to him requires something spoken, sung or simply a bit of improvised flair, this Guy will oblige! All in return for a mince pie and some sherry — not bad!",
    name: "Liam Hadley",
    role: "Creative Audio Producer",
    company: "BBC",
  },
  {
    quote: "After 20+ years in the industry and having heard thousands of voices. Guy is the undisputed gold standard Santa. It's not even close.",
    name: "Dan Riedo",
    role: "Producer",
    company: "The Property Podcast",
    quoteLinks: [{ text: "Santa", url: "/santa-voice" }],
  },
  {
    quote: "Working with Guy is always seamless. His voice work is polished, expressive, and delivered with great attention to detail, highly recommended.",
    name: "Joanne Flores",
    role: "Senior Audio Producer",
    company: "MORE Communications",
  },
  {
    quote: "We've worked with Guy for many years on anything from playing a Dog in a radio commercial to being the voiceover for educating about Stop Smoking for a council. He's always great to work with, friendly and delivers every time!",
    name: "Simon Prentice",
    role: "MD",
    company: "S2 Blue",
  },
  {
    quote: "Guy is quite simply the best of the best. Incredible voice, versatile and nothing is ever too much trouble for him. You know your script is in very safe hands, when it's being voiced by the formidable Guy Harris.",
    name: "Ryan Ogilvie",
    role: "",
    company: "Mind the Gap Creative",
  },
  {
    quote: "Always a pleasure to \"work\" with Guy. You can't really call it work when it's often so much fun. It's easy to get distracted by his huge repertoire of voices and forget that he's also a super choice for a straight read too. A versatile voice actor who's happy to give you re-reads if the client requires. I'd love to say he discovered penicillin as well but that would be overstating his impact on humanity.",
    name: "Keith Law",
    role: "Commercial Producer",
    company: "Bauer",
  },
  {
    quote: "Have worked with Guy for over 25 years in one way or another and can only say that he is probably the most friendly, helpful and consummate professional I've had the pleasure to work with. When I say nothing is too much trouble for him, he actually goes the extra mile just to make sure!",
    name: "Andy Stone",
    role: "",
    company: "Production Bod",
  },
  {
    quote: "He's a nice Guy.",
    name: "Graham",
    role: "",
    company: "Clearwave Creative",
  },
  {
    quote: "I can always rely on Guy to do a great job on radio commercial or instore advertising scripts. He's a professional who has invested in his recording setup, so I know the audio will be to the industry standards I require.",
    name: "Rik Watson",
    role: "Audio Producer",
    company: "",
  },
  {
    quote: "Super fast, super versatile, Guy is a one stop voice over shop.",
    name: "Colin McGuinness",
    role: "Music for TV/Film Composer",
    company: "",
  },
  {
    quote: "Quick, efficient; friendly; ALWAYS delivers\u2026Guy is a top voice talent we love using!",
    name: "Andrew Upton",
    role: "",
    company: "Word of Mouth Creative",
  },
  {
    quote: "Guy is one of the true greats, and an absolute pleasure to work with every time! He consistently delivers polished, professional work, and his character voices are both creative, and incredibly flexible. I get more than I'll ever need in a voice session, which means I can over deliver with my clients. Beyond his vocal ability, Guy is incredibly easy to work with. He communicates clearly, takes direction well, and is always open to feedback to get things bang on! His reliability and quick turnaround make him someone you can confidently depend on, even with tight deadlines. Just the nicest of Guys to work with ;)",
    name: "Graham Hellis",
    role: "Director",
    company: "ClearWave Productions Ltd",
  },
  {
    quote: "Guy is an exceptional VO artist with an incredible breadth of capability. We absolutely trust him to deliver every single time; his agility and pace of working is super impressive. He is genuinely a supplier we always look forward to working with and know we can completely rely on.",
    name: "Oliver Dean",
    role: "MD",
    company: "Syrup",
  },
  {
    quote: "I've had the pleasure of working with Guy Harris for more than 20 years, and I can honestly say he is one of the best in the business. His talent is matched by his work ethic, professionalism, humour, and care for every detail. No request is too much. He will do multiple takes, clean audio beautifully, and keep working until the performance is exactly right. His studio quality is exceptional, easily among the best we've ever worked with, and over the years we've worked with hundreds of voice artists. Guy is also refreshingly up to date with AI and the latest developments in the industry, always embracing new technology rather than resisting it. And a big shout out to Arabella too, who he is clearly passing the craft on to brilliantly. She's a fantastic voice artist, and together they would be a superb option for any dad-and-daughter brief.",
    name: "Chris Atkinson",
    role: "",
    company: "With Feeling, Dubai",
  },
  {
    quote: "I've worked with Guy for over 10 years, and he's still my go-to whenever I need a voiceover done properly. He's always quick to respond, fast to deliver, and just really easy to work with. What stands out most is how often he nails it first time. There's rarely any need for feedback — he just understands the brief, the tone, and what the piece needs straight away, which makes the whole process smooth and efficient. He's also incredibly versatile. From upbeat explainers to more emotive, story-led work, he adapts effortlessly. He even delivered a brilliant (and very tasteful) Attenborough-style read for a recent project, which was spot on. The fact we've worked together for this long says it all. Consistently high quality, no fuss, and someone I trust completely to deliver every time.",
    name: "Ben Howe",
    role: "Head of Production",
    company: "Dreaming Fish Productions",
  },
  {
    quote: "I have worked with Guy for many years and he is a model of a voice artist, he takes great direction, understands the creative feel and delivers the perfect voice every time and he's a very friendly, likeable person too, what more could you ask?",
    name: "Julian (Doc) Sharp",
    role: "",
    company: "Radio Jingles (The Original)",
    companyUrl: "https://www.radiojingles.com",
  },
  {
    quote: "We've been working with Guy for over 20 years and he's a real nice guy who delivers brilliant character voices and soundalike voices too, ideal to make those commercials stand out, always a pleasure to work with him, and always a super quick turnaround for the radio industry, highly recommend Guy and look forward to working the years ahead.",
    name: "Mike Henry and Roy Hall",
    role: "Commercial Production",
    company: "Q Radio",
    quoteLinks: [{ text: "character voices", url: "/character-voiceover" }],
  },
  {
    quote: "I've worked with Guy for over 10 years, and he's a top professional and a great person. He's equally comfortable self recording or taking direction, and consistently delivers the highest quality recordings and performances. Beyond his fantastic voice, he's always just a phone call away to offer advice on anything VoiceOver related. And his character voices? Don't even get me started on how good they are!",
    name: "Philip Rollett",
    role: "Head of Production",
    company: "Imagesound",
    quoteLinks: [{ text: "character voices", url: "/character-voiceover" }],
  },
  {
    quote: "Pure greatness!",
    name: "Dan R Hagen",
    role: "Producer and Voice Norwegian artist",
    company: "",
  },
];
