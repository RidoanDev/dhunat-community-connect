
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, X, MessageCircle } from 'lucide-react';
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
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Enhanced constant replies with comprehensive website information
  const getConstantReply = (userInput: string): string | null => {
    const lowerInput = userInput.toLowerCase();

    // Website information
    if (
      lowerInput.includes('ধুনট') ||
      lowerInput.includes('dhunat') ||
      lowerInput.includes('এপ') ||
      lowerInput.includes('app') ||
      lowerInput.includes('ওয়েবসাইট') ||
      lowerInput.includes('website')
    ) {
      return `ধুনট.অ্যাপ সম্পর্কে তথ্য:
      \n🏘️ ধুনট উপজেলার জন্য স্থানীয় সেবা ডিরেক্টরি
      \n📱 ৩৫+ বিভিন্ন ক্যাটাগরিতে সেবা প্রদানকারী
      \n🔍 সহজ খোঁজ ও ফিল্টার সুবিধা
      \n📞 সরাসরি যোগাযোগ তথ্য
      \n🗺️ ম্যাপ ও ঠিকানা সহ বিস্তারিত তথ্য
      \n\nউপলব্ধ সেবাসমূহ: ডাক্তার, হাসপাতাল, রক্তদাতা, গাড়ি ভাড়া, থানা, আইনজীবী এবং আরও অনেক!`;
    }

    // Categories information
    if (
      lowerInput.includes('ক্যাটাগরি') ||
      lowerInput.includes('category') ||
      lowerInput.includes('সেবা') ||
      lowerInput.includes('service')
    ) {
      return `ধুনট.অ্যাপে উপলব্ধ ক্যাটাগরিসমূহ:
      \n🏥 চিকিৎসা সেবা: ডাক্তার, হাসপাতাল, ডায়াগনস্টিক সেন্টার
      \n🩸 জরুরি সেবা: রক্তদাতা, থানা, আইনজীবী
      \n🚗 পরিবহন: গাড়ি ভাড়া, বাস সূচি, ট্রেন সূচি
      \n🏫 শিক্ষা: শিক্ষক, শিক্ষা প্রতিষ্ঠান, ট্রেনিং সেন্টার
      \n💼 চাকরি ও ব্যবসা: চাকরি, উদ্যোক্তা
      \n🏠 দৈনন্দিন: বাজার, বাসা ভাড়া, হোটেল
      \n🏛️ সরকারি: পৌরসভা, বিদ্যুৎ অফিস
      \n🏦 ব্যাংকিং: ব্যাংক ও বীমা, গ্যাস স্টেশন
      \n🎯 আরও ২০+ ক্যাটাগরি উপলব্ধ!`;
    }

    // Medical services
    if (
      lowerInput.includes('ডাক্তার') ||
      lowerInput.includes('doctor') ||
      lowerInput.includes('চিকিৎসক') ||
      lowerInput.includes('হাসপাতাল') ||
      lowerInput.includes('hospital')
    ) {
      return `চিকিৎসা সেবা:
      \n👨‍⚕️ ডাক্তার: বিশেষজ্ঞ চিকিৎসক তালিকা
      \n🏥 হাসপাতাল: স্থানীয় হাসপাতাল ও ক্লিনিক
      \n🔬 ডায়াগনস্টিক: প্যাথলজি ও ইমেজিং সেন্টার
      \n\nফিল্টার সুবিধা:
      \n- চিকিৎসকের বিশেষত্ব অনুযায়ী
      \n- এলাকা অনুযায়ী
      \n- পরামর্শ ফি অনুযায়ী
      \n- সময়সূচি অনুযায়ী`;
    }

    // Blood donation
    if (
      lowerInput.includes('রক্ত') ||
      lowerInput.includes('blood') ||
      lowerInput.includes('রক্তদাতা') ||
      lowerInput.includes('donor')
    ) {
      return `রক্তদান সেবা:
      \n🩸 সকল রক্তের গ্রুপের দাতা উপলব্ধ
      \n📱 জরুরি যোগাযোগ নম্বর
      \n📍 এলাকাভিত্তিক রক্তদাতা খোঁজ
      \n⏰ ২৴/৭ জরুরি সেবা
      \n\nরক্তের গ্রুপ: A+, A-, B+, B-, AB+, AB-, O+, O-
      \n\nজরুরি প্রয়োজনে সরাসরি যোগাযোগ করুন!`;
    }

    // Transportation
    if (
      lowerInput.includes('গাড়ি') ||
      lowerInput.includes('car') ||
      lowerInput.includes('ভাড়া') ||
      lowerInput.includes('rent') ||
      lowerInput.includes('বাস') ||
      lowerInput.includes('bus')
    ) {
      return `পরিবহন সেবা:
      \n🚗 গাড়ি ভাড়া: প্রাইভেট কার, মাইক্রোবাস
      \n🚌 বাস সূচি: ধুনট থেকে সকল গন্তব্য
      \n🚂 ট্রেন সূচি: রেল সময়সূচি
      \n🏍️ মোটরসাইকেল ভাড়া
      \n\nবিশেষ সুবিধা:
      \n- দৈনিক/মাসিক ভাড়া
      \n- AC/Non-AC গাড়ি
      \n- অভিজ্ঞ চালক
      \n- নিরাপদ যাত্রা`;
    }

    // Education
    if (
      lowerInput.includes('শিক্ষা') ||
      lowerInput.includes('education') ||
      lowerInput.includes('স্কুল') ||
      lowerInput.includes('school') ||
      lowerInput.includes('কলেজ') ||
      lowerInput.includes('college')
    ) {
      return `শিক্ষা সেবা:
      \n🏫 শিক্ষা প্রতিষ্ঠান: স্কুল, কলেজ, মাদ্রাসা
      \n👨‍🏫 শিক্ষক: বিষয়ভিত্তিক শিক্ষক তালিকা
      \n📚 ট্রেনিং সেন্টার: কম্পিউটার, ভাষা প্রশিক্ষণ
      \n🎓 কোচিং সেন্টার
      \n\nশিক্ষার স্তর:
      \n- প্রাথমিক শিক্ষা
      \n- মাধ্যমিক শিক্ষা
      \n- উচ্চ মাধ্যমিক
      \n- কারিগরি শিক্ষা`;
    }

    // Jobs
    if (
      lowerInput.includes('চাকরি') ||
      lowerInput.includes('job') ||
      lowerInput.includes('কাজ') ||
      lowerInput.includes('work')
    ) {
      return `চাকরির সুযোগ:
      \n💼 স্থানীয় চাকরির বিজ্ঞপ্তি
      \n🏢 সরকারি চাকরি
      \n🏪 প্রাইভেট কোম্পানি
      \n🏭 কারখানা ও উৎপাদন
      \n👷 দিনমজুর
      \n\nচাকরির ক্ষেত্র:
      \n- অফিস সহায়ক
      \n- বিক্রয় প্রতিনিধি
      \n- কারিগরি কাজ
      \n- গৃহস্থালি কাজ`;
    }

    // Government services
    if (
      lowerInput.includes('সরকারি') ||
      lowerInput.includes('government') ||
      lowerInput.includes('পৌরসভা') ||
      lowerInput.includes('municipality') ||
      lowerInput.includes('থানা') ||
      lowerInput.includes('police')
    ) {
      return `সরকারি সেবা:
      \n🏛️ পৌরসভা: নাগরিক সেবা
      \n👮 থানা: আইন শৃঙ্খলা
      \n⚡ বিদ্যুৎ অফিস: বিদ্যুৎ সংযোগ ও বিল
      \n🏦 ব্যাংক: সরকারি ব্যাংক শাখা
      \n📋 বিভিন্ন সার্টিফিকেট সেবা
      \n\nজরুরি নম্বর:
      \n- জাতীয় জরুরি সেবা: ৯৯৯
      \n- ফায়ার সার্ভিস: ১৯৯
      \n- পুলিশ: ১০০`;
    }

    // Shopping and business
    if (
      lowerInput.includes('কেনাবেচা') ||
      lowerInput.includes('shop') ||
      lowerInput.includes('বাজার') ||
      lowerInput.includes('market') ||
      lowerInput.includes('ব্যবসা') ||
      lowerInput.includes('business')
    ) {
      return `কেনাবেচা ও ব্যবসা:
      \n🛒 আজকের বাজার: দৈনিক দাম তালিকা
      \n🏪 স্থানীয় দোকানপাট
      \n👔 উদ্যোক্তা: ব্যবসায়িক তথ্য
      \n🌱 নার্সারি: গাছপালা ও ফুল
      \n🔧 মিস্ত্রি: বিভিন্ন কারিগরি সেবা
      \n\nবিশেষ সুবিধা:
      \n- হোম ডেলিভারি
      \n- পাইকারি ও খুচরা দাম
      \n- অর্ডার বুকিং`;
    }

    // Basic greetings
    if (
      lowerInput.includes('হ্যালো') ||
      lowerInput.includes('hello') ||
      lowerInput.includes('হাই') ||
      lowerInput.includes('hi') ||
      lowerInput.includes('সালাম') ||
      lowerInput.includes('সালামুয়ালাইকুম')
    ) {
      return `আসসালামু আলাইকুম! 👋
      \nধুনট.অ্যাপে আপনাকে স্বাগতম!
      \n\nআমি আপনার ডিজিটাল সহায়ক। আমি সাহায্য করতে পারি:
      \n• স্থানীয় সেবা খুঁজে পেতে
      \n• যোগাযোগের তথ্য জানতে
      \n• বিভিন্ন ক্যাটাগরি সম্পর্কে জানতে
      \n• জরুরি সেবা নিতে
      \n\nকী জানতে চান?`;
    }

    // Thank you responses
    if (
      lowerInput.includes('ধন্যবাদ') ||
      lowerInput.includes('thank') ||
      lowerInput.includes('thanks') ||
      lowerInput.includes('শুকরিয়া')
    ) {
      return `আপনাকেও ধন্যবাদ! 🙏
      \nধুনট.অ্যাপ আপনার সেবায় সবসময় প্রস্তুত।
      \nআরও কোন সাহায্য প্রয়োজন হলে জানাবেন।
      \n\nধুনট উপজেলার উন্নয়নে আমরা প্রতিশ্রুতিবদ্ধ! 🌟`;
    }

    // How to use the app
    if (
      lowerInput.includes('কিভাবে') ||
      lowerInput.includes('how') ||
      lowerInput.includes('ব্যবহার') ||
      lowerInput.includes('use') ||
      lowerInput.includes('help')
    ) {
      return `ধুনট.অ্যাপ ব্যবহারের নিয়ম:
      \n📱 হোম পেজ:
      \n• ক্যাটাগরি দেখুন (৩৫+ ধরনের সেবা)
      \n• সার্চ বক্স ব্যবহার করুন
      \n• নোটিশ মার্কি দেখুন
      \n\n🔍 সেবা খোঁজার পদ্ধতি:
      \n• ক্যাটাগরিতে ক্লিক করুন
      \n• ফিল্টার ব্যবহার করুন
      \n• প্রয়োজনীয় তথ্য দেখুন
      \n• সরাসরি যোগাযোগ করুন
      \n\n💡 টিপস: নিয়মিত অ্যাপ চেক করুন নতুন সেবার জন্য!`;
    }

    // Contact information
    if (
      lowerInput.includes('যোগাযোগ') ||
      lowerInput.includes('contact') ||
      lowerInput.includes('ফোন') ||
      lowerInput.includes('phone') ||
      lowerInput.includes('ইমেইল') ||
      lowerInput.includes('email')
    ) {
      return `যোগাযোগ করুন:
      \n📞 হটলাইন: ০১৭১২৫২৫৯১০
      \n📧 ইমেইল: ridoan.zisan@gmail.com
      \n🌐 ওয়েবসাইট: dhunat.app
      \n📍 ঠিকানা: ধুনট, বগুড়া
      \n\n💬 ফিডব্যাক ও পরামর্শ:
      \n• "আমার অ্যাপ" পেজে যান
      \n• যোগাযোগ ফর্ম পূরণ করুন
      \n• আপনার মতামত জানান
      \n\nআমরা আপনার মতামতকে গুরুত্ব দিই! 🤝`;
    }

    // Emergency services
    if (
      lowerInput.includes('জরুরি') ||
      lowerInput.includes('emergency') ||
      lowerInput.includes('এম্বুলেন্স') ||
      lowerInput.includes('ambulance') ||
      lowerInput.includes('ফায়ার') ||
      lowerInput.includes('fire')
    ) {
      return `🚨 জরুরি সেবা:
      \n📞 জাতীয় জরুরি সেবা: ৯৯৯
      \n🚑 এম্বুলেন্স: ১০২
      \n👮 পুলিশ: ১০০
      \n🚒 ফায়ার সার্ভিস: ১৯৯
      \n\n🏥 স্থানীয় জরুরি সেবা:
      \n• হাসপাতাল ও ক্লিনিক
      \n• রক্তদাতা তালিকা
      \n• ডাক্তারের জরুরি নম্বর
      \n\n⚠️ জরুরি অবস্থায় প্রথমে ৯৯৯ নম্বরে কল করুন!`;
    }

    return null;
  };

  useEffect(() => {
    if (isChatOpen) {
      inputRef.current?.focus();
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

    // Get constant reply
    const response = getConstantReply(userMessage.content) || 
      'দুঃখিত, এই বিষয়ে আমার কাছে তথ্য নেই। অনুগ্রহ করে অন্য কিছু জিজ্ঞাসা করুন অথবা "সাহায্য" লিখুন।';

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
      inputRef.current?.focus();
    }, 800);
  };

  // Modern chat icon component
  const ChatIcon = ({ size = 24, className = '' }) => (
    <MessageCircle 
      size={size} 
      className={`${className}`}
    />
  );

  return (
    <div
      className="fixed bottom-4 right-4 flex flex-col items-end gap-2 z-50"
      ref={containerRef}
    >
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
        title="চ্যাট করুন"
        style={{
          boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)'
        }}
      >
        <ChatIcon size={20} className="sm:w-6 sm:h-6" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      </button>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed inset-0 sm:relative sm:inset-auto sm:bottom-0 sm:right-0 sm:w-80 lg:w-96 bg-white rounded-none sm:rounded-xl shadow-2xl z-50 flex flex-col max-h-screen sm:max-h-[500px] border-0 sm:border border-gray-200">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 sm:p-4 rounded-none sm:rounded-t-xl flex justify-between items-center border-b border-blue-500">
            <div className="flex items-center gap-3">
              <div className="relative">
                <ChatIcon className="w-6 h-6" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h2 className="font-bold text-lg">ধুনট সহায়ক</h2>
                <p className="text-xs text-blue-100">অনলাইন</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
              aria-label="চ্যাট বন্ধ করুন"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center mt-8">
                <div className="mb-4">
                  <ChatIcon className="w-12 h-12 mx-auto text-blue-500" />
                </div>
                <p className="text-xl font-medium text-gray-800">স্বাগতম! 👋</p>
                <p className="text-gray-600 mt-2 text-sm">
                  ধুনট.অ্যাপ সম্পর্কে যেকোনো প্রশ্ন করুন
                </p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={() => setInput('সেবা')}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs hover:bg-blue-200 transition-colors"
                  >
                    সেবাসমূহ
                  </button>
                  <button
                    onClick={() => setInput('যোগাযোগ')}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs hover:bg-green-200 transition-colors"
                  >
                    যোগাযোগ
                  </button>
                  <button
                    onClick={() => setInput('ব্যবহার')}
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs hover:bg-purple-200 transition-colors"
                  >
                    কিভাবে ব্যবহার করবেন
                  </button>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-2 ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' 
                      ? 'bg-blue-500' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-500'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <ChatIcon size={16} className="text-white" />
                  )}
                </div>
                <div
                  className={`rounded-2xl px-3 py-2 max-w-[85%] sm:max-w-[75%] ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </p>
                  <p className={`text-xs mt-1 ${
                    message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {format(message.timestamp, 'h:mm a')}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <ChatIcon size={16} className="text-white" />
                </div>
                <div className="bg-white rounded-2xl px-3 py-2 border border-gray-200">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="border-t border-gray-200 p-3 sm:p-4 bg-white rounded-none sm:rounded-b-xl">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="আপনার প্রশ্ন লিখুন..."
                disabled={isLoading}
                className="flex-1 rounded-full bg-gray-100 border-0 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-3 py-2 hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 shadow-md hover:shadow-lg"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-2 text-center">
              ধুনট.অ্যাপ আপনার সেবায় ২৪/৭
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChat;
