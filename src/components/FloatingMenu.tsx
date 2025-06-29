
import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  User,
  X,
  Minimize2,
  Maximize2,
  MessageSquare,
  Bot,
  Sparkles,
} from 'lucide-react';
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
  const [isMinimized, setIsMinimized] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Comprehensive constant replies based on the complete portfolio
  const getConstantReply = (userInput: string): string | null => {
    const lowerInput = userInput.toLowerCase();

    // Personal Information & Bio
    if (
      lowerInput.includes('who') ||
      lowerInput.includes('developer') ||
      lowerInput.includes('creator') ||
      lowerInput.includes('ridoan') ||
      lowerInput.includes('zisan') ||
      lowerInput.includes('about')
    ) {
      return `👋 I'm Md Ridoan Mahmud Zisan from Bogura, Bangladesh!

🎓 **Current Status:** HSC Graduate (2024) with perfect GPA 5.00
💻 **Role:** Student, Web Developer & Community Volunteer
🌟 **Passion:** Creating digital solutions for community development

**Quick Facts:**
📅 Born: December 31, 2007 (Age: 16)
🩸 Blood Group: B+
🏠 Location: Bogura, Bangladesh
☪️ Religion: Islam (Values: Humanity & Service)

**Mission:** Using technology to serve humanity and create positive impact in society.`;
    }

    // Contact Information
    if (
      lowerInput.includes('contact') ||
      lowerInput.includes('email') ||
      lowerInput.includes('phone') ||
      lowerInput.includes('reach') ||
      lowerInput.includes('connect') ||
      lowerInput.includes('message')
    ) {
      return `📬 **Get in Touch with Ridoan:**

📧 **Email:** ridoan.zisan@gmail.com
📞 **Phone:** +8801712525910
📍 **Address:** Bogura, Bangladesh
🔗 **LinkedIn:** https://linkedin.com/in/ridoan2007

**Preferred Contact Methods:**
✅ Email (Best for detailed discussions)
✅ Phone/WhatsApp (For urgent matters)
✅ LinkedIn (Professional networking)

**Response Time:** Usually within 24 hours
**Available:** 9 AM - 10 PM (Bangladesh Time)

Feel free to reach out for collaborations, projects, or just a friendly chat! 😊`;
    }

    // Education Details
    if (
      lowerInput.includes('education') ||
      lowerInput.includes('study') ||
      lowerInput.includes('school') ||
      lowerInput.includes('college') ||
      lowerInput.includes('academic') ||
      lowerInput.includes('hsc') ||
      lowerInput.includes('ssc')
    ) {
      return `🎓 **Educational Journey:**

**Higher Secondary Certificate (HSC) - 2024**
🏫 Institution: Karatoa Multimedia School and College
📊 Result: GPA 5.00/5.00 ⭐
📚 Group: Science
🔢 Major Subject: Higher Mathematics
🏆 Achievement: Perfect scores in all subjects

**Secondary School Certificate (SSC) - 2022**  
🏫 Institution: Dhunat Govt N.U. Pilot Model High School
📊 Result: GPA 5.00/5.00 ⭐
📚 Group: Science  
🔢 Major Subject: Higher Mathematics
🏆 Achievement: Consistent academic excellence

**Academic Strengths:**
• Advanced Mathematics & Problem Solving
• Computer Science & Programming Logic
• Scientific Research & Analysis
• Critical Thinking & Innovation`;
    }

    // Skills & Technical Expertise
    if (
      lowerInput.includes('skill') ||
      lowerInput.includes('technology') ||
      lowerInput.includes('programming') ||
      lowerInput.includes('web') ||
      lowerInput.includes('development') ||
      lowerInput.includes('react') ||
      lowerInput.includes('javascript')
    ) {
      return `💻 **Technical Skills Portfolio:**

**🌐 Web Development:**
• Frontend: HTML5, CSS3, JavaScript (ES6+)
• Framework: React.js, Vite
• Styling: Tailwind CSS, Responsive Design
• Tools: Firebase, Git, VS Code

**🤖 Emerging Technologies:**
• Artificial Intelligence & Machine Learning
• Python Programming
• Data Science Fundamentals
• Cybersecurity Basics

**💼 Professional Skills:**
• Microsoft Office Suite (Expert Level)
• Digital Marketing & SEO
• Email Communication & Business Writing
• Project Management & Team Collaboration
• Problem Solving & Critical Thinking

**🎨 Creative Skills:**
• UI/UX Design Principles
• Canva & Basic Photoshop
• Content Creation & Social Media Management

**🗣️ Languages:**
• Bengali (Native) • English (Professional) • Basic Arabic`;
    }

    // Projects Portfolio
    if (
      lowerInput.includes('project') ||
      lowerInput.includes('work') ||
      lowerInput.includes('portfolio') ||
      lowerInput.includes('bobdo') ||
      lowerInput.includes('uniconverter') ||
      lowerInput.includes('devhub')
    ) {
      return `🚀 **Featured Projects:**

**🩸 BOBDO - Blood Donation Platform**
• **Impact:** Serving 68,000+ community members
• **Tech:** React.js + Firebase real-time database
• **Features:** Donor matching, location-based search, emergency alerts
• **Achievement:** 40% faster emergency response time
• **Live:** https://bobdo.netlify.app
• **Recognition:** Community impact award

**📐 UniConverter - Universal Unit Converter**
• **Purpose:** 50+ measurement categories converter
• **Tech:** Progressive Web App (PWA)
• **Features:** Offline functionality, responsive design
• **Users:** 1000+ monthly active users
• **Live:** https://uniconverter.netlify.app

**💻 DevHub - Personal Portfolio**
• **Showcase:** Complete professional portfolio
• **Tech:** React + TypeScript + Tailwind CSS
• **Features:** Multi-language, dark/light mode, animations
• **Live:** https://devhub-i.netlify.app

**🌐 Dhunat Community Connect**
• **Goal:** Local business & service directory
• **Status:** In Development
• **Impact:** Supporting local economy & connectivity`;
    }

    // Certificates & Achievements
    if (
      lowerInput.includes('certificate') ||
      lowerInput.includes('achievement') ||
      lowerInput.includes('award') ||
      lowerInput.includes('olympiad') ||
      lowerInput.includes('competition') ||
      lowerInput.includes('recognition')
    ) {
      return `🏆 **Certifications & Achievements:**

**🥇 Tech Certifications:**
• Google - Foundations of Cybersecurity
• IBM - Python for Data Science & AI
• IBM - Introduction to Artificial Intelligence
• IBM - Machine Learning Fundamentals
• Complete Web Development (Programming Hero)

**🏅 Academic Olympiads:**
• Bangladesh Mathematical Olympiad - Participation
• ICT Olympiad Bangladesh - Quarter Final
• Bangladesh AI Olympiad - Semi-Final
• Zero Olympiad (UN SDGs) - Semi-Final
• National General Knowledge Olympiad

**📜 Professional Skills:**
• Digital Marketing (HubSpot Academy)
• Business Case Solving
• CV Writing & Interview Skills
• Presentation & Public Speaking
• Corporate Etiquette & Management
• Microsoft Office Expert Level

**🌍 Global Initiatives:**
• UN Climate Change Process
• Net Zero 101 Certification
• Sustainable Development Goals
• Gender Equality in Climate Action

**📊 Total Certifications:** 25+ verified certificates`;
    }

    // Volunteer Work & Community Service
    if (
      lowerInput.includes('volunteer') ||
      lowerInput.includes('community') ||
      lowerInput.includes('service') ||
      lowerInput.includes('blood') ||
      lowerInput.includes('donation') ||
      lowerInput.includes('social')
    ) {
      return `🤝 **Volunteer Work & Community Service:**

**🩸 BOBDO - Lead Volunteer & Developer (2023-Present)**
• **Role:** Platform Developer & Community Coordinator
• **Impact:** 68,000+ registered community members
• **Achievement:** 40% reduction in emergency response time
• **Services:** Blood donation coordination, first aid training
• **Recognition:** Outstanding volunteer service award

**💡 Community Tech Solutions:**
• **Digital Literacy:** Teaching elderly community members
• **Website Development:** Free websites for local businesses
• **Technical Support:** Computer troubleshooting & repair

**🎓 Educational Support:**
• **Tutoring:** Mathematics & Computer Science for students
• **Career Guidance:** CV writing & interview preparation
• **Mentorship:** Guiding aspiring developers

**🌱 Environmental Initiatives:**
• **Awareness Campaigns:** Climate change & sustainability
• **Tree Plantation:** Local environmental projects
• **Waste Management:** Community cleanliness drives

**Values:** "Service to humanity is service to Allah" - This drives all my volunteer efforts.`;
    }

    // Family & Personal Information
    if (
      lowerInput.includes('family') ||
      lowerInput.includes('personal') ||
      lowerInput.includes('father') ||
      lowerInput.includes('mother') ||
      lowerInput.includes('parent') ||
      lowerInput.includes('background')
    ) {
      return `👨‍👩‍👧‍👦 **Family & Personal Background:**

**Family Members:**
👨 **Father:** Md Rokibul Hasan Shekh
👩 **Mother:** Mst. Zosna Khatun  
👧 **Sister:** 1 Younger Sister

**Personal Values:**
☪️ **Religion:** Islam (practicing with humanitarian values)
🤲 **Philosophy:** "Serve humanity, serve Allah"
💝 **Core Values:** Integrity, Empathy, Excellence, Service

**Personality Traits:**
• 🎯 Goal-oriented and determined
• 🤝 Collaborative team player
• 💡 Creative problem solver
• 📚 Lifelong learner
• 🌟 Optimistic and positive attitude

**Hobbies & Interests:**
• 💻 Technology & Innovation
• 📖 Reading Islamic literature & tech blogs
• ✍️ Writing poetry (Bengali)
• 🎮 Chess & strategic games
• 🌱 Community development projects

**Life Motto:** "Use technology to make the world a better place for everyone."`;
    }

    // Age & Birth Information
    if (
      lowerInput.includes('age') ||
      lowerInput.includes('old') ||
      lowerInput.includes('birth') ||
      lowerInput.includes('birthday')
    ) {
      const birthDate = new Date('2007-12-31');
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      return `🎂 **Age & Birth Details:**

**Current Age:** ${age} years old
**Date of Birth:** December 31, 2007
**Zodiac Sign:** Capricorn ♑
**Birth Place:** Bogura, Bangladesh

**Fun Facts:**
🎉 Born on New Year's Eve - Always celebrating!
⭐ Capricorn traits: Ambitious, disciplined, practical
🌟 Started coding journey at age 15
🎯 Achieved academic excellence consistently

**Milestones by Age:**
• Age 15: First website created
• Age 16: Perfect HSC results (GPA 5.00)
• Age 16: BOBDO platform launched
• Age 17: Multiple tech certifications earned

**Next Year Goals:**
🎓 University admission in Computer Science
💻 Advanced web development projects
🌍 International tech competitions`;
    }

    // Poetry & Creative Work
    if (
      lowerInput.includes('poetry') ||
      lowerInput.includes('poem') ||
      lowerInput.includes('writing') ||
      lowerInput.includes('creative') ||
      lowerInput.includes('blog') ||
      lowerInput.includes('bengali')
    ) {
      return `✍️ **Poetry & Creative Expression:**

**🎭 Poetry Collection - "কবিতার ভুবন"**
*"Rhythmic expressions from the depths of the heart"*

**Featured Poems:**
📝 **"ভালোবাসার গান"** - A love ballad
📝 **"স্বপ্নের পথে"** - Dreams and aspirations  
📝 **"মানবতার ডাক"** - Call for humanity
📝 **"প্রযুক্তির ভবিষ্যৎ"** - Future of technology

**Writing Style:**
• Deep emotional expression in Bengali
• Modern themes with traditional rhythm
• Focus on humanity, love, and social issues
• Technology's role in human development

**Inspiration Sources:**
• Life experiences & community service
• Islamic values & humanitarian principles  
• Technology's impact on society
• Personal relationships & emotions

**Platform:** Personal blog section showcases all creative works
**Language:** Primarily Bengali, some English pieces
**Theme:** Love, humanity, technology, and spiritual growth

*"কবিতা হৃদয়ের ভাষা, আর ভাষায় প্রকাশ পায় মনের কথা"*`;
    }

    // Research & Academic Work
    if (
      lowerInput.includes('research') ||
      lowerInput.includes('academic') ||
      lowerInput.includes('study') ||
      lowerInput.includes('thesis') ||
      lowerInput.includes('paper') ||
      lowerInput.includes('islamic')
    ) {
      return `📚 **Research & Academic Contributions:**

**🕌 Islamic Perspective on Technology**
*"Technology as a tool for serving humanity and Allah's creation"*

**Research Areas:**
• **Digital Ethics in Islam:** Halal use of technology
• **Community Development:** Tech solutions for social problems  
• **Education Technology:** Islamic learning platforms
• **Humanitarian Tech:** Technology for social welfare

**Published Works:**
📄 "Technology & Islamic Values - A Modern Perspective"
📄 "Digital Dawah - Spreading Islam through Technology"  
📄 "Community Service in the Digital Age"
📄 "Ethical Programming - Islamic Guidelines for Developers"

**Research Methodology:**
• Quran & Hadith references
• Modern technology analysis
• Community impact studies
• Practical implementation strategies

**Academic Focus:**
• Bridging traditional Islamic knowledge with modern tech
• Creating tech solutions that align with Islamic principles
• Promoting digital literacy in Muslim communities

**Future Research Goals:**
🎯 AI Ethics from Islamic perspective
🎯 Blockchain technology for Zakat distribution  
🎯 Educational apps for Quran & Hadith learning`;
    }

    // Career Goals & Future Plans
    if (
      lowerInput.includes('future') ||
      lowerInput.includes('goal') ||
      lowerInput.includes('plan') ||
      lowerInput.includes('career') ||
      lowerInput.includes('dream') ||
      lowerInput.includes('ambition')
    ) {
      return `🎯 **Future Goals & Career Aspirations:**

**🎓 Immediate Goals (2024-2025):**
• University admission in Computer Science Engineering
• Advanced React.js & Full-stack development
• Complete 10+ professional projects
• Launch tech startup focused on community solutions

**💼 Career Path (2025-2030):**
• **Software Engineer** at top tech company
• **Community Tech Leader** - Local digital initiatives  
• **Islamic Tech Researcher** - Technology ethics
• **Social Entrepreneur** - Tech for social good

**🌍 Long-term Vision (2030+):**
• **Tech Company Founder** - Humanitarian focus
• **International Speaker** - Islamic tech ethics
• **Community Development Leader** - National level
• **Educational Reformer** - Digital learning revolution

**🚀 Dream Projects:**
• Global Islamic learning platform
• AI-powered Quran translation & tafsir
• Worldwide community service network
• Tech solutions for developing countries

**💡 Mission Statement:**
*"To use technology as a means of serving Allah's creation, building bridges between communities, and creating a more just and equitable world through innovation and service."*

**Core Values in Career:**
✅ Integrity & Islamic principles
✅ Service to humanity  
✅ Innovation for social good
✅ Continuous learning & growth`;
    }

    // Technical Support & Help
    if (
      lowerInput.includes('help') ||
      lowerInput.includes('support') ||
      lowerInput.includes('problem') ||
      lowerInput.includes('issue') ||
      lowerInput.includes('fix') ||
      lowerInput.includes('error')
    ) {
      return `🛠️ **Technical Support & Help:**

**💻 Web Development Support:**
• React.js & JavaScript debugging
• Firebase integration & setup
• Responsive design solutions
• Performance optimization

**📱 General Tech Help:**
• Computer troubleshooting
• Software installation & setup
• Microsoft Office training
• Digital marketing guidance

**🎓 Educational Support:**
• Programming tutorials & mentoring
• CV writing & career guidance
• Academic project assistance
• Technology career counseling

**🤝 Community Services:**
• Free website development for local businesses
• Digital literacy training for seniors
• Blood donation coordination through BOBDO
• Technical consultation for startups

**📞 How to Get Help:**
1. **Email:** ridoan.zisan@gmail.com (detailed issues)
2. **Phone:** +8801712525910 (urgent matters)
3. **LinkedIn:** Professional networking & guidance

**⏰ Support Hours:**
• Monday-Friday: 2 PM - 10 PM
• Saturday-Sunday: 10 AM - 8 PM
• Emergency: Available 24/7 for blood donation

**💝 Philosophy:** "Helping others is not just my hobby, it's my responsibility as a human being."`;
    }

    // Basic Greetings & Welcome
    if (
      lowerInput.includes('hello') ||
      lowerInput.includes('hi') ||
      lowerInput.includes('hey') ||
      lowerInput.includes('assalam') ||
      lowerInput.includes('peace')
    ) {
      return `👋 **আসসালামু আলাইকুম! Welcome!**

I'm **Ghost AI**, Ridoan's digital assistant! 🤖✨

**About Ridoan:**
🎓 16-year-old prodigy from Bogura, Bangladesh
💻 Web Developer & Community Volunteer  
🩸 BOBDO Platform Creator (68K+ users served)
⭐ Perfect academic record (HSC GPA 5.00)

**What You Can Ask Me:**
🔍 **Personal Info:** Background, education, family
💼 **Professional:** Skills, projects, achievements  
🏆 **Certifications:** 25+ tech & academic certificates
🤝 **Volunteer Work:** Community service & social impact
✍️ **Creative Work:** Poetry, blogs, research
📞 **Contact:** How to reach Ridoan
🎯 **Future Plans:** Goals & career aspirations

**Popular Questions:**
• "Tell me about Ridoan's projects"
• "What are his technical skills?"  
• "How can I contact him?"
• "What volunteer work does he do?"

**🌟 Ready to help! What would you like to know?**`;
    }

    // Thank You Response
    if (
      lowerInput.includes('thank') ||
      lowerInput.includes('thanks') ||
      lowerInput.includes('jazak') ||
      lowerInput.includes('grateful')
    ) {
      return `🙏 **You're Most Welcome!**

**جزاك الله خيراً** (May Allah reward you with goodness)

It's my pleasure to share information about **Md Ridoan Mahmud Zisan**! 

**Need More Information?**
• 📧 Direct Email: ridoan.zisan@gmail.com
• 📞 Phone/WhatsApp: +8801712525910  
• 🔗 LinkedIn: https://linkedin.com/in/ridoan2007
• 🌐 Portfolio: Complete projects showcase

**Remember:**
*"The best of people are those who benefit others"* - This is Ridoan's guiding principle!

**Feel free to ask anything else about:**
✅ His projects & technical work
✅ Community service & volunteer activities  
✅ Educational background & achievements
✅ Future goals & collaboration opportunities

**Stay Connected & May Allah Bless You!** 🤲✨`;
    }

    return null;
  };

  useEffect(() => {
    if (isChatOpen && !isMinimized) {
      inputRef.current?.focus();
      setUnreadCount(0);
    }
  }, [isChatOpen, isMinimized]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        // Optional: Auto-minimize instead of close when clicking outside
        // setIsMinimized(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      const response = getConstantReply(userMessage.content) || 
        `Thank you for your question! I'm Ghost AI, here to provide information about Md Ridoan Mahmud Zisan. 

Please ask me about:
• His education & achievements
• Technical skills & projects  
• Volunteer work & community service
• Contact information
• Future goals & aspirations
• Poetry & creative work
• Research & academic contributions

Try asking: "Tell me about Ridoan's projects" or "How can I contact him?"`;

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);

      // Add unread count if chat is minimized
      if (isMinimized) {
        setUnreadCount(prev => prev + 1);
      }
    }, 1000 + Math.random() * 1000); // 1-2 second delay
  };

  const toggleChat = () => {
    if (isChatOpen) {
      setIsChatOpen(false);
      setIsMinimized(false);
    } else {
      setIsChatOpen(true);
      setIsMinimized(false);
    }
    setUnreadCount(0);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (!isMinimized) {
      setUnreadCount(0);
    }
  };

  // Enhanced Ghost Icon with animation
  const GhostIcon = ({ size = 24, className = '', animated = true }) => (
    <div className={`relative ${animated ? 'animate-float' : ''} ${className}`}>
      <svg width={size} height={size} viewBox="0 0 24 24" className="drop-shadow-lg">
        <defs>
          <linearGradient id="ghostGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>
        {/* Ghost body */}
        <path 
          d="M12 2C8.5 2 6 4.5 6 8v8c0 1 0.5 2 1.5 2.5l1-1.5 1.5 1.5 1.5-1.5 1.5 1.5 1-1.5c1-0.5 1.5-1.5 1.5-2.5V8c0-3.5-2.5-6-6-6z" 
          fill="url(#ghostGradient)"
          className="animate-pulse"
        />
        {/* Eyes */}
        <circle cx="9.5" cy="9" r="1.5" fill="white" />
        <circle cx="14.5" cy="9" r="1.5" fill="white" />
        <circle cx="9.5" cy="9" r="0.8" fill="#1F2937" />
        <circle cx="14.5" cy="9" r="0.8" fill="#1F2937" />
        {/* Mouth */}
        <ellipse cx="12" cy="13" rx="1.5" ry="1" fill="white" />
      </svg>
      {/* Floating sparkles */}
      <div className="absolute -top-1 -right-1 text-yellow-400 animate-pulse">
        <Sparkles size={12} />
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end gap-3 z-[9999]" ref={containerRef}>
      {/* Floating Action Button */}
      <div className="relative">
        <button
          onClick={toggleChat}
          className="group relative bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-110 border-2 border-purple-500/20"
          title="Chat with Ghost AI"
          style={{
            boxShadow: '0 8px 32px rgba(139, 92, 246, 0.4), 0 0 20px rgba(168, 85, 247, 0.3)',
          }}
        >
          <GhostIcon size={28} />
          
          {/* Notification Badge */}
          {unreadCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-bounce">
              {unreadCount > 9 ? '9+' : unreadCount}
            </div>
          )}

          {/* Ripple Effect */}
          <div className="absolute inset-0 rounded-full bg-purple-400 opacity-20 animate-ping"></div>
        </button>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Ask me about Ridoan! 👻
          <div className="absolute top-full right-4 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>

      {/* Chat Window */}
      {isChatOpen && (
        <div className={`bg-white rounded-2xl shadow-2xl border border-purple-200 flex flex-col transition-all duration-300 ${
          isMinimized 
            ? 'w-80 h-16' 
            : 'w-96 max-w-[calc(100vw-2rem)] h-[28rem] max-h-[calc(100vh-8rem)]'
        }`}>
          
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-t-2xl flex justify-between items-center border-b border-purple-500/20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <GhostIcon size={32} className="text-white" animated={false} />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2">
                  Ghost AI
                  <Bot size={18} className="text-purple-200" />
                </h3>
                <p className="text-purple-200 text-sm">Ridoan's Digital Assistant</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMinimize}
                className="text-purple-200 hover:text-white transition-colors p-1 rounded-full hover:bg-purple-600"
                title={isMinimized ? "Maximize" : "Minimize"}
              >
                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
              </button>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-purple-200 hover:text-white transition-colors p-1 rounded-full hover:bg-purple-600"
                title="Close Chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <>
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-purple-50/30 to-white">
                {messages.length === 0 && (
                  <div className="text-center py-8">
                    <div className="mb-4">
                      <GhostIcon size={64} className="mx-auto text-purple-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">
                      আসসালামু আলাইকুম! 👋
                    </h4>
                    <p className="text-gray-600 mb-4">
                      I'm Ghost AI, here to tell you everything about 
                      <br /><strong>Md Ridoan Mahmud Zisan!</strong>
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center text-xs">
                      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Education</span>
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Projects</span>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">Skills</span>
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full">Contact</span>
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
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg'
                          : 'bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg border-2 border-purple-300'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <GhostIcon size={20} className="text-white" animated={false} />
                      )}
                    </div>
                    
                    <div
                      className={`rounded-2xl px-4 py-3 max-w-[75%] shadow-sm ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-sm'
                          : 'bg-white border border-purple-100 text-gray-800 rounded-tl-sm'
                      }`}
                    >
                      <div className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
                        {message.content}
                      </div>
                      <div className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {format(message.timestamp, 'h:mm a')}
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <GhostIcon size={20} className="text-white" animated={false} />
                    </div>
                    <div className="bg-white border border-purple-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <div className="border-t border-purple-100 p-4 bg-white rounded-b-2xl">
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me about Ridoan... 👻"
                    disabled={isLoading}
                    className="flex-1 rounded-xl border border-purple-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed placeholder-gray-400 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl px-4 py-3 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-purple-500/25 group"
                  >
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </form>
                
                {/* Quick Suggestions */}
                <div className="flex gap-2 mt-3 flex-wrap">
                  {['Projects', 'Skills', 'Contact', 'Education'].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setInput(`Tell me about Ridoan's ${suggestion.toLowerCase()}`)}
                      className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 px-3 py-1 rounded-full transition-colors border border-purple-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Custom Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-6px) rotate(1deg); }
          50% { transform: translateY(-3px) rotate(0deg); }
          75% { transform: translateY(-8px) rotate(-1deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #a855f7;
          border-radius: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #9333ea;
        }
      `}</style>
    </div>
  );
};

export default LiveChat;
