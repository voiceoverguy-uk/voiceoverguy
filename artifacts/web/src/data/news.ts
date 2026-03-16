export type TextSegment = { type: 'text'; text: string };
export type LinkSegment = { type: 'link'; text: string; href: string; external: boolean };
export type Segment = TextSegment | LinkSegment;

export interface NewsItem {
  segments: Segment[];
}

function t(text: string): TextSegment {
  return { type: 'text', text };
}

function link(text: string, href: string, external = false): LinkSegment {
  return { type: 'link', text, href, external };
}

export const newsItems: NewsItem[] = [
  {
    segments: [
      t("How is your breath? Need a freshen? You need the Breath CO Mouthwash! Oh, I voiced the ad! "),
      link("Check it out!", "https://www.youtube.com/watch?v=0zD403Bp3sc", true),
    ],
  },
  {
    segments: [
      t("So proud to be LEGO Minifigure CakeGuy for Legoland Resort Windsor. You'll hear him every day at the Daily Park Opening Ceremony in 2026."),
    ],
  },
  {
    segments: [
      t("My daughter continues to do well with her Voice work. Still only 9 she's had some nice jobs already in 2026. And it's only Feb!."),
    ],
  },
  {
    segments: [
      t("Awesome to be the Voice of God for the TV Choice Awards 2026 for the 5th year running. Hob Nob'ing with celebs getting celeb messages for my daughter."),
    ],
  },
  {
    segments: [
      t("Shhhhh.... back in the studio exhausting my character voices for a top secret project with Team-17. Can't wait to share more."),
    ],
  },
  {
    segments: [
      t("Currently playing 3 robots in "),
      link("The Last Person on Earth", "https://open.spotify.com/episode/0A8J1ZkTF7EGYX7FTBgCcr", true),
      t(". A new Podcast series. Listen for HVMP, D10 and Tin Man."),
    ],
  },
  {
    segments: [
      t("My voice of Santa was added to a fantastic animation for P&O social media campaign. I can't wait to share. The animation looked stunning!"),
    ],
  },
  {
    segments: [
      link("Voiceover Studio Finder", "https://www.voiceoverstudiofinder.com", true),
      t(" 2.0 launched. Soon to be the No.1 site for finding a local Voiceover booth for agencies or travelling Voiceover artists."),
    ],
  },
  {
    segments: [
      t("Listen out for Santa in 2025 on the Global Radio Network as part of the massive amount of money given away on CASH CALL."),
    ],
  },
  {
    segments: [
      t("Is there a Free Santa or Father Christmas Script Generator? Ho Ho Ho yes there is! The "),
      link("Santa Script Generator", "/santa-script-generator"),
      t("."),
    ],
  },
  {
    segments: [
      t("Coming soon! Now the voice of Mr Messy and Mr Funny for the Mr Men series."),
    ],
  },
  {
    segments: [
      t("Is there a David Attenborough Script Generator? There is! We built a FREE "),
      link("David Attenborough Script Generator", "/attenborough-script-generator"),
      t("."),
    ],
  },
  {
    segments: [
      t("The Artificial Intelligence of - AI GUY! Professional Human Voiceover or AI? "),
      link("Click Here", "/ai-guy-human-vs-ai-voiceover"),
      t(" to learn why Human First!"),
    ],
  },
  {
    segments: [
      t("It's Halloween time! \u2014 if you're looking for some "),
      link("Spooky Halloween Laughs", "https://www.voiceoverguy.co.uk/spooky-halloween-laughs", true),
      t(", have a listen and see how I can bring your project to life."),
    ],
  },
  {
    segments: [
      link("HIDE The Corpse Promo", "/hide-the-corpse-promo-voiceover"),
      t(" - My Matt Berry & Patrick Stewart Voice mashed up for this hilarious promo. Need a British Male Voice?"),
    ],
  },
  {
    segments: [
      t("XM Trading asked me to voice their male promo voice. Might give this a go!"),
    ],
  },
  {
    segments: [
      t("Ideal for knackered parents who like their formula bottle prep stress-free... The "),
      link("Nuby Milk Race", "/nuby-commentator-voice"),
      t(" Commentator Voice."),
    ],
  },
  {
    segments: [
      t("Fantasy EFL asked for me to help promote their new product (coming soon)"),
    ],
  },
  {
    segments: [
      t("Want to hear Santa live on the radio? Check out "),
      link("On-Air Chat with Santa", "/on-air-chat-with-santa"),
      t(" \u2013 the festive favourite!"),
    ],
  },
  {
    segments: [
      t("Skipton Building Society wanted to promote their energy saving retrofit products, so I was happy to help with the male voice over."),
    ],
  },
  {
    segments: [
      t("Currently voicing the competition spot on "),
      link("Britains Got Talent 2025", "/britains-got-talent-competition-voice"),
      t("."),
    ],
  },
  {
    segments: [
      t("GB News back for 2025 with the competitions. You'll hear me on the promos delivered with fun and energy."),
    ],
  },
  {
    segments: [
      t("Thomas & Friends All Engines Go' - "),
      link("The Voice of Salty", "/thomas-the-tank-engine-voice-of-salty"),
      t(", and "),
      link("The Voice of Winston", "/thomas-the-tank-engine-voice-of-winston"),
      t(" Plus The Blue Troublesome Tanker."),
    ],
  },
  {
    segments: [
      t("The studio Yorkshire continues to be hired for actors at Emmerdale and Games producers for local Yorkshire talent. "),
      link("Book Now", "/voiceover-studio"),
      t("."),
    ],
  },
  {
    segments: [
      t("Take a behind-the-scenes look at my recording setup on the "),
      link("Studio Tour", "https://www.voiceoverguy.co.uk/studiotour/index.html", true),
      t(" \u2014 where the voices come to life."),
    ],
  },
  {
    segments: [
      t("Ever wondered what life in a VO booth really looks like? Check out my "),
      link("Voiceover Cartoons", "/voiceover-cartoons"),
      t(" series \u2013 light-hearted fun from inside the soundproof box!"),
    ],
  },
  {
    segments: [
      t("Off to Butlins? Enjoy... The Voice of "),
      link("The Masked Singer", "/masked-singer-voice-of-god-butlins"),
      t("! Oh and of course, the voiceovers for it."),
    ],
  },
  {
    segments: [
      t("Nice to add Compare the Meerkat as a client this year too. Internal thing. Can't share sadly."),
    ],
  },
  {
    segments: [
      t("For GuruBox they needed a "),
      link("Craig Cash Gogglebox", "/craig-cash-gogglebox-voiceover"),
      t(" style VoiceOver. I think I delivered well."),
    ],
  },
  {
    segments: [
      t("The voice promoting Gregory Porter's UK Tour on TV across the UK."),
    ],
  },
  {
    segments: [
      t("Back on the TV with the "),
      link("Harpic Fresh Stickers", "https://www.youtube.com/watch?v=Im6SJBtwH1w", true),
      t(" on TV and the Web, thats me."),
    ],
  },
  {
    segments: [
      t("National Radio advert for "),
      link("Samsung OLed TV", "https://soundcloud.com/voiceoverguy/samsung-neo-qled-tv-national-radio-ad", true),
    ],
  },
  {
    segments: [
      t("Stephen Mulherns fab ITV Show "),
      link("In for a Penny - Seabrooks", "https://www.youtube.com/watch?v=QKDoDngvBjU", true),
      t(" sponsorship."),
    ],
  },
  {
    segments: [
      t("As heard on "),
      link("Vernon Kays Ultra Ultra Marathon", "https://soundcloud.com/voiceoverguy/vernon-kay-ultra-ultra-marathon-challenge-promo", true),
      t(" on BBC Radio 2 for Children in Need 2023."),
    ],
  },
  {
    segments: [
      t("Booking.com ran some online ads and I was asked to voice them. Paying for YouTube Premium I missed seeing them. DOH!"),
    ],
  },
  {
    segments: [
      t("Samsung ran a national campaign for their OLED TV's and "),
      link("the voice of the Samsung ads", "https://soundcloud.com/voiceoverguy/samsung-neo-qled-tv-national-radio-ad", true),
      t("?... well. Yes."),
    ],
  },
  {
    segments: [
      t("You know Butlins have the "),
      link("Masked Singer", "https://soundcloud.com/voiceoverguy/the-masked-singer-voice-of-god-guy-harris", true),
      t("? Well, you'll never guess who voiced the promo and the Voice of God??"),
    ],
  },
  {
    segments: [
      t("THIS Morning are giving away a nice \u00a31m in October. Guy is the voice of the \u00a31m giveaway promo on ITV."),
    ],
  },
  {
    segments: [
      t("Each year remaining the Paultons Park Halloween Voice for their spooky events."),
    ],
  },
  {
    segments: [
      t("In 2023 Guy became the voice of Santa for Centre Parcs in the UK. Along with a series of talking characters around the resort."),
    ],
  },
  {
    segments: [
      t("If you hear the national radio commercial for "),
      link("Mustard Car or Van Insurance", "https://soundcloud.com/voiceoverguy/mustard-pit-stop-radio-ad", true),
      t(", you may find a familiar British male voice."),
    ],
  },
  {
    segments: [
      t("As the UK's "),
      link("No.1 Voice of Santa", "/santa-voice"),
      t(", you will also hear me this year for Centre Parks and Butlins as their Santa too."),
    ],
  },
  {
    segments: [
      t("My daughter Arabella was selected for a nice job for UBER. At 7 years old using an Irish accent too."),
    ],
  },
  {
    segments: [
      t("Back on Channel 5 with the sponsorship bumpers for Milky Bar, Rolo and Aero"),
    ],
  },
  {
    segments: [
      t("The Curse of Alton Manor is the new ride at Alton Towers. Listen to my "),
      link("spooky voice", "/halloween-voice"),
      t(" on the TV Advert."),
    ],
  },
  {
    segments: [
      t("Voice of Santa for Capital Radio with Roman Kemp. On Air Live helping give away a massive prize with Greggs."),
    ],
  },
  {
    segments: [
      t("CHOO CHOO! Some exciting Thomas the Tank Engine News. I'm to play Salty., Troublesome Tanker and Winston."),
    ],
  },
  {
    segments: [
      t("Note to add my Voice of Attenborough to "),
      link("Distant Blooms", "https://www.youtube.com/watch?v=u13Ut3DGAMc", true),
      t(" new trailer."),
    ],
  },
  {
    segments: [
      t("Booked again as the Voice of God Voiceover for the The International Gaming Awards 2025."),
    ],
  },
  {
    segments: [
      t("I've been asked to help Downtown Radio, Capital X-tra and Boom Radio with the voice of Santa as the Real one in the North Pole is busy."),
    ],
  },
  {
    segments: [
      t("Now heard on ITV promoting Daytimes as ITV's Voice of Santa. Need a "),
      link("Father Christmas voice", "https://www.voiceoverguy.co.uk/santa-voice", true),
      t("?"),
    ],
  },
  {
    segments: [
      t("Wandering round Centre Parcs at Christmas? Heard the Talking characters? Oh, that might just be my work."),
    ],
  },
  {
    segments: [
      t("Mazuma Mobile tv ads are running and great if you need to trade in your old unwanted tech."),
    ],
  },
  {
    segments: [
      t("On Channel 5 you may hear the sponsorship Bumpers for the Movies with Aero, Milky Way and Rolo. Oh, the voice? It's me!"),
    ],
  },
  {
    segments: [
      t("What can I say? The Voice of "),
      link("MAOAM", "https://www.youtube.com/watch?v=0bTcz9Y3a5s", true),
    ],
  },
  {
    segments: [
      t("The Voice of "),
      link("Alton Towers Scarefest", "https://www.youtube.com/watch?v=UYjoqn645Ow", true),
      t(" 2022 Television advert"),
    ],
  },
  {
    segments: [
      t("BBC Sounds needed Santa to host "),
      link("'Party like its Christmas'", "https://www.bbc.co.uk/programmes/p0dh6hkk", true),
      t(". Guess who they used as the voice of Santa?"),
    ],
  },
  {
    segments: [
      t("As heard on "),
      link("Ninja Warrior UK", "/ninja-warrior-uk-fitbit-sponsor-bumpers"),
      t(". The male voiceover of the sponsor bumpers with Fitbit."),
    ],
  },
  {
    segments: [
      t("Soon to be heard as the voice of Mazuma Mobile across all platforms including the telly."),
    ],
  },
  {
    segments: [
      t("Voice of God? Trusted for The TV Choice Awards, Awesome Events Xmas Parties and East Midlands Business Awards."),
    ],
  },
  {
    segments: [
      t("Seen the TV ad for "),
      link("13 Dead End Drive", "https://www.youtube.com/watch?v=2mqiqOcM7t0", true),
      t("? Oh, you recognise the voice? Yeah, it's me."),
    ],
  },
  {
    segments: [
      t("Won the National Savings Premium Bonds? I'll be the one to telling you if you win! Nice to be the voice of NS&I."),
    ],
  },
  {
    segments: [
      t("The voice of "),
      link("FOAT for FIFA 22", "/fifa-22-goat-foat-sheffield-fc-promo-voice"),
      t(" featuring the kit of Sheffield FC"),
    ],
  },
  {
    segments: [
      t("A nice short documentary film voiced for Vegan YouTube Channel "),
      link("Plant based News", "/vegan-film-voiceover"),
      t("."),
    ],
  },
  {
    segments: [
      t("New "),
      link("Narration Voiceover", "https://soundcloud.com/voiceoverguy/explainer-narration-demo-2021-guy-harris", true),
      t(" demos and "),
      link("Natural Emotive Voiceover", "https://soundcloud.com/voiceoverguy/hotelscom-what-else-could-possibly-go-wrong", true),
      t(" reads added to the site."),
    ],
  },
  {
    segments: [
      t("Working with "),
      link("Festive Studio", "https://festivestudio.co.uk", true),
      t(" we delivered over 10,000 personalised North Pole Tour Santa films in 2021."),
    ],
  },
  {
    segments: [
      t("Back on BBC Radio 2, Heart, Capital, BBC 6 Music and more as the "),
      link("Voice of Santa", "/santa-voice"),
      t("."),
    ],
  },
  {
    segments: [
      t("With Halloween coming, Paultons park has me as the "),
      link("Voice of Dracula", "/dracula-voiceover-for-halloween"),
      t(" this year for their radio ads."),
    ],
  },
  {
    segments: [
      t("Need a Yorkshire Studio for recording? Kammy Chris Kamara has found mine his new home?."),
    ],
  },
  {
    segments: [
      t("Currently heard all across the UK on "),
      link("Hotels.com", "/hotels-dot-com-what-else-could-go-wrong-voiceover"),
      t(". The national TV and Radio campaign which has been a great success."),
    ],
  },
  {
    segments: [
      t("Can't wait to share my "),
      link("Singing Hammerman", "https://www.youtube.com/watch?v=EAPfk2vIQBQ", true),
      t(" voiceover for Boom Beach currently in production."),
    ],
  },
  {
    segments: [
      t("More than ok playing Goblins for "),
      link("Clash of Clans", "/clash-of-clans-goblins-voiceover"),
      t(" in their viral that notched up over 6m views in a couple of months."),
    ],
  },
  {
    segments: [
      t("Super excited working with "),
      link("Midea", "/manchester-city-football-commentry-voice"),
      t(" and Man City FC using my football commentary voice."),
    ],
  },
  {
    segments: [
      link("Just Eat", "/just-eat-uefa-football-commentator-voice"),
      t(" has been another great client to use my football commentator voice during the summer of football."),
    ],
  },
  {
    segments: [
      t("My Sir David Attenborough voice turned out awesome on a film called "),
      link("Cracking Ice", "/cracking-ice-david-attenborough-impression"),
      t(". I love the drone filming on this."),
    ],
  },
  {
    segments: [
      t("I loved working on a national campaign for "),
      link("Pizza Hut Delivery", "/pizza-hut-delivery-football-commentator-voiceover"),
      t(". What style? Ah yes. My Football commentator style."),
    ],
  },
  {
    segments: [
      t("Christmas 2020 heard me helping Santa on the "),
      link("Zoe Ball Breakfast", "/bbc-radio-2-voice-of-santa"),
      t(" show on BBC Radio 2 among many many others."),
    ],
  },
  {
    segments: [
      t("Controversy hit "),
      link("Poundland", "/poundland-self-service-till-santa-voice"),
      t(" after my Santa after my Santa voice was heard being less sympathetic to credit card rejections."),
    ],
  },
  {
    segments: [
      t("As heard on the "),
      link("Barclaycard Fraud", "/barclaycard-fraud-fighter-tool-voiceover"),
      t(" Fighter tool television commercial."),
    ],
  },
  {
    segments: [
      t("Working on a nice little project for Warner Bros as the Voice of Dobby for an attraction in NYC and London."),
    ],
  },
  {
    segments: [
      t("THIS Morning on ITV runs the "),
      link("Spin to Win", "/this-morning-spin-to-win-gameshow-voice"),
      t(" Competition. Guess who voices the prizes?"),
    ],
  },
  {
    segments: [
      t("The voice of Ringo on "),
      link("Becca's Bunch", "https://www.youtube.com/watch?v=HeWhEx_QAh0", true),
      t(" playing on Milkshake on Channel 5 and Nickelodeon."),
    ],
  },
  {
    segments: [
      t("Curious where broken links go? Check out my "),
      link("404 Page", "https://www.voiceoverguy.co.uk/404", true),
      t(" \u2013 even my errors have character."),
    ],
  },
];
