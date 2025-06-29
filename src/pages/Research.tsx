import React, { useState } from 'react';
import { ArrowLeft, Calendar, BookOpen, User } from 'lucide-react';
import { researchPosts } from '../data/researchData';

interface ResearchProps {
  language: 'en' | 'bn';
  onBack: () => void;
}

const Research: React.FC<ResearchProps> = ({ language }) => {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(researchPosts.map(post => post.category[language])))];

  const filteredPosts = researchPosts.filter(post => {
    const matchesSearch = post.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content[language].toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category[language] === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedPostData = selectedPost 
    ? researchPosts.find(post => post.id === selectedPost)
    : null;

  if (selectedPostData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            {language === 'bn' ? 'ফিরে যান' : 'Back to Research'}
          </button>

          <article className="bg-white rounded-xl shadow-sm p-8">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {selectedPostData.category[language]}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {selectedPostData.title[language]}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8">
              <div className="flex items-center gap-1">
                <User size={16} />
                {selectedPostData.author[language]}
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                {new Date(selectedPostData.date).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US')}
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {selectedPostData.content[language]}
              </p>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'bn' ? '🔬 গবেষণা' : '🔬 Research'}
          </h1>
          <p className="text-gray-600 text-lg">
            {language === 'bn' 
              ? 'ইসলামিক শিক্ষা ও আধুনিক বিজ্ঞানের সমন্বয়' 
              : 'Integration of Islamic education and modern science'
            }
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder={language === 'bn' ? 'গবেষণা খুঁজুন...' : 'Search research...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[200px]"
          >
            <option value="all">
              {language === 'bn' ? 'সব ক্যাটাগরি' : 'All Categories'}
            </option>
            {categories.slice(1).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post.id)}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer p-6 border border-gray-100"
            >
              <div className="mb-3">
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                  {post.category[language]}
                </span>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                {post.title[language]}
              </h2>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.content[language].substring(0, 120)}...
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(post.date).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US')}
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen size={14} />
                  {language === 'bn' ? 'পড়ুন' : 'Read'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {language === 'bn' ? 'কোন গবেষণা পোস্ট পাওয়া যায়নি' : 'No research posts found'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Research;
