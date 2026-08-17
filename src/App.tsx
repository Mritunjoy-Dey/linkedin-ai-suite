import React, { useState } from 'react';
import { NavTab, Story, Post, ConnectionCandidate, JobListing, Conversation } from './types';
import {
  CURRENT_USER,
  INITIAL_STORIES,
  INITIAL_POSTS,
  INITIAL_CONNECTIONS,
  INITIAL_JOBS,
  INITIAL_CONVERSATIONS,
  NEWS_ITEMS
} from './mockData';
import { Navbar } from './components/Navbar';
import { FeedView } from './components/FeedView';
import { MessagingView } from './components/MessagingView';
import { JobsView } from './components/JobsView';
import { NetworkView } from './components/NetworkView';
import { NotificationsView } from './components/NotificationsView';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [currentUser] = useState(CURRENT_USER);
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [connections, setConnections] = useState<ConnectionCandidate[]>(INITIAL_CONNECTIONS);
  const [jobs, setJobs] = useState<JobListing[]>(INITIAL_JOBS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobIdForJobsTab, setSelectedJobIdForJobsTab] = useState<string | undefined>(undefined);

  // 1. Mark Story as Seen
  const handleMarkStorySeen = (storyId: string) => {
    setStories(prev => prev.map(s => s.id === storyId ? { ...s, isSeen: true } : s));
  };

  // 2. Add New Story
  const handleAddStory = (newStory: Story) => {
    setStories(prev => [prev[0], newStory, ...prev.slice(1)]);
  };

  // 3. Add New Post
  const handleAddPost = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
  };

  // 4. Toggle Like on Post
  const handleToggleLike = (postId: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likesCount: isLiked ? p.likesCount + 1 : p.likesCount - 1
          };
        }
        return p;
      })
    );
  };

  // 5. Add Comment to Post
  const handleAddComment = (postId: string, commentText: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const newComment = {
            id: `c_${Date.now()}`,
            authorName: currentUser.name,
            authorAvatar: currentUser.avatar,
            authorTitle: currentUser.title,
            text: commentText,
            timestamp: 'Just now',
            likesCount: 0
          };
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            comments: [newComment, ...p.comments]
          };
        }
        return p;
      })
    );
  };

  // 6. Toggle Connect Status
  const handleToggleConnect = (candidateId: string) => {
    setConnections(prev =>
      prev.map(c => {
        if (c.id === candidateId) {
          const nextStatus = c.status === 'none' ? 'pending' : c.status === 'pending' ? 'connected' : 'none';
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  // 7. Toggle Save Job
  const handleToggleSaveJob = (jobId: string) => {
    setJobs(prev =>
      prev.map(j => (j.id === jobId ? { ...j, isSaved: !j.isSaved } : j))
    );
  };

  // 8. Send Message with Simulated Recipient or LinkedIn AI Reply
  const handleSendMessage = (conversationId: string, text: string) => {
    const isAiConv = conversationId === 'conv_ai';
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage = {
      id: `m_${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      text,
      timestamp,
      isUser: true
    };

    setConversations(prev =>
      prev.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            lastMessage: text,
            lastMessageTime: timestamp,
            messages: [...conv.messages, newMessage]
          };
        }
        return conv;
      })
    );

    // Auto-reply handling
    setTimeout(() => {
      let autoReplyText = '';

      if (isAiConv) {
        const lower = text.toLowerCase();
        if (lower.includes('24') || lower.includes('tech') || lower.includes('happened')) {
          autoReplyText = `🌐 **LinkedIn AI Search Results (Last 24 Hours in Tech)**\n\nHere are the top stories & company updates trending across the web & LinkedIn network in the last 24 hours:\n\n1. 🚀 **OpenAI GPT-4.5 Reasoning Engine Released**: OpenAI announced new zero-shot API endpoints optimized for multi-file workspace execution and complex coding agents, dropping latency by 35%.\n\n2. 💳 **Stripe AI Agent Checkout**: Stripe shipped an autonomous payment protocol enabling verified AI agents to process SaaS subscriptions with end-to-end security.\n\n3. 🧠 **Anthropic Claude 3.7 Thinking Budget**: Anthropic added custom thinking budget sliders to Claude 3.7, giving developers control over reasoning depth vs. API response speed.\n\n4. 🛡️ **Cloudflare Global Infra Upgrade**: Cloudflare SRE teams completed an edge routing overhaul, cutting global p99 latency by 22%.\n\n📌 *Network Signal*: 480+ professionals in your Bay Area network liked or reposted updates on these topics in the last 12 hours.`;
        } else if (lower.includes('launch') || lower.includes('ai') || lower.includes('model')) {
          autoReplyText = `🤖 **LinkedIn AI Search Results (New AI Launches in the Last Month)**\n\nSynthesis of major frontier models, tools, and developer frameworks launched over the past 30 days:\n\n1. ⚡ **Claude 3.7 Hybrid Reasoning (Anthropic)**: Hybrid model capable of instantaneous response mode and deep, step-by-step reasoning for algorithm design.\n\n2. ☁️ **Gemini 2.5 Flash (Google Cloud)**: Built for sub-50ms context window reasoning and native tool invocation in enterprise agent pipelines.\n\n3. 🔎 **Deep Research Agent (OpenAI)**: Autonomous agent that navigates 100+ web documents to generate structured technical reports.\n\n4. ⚡ **Notion AI Automations**: Auto-generates summaries, task updates, and document specs directly from database events.\n\n📌 *Sources*: Verified posts from @OpenAI, @Anthropic, @GoogleCloud, and tech publications index.`;
        } else if (lower.includes('google') || lower.includes('feature')) {
          autoReplyText = `🔍 **LinkedIn AI Search Results (New Features Updated by Google Last Month)**\n\nRecent product releases and platform updates rolled out by Google across Cloud, Workspace, and Developer platforms:\n\n1. ⚡ **Gemini 2.5 Flash in Vertex AI**: Released with ultra-fast inference and built-in function calling for enterprise web applications.\n\n2. 📦 **Cloud Run One-Click Agent Orchestration**: Host and auto-scale containerized AI agents with zero server management overhead.\n\n3. 📄 **Google Workspace Gemini Sidepanel**: Deep integration across Drive, Docs, and Sheets for instant document synthesis and formula drafting.\n\n4. 🗺️ **Google Maps Places API (New)**: Grounded spatial awareness data for AI agents, including real-time operational status and accessibility metrics.\n\n📌 *LinkedIn Database Signal*: 32 Google engineers in your extended network shared detailed breakdowns of these launches.`;
        } else {
          autoReplyText = `🔍 **LinkedIn AI Grounded Answer for: "${text}"**\n\nI searched across the live web and LinkedIn's network graph to synthesize key details:\n\n• **Primary Insight**: Current industry consensus highlights rapid adoption of modern agentic workflows, serverless backend runtimes, and design token automation.\n• **Network Activity**: 18+ posts and 240+ verified tech leaders in your network discussed topics related to your prompt recently.\n• **Key Recommendation**: You can view detailed company stories under the "Top Pick" and "Tech" story categories in your Messaging header!\n\n📌 *Sources*: Web Search Index & LinkedIn Professional Graph Data.`;
        }
      } else {
        const replies = [
          "Thanks for the message, Mritunjoy! Let's follow up on this soon.",
          "That sounds great! Looking forward to collaborating.",
          "Got it! I will review the spec and get back to you shortly."
        ];
        autoReplyText = replies[Math.floor(Math.random() * replies.length)];
      }

      const replyTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setConversations(prev =>
        prev.map(conv => {
          if (conv.id === conversationId) {
            const autoMsg = {
              id: `m_reply_${Date.now()}`,
              senderId: conv.participantId,
              senderName: conv.participantName,
              senderAvatar: conv.participantAvatar,
              text: autoReplyText,
              timestamp: replyTimestamp,
              isUser: false,
              isAi: isAiConv
            };
            return {
              ...conv,
              lastMessage: autoReplyText.split('\n')[0],
              lastMessageTime: replyTimestamp,
              messages: [...conv.messages, autoMsg]
            };
          }
          return conv;
        })
      );
    }, isAiConv ? 800 : 1200);
  };

  const unreadMessagesCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <div className="min-h-screen bg-[#F4F2EE] text-slate-900 font-sans flex flex-col">
      {/* Sticky Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={currentUser}
        unreadMessagesCount={unreadMessagesCount}
        unreadNotificationsCount={2}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Tab Views */}
      <div className="flex-1">
        {activeTab === 'home' && (
          <FeedView
            currentUser={currentUser}
            stories={stories}
            posts={posts}
            connections={connections}
            jobs={jobs}
            news={NEWS_ITEMS}
            searchQuery={searchQuery}
            onMarkStorySeen={handleMarkStorySeen}
            onAddStory={handleAddStory}
            onAddPost={handleAddPost}
            onToggleLike={handleToggleLike}
            onAddComment={handleAddComment}
            onToggleConnect={handleToggleConnect}
            onToggleSaveJob={handleToggleSaveJob}
            onNavigateJobsTab={() => setActiveTab('jobs')}
          />
        )}

        {activeTab === 'network' && (
          <NetworkView
            user={currentUser}
            connections={connections}
            onToggleConnect={handleToggleConnect}
          />
        )}

        {activeTab === 'jobs' && (
          <JobsView
            currentUser={currentUser}
            jobs={jobs}
            onToggleSaveJob={handleToggleSaveJob}
            selectedJobIdFromParent={selectedJobIdForJobsTab}
          />
        )}

        {activeTab === 'messaging' && (
          <MessagingView
            currentUser={currentUser}
            conversations={conversations}
            onSendMessage={handleSendMessage}
          />
        )}

        {activeTab === 'notifications' && (
          <NotificationsView />
        )}
      </div>
    </div>
  );
}
