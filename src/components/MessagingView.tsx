import React, { useState } from 'react';
import {
  Search,
  MoreHorizontal,
  Send,
  Paperclip,
  Image as ImageIcon,
  Smile,
  Video,
  Star,
  CheckCheck,
  Edit,
  Sparkles,
  Globe,
  Bot,
  Zap,
  Compass,
  ArrowRight
} from 'lucide-react';
import { Conversation, Message, UserProfile } from '../types';
import { CategoryStoriesBar } from './CategoryStoriesBar';
import { MESSAGING_CATEGORY_STORIES } from '../mockData';

interface MessagingViewProps {
  currentUser: UserProfile;
  conversations: Conversation[];
  onSendMessage: (conversationId: string, text: string) => void;
}

export const MessagingView: React.FC<MessagingViewProps> = ({
  currentUser,
  conversations,
  onSendMessage,
}) => {
  const [selectedConvId, setSelectedConvId] = useState<string>(conversations[0]?.id || 'conv_ai');
  const [filterTab, setFilterTab] = useState<'all' | 'unread' | 'starred'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [isSearchingAi, setIsSearchingAi] = useState(false);

  const activeConv = conversations.find(c => c.id === selectedConvId) || conversations[0];

  const filteredConversations = conversations.filter(c => {
    if (filterTab === 'unread' && c.unreadCount === 0) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.participantName.toLowerCase().includes(q) ||
        c.participantCompany.toLowerCase().includes(q) ||
        c.lastMessage.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSend = (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || !activeConv) return;

    if (activeConv.id === 'conv_ai' || activeConv.participantId === 'user_linkedin_ai') {
      setIsSearchingAi(true);
      onSendMessage(activeConv.id, textToSend);
      setInputMessage('');

      setTimeout(() => {
        setIsSearchingAi(false);
      }, 1000);
    } else {
      onSendMessage(activeConv.id, textToSend);
      setInputMessage('');
    }
  };

  const handleOpenAiWithQuery = (query: string) => {
    setSelectedConvId('conv_ai');
    handleSend(undefined, query);
  };

  const quickPrompts = [
    {
      label: '⚡ Last 24h in tech',
      query: 'Update me what happened in the last 24 in tech.'
    },
    {
      label: '🤖 New launches in AI',
      query: 'What are the new launches in AI in the last month?'
    },
    {
      label: '🔍 Google updates',
      query: 'What are the new features updated by Google in the last month?'
    }
  ];

  return (
    <div className="max-w-[1024px] mx-auto p-3 sm:p-4 space-y-3">
      {/* 1. Category Stories Bar above the Chat */}
      <CategoryStoriesBar
        categories={MESSAGING_CATEGORY_STORIES}
        onOpenAiQuery={handleOpenAiWithQuery}
      />

      {/* 2. Main Messaging Box */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px] h-[calc(100vh-220px)] shadow-xs">
        
        {/* Left Pane: Conversations List (4 cols) */}
        <div className="md:col-span-5 lg:col-span-4 border-r border-slate-200 flex flex-col h-full bg-white">
          {/* Header */}
          <div className="p-3 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <span>Messaging</span>
            </h2>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600" title="New message">
                <Edit className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="p-2.5 border-b border-slate-100 bg-slate-50">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 pl-9 pr-3 py-1.5 rounded-md border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-[#0A66C2]"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 mt-2 text-xs">
              <button
                onClick={() => setFilterTab('all')}
                className={`px-2.5 py-1 rounded-full font-medium transition-colors ${
                  filterTab === 'all' ? 'bg-[#0A66C2] text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterTab('unread')}
                className={`px-2.5 py-1 rounded-full font-medium transition-colors ${
                  filterTab === 'unread' ? 'bg-[#0A66C2] text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                Unread
              </button>
            </div>
          </div>

          {/* Conversations Scrollable List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredConversations.map((conv) => {
              const isSelected = conv.id === activeConv?.id;
              const isAiConv = conv.id === 'conv_ai' || conv.participantId === 'user_linkedin_ai';

              return (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConvId(conv.id)}
                  className={`p-3 flex items-start gap-3 cursor-pointer transition-colors hover:bg-slate-50 relative ${
                    isSelected
                      ? isAiConv
                        ? 'bg-blue-50/90 border-l-4 border-indigo-600'
                        : 'bg-blue-50/70 border-l-4 border-[#0A66C2]'
                      : isAiConv
                      ? 'bg-gradient-to-r from-blue-50/50 via-indigo-50/30 to-transparent'
                      : ''
                  }`}
                >
                  {/* Avatar + Status Indicator */}
                  <div className="relative shrink-0">
                    {isAiConv ? (
                      <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#0A66C2] via-indigo-600 to-purple-600 p-0.5 shadow-xs flex items-center justify-center">
                        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white">
                          <Sparkles className="w-5 h-5 text-sky-400 animate-pulse" />
                        </div>
                      </div>
                    ) : (
                      <img
                        src={conv.participantAvatar}
                        alt={conv.participantName}
                        className="w-11 h-11 rounded-full object-cover border border-slate-200"
                      />
                    )}

                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        isAiConv
                          ? 'bg-sky-400'
                          : conv.onlineStatus === 'online'
                          ? 'bg-emerald-500'
                          : conv.onlineStatus === 'away'
                          ? 'bg-amber-400'
                          : 'bg-slate-300'
                      }`}
                    />
                  </div>

                  {/* Conv Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-xs sm:text-sm truncate flex items-center gap-1.5 ${
                        conv.unreadCount > 0 ? 'font-bold text-slate-900' : 'font-semibold text-slate-800'
                      }`}>
                        <span>{conv.participantName}</span>
                        {isAiConv && (
                          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                            AI
                          </span>
                        )}
                      </h3>
                      <span className="text-[10px] text-slate-400 shrink-0 ml-1">
                        {conv.lastMessageTime}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {conv.participantTitle} · {conv.participantCompany}
                    </p>

                    <p className={`text-xs truncate mt-1 ${conv.unreadCount > 0 ? 'font-semibold text-slate-900' : 'text-slate-500'}`}>
                      {conv.lastMessage}
                    </p>
                  </div>

                  {/* Unread Badge */}
                  {conv.unreadCount > 0 && (
                    <span className="bg-[#0A66C2] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shrink-0 self-center">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Pane: Active Message Thread (8 cols) */}
        {activeConv ? (
          <div className="md:col-span-7 lg:col-span-8 flex flex-col h-full bg-slate-50/50">
            {/* Thread Header */}
            <div className="p-3 bg-white border-b border-slate-200 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-3">
                {activeConv.id === 'conv_ai' || activeConv.participantId === 'user_linkedin_ai' ? (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0A66C2] via-indigo-600 to-purple-600 p-0.5 shadow-xs">
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white">
                      <Sparkles className="w-5 h-5 text-sky-400" />
                    </div>
                  </div>
                ) : (
                  <img
                    src={activeConv.participantAvatar}
                    alt={activeConv.participantName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                )}

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">
                      {activeConv.participantName}
                    </h3>
                    {(activeConv.id === 'conv_ai' || activeConv.participantId === 'user_linkedin_ai') && (
                      <span className="bg-blue-100 text-[#0A66C2] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        Web & LinkedIn Search
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {activeConv.participantTitle} at {activeConv.participantCompany}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {activeConv.id !== 'conv_ai' && activeConv.participantId !== 'user_linkedin_ai' && (
                  <button
                    onClick={() => alert(`Initiating video call with ${activeConv.participantName}...`)}
                    className="p-2 rounded-full hover:bg-slate-100 text-slate-600"
                    title="Video call"
                  >
                    <Video className="w-5 h-5 text-slate-700" />
                  </button>
                )}
                <button className="p-2 rounded-full hover:bg-slate-100 text-slate-600" title="Star conversation">
                  <Star className="w-5 h-5 text-slate-400 hover:text-amber-500" />
                </button>
              </div>
            </div>

            {/* AI Assistant Banner info if activeConv is AI */}
            {(activeConv.id === 'conv_ai' || activeConv.participantId === 'user_linkedin_ai') && (
              <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-3 border-b border-blue-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>
                    Ask LinkedIn AI to search web sources, tech news, or your professional network!
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-blue-200">
                  <Zap className="w-3 h-3 text-amber-300" />
                  <span>Real-time</span>
                </div>
              </div>
            )}

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {activeConv.messages.map((msg) => {
                const isAiMsg = msg.isAi || msg.senderId === 'user_linkedin_ai';

                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!msg.isUser && (
                      isAiMsg ? (
                        <div className="w-7 h-7 rounded-full bg-slate-900 flex items-center justify-center text-sky-400 shrink-0 mb-1 border border-blue-500/30">
                          <Sparkles className="w-4 h-4" />
                        </div>
                      ) : (
                        <img
                          src={activeConv.participantAvatar}
                          alt={activeConv.participantName}
                          className="w-7 h-7 rounded-full object-cover shrink-0 mb-1"
                        />
                      )
                    )}

                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm shadow-2xs ${
                      msg.isUser
                        ? 'bg-[#0A66C2] text-white rounded-br-xs'
                        : isAiMsg
                        ? 'bg-white text-slate-800 border border-blue-200/80 rounded-bl-xs shadow-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                    }`}>
                      {/* AI Search Badge header inside message */}
                      {isAiMsg && (
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0A66C2] mb-1.5 pb-1 border-b border-slate-100">
                          <Globe className="w-3.5 h-3.5 text-blue-600" />
                          <span>LinkedIn AI Grounded Response</span>
                        </div>
                      )}

                      <p className="whitespace-pre-line leading-relaxed font-normal">{msg.text}</p>

                      <div className={`text-[10px] mt-2 flex items-center justify-end gap-1 ${
                        msg.isUser ? 'text-blue-100' : 'text-slate-400'
                      }`}>
                        <span>{msg.timestamp}</span>
                        {msg.isUser && <CheckCheck className="w-3.5 h-3.5 text-blue-200" />}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Searching State Indicator */}
              {isSearchingAi && (
                <div className="flex items-center gap-2 text-xs text-blue-700 bg-blue-50 border border-blue-200 p-2.5 rounded-xl w-fit animate-pulse">
                  <Sparkles className="w-4 h-4 text-[#0A66C2] animate-spin" />
                  <span className="font-medium">Searching web & LinkedIn database...</span>
                </div>
              )}
            </div>

            {/* Quick Prompt Suggestions when AI chat is selected */}
            {(activeConv.id === 'conv_ai' || activeConv.participantId === 'user_linkedin_ai') && (
              <div className="px-3 py-2 bg-slate-100/80 border-t border-slate-200 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
                <span className="text-[11px] font-bold text-slate-500 shrink-0 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-[#0A66C2]" />
                  Suggestions:
                </span>
                {quickPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(undefined, p.query)}
                    className="bg-white hover:bg-blue-50 text-slate-700 hover:text-[#0A66C2] border border-slate-200 hover:border-blue-300 font-medium px-2.5 py-1 rounded-full text-xs shrink-0 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>{p.label}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </button>
                ))}
              </div>
            )}

            {/* Message Input Footer */}
            <div className="p-3 bg-white border-t border-slate-200">
              <form onSubmit={(e) => handleSend(e)} className="space-y-2">
                <textarea
                  placeholder={
                    activeConv.id === 'conv_ai' || activeConv.participantId === 'user_linkedin_ai'
                      ? 'Ask LinkedIn AI anything (e.g. "24h tech updates", "Google features", "AI launches")...'
                      : 'Write a message...'
                  }
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(e);
                    }
                  }}
                  className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-hidden focus:ring-2 focus:ring-[#0A66C2] focus:bg-white resize-none min-h-[70px]"
                />

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1 text-slate-500">
                    <button type="button" className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600" title="Attach image">
                      <ImageIcon className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600" title="Attach file">
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600" title="Add emoji">
                      <Smile className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isSearchingAi}
                    className="px-4 py-1.5 bg-[#0A66C2] hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm rounded-full transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    id="send-message-btn"
                  >
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="md:col-span-7 lg:col-span-8 flex items-center justify-center p-8 text-slate-400 text-sm">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

