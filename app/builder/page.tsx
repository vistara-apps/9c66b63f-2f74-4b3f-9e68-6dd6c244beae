'use client';

import { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { ButtonPrimary } from '@/components/ButtonPrimary';
import { Upload, Link, Image, Video, Music, FileText, Plus, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContentFormData {
  title: string;
  description: string;
  contentType: 'image' | 'video' | 'audio' | 'text';
  contentUrl: string;
  embedUrl?: string;
}

export default function BuilderPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'content'>('profile');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contentForm, setContentForm] = useState<ContentFormData>({
    title: '',
    description: '',
    contentType: 'image',
    contentUrl: '',
    embedUrl: '',
  });

  const contentTypes = [
    { id: 'image', label: 'Image', icon: Image },
    { id: 'video', label: 'Video', icon: Video },
    { id: 'audio', label: 'Audio', icon: Music },
    { id: 'text', label: 'Text', icon: FileText },
  ];

  const handleContentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contentForm.title || !contentForm.description || !contentForm.contentUrl) return;

    setIsSubmitting(true);
    try {
      // Simulate content creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Content published successfully!');
      setContentForm({
        title: '',
        description: '',
        contentType: 'image',
        contentUrl: '',
        embedUrl: '',
      });
    } catch (error) {
      console.error('Content creation failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppShell currentPage="builder">
      <div className="container py-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Builder Mode</h1>
          <p className="text-text/70">
            Create and manage your content to earn tips from your audience
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 bg-surface rounded-lg p-1">
          {[
            { id: 'profile', label: 'Profile Setup' },
            { id: 'content', label: 'Create Content' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                'flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-text/60 hover:text-text'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Setup Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="glass-effect rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Creator Profile</span>
              </h2>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Channel Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your channel name"
                    className="w-full px-3 py-2 bg-surface border border-white/10 rounded-lg text-text placeholder-text/50 focus:outline-none focus:border-primary transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Tell your audience about yourself and your content"
                    rows={3}
                    className="w-full px-3 py-2 bg-surface border border-white/10 rounded-lg text-text placeholder-text/50 focus:outline-none focus:border-primary transition-colors duration-200 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Social Links
                  </label>
                  <div className="space-y-2">
                    <input
                      type="url"
                      placeholder="https://twitter.com/yourusername"
                      className="w-full px-3 py-2 bg-surface border border-white/10 rounded-lg text-text placeholder-text/50 focus:outline-none focus:border-primary transition-colors duration-200"
                    />
                    <button
                      type="button"
                      className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add another link</span>
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <ButtonPrimary>
                    Save Profile
                  </ButtonPrimary>
                </div>
              </form>
            </div>

            {/* Wallet Connection */}
            <div className="glass-effect rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Wallet Connection</h3>
              <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
                <div>
                  <p className="font-medium">Base Wallet</p>
                  <p className="text-sm text-text/60">0x1234...5678</p>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <p className="text-sm text-text/60 mt-2">
                Your wallet is connected and ready to receive tips
              </p>
            </div>
          </div>
        )}

        {/* Create Content Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="glass-effect rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Create New Content</span>
              </h2>

              <form onSubmit={handleContentSubmit} className="space-y-4">
                {/* Content Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Content Type
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {contentTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setContentForm(prev => ({ ...prev, contentType: type.id as any }))}
                          className={cn(
                            'flex flex-col items-center space-y-2 p-3 rounded-lg border transition-colors duration-200',
                            contentForm.contentType === type.id
                              ? 'bg-primary/20 border-primary text-primary'
                              : 'bg-surface border-white/10 text-text/60 hover:text-text hover:border-white/20'
                          )}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-xs font-medium">{type.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={contentForm.title}
                    onChange={(e) => setContentForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Give your content a catchy title"
                    className="w-full px-3 py-2 bg-surface border border-white/10 rounded-lg text-text placeholder-text/50 focus:outline-none focus:border-primary transition-colors duration-200"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Description
                  </label>
                  <textarea
                    value={contentForm.description}
                    onChange={(e) => setContentForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your content and what makes it special"
                    rows={3}
                    className="w-full px-3 py-2 bg-surface border border-white/10 rounded-lg text-text placeholder-text/50 focus:outline-none focus:border-primary transition-colors duration-200 resize-none"
                    required
                  />
                </div>

                {/* Content URL */}
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Content URL
                  </label>
                  <div className="relative">
                    <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text/50" />
                    <input
                      type="url"
                      value={contentForm.contentUrl}
                      onChange={(e) => setContentForm(prev => ({ ...prev, contentUrl: e.target.value }))}
                      placeholder="https://example.com/your-content"
                      className="w-full pl-10 pr-3 py-2 bg-surface border border-white/10 rounded-lg text-text placeholder-text/50 focus:outline-none focus:border-primary transition-colors duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Embed URL (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Embed URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={contentForm.embedUrl}
                    onChange={(e) => setContentForm(prev => ({ ...prev, embedUrl: e.target.value }))}
                    placeholder="https://example.com/embed/your-content"
                    className="w-full px-3 py-2 bg-surface border border-white/10 rounded-lg text-text placeholder-text/50 focus:outline-none focus:border-primary transition-colors duration-200"
                  />
                  <p className="text-xs text-text/50 mt-1">
                    For embeddable content like YouTube videos or SoundCloud tracks
                  </p>
                </div>

                {/* Upload Alternative */}
                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-text/50 mx-auto mb-2" />
                  <p className="text-sm text-text/60 mb-2">
                    Or upload your content directly
                  </p>
                  <button
                    type="button"
                    className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
                  >
                    Choose File
                  </button>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <ButtonPrimary
                    type="submit"
                    disabled={isSubmitting || !contentForm.title || !contentForm.description || !contentForm.contentUrl}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Publishing...</span>
                      </div>
                    ) : (
                      'Publish Content'
                    )}
                  </ButtonPrimary>
                </div>
              </form>
            </div>

            {/* Tips */}
            <div className="glass-effect rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Tips for Success</h3>
              <ul className="space-y-2 text-sm text-text/70">
                <li>• Use high-quality images or thumbnails to attract viewers</li>
                <li>• Write engaging descriptions that tell a story</li>
                <li>• Share your content on social media to reach more people</li>
                <li>• Engage with your audience and respond to tips</li>
                <li>• Post consistently to build a loyal following</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
