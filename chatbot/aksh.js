/* ============================================
   AKSH CHATBOT — Portfolio AI Assistant
   Bilingual (Hindi/English), Voice STT/TTS, 3D Avatar
   ============================================ */

(function() {
  // --- Detect avatar path based on current page location ---
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const isSubfolder = pathParts.length > 1;
  const avatarPath = isSubfolder ? '../chatbot/aksh-avatar.png' : 'chatbot/aksh-avatar.png';

  // --- Voice State ---
  let isVoiceEnabled = true;

  // --- Ashish's Knowledge Base ---
  const K = {
    name: "Ashish Kumar",
    location: "Modipuram, Meerut, India",
    education: "B.Tech CSE (Data Science) at Shobhit University",
    currentRole: "Intern at INNextIn | CTO at NextGen Tech Connect",
    phone: "+91 6206634194",
    emails: ["ar6858439@gmail.com", "infashish@zohomail.in"],
    github: "https://github.com/Aashiskr",
    linkedin: "https://www.linkedin.com/in/infashish",
    instagram: "https://www.instagram.com/inf._.ashish/",
    hobbies: ["Playing Chess (2nd Rank University Level)", "Exploring Food"],
    skills: {
      languages: ["Python", "Dart", "R", "C++", "C", "JavaScript", "TypeScript", "PHP"],
      frameworks: ["Flutter", "React.js", "Next.js", "Node.js"],
      data: ["NumPy", "Pandas", "MySQL"],
      tools: ["Git", "Figma", "Webflow"]
    },
    achievements: [
      "GATE 2026 Qualified (AIR 12467)",
      "Data Manager Intern at Dezign Bank",
      "Azure 101 Quiz — 2nd Rank",
      "Project Expo 2025 — 1st Rank",
      "Internal SIH 2025 — 1st Rank",
      "SU Code Hunt 2024 — 1st Place (Python)",
      "GDG Hack Heist — Top 5",
      "Chess 2nd Rank University Level"
    ],
    projects: {
      "NextGen Tech Connect": { desc: "Yeah ek amazing community platform hai Agentic AI enthusiasts ke liye. Ashish isme CTO hain aur saara development lead kar rahe hain.", url: "nextgen-tech-connect.vercel.app" },
      "Zelectronics": { desc: "Zelectronics ek modern e-commerce platform hai electronics ke liye. Ye Ashish ka ek freelance project tha jisme unhone pura custom frontend banaya hai.", url: "zelectronics.vercel.app" },
      "DezignBank": { desc: "DezignBank ek architectural design platform hai. Ashish ne yahan as a Data Manager Intern kaam kiya tha, architecture data aur models manage karne ke liye.", url: "dezignbank.com" },
      "Aksh English": { desc: "Ye ek bahut hi badhiya Flutter app hai English seekhne ke liye! Isme AI voice interaction hai, jisse aap baat karke practice kar sakte ho aur apna hesitation door kar sakte ho.", url: "aksh-english-web.vercel.app" },
      "A-Lens": { desc: "A-Lens ek universal aur ad-free document viewer hai (PDF, PPT, DOCX). Ashish ne isme Android smart boards ke liye custom PPT rendering likha hai, jo ki bahut complex hai!" },
      "Notes App": { desc: "Ye ek simple aur distraction-free notes app hai Flutter me bana hua. Isme data safely aapke local device storage me save hota hai." },
      "Vehicle Rental System": { desc: "Ye vehicles rent karne ke liye ek complete full-stack management system hai. Isme system bookings, fleet aur customers sab ek saath handle karta hai.", url: "vehicle-rental-management-system-project.vercel.app" },
      "Talent Management System": { desc: "Ye ek hackathon project tha jiska main aim talented logo aur companies/opportunities ke beech ka gap mitaana tha.", url: "talent-bridge-factory.vercel.app" },
      "Multiple Games": { desc: "Isme pure 6 games ek hi jagah hain: Tic-Tac-Toe, KBC Quiz, Snake, Ludo, Typing Test, aur Bubble Shooter! Bahut hi fun project hai ye.", url: "multiple-games.vercel.app" },
      "Birthday Website": { desc: "Ye ek beautifully designed website hai kisi ko special feel karane aur birthday wish karne ke liye.", url: "birthday-pi-snowy.vercel.app" },
      "Quick Notes Extension": { desc: "Ye ek handy Chrome extension hai. Jab bhi aapko jaldi se notes ya links save karni ho, auto-save ke saath ye bahot kaam aata hai." },
      "Hindi Joke Extension": { desc: "Masti ke liye banaya gaya ek mazedar Chrome extension jo aapko random Hindi jokes nikal kar dikhata hai!" },
      "Aksh Virtual Assistant": { desc: "Ye mera pichla AI version tha! Ise Ministry of Education ke Yukti Innovation Challenge 2025 me shortlist kiya gaya tha. Ek bahut bada achievement hai!" },
      "Cricket Score Prediction": { desc: "Ye ek Machine Learning web app hai jo XGBoost aur Streamlit use karta hai. Ye current match ka score predict karta hai with ~96% accuracy!" },
      "Telco Customer Churn": { desc: "Ye ek ML dashboard hai jisko R aur Shiny me banaya gaya tha. Ye Random Forest use karke un customers ko pehchanta hai jo service chhodne wale hain." }
    },
    certifications: [
      "AI Data Engineer (Reliance Foundation)", "Data Manager Internship", "Coder Hunt 1st Rank",
      "Internal SIH 2025 1st Rank", "Hack Heist Top 10", "TechUdyam Hackathon MIET",
      "Innovating with Generative AI", "React.js Workshop", "IoT Workshop",
      "Internal SIH 2023", "Cybersecurity (Tech Mahindra)", "Code Kshetra Hackathon",
      "AWS Cloud", "Android Fuelling Innovation", "Chess 2nd Rank University"
    ],
    experience: [
      { role: "CTO", company: "NextGen Tech Connect", period: "2025 – Present" },
      { role: "Data Manager Intern", company: "Dezign Bank", period: "2025" },
      { role: "Intern", company: "INNextIn", period: "Present" }
    ]
  };

  // --- Hindi Detection ---
  function isHindi(text) {
    if (/[\u0900-\u097F]/.test(text)) return true;
    const hindiWords = /\b(kya|kaise|kaun|kahan|bata|batao|btao|hai|hain|ho|karo|karo|kre|krdo|mujhe|mera|mere|tera|tere|uska|uske|uski|kon|konsa|kitne|kitna|kab|kyun|kyu|bhai|yaar|haan|nahi|nhi|acha|accha|theek|thik|sab|sabhi|kuch|pura|puri|aur|lekin|ya|agar|toh|to|woh|ye|yeh|wo|isko|usko|isme|usme|hota|hoti|hote|rehta|rehti|karta|karti|karte|chahiye|dedo|dedo|dikhao|dikhaye|samjhao|samjha|bolo|bata|btao|puchna|pucho|dekho|dekh|bol|likhna|likho|padho|jao|aao|chalo|ruko)\b/i;
    return hindiWords.test(text);
  }

  // --- Speech Synthesis (Text to Speech) ---
  function speakText(text) {
    if (!isVoiceEnabled || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    
    // Clean markdown and emojis for speech
    let cleanText = text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '') // remove emojis
      .replace(/\n/g, ' . ') // add slight pause
      .trim();
      
    if (!cleanText) return;

    const msg = new SpeechSynthesisUtterance(cleanText);
    msg.lang = 'en-IN'; // Indian English for better accent on both English and Hinglish
    msg.rate = 1.0;
    msg.pitch = 1.0;
    
    // Find the most natural voice available based on device/browser
    const voices = window.speechSynthesis.getVoices();
    let bestVoice = null;

    if (voices.length > 0) {
      // Premium English (India) or US/UK voices
      bestVoice = voices.find(v => v.name.includes('Neerja') && v.name.includes('Natural'))
               || voices.find(v => v.name.includes('Prabhat') && v.name.includes('Natural'))
               || voices.find(v => v.name.includes('Google UK English Male'))
               || voices.find(v => v.name.includes('Google US English'))
               || voices.find(v => v.lang === 'en-IN')
               || voices.find(v => v.lang.startsWith('en-'));
    }
    
    if (bestVoice) {
      msg.voice = bestVoice;
    }
    
    window.speechSynthesis.speak(msg);
  }

  // Handle voices loading async
  if ('speechSynthesis' in window && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = () => { /* Force load voices on some browsers */ };
  }

  // --- Response Generator ---
  function getResponse(userMsg) {
    const msg = userMsg.toLowerCase().trim();

    // Greetings
    if (/^(hi|hello|hey|hola|namaste|yo|sup|what'?s up|kaise ho|namaskar|hii+|नमस्ते|हैलो|हाय|कैसे हो|क्या हाल|नमस्कार)/.test(msg)) {
      return `Hey there! 👋 I'm **Aksh**, Ashish Kumar's AI assistant. I know everything about him — his projects, skills, achievements, you name it! What would you like to know?`;
    }

    // Specific project lookup - Highest Priority
    // Checks if exact project name is mentioned before generic keywords take over
    for (const [name, info] of Object.entries(K.projects)) {
      if (msg.includes(name.toLowerCase())) {
        let resp = `📦 **${name}**: ${info.desc}`;
        if (info.url) resp += `\n🔗 Link: ${info.url}`;
        return resp;
      }
    }

    // How are you / chatbot identity
    if (/how are you|kaise ho|kaisa hai|tu kaun|tum kaun|tera naam|your name|who are you|kon hai|तुम कौन हो|तुम्हारा नाम|कैसे हो|तुम कौन/i.test(msg)) {
      return `I'm **Aksh**! 🤖 Ashish Kumar's personal AI assistant. I'm doing great! I know everything about him — projects, skills, achievements, everything! Ask me anything! 😎`;
    }

    // Who is Ashish / about
    if (/who (is|are)|about (ashish|him)|tell me about|kaun hai|ke bare me|bare me bata|btao ashish|ashish kon|^ashish$|^आशीष$|कौन है|बारे में|आशीष कौन|परिचय|आशीष/i.test(msg) && !msg.includes('project') && !msg.includes('skill') && !msg.includes('प्रोजेक्ट') && !msg.includes('अचीवमेंट')) {
      return `**${K.name}** is a ${K.education} student from ${K.location}. He's currently working as an ${K.currentRole}. His focus combines Data Science with Full Stack & Mobile Development. 🚀`;
    }

    // Contact info
    if (/contact|phone|number|call|reach|email|mail|sampark|number de|kaise contact|संपर्क|नंबर|फ़ोन|ईमेल|कॉल|बात करनी|कांटेक्ट|फ़ोन/i.test(msg)) {
      return `📱 **WhatsApp**: ${K.phone}\n📧 **Emails**: ${K.emails.join(', ')}\n🔗 **LinkedIn**: ${K.linkedin}\n📸 **Instagram**: ${K.instagram}\n\nYou can also visit the Contact Page to send a message directly!`;
    }

    // Skills
    if (/skill|tech|stack|language|framework|what (can he|does he)|kya aata|konsi language|skills bata|technology|स्किल्स|तकनीक|क्या आता है|कौन सी लैंग्वेज|टेक्नोलॉजी|स्किल्स बताओ/i.test(msg)) {
      return `Ashish's tech stack:\n\n🔧 **Languages**: ${K.skills.languages.join(', ')}\n📱 **Frameworks**: ${K.skills.frameworks.join(', ')}\n📊 **Data**: ${K.skills.data.join(', ')}\n🛠️ **Tools**: ${K.skills.tools.join(', ')}\n\nHe's a true full-stack developer! 💪`;
    }

    // Achievements
    if (/achieve|award|rank|win|gate|hackathon|competition|jeet|jita|kya kiya|achievement bata|kitne rank|अचीवमेंट|उपलब्धि|जीता|रैंक|अवार्ड|गेट|हैकथॉन|जीती|प्रतिस्पर्धा/i.test(msg)) {
      let resp = `🏆 Ashish has some incredible achievements:\n\n`;
      K.achievements.forEach(a => { resp += `• ${a}\n`; });
      return resp;
    }

    // Certifications
    if (/certif|cert|certificate bata|kitne certificate|सर्टिफिकेट|सर्टिफिकेशन/i.test(msg)) {
      let resp = `📜 Ashish holds ${K.certifications.length} certifications:\n\n`;
      K.certifications.slice(0, 8).forEach(c => { resp += `• ${c}\n`; });
      resp += `\n...and more! Check the About Page for all certificates.`;
      return resp;
    }

    // General projects
    if (/project|work|built|portfolio|app|website|kya banaya|kitne project|projects bata|konsa project|प्रोजेक्ट|प्रोजेक्ट्स|क्या बनाया|काम|ऍप|वेबसाइट|कितने प्रोजेक्ट/i.test(msg)) {
      const projectNames = Object.keys(K.projects);
      let resp = `Ashish has built **${projectNames.length}+ projects** across Flutter, Web, AI/ML, and Chrome Extensions:\n\n`;
      projectNames.forEach(p => { resp += `• **${p}**\n`; });
      resp += `\nAsk me about any specific project for details! 🚀`;
      return resp;
    }



    // Education
    if (/education|study|college|university|degree|btech|b\.tech|padhai|kahan padhte|konsa college|शिक्षा|पढ़ाई|कॉलेज|यूनिवर्सिटी|डिग्री|बीटेक/i.test(msg)) {
      return `🎓 Ashish is pursuing **${K.education}**. He qualified **GATE 2026** with AIR 12467!`;
    }

    // Experience / work
    if (/experience|work|job|intern|role|cto|position|kahan kaam|kya karte|job bata|अनुभव|नौकरी|जॉब|इंटर्नशिप|कहाँ काम/i.test(msg)) {
      let resp = `💼 Ashish's professional experience:\n\n`;
      K.experience.forEach(exp => {
        resp += `• **${exp.role}** at ${exp.company} (${exp.period})\n`;
      });
      return resp;
    }

    // Location
    if (/location|where|live|city|from|based|kahan se|kahan rehte|kahan ka|कहाँ रहते|लोकेशन|शहर|कहाँ से/i.test(msg)) {
      return `📍 Ashish is based in **${K.location}**. He's open to remote opportunities worldwide! 🌏`;
    }

    // Hobbies
    if (/hobby|hobbies|interest|fun|free time|chess|food|shauk|kya karte spare|शौक|हॉबी|हॉबीज|फ्री टाइम|चेस|खाना/i.test(msg)) {
      return `🎯 Ashish's hobbies:\n\n• ♟️ ${K.hobbies[0]}\n• 🍕 ${K.hobbies[1]}\n\nHe's not just a coder — he's well-rounded! 😄`;
    }

    // GitHub / Social
    if (/github|social|linkedin|instagram|profile|गिटहब|सोशल|लिंक्डइन|लिंक्डइन|इंस्टाग्राम|प्रोफाइल/i.test(msg)) {
      return `🔗 Ashish's social profiles:\n\n• **GitHub**: [Aashiskr](${K.github})\n• **LinkedIn**: [infashish](${K.linkedin})\n• **Instagram**: [inf._.ashish](${K.instagram})`;
    }

    // Resume
    if (/resume|cv|download|रिज्यूमे|सीवी|डाउनलोड/i.test(msg)) {
      return `📄 You can download Ashish's resume from the Resume Page. It has his complete profile!`;
    }

    // Flutter
    if (/flutter|dart|mobile|android|फ़्लटर|फ्लटर|डार्ट|मोबाइल|एंड्राइड|एंड्रॉयड/i.test(msg)) {
      return `📱 Ashish has built several Flutter apps:\n\n• **Aksh English** — AI English learning app\n• **A-Lens** — Universal document viewer\n• **Notes App** — Offline notes app\n\nAll available on the Projects Page!`;
    }

    // AI / ML
    if (/ai|ml|machine learning|data science|prediction|model|एआई|मशीन लर्निंग|डेटा साइंस|ऑर्टिफिशल/i.test(msg)) {
      return `🤖 Ashish's AI/ML projects:\n\n• **Aksh Virtual Assistant** — Shortlisted for Yukti Innovation Challenge 2025\n• **Cricket Score Prediction** — XGBoost model with ~96% accuracy\n• **Telco Customer Churn** — Random Forest dashboard in R/Shiny`;
    }

    // Thank you
    if (/thank|thanks|thx|shukriya|dhanyavad|धन्यवाद|शुक्रिया/i.test(msg)) {
      return `You're welcome! 😊 Feel free to ask anything else about Ashish!`;
    }

    // Bye
    if (/bye|goodbye|see you|later|alvida|chalo|bye bye|बाय|अलविदा/i.test(msg)) {
      return `Goodbye! 👋 Great chatting with you. Don't forget to check out Ashish's projects! 🚀`;
    }

    // Default
    const fallbacks = [
      "Try asking about his **projects**, **skills**, **achievements**, or **contact info**!",
      "You can ask: 'What are Ashish's projects?' or 'Tell me about GATE' or 'How to contact him?'",
      "I know about skills, projects, achievements, certifications, education and more! Just ask! 😊"
    ];
    return `I'm not sure I understand that. 🤔 ` + fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  // --- Format markdown-like text to HTML ---
  function formatMessage(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
      .replace(/\n/g, '<br>');
  }

  // --- Inject Chatbot ---
  function injectChatbot() {
    const style = document.createElement('style');
    style.textContent = `
      .aksh-fab {
        position:fixed; bottom:28px; right:28px; z-index:3000;
        width:64px; height:64px; border-radius:50%;
        background: linear-gradient(135deg, #7c3aed, #00ffab);
        border:none; cursor:pointer; padding:0; overflow:hidden;
        box-shadow: 0 6px 30px rgba(124,58,237,0.5);
        transition: 0.3s ease;
        animation: fabGlow 2.5s ease-in-out infinite;
      }
      .aksh-fab img {
        width:100%; height:100%; object-fit:cover; border-radius:50%;
        transition: 0.3s ease;
      }
      .aksh-fab:hover { transform:scale(1.12); box-shadow: 0 8px 40px rgba(124,58,237,0.7); }
      .aksh-fab.open { animation:none; }
      .aksh-fab.open img { opacity:0; }
      .aksh-fab.open::after {
        content:'✕'; position:absolute; inset:0;
        display:flex; align-items:center; justify-content:center;
        font-size:1.5rem; color:#fff; font-weight:700;
      }
      @keyframes fabGlow {
        0%, 100% { box-shadow: 0 6px 25px rgba(124,58,237,0.5); }
        50% { box-shadow: 0 6px 40px rgba(0,255,171,0.6), 0 0 60px rgba(124,58,237,0.2); }
      }
      /* Orbit ring around FAB */
      .aksh-fab-ring {
        position:fixed; bottom:18px; right:18px; z-index:2999;
        width:84px; height:84px; border-radius:50%;
        border:2px solid transparent;
        border-top-color:#00ffab; border-right-color:#7c3aed;
        animation: fabRingSpin 3s linear infinite;
        pointer-events:none;
      }
      .aksh-fab.open ~ .aksh-fab-ring { opacity:0; }
      @keyframes fabRingSpin { to { transform:rotate(360deg); } }

      .aksh-chat {
        position:fixed; bottom:105px; right:28px; z-index:3001;
        width:390px; max-height:530px;
        background:rgba(18,18,26,0.97);
        border:1px solid rgba(124,58,237,0.3);
        border-radius:20px; backdrop-filter:blur(20px);
        display:none; flex-direction:column;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        overflow:hidden; animation: chatSlideUp 0.3s ease;
      }
      .aksh-chat.open { display:flex; }
      @keyframes chatSlideUp {
        from { opacity:0; transform:translateY(20px); }
        to { opacity:1; transform:translateY(0); }
      }

      .aksh-header {
        padding:16px 20px; display:flex; align-items:center; gap:14px;
        background: linear-gradient(135deg, rgba(124,58,237,0.15), rgba(0,255,171,0.08));
        border-bottom:1px solid rgba(255,255,255,0.08);
      }
      .aksh-header-avatar {
        width:44px; height:44px; border-radius:50%; overflow:hidden;
        border:2px solid #00ffab; flex-shrink:0;
        box-shadow: 0 0 15px rgba(0,255,171,0.3);
      }
      .aksh-header-avatar img { width:100%; height:100%; object-fit:cover; }
      .aksh-header-info h4 { margin:0; font-size:1.05rem; font-weight:700; color:#f0f0f5; font-family:'Outfit',sans-serif; }
      .aksh-header-info p { margin:0; font-size:0.72rem; color:#00ffab; font-weight:500; }
      .aksh-header-info .status-dot {
        display:inline-block; width:7px; height:7px; border-radius:50%;
        background:#00ffab; margin-right:5px; animation: dotPulse 1.5s infinite;
      }
      @keyframes dotPulse { 0%,100%{opacity:1;} 50%{opacity:0.4;} }

      .aksh-header-controls {
        margin-left:auto; display:flex; gap:10px;
      }
      .aksh-sound-toggle {
        background:none; border:none; color:#a0a0b8; cursor:pointer;
        font-size:1.1rem; transition:0.2s; padding:0;
      }
      .aksh-sound-toggle:hover { color:#00ffab; }
      .aksh-sound-toggle.active { color:#00ffab; }

      .aksh-messages {
        flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:10px;
        max-height:340px; min-height:200px; scroll-behavior: smooth;
      }
      .aksh-messages::-webkit-scrollbar { width:4px; }
      .aksh-messages::-webkit-scrollbar-thumb { background:rgba(124,58,237,0.4); border-radius:2px; }

      .aksh-msg {
        padding:12px 16px; border-radius:16px; font-size:0.85rem; line-height:1.6;
        max-width:85%; word-wrap:break-word; animation: msgFade 0.3s ease;
      }
      @keyframes msgFade { from{opacity:0;transform:translateY(8px);} to{opacity:1;transform:translateY(0);} }
      .aksh-msg.bot {
        background:rgba(124,58,237,0.1); border:1px solid rgba(124,58,237,0.15);
        color:#d0d0e0; align-self:flex-start; border-bottom-left-radius:4px;
      }
      .aksh-msg.user {
        background:rgba(0,255,171,0.1); border:1px solid rgba(0,255,171,0.15);
        color:#f0f0f5; align-self:flex-end; border-bottom-right-radius:4px;
      }
      .aksh-msg a { color:#00ffab !important; text-decoration:underline; }
      .aksh-msg strong { color:#f0f0f5; }

      .aksh-typing { display:flex; gap:4px; padding:12px 20px; align-self:flex-start; }
      .aksh-typing span {
        width:8px; height:8px; border-radius:50%; background:#7c3aed;
        animation: typingDot 1.2s infinite;
      }
      .aksh-typing span:nth-child(2) { animation-delay:0.2s; }
      .aksh-typing span:nth-child(3) { animation-delay:0.4s; }
      @keyframes typingDot { 0%,100%{opacity:0.3;transform:translateY(0);} 50%{opacity:1;transform:translateY(-4px);} }

      .aksh-input-area {
        padding:12px 16px; display:flex; align-items:center; gap:8px;
        border-top:1px solid rgba(255,255,255,0.08);
        background:rgba(10,10,15,0.5);
      }
      .aksh-mic {
        background:none; border:none; color:#a0a0b8; cursor:pointer;
        font-size:1.2rem; transition:0.2s; padding:8px;
        border-radius:50%; flex-shrink:0;
      }
      .aksh-mic:hover { color:#ec4899; background:rgba(236, 72, 153, 0.1); }
      .aksh-mic.listening {
        color:#f0f0f5; background:#ec4899;
        animation: micPulse 1s infinite alternate;
      }
      @keyframes micPulse { from{transform:scale(1);box-shadow:0 0 5px #ec4899;} to{transform:scale(1.1);box-shadow:0 0 15px #ec4899;} }

      .aksh-input {
        flex:1; padding:10px 16px; border-radius:50px;
        border:1px solid rgba(255,255,255,0.08);
        background:rgba(255,255,255,0.04); color:#f0f0f5;
        font-family:'Inter',sans-serif; font-size:0.85rem; outline:none;
        transition:0.2s ease;
      }
      .aksh-input:focus { border-color:rgba(124,58,237,0.4); }
      .aksh-input::placeholder { color:#6b6b80; }
      .aksh-send {
        width:40px; height:40px; border-radius:50%;
        background:linear-gradient(135deg,#7c3aed,#00ffab);
        border:none; color:#0a0a0f; cursor:pointer;
        display:flex; align-items:center; justify-content:center;
        font-size:0.9rem; transition:0.2s ease; flex-shrink:0;
      }
      .aksh-send:hover { transform:scale(1.08); }

      .aksh-quick-btns { display:flex; flex-wrap:wrap; gap:6px; padding:0 16px 12px; }
      .aksh-quick {
        padding:6px 14px; border-radius:50px; font-size:0.7rem; font-weight:600;
        background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1);
        color:#a0a0b8; cursor:pointer; transition:0.2s ease;
        font-family:'Inter',sans-serif;
      }
      .aksh-quick:hover { border-color:#7c3aed; color:#f0f0f5; background:rgba(124,58,237,0.1); }

      @media (max-width:480px) {
        .aksh-chat { width:calc(100vw - 32px); right:16px; bottom:95px; }
        .aksh-fab { bottom:20px; right:20px; width:56px; height:56px; }
        .aksh-fab-ring { bottom:12px; right:12px; width:72px; height:72px; }
      }
    `;
    document.head.appendChild(style);

    const chatHTML = `
      <button class="aksh-fab" id="akshFab" title="Chat with Aksh 🤖">
        <img src="${avatarPath}" alt="Aksh AI">
      </button>
      <div class="aksh-fab-ring"></div>
      <div class="aksh-chat" id="akshChat">
        <div class="aksh-header">
          <div class="aksh-header-avatar">
            <img src="${avatarPath}" alt="Aksh">
          </div>
          <div class="aksh-header-info">
            <h4>Aksh</h4>
            <p><span class="status-dot"></span>Ashish's Voice AI</p>
          </div>
          <div class="aksh-header-controls">
            <button class="aksh-sound-toggle active" id="akshSound" title="Voice Output On"><i class="fas fa-volume-up"></i></button>
          </div>
        </div>
        <div class="aksh-messages" id="akshMessages"></div>
        <div class="aksh-quick-btns" id="akshQuickBtns">
          <button class="aksh-quick" data-msg="What are Ashish's projects?">Projects</button>
          <button class="aksh-quick" data-msg="What are his skills?">Skills</button>
          <button class="aksh-quick" data-msg="Ashish ke baare me batao">Hindi 🇮🇳</button>
        </div>
        <div class="aksh-input-area">
          <button class="aksh-mic" id="akshMic" title="Tap to Speak"><i class="fas fa-microphone"></i></button>
          <input type="text" class="aksh-input" id="akshInput" placeholder="Type or speak anything..." autocomplete="off">
          <button class="aksh-send" id="akshSend"><i class="fas fa-paper-plane"></i></button>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatHTML);

    // --- Logic ---
    const fab = document.getElementById('akshFab');
    const chat = document.getElementById('akshChat');
    const messages = document.getElementById('akshMessages');
    const input = document.getElementById('akshInput');
    const sendBtn = document.getElementById('akshSend');
    const micBtn = document.getElementById('akshMic');
    const soundBtn = document.getElementById('akshSound');
    
    let isOpen = false, hasGreeted = false;

    // Toggle Chatbot
    fab.addEventListener('click', () => {
      isOpen = !isOpen;
      chat.classList.toggle('open', isOpen);
      fab.classList.toggle('open', isOpen);
      if (isOpen && !hasGreeted) {
        const greeting = "Hey! 👋 I'm **Aksh**, Ashish's Voice AI assistant. Ask me anything — type or use the mic! 🎙️ (English ya Hindi dono me!)";
        addBotMessage(greeting);
        speakText("Hey! I'm Aksh, Ashish's Voice A I assistant. Ask me anything, type or use the mic! English ya Hindi dono mein!"); // Initial speaking
        hasGreeted = true;
      }
      if (isOpen) input.focus();
    });

    // Sound Toggle
    soundBtn.addEventListener('click', () => {
      isVoiceEnabled = !isVoiceEnabled;
      soundBtn.classList.toggle('active', isVoiceEnabled);
      soundBtn.innerHTML = isVoiceEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
      soundBtn.title = isVoiceEnabled ? 'Voice Output On' : 'Voice Output Off';
      if (!isVoiceEnabled && window.speechSynthesis) window.speechSynthesis.cancel();
    });

    // Speech Recognition (STT)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;
    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN'; // Force Hinglish (Latin script) output instead of Devanagari
      
      recognition.onstart = () => {
        micBtn.classList.add('listening');
        input.placeholder = "Listening... Speak now 🎙️";
        if(window.speechSynthesis) window.speechSynthesis.cancel(); // Stop talking while listening
      };
      
      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        input.value = transcript;
        handleSend(); // Auto send after speaking
      };
      
      recognition.onend = () => {
        micBtn.classList.remove('listening');
        input.placeholder = "Type or speak anything...";
      };
      
      recognition.onerror = (e) => {
        console.error('Speech recognition error', e);
        micBtn.classList.remove('listening');
        input.placeholder = "Type or speak anything...";
      };

      micBtn.addEventListener('click', () => {
        if (micBtn.classList.contains('listening')) {
          recognition.stop();
        } else {
          try { recognition.start(); } catch(e){}
        }
      });
    } else {
      micBtn.style.display = 'none'; // Hide if not supported
    }

    function addBotMessage(text) {
      const div = document.createElement('div');
      div.className = 'aksh-msg bot';
      div.innerHTML = formatMessage(text);
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    }

    function addUserMessage(text) {
      const div = document.createElement('div');
      div.className = 'aksh-msg user';
      div.textContent = text;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    }

    function showTyping() {
      const typing = document.createElement('div');
      typing.className = 'aksh-typing';
      typing.id = 'akshTyping';
      typing.innerHTML = '<span></span><span></span><span></span>';
      messages.appendChild(typing);
      messages.scrollTop = messages.scrollHeight;
    }

    function removeTyping() {
      const t = document.getElementById('akshTyping');
      if (t) t.remove();
    }

    function handleSend() {
      const text = input.value.trim();
      if (!text) return;
      addUserMessage(text);
      input.value = '';
      showTyping();
      setTimeout(() => {
        removeTyping();
        const botResponse = getResponse(text);
        addBotMessage(botResponse);
        speakText(botResponse); // Speak response
      }, 600 + Math.random() * 600);
    }

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSend(); });

    document.querySelectorAll('.aksh-quick').forEach(btn => {
      btn.addEventListener('click', () => {
        const txt = btn.dataset.msg;
        addUserMessage(txt);
        showTyping();
        setTimeout(() => {
          removeTyping();
          const botResponse = getResponse(txt);
          addBotMessage(botResponse);
          speakText(botResponse);
        }, 600 + Math.random() * 600);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectChatbot);
  } else {
    injectChatbot();
  }
})();
