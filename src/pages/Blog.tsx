import React, { useState } from 'react';
import { ArrowLeft, Calendar, Tag, User } from 'lucide-react';
import { blogPosts } from '../data/blogData';

interface BlogProps {
  language: 'en' | 'bn';
  onBack: () => void;
}

const Blog: React.FC<BlogProps> = ({ language, onBack }) => {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = blogPosts.filter(post =>
    post.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags[language].some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const selectedPostData = selectedPost 
    ? blogPosts.find(post => post.id === selectedPost)
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
            {language === 'bn' ? 'ফিরে যান' : 'Back to Blog'}
          </button>

          <article className="bg-white rounded-xl shadow-sm p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {selectedPostData.title[language]}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-1">
                <User size={16} />
                {selectedPostData.author[language]}
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                {new Date(selectedPostData.date).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US')}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {selectedPostData.tags[language].map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
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
            {language === 'bn' ? '📝 ব্লগ' : '📝 Blog'}
          </h1>
          <p className="text-gray-600 text-lg">
            {language === 'bn' 
              ? 'কবিতা, চিন্তাভাবনা এবং জীবনের গল্প' 
              : 'Poetry, thoughts and life stories'
            }
          </p>
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder={language === 'bn' ? 'ব্লগ খুঁজুন...' : 'Search blogs...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md mx-auto block px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post.id)}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer p-6 border border-gray-100"
            >
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
                <div className="flex flex-wrap gap-1">
                  {post.tags[language].slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {language === 'bn' ? 'কোন ব্লগ পোস্ট পাওয়া যায়নি' : 'No blog posts found'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
