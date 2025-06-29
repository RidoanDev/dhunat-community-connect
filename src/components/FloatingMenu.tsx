
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, X, Bot, Sparkles } from 'lucide-react';
import { format } from 'date-fns';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export const LiveChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Enhanced constant replies with complete portfolio information
  const getConstantReply = (userInput: string): string | null => {
    const lowerInput = userInput.toLowerCase();

    // Personal Information & Bio
    if (
      lowerInput.includes('who') ||
      lowerInput.includes('developer') ||
      lowerInput.includes('creator') ||
      lowerInput.includes('ridoan') ||
      lowerInput.includes('zisan') ||
      lowerInput.includes('about') ||
      lowerInput.includes('কে') ||
      lowerInput.includes('পরিচয়')
    ) {
      return `🌟 আমি মোহাম্মদ রিদোয়ান মাহমুদ জিসান!

👤 **ব্যক্তিগত তথ্য:**
📅 জন্ম: ৩১ ডিসেম্বর, ২০০৭ (বয়স: ১৬)
🏠 ঠিকানা: বগুড়া, বাংলাদেশ
🩸 রক্তের গ্রুপ: বি পজিটিভ (B+)
☪️ ধর্ম: ইসলাম

🎓 **শিক্ষাগত যোগ্যতা:**
• এইচএসসি (২০২৪) - জিপিএ ৫.০০ 
• এসএসসি (২০২২) - জিপিএ ৫.০০

💼 **পেশা:** ছাত্র, ওয়েব ডেভেলপার ও কমিউনিটি সেবক

🌟 **লক্ষ্য:** প্রযুক্তির মাধ্যমে মানবতার সেবা করা

আমার সম্পর্কে আরও জানতে চাইলে প্রশ্ন করুন!`;
    }

    // Contact Information
    if (
      lowerInput.includes('contact') ||
      lowerInput.includes('email') ||
      lowerInput.includes('phone') ||
      lowerInput.includes('reach') ||
      lowerInput.includes('connect') ||
      lowerInput.includes('যোগাযোগ') ||
      lowerInput.includes('ইমেইল') ||
      lowerInput.includes('ফোন')
    ) {
      return `📞 **যোগাযোগের তথ্য:**

📧 **ইমেইল:** ridoan.zisan@gmail.com
📱 **মোবাইল:** +৮৮০১৭১২৫২৫৯১০
📍 **ঠিকানা:** বগুড়া, বাংলাদেশ
🔗 **লিংকডইন:** https://linkedin.com/in/ridoan2007

**যোগাযোগের উপায়:**
✅ ইমেইল (বিস্তারিত আলোচনার জন্য)
✅ ফোন/হোয়াটসঅ্যাপ (জরুরি বিষয়ে)
✅ লিংকডইন (পেশাদার নেটওয়ার্কিং)

**সাড়া দেওয়ার সময়:** সাধারণত ২৪ ঘন্টার মধ্যে
**সক্রিয় সময়:** সকাল ৯টা - রাত ১০টা (বাংলাদেশ সময়)

যেকোনো সহযোগিতা, প্রজেক্ট বা আড্ডার জন্য যোগাযোগ করুন! 😊`;
    }

    // Skills & Technical Expertise
    if (
      lowerInput.includes('skill') ||
      lowerInput.includes('technology') ||
      lowerInput.includes('programming') ||
      lowerInput.includes('web') ||
      lowerInput.includes('development') ||
      lowerInput.includes('দক্ষতা') ||
      lowerInput.includes('প্রযুক্তি') ||
      lowerInput.includes('প্রোগ্রামিং')
    ) {
      return `💻 **প্রযুক্তিগত দক্ষতা:**

**🌐 ওয়েব ডেভেলপমেন্ট:**
• Frontend: HTML5, CSS3, JavaScript (ES6+)
• Framework: React.js, Vite
• Styling: Tailwind CSS, Responsive Design
• Tools: Firebase, Git, VS Code

**🤖 উদীয়মান প্রযুক্তি:**
• কৃত্রিম বুদ্ধিমত্তা ও মেশিন লার্নিং
• Python Programming
• ডেটা সায়েন্স মৌলিক বিষয়
• সাইবার নিরাপত্তা মৌলিক বিষয়

**💼 পেশাদার দক্ষতা:**
• Microsoft Office Suite (Expert Level)
• ডিজিটাল মার্কেটিং ও SEO
• ইমেইল যোগাযোগ ও ব্যবসায়িক লেখালেখি
• প্রজেক্ট ম্যানেজমেন্ট ও টিম সহযোগিতা

**🎨 সৃজনশীল দক্ষতা:**
• UI/UX ডিজাইন নীতি
• Canva ও বেসিক Photoshop
• কন্টেন্ট তৈরি ও সোশ্যাল মিডিয়া পরিচালনা

**🗣️ ভাষা:** বাংলা (মাতৃভাষা) • ইংরেজি (পেশাদার) • বেসিক আরবি`;
    }

    // Projects Portfolio
    if (
      lowerInput.includes('project') ||
      lowerInput.includes('work') ||
      lowerInput.includes('portfolio') ||
      lowerInput.includes('bobdo') ||
      lowerInput.includes('uniconverter') ||
      lowerInput.includes('প্রজেক্ট') ||
      lowerInput.includes('কাজ')
    ) {
      return `🚀 **গুরুত্বপূর্ণ প্রজেক্টসমূহ:**

**🩸 BOBDO - রক্তদান প্ল্যাটফর্ম**
• **প্রভাব:** ৬৮,০০০+ কমিউনিটি সদস্য সেবা প্রদান
• **প্রযুক্তি:** React.js + Firebase রিয়েল-টাইম ডেটাবেস
• **বৈশিষ্ট্য:** দাতা খোঁজা, অবস্থান-ভিত্তিক অনুসন্ধান, জরুরি সতর্কতা
• **সাফল্য:** ৪০% দ্রুততর জরুরি সাড়া
• **লাইভ:** https://bobdo.netlify.app

**📐 UniConverter - সার্বজনীন একক রূপান্তরকারী**
• **উদ্দেশ্য:** ৫০+ পরিমাপ বিভাগ রূপান্তরকারী
• **প্রযুক্তি:** Progressive Web App (PWA)
• **বৈশিষ্ট্য:** অফলাইন কার্যকারিতা, রেস্পন্সিভ ডিজাইন
• **ব্যবহারকারী:** ১০০০+ মাসিক সক্রিয় ব্যবহারকারী
• **লাইভ:** https://uniconverter.netlify.app

**💻 DevHub - ব্যক্তিগত পোর্টফলিও**
• **প্রদর্শনী:** সম্পূর্ণ পেশাদার পোর্টফলিও
• **প্রযুক্তি:** React + TypeScript + Tailwind CSS
• **বৈশিষ্ট্য:** বহুভাষিক, ডার্ক/লাইট মোড, অ্যানিমেশন
• **লাইভ:** https://devhub-i.netlify.app

**🌐 ধুনাট কমিউনিটি কানেক্ট**
• **লক্ষ্য:** স্থানীয় ব্যবসা ও সেবা ডিরেক্টরি
• **অবস্থা:** উন্নয়নাধীন
• **প্রভাব:** স্থানীয় অর্থনীতি ও সংযোগ সহায়তা`;
    }

    // Education Details
    if (
      lowerInput.includes('education') ||
      lowerInput.includes('study') ||
      lowerInput.includes('school') ||
      lowerInput.includes('college') ||
      lowerInput.includes('academic') ||
      lowerInput.includes('শিক্ষা') ||
      lowerInput.includes('পড়াশোনা')
    ) {
      return `🎓 **শিক্ষাগত পটভূমি:**

**উচ্চমাধ্যমিক সার্টিফিকেট (HSC) - ২০২৪**
🏫 প্রতিষ্ঠান: করতোয়া মাল্টিমিডিয়া স্কুল অ্যান্ড কলেজ
📊 ফলাফল: জিপিএ ৫.০০/৫.০০ ⭐
📚 বিভাগ: বিজ্ঞান
🔢 প্রধান বিষয়: উচ্চতর গণিত
🏆 অর্জন: সকল বিষয়ে নিখুঁত নম্বর

**মাধ্যমিক স্কুল সার্টিফিকেট (SSC) - ২০২২**
🏫 প্রতিষ্ঠান: ধুনাট সরকারি এন.ইউ. পাইলট মডেল হাই স্কুল
📊 ফলাফল: জিপিএ ৫.০০/৫.০০ ⭐
📚 বিভাগ: বিজ্ঞান
🔢 প্রধান বিষয়: উচ্চতর গণিত
🏆 অর্জন: ধারাবাহিক একাডেমিক শ্রেষ্ঠত্ব

**একাডেমিক শক্তি:**
• উন্নত গণিত ও সমস্যা সমাধান
• কম্পিউটার বিজ্ঞান ও প্রোগ্রামিং লজিক
• বৈজ্ঞানিক গবেষণা ও বিশ্লেষণ
• সমালোচনামূলক চিন্তাভাবনা ও উদ্ভাবন`;
    }

    // Volunteer Work & Community Service
    if (
      lowerInput.includes('volunteer') ||
      lowerInput.includes('community') ||
      lowerInput.includes('service') ||
      lowerInput.includes('blood') ||
      lowerInput.includes('donation') ||
      lowerInput.includes('স্বেচ্ছাসেবক') ||
      lowerInput.includes('সমাজসেবা') ||
      lowerInput.includes('রক্তদান')
    ) {
      return `🤝 **স্বেচ্ছাসেবক কাজ ও সমাজসেবা:**

**🩸 BOBDO - প্রধান স্বেচ্ছাসেবক ও ডেভেলপার (২০২৩-বর্তমান)**
• **ভূমিকা:** প্ল্যাটফর্ম ডেভেলপার ও কমিউনিটি সমন্বয়কারী
• **প্রভাব:** ৬৮,০০০+ নিবন্ধিত কমিউনিটি সদস্য
• **অর্জন:** জরুরি সাড়া সময় ৪০% কমানো
• **সেবা:** রক্তদান সমন্বয়, প্রাথমিক চিকিৎসা প্রশিক্ষণ
• **স্বীকৃতি:** অসামান্য স্বেচ্ছাসেবক সেবা পুরস্কার

**💡 কমিউনিটি টেক সমাধান:**
• **ডিজিটাল সাক্ষরতা:** বয়স্ক কমিউনিটি সদস্যদের শেখানো
• **ওয়েবসাইট ডেভেলপমেন্ট:** স্থানীয় ব্যবসার জন্য বিনামূল্যে ওয়েবসাইট
• **প্রযুক্তিগত সহায়তা:** কম্পিউটার সমস্যা সমাধান ও মেরামত

**🎓 শিক্ষামূলক সহায়তা:**
• **টিউটরিং:** গণিত ও কম্পিউটার বিজ্ঞানে ছাত্রদের সহায়তা
• **ক্যারিয়ার গাইডেন্স:** সিভি লেখা ও ইন্টারভিউ প্রস্তুতি
• **মেন্টরশিপ:** উদীয়মান ডেভেলপারদের দিকনির্দেশনা

**🌱 পরিবেশগত উদ্যোগ:**
• **সচেতনতা প্রচার:** জলবায়ু পরিবর্তন ও টেকসই উন্নয়ন
• **বৃক্ষরোপণ:** স্থানীয় পরিবেশগত প্রকল্প
• **বর্জ্য ব্যবস্থাপনা:** কমিউনিটি পরিচ্ছন্নতা অভিযান

**মূল্যবোধ:** "মানবতার সেবাই আল্লাহর সেবা" - এই নীতি আমার সকল স্বেচ্ছাসেবক কাজের চালিকাশক্তি।`;
    }

    // Future Goals & Career Plans
    if (
      lowerInput.includes('future') ||
      lowerInput.includes('goal') ||
      lowerInput.includes('plan') ||
      lowerInput.includes('career') ||
      lowerInput.includes('dream') ||
      lowerInput.includes('ভবিষ্যৎ') ||
      lowerInput.includes('লক্ষ্য') ||
      lowerInput.includes('পরিকল্পনা')
    ) {
      return `🎯 **ভবিষ্যৎ লক্ষ্য ও ক্যারিয়ার পরিকল্পনা:**

**🎓 তাৎক্ষণিক লক্ষ্য (২০২৪-২০২৫):**
• কম্পিউটার সায়েন্স ইঞ্জিনিয়ারিং-এ বিশ্ববিদ্যালয়ে ভর্তি
• উন্নত React.js ও Full-stack উন্নয়ন
• ১০+ পেশাদার প্রজেক্ট সম্পন্ন করা
• কমিউনিটি সমাধান কেন্দ্রিক টেক স্টার্টআপ চালু করা

**💼 ক্যারিয়ার পথ (২০২৫-২০৩০):**
• **সফটওয়্যার ইঞ্জিনিয়ার** - শীর্ষ টেক কোম্পানিতে
• **কমিউনিটি টেক লিডার** - স্থানীয় ডিজিটাল উদ্যোগ
• **ইসলামিক টেক গবেষক** - প্রযুক্তি নৈতিকতা
• **সামাজিক উদ্যোক্তা** - সামাজিক কল্যাণে প্রযুক্তি

**🌍 দীর্ঘমেয়াদী স্বপ্ন (২০৩০+):**
• **টেক কোম্পানি প্রতিষ্ঠাতা** - মানবিক ফোকাস নিয়ে
• **আন্তর্জাতিক বক্তা** - ইসলামিক টেক নৈতিকতা
• **কমিউনিটি উন্নয়ন নেতা** - জাতীয় পর্যায়ে
• **শিক্ষা সংস্কারক** - ডিজিটাল শিক্ষা বিপ্লব

**🚀 স্বপ্নের প্রজেক্ট:**
• গ্লোবাল ইসলামিক শিক্ষা প্ল্যাটফর্ম
• AI-চালিত কুরআন অনুবাদ ও তাফসির
• বিশ্বব্যাপী কমিউনিটি সেবা নেটওয়ার্ক
• উন্নয়নশীল দেশের জন্য টেক সমাধান

**💡 মিশন স্টেটমেন্ট:**
"আল্লাহর সৃষ্টির সেবার মাধ্যম হিসেবে প্রযুক্তি ব্যবহার করা, কমিউনিটির মধ্যে সেতুবন্ধন তৈরি করা, এবং উদ্ভাবন ও সেবার মাধ্যমে আরও ন্যায়সঙ্গত ও সমতাপূর্ণ বিশ্ব তৈরি করা।"`;
    }

    // Poetry & Creative Work
    if (
      lowerInput.includes('poetry') ||
      lowerInput.includes('poem') ||
      lowerInput.includes('writing') ||
      lowerInput.includes('creative') ||
      lowerInput.includes('কবিতা') ||
      lowerInput.includes('লেখালেখি')
    ) {
      return `✍️ **কবিতা ও সৃজনশীল প্রকাশ:**

**🎭 কবিতা সংগ্রহ - "কবিতার ভুবন"**
*"হৃদয়ের গভীর থেকে উঠে আসা ছন্দময় অভিব্যক্তি"*

**বিশেষ কবিতাসমূহ:**
📝 **"ভালোবাসার গান"** - একটি প্রেমের গীতিকবিতা
📝 **"স্বপ্নের পথে"** - স্বপ্ন ও আকাঙ্ক্ষার কবিতা
📝 **"মানবতার ডাক"** - মানবতার আহ্বান
📝 **"প্রযুক্তির ভবিষ্যৎ"** - প্রযুক্তির ভবিষ্যৎ নিয়ে

**লেখার ধরন:**
• বাংলায় গভীর আবেগপূর্ণ প্রকাশ
• ঐতিহ্যবাহী ছন্দের সাথে আধুনিক বিষয়বস্তু
• মানবতা, ভালোবাসা ও সামাজিক সমস্যার উপর ফোকাস
• মানব উন্নয়নে প্রযুক্তির ভূমিকা

**অনুপ্রেরণার উৎস:**
• জীবনের অভিজ্ঞতা ও কমিউনিটি সেবা
• ইসলামিক মূল্যবোধ ও মানবিক নীতি
• সমাজে প্রযুক্তির প্রভাব
• ব্যক্তিগত সম্পর্ক ও আবেগ

**প্ল্যাটফর্ম:** ব্যক্তিগত ব্লগ বিভাগে সকল সৃজনশীল কাজ প্রদর্শিত
**ভাষা:** প্রধানত বাংলা, কিছু ইংরেজি রচনা
**থিম:** ভালোবাসা, মানবতা, প্রযুক্তি, এবং আধ্যাত্মিক উন্নতি

*"কবিতা হৃদয়ের ভাষা, আর ভাষায় প্রকাশ পায় মনের কথা"*`;
    }

    // Family & Personal Information
    if (
      lowerInput.includes('family') ||
      lowerInput.includes('personal') ||
      lowerInput.includes('father') ||
      lowerInput.includes('mother') ||
      lowerInput.includes('পরিবার') ||
      lowerInput.includes('বাবা') ||
      lowerInput.includes('মা')
    ) {
      return `👨‍👩‍👧‍👦 **পারিবারিক ও ব্যক্তিগত পটভূমি:**

**পরিবারের সদস্যগণ:**
👨 **বাবা:** মোহাম্মদ রকিবুল হাসান শেখ
👩 **মা:** মোছাম্মৎ জসনা খাতুন
👧 **বোন:** ১ জন ছোট বোন

**ব্যক্তিগত মূল্যবোধ:**
☪️ **ধর্ম:** ইসলাম (মানবিক মূল্যবোধ সহকারে অনুশীলন)
🤲 **দর্শন:** "মানবতার সেবা, আল্লাহর সেবা"
💝 **মূল মূল্যবোধ:** সততা, সহমর্মিতা, শ্রেষ্ঠত্ব, সেবা

**ব্যক্তিত্বের বৈশিষ্ট্য:**
• 🎯 লক্ষ্যভিত্তিক ও দৃঢ়প্রতিজ্ঞ
• 🤝 সহযোগিতামূলক টিম প্লেয়ার
• 💡 সৃজনশীল সমস্যা সমাধানকারী
• 📚 আজীবন শিক্ষার্থী
• 🌟 আশাবাদী ও ইতিবাচক মনোভাব

**শখ ও আগ্রহ:**
• 💻 প্রযুক্তি ও উদ্ভাবন
• 📖 ইসলামিক সাহিত্য ও টেক ব্লগ পড়া
• ✍️ কবিতা লেখা (বাংলায়)
• 🎮 দাবা ও কৌশলগত খেলা
• 🌱 কমিউনিটি উন্নয়ন প্রকল্প

**জীবনের মূলমন্ত্র:** "প্রযুক্তি ব্যবহার করে সবার জন্য পৃথিবীকে আরো সুন্দর করে তোলা।"`;
    }

    // Basic Greetings & Welcome
    if (
      lowerInput.includes('hello') ||
      lowerInput.includes('hi') ||
      lowerInput.includes('hey') ||
      lowerInput.includes('assalam') ||
      lowerInput.includes('সালাম') ||
      lowerInput.includes('হাই') ||
      lowerInput.includes('হ্যালো')
    ) {
      return `👻 **আসসালামু আলাইকুম! স্বাগতম!**

আমি **Ghost AI**, রিদোয়ানের ডিজিটাল সহায়ক! 🤖✨

**রিদোয়ান সম্পর্কে:**
🎓 বগুড়ার ১৬ বছর বয়সী প্রতিভাবান
💻 ওয়েব ডেভেলপার ও কমিউনিটি স্বেচ্ছাসেবক
🩸 BOBDO প্ল্যাটফর্ম স্রষ্টা (৬৮হাজার+ ব্যবহারকারী)
⭐ নিখুঁত একাডেমিক রেকর্ড (HSC GPA 5.00)

**আমাকে যা জিজ্ঞাসা করতে পারেন:**
🔍 **ব্যক্তিগত তথ্য:** পটভূমি, শিক্ষা, পরিবার
💼 **পেশাদারিত্ব:** দক্ষতা, প্রজেক্ট, অর্জন
🏆 **সার্টিফিকেট:** ২৫+ টেক ও একাডেমিক সার্টিফিকেট
🤝 **স্বেচ্ছাসেবক কাজ:** কমিউনিটি সেবা ও সামাজিক প্রভাব
✍️ **সৃজনশীল কাজ:** কবিতা, ব্লগ, গবেষণা
📞 **যোগাযোগ:** কীভাবে রিদোয়ানের সাথে যোগাযোগ করবেন
🎯 **ভবিষ্যৎ পরিকল্পনা:** লক্ষ্য ও ক্যারিয়ার আকাঙ্ক্ষা

**জনপ্রিয় প্রশ্ন:**
• "রিদোয়ানের প্রজেক্ট সম্পর্কে বলুন"
• "তার প্রযুক্তিগত দক্ষতা কী?"
• "কীভাবে তার সাথে যোগাযোগ করব?"
• "তিনি কী ধরনের স্বেচ্ছাসেবক কাজ করেন?"

**🌟 সাহায্যের জন্য প্রস্তুত! কী জানতে চান?**`;
    }

    // Thank You Response
    if (
      lowerInput.includes('thank') ||
      lowerInput.includes('thanks') ||
      lowerInput.includes('jazak') ||
      lowerInput.includes('ধন্যবাদ') ||
      lowerInput.includes('শুকরিয়া')
    ) {
      return `🙏 **আপনাকে স্বাগতম!**

**জাজাকাল্লাহু খইরান** (আল্লাহ আপনাকে উত্তম প্রতিদান দিন)

**মোহাম্মদ রিদোয়ান মাহমুদ জিসান** সম্পর্কে তথ্য শেয়ার করতে পেরে আনন্দিত!

**আরো তথ্যের জন্য:**
• 📧 সরাসরি ইমেইল: ridoan.zisan@gmail.com
• 📞 ফোন/হোয়াটসঅ্যাপ: +৮৮০১৭১২৫২৫৯১০
• 🔗 লিংকডইন: https://linkedin.com/in/ridoan2007
• 🌐 পোর্টফলিও: সম্পূর্ণ প্রজেক্ট প্রদর্শনী

**মনে রাখবেন:**
*"সেরা মানুষ তারাই যারা অন্যদের উপকার করে"* - এটাই রিদোয়ানের পথপ্রদর্শক নীতি!

**আরো যা জানতে পারেন:**
✅ তার প্রজেক্ট ও প্রযুক্তিগত কাজ  
✅ কমিউনিটি সেবা ও স্বেচ্ছাসেবক কার্যক্রম
✅ শিক্ষাগত পটভূমি ও অর্জন
✅ ভবিষ্যৎ লক্ষ্য ও সহযোগিতার সুযোগ

**যোগাযোগ রাখুন ও আল্লাহ আপনাকে বরকত দিন!** 🤲✨`;
    }

    // Default response for unmatched queries
    return `ধন্যবাদ প্রশ্নের জন্য! আমি Ghost AI, রিদোয়ানের সব তথ্য জানি। 

আমাকে জিজ্ঞাসা করুন:
• তার শিক্ষা ও অর্জন
• প্রযুক্তিগত দক্ষতা ও প্রজেক্ট
• স্বেচ্ছাসেবক কাজ ও কমিউনিটি সেবা
• যোগাযোগের তথ্য
• ভবিষ্যৎ লক্ষ্য ও আকাঙ্ক্ষা
• কবিতা ও সৃজনশীল কাজ
• গবেষণা ও একাডেমিক অবদান

চেষ্টা করুন: "রিদোয়ানের প্রজেক্ট সম্পর্কে বলুন" বা "কীভাবে তার সাথে যোগাযোগ করব?"`;
  };

  useEffect(() => {
    if (isChatOpen) {
      inputRef.current?.focus();
      setUnreadCount(0);
    }
  }, [isChatOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate typing delay for better UX
    setTimeout(() => {
      const response = getConstantReply(userMessage.content);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);

      // Add unread count if chat is closed
      if (!isChatOpen) {
        setUnreadCount(prev => prev + 1);
      }
    }, 1000 + Math.random() * 1000);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    setUnreadCount(0);
  };

  // Enhanced Ghost Icon with magical effects
  const GhostIcon = ({ size = 24, className = '', animated = true }) => (
    <div className={`relative ${animated ? 'animate-float' : ''} ${className}`}>
      <svg width={size} height={size} viewBox="0 0 24 24" className="drop-shadow-xl">
        <defs>
          <linearGradient id="ghostGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="1" />
            <stop offset="50%" stopColor="#A855F7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C084FC" stopOpacity="0.8" />
          </linearGradient>
          <filter id="ghostGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Ghost body with glow */}
        <path 
          d="M12 2C8.2 2 5.8 4.8 5.8 8.2v8.4c0 1.2 0.6 2.3 1.6 2.9l1.2-1.8 1.8 1.8 1.8-1.8 1.8 1.8 1.2-1.8c1-0.6 1.6-1.7 1.6-2.9V8.2C18.2 4.8 15.8 2 12 2z" 
          fill="url(#ghostGradient)"
          filter="url(#ghostGlow)"
          className="animate-pulse"
        />
        
        {/* Eyes with shine */}
        <circle cx="9" cy="9" r="1.8" fill="white" />
        <circle cx="15" cy="9" r="1.8" fill="white" />
        <circle cx="9" cy="9" r="1.2" fill="#1F2937" />
        <circle cx="15" cy="9" r="1.2" fill="#1F2937" />
        <circle cx="9.5" cy="8.5" r="0.3" fill="white" />
        <circle cx="15.5" cy="8.5" r="0.3" fill="white" />
        
        {/* Mouth */}
        <ellipse cx="12" cy="13.5" rx="2" ry="1.5" fill="white" />
        <ellipse cx="12" cy="13.5" rx="1.5" ry="1" fill="#1F2937" />
      </svg>
      
      {/* Magical sparkles */}
      <div className="absolute -top-2 -right-2 text-yellow-400 animate-pulse">
        <Sparkles size={14} />
      </div>
      <div className="absolute -bottom-1 -left-1 text-purple-400 animate-bounce" style={{animationDelay: '0.5s'}}>
        <Sparkles size={10} />
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end gap-3 z-[9999]" ref={containerRef}>
      {/* Enhanced Floating Action Button */}
      <div className="relative">
        <button
          onClick={toggleChat}
          className="group relative bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 hover:from-purple-700 hover:via-purple-800 hover:to-indigo-900 text-white p-5 rounded-full shadow-2xl hover:shadow-purple-500/40 transition-all duration-500 transform hover:scale-110 active:scale-95 border-2 border-purple-400/30 backdrop-blur-sm"
          title="Ghost AI এর সাথে চ্যাট করুন"
          style={{
            boxShadow: '0 10px 40px rgba(139, 92, 246, 0.5), 0 0 30px rgba(168, 85, 247, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          }}
        >
          <GhostIcon size={32} />
          
          {/* Notification Badge */}
          {unreadCount > 0 && (
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-7 h-7 flex items-center justify-center font-bold animate-bounce shadow-lg">
              {unreadCount > 9 ? '9+' : unreadCount}
            </div>
          )}

          {/* Animated rings */}
          <div className="absolute inset-0 rounded-full bg-purple-400 opacity-20 animate-ping"></div>
          <div className="absolute inset-0 rounded-full bg-purple-300 opacity-10 animate-ping" style={{animationDelay: '1s'}}></div>
        </button>

        {/* Enhanced Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-xl backdrop-blur-sm border border-gray-700">
          <div className="flex items-center gap-2">
            <GhostIcon size={16} animated={false} />
            <span>রিদোয়ান সম্পর্কে জিজ্ঞাসা করুন! 👻</span>
          </div>
          <div className="absolute top-full right-4 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>

      {/* Enhanced Chat Window */}
      {isChatOpen && (
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-200/50 flex flex-col w-96 max-w-[calc(100vw-2rem)] h-[32rem] max-h-[calc(100vh-8rem)] transition-all duration-500 animate-scale-in">
          
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 text-white p-5 rounded-t-3xl flex justify-between items-center border-b border-purple-500/30 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="relative">
                <GhostIcon size={36} className="text-white" animated={false} />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-bold text-xl flex items-center gap-2">
                  Ghost AI
                  <Bot size={20} className="text-purple-200" />
                </h3>
                <p className="text-purple-200 text-sm">রিদোয়ানের ডিজিটাল সহায়ক</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-purple-200 hover:text-white transition-colors p-2 rounded-full hover:bg-purple-600/50 backdrop-blur-sm"
              title="চ্যাট বন্ধ করুন"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-purple-50/50 to-white/80 backdrop-blur-sm">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="mb-6">
                  <GhostIcon size={80} className="mx-auto text-purple-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-3">
                  আসসালামু আলাইকুম! 👋
                </h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  আমি Ghost AI, এখানে আছি আপনাকে সব কিছু বলার জন্য
                  <br /><strong className="text-purple-700">মোহাম্মদ রিদোয়ান মাহমুদ জিসান</strong> সম্পর্কে!
                </p>
                <div className="flex flex-wrap gap-2 justify-center text-xs">
                  <span className="bg-purple-100 text-purple-700 px-3 py-2 rounded-full border border-purple-200">শিক্ষা</span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-2 rounded-full border border-blue-200">প্রজেক্ট</span>
                  <span className="bg-green-100 text-green-700 px-3 py-2 rounded-full border border-green-200">দক্ষতা</span>
                  <span className="bg-red-100 text-red-700 px-3 py-2 rounded-full border border-red-200">যোগাযোগ</span>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                      : 'bg-gradient-to-br from-purple-500 to-purple-600 border-2 border-purple-300'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="w-6 h-6 text-white" />
                  ) : (
                    <GhostIcon size={24} className="text-white" animated={false} />
                  )}
                </div>
                
                <div
                  className={`rounded-2xl px-5 py-4 max-w-[80%] shadow-lg backdrop-blur-sm ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-sm border border-blue-400'
                      : 'bg-white/90 border border-purple-200 text-gray-800 rounded-tl-sm'
                  }`}
                >
                  <div className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
                    {message.content}
                  </div>
                  <div className={`text-xs mt-3 ${
                    message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {format(message.timestamp, 'h:mm a')}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <GhostIcon size={24} className="text-white" animated={false} />
                </div>
                <div className="bg-white/90 border border-purple-200 rounded-2xl rounded-tl-sm px-5 py-4 shadow-lg backdrop-blur-sm">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Input Form */}
          <div className="border-t border-purple-200 p-5 bg-white/90 rounded-b-3xl backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="রিদোয়ান সম্পর্কে জিজ্ঞাসা করুন... 👻"
                disabled={isLoading}
                className="flex-1 rounded-xl border border-purple-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed placeholder-gray-500 text-sm bg-white/80 backdrop-blur-sm shadow-inner"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl px-5 py-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-purple-500/30 group backdrop-blur-sm"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
            
            {/* Quick Suggestions */}
            <div className="flex gap-2 mt-4 flex-wrap">
              {[
                { label: 'প্রজেক্ট', query: 'রিদোয়ানের প্রজেক্ট সম্পর্কে বলুন' },
                { label: 'দক্ষতা', query: 'তার প্রযুক্তিগত দক্ষতা কী' },
                { label: 'যোগাযোগ', query: 'কীভাবে তার সাথে যোগাযোগ করব' },
                { label: 'শিক্ষা', query: 'তার শিক্ষাগত পটভূমি' }
              ].map((suggestion) => (
                <button
                  key={suggestion.label}
                  onClick={() => setInput(suggestion.query)}
                  className="text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-2 rounded-full transition-all duration-200 border border-purple-300 hover:border-purple-400 shadow-sm backdrop-blur-sm"
                >
                  {suggestion.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(2deg); }
          50% { transform: translateY(-4px) rotate(0deg); }
          75% { transform: translateY(-10px) rotate(-2deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        @keyframes scale-in {
          0% { transform: scale(0.9) translateY(20px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        
        /* Enhanced scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: linear-gradient(to bottom, #f8fafc, #e2e8f0);
          border-radius: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #a855f7, #9333ea);
          border-radius: 6px;
          border: 1px solid #e2e8f0;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #9333ea, #7c3aed);
        }
      `}</style>
    </div>
  );
};

export default LiveChat;
