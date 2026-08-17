import React from 'react';
import { Bell, ThumbsUp, MessageSquare, Briefcase, UserPlus, Sparkles } from 'lucide-react';

export const NotificationsView: React.FC = () => {
  const notifications = [
    {
      id: 'n1',
      icon: ThumbsUp,
      iconBg: 'bg-blue-100 text-[#0A66C2]',
      title: 'Priya Mehta and 24 others liked your comment on Stripe zero-downtime database migrations.',
      timeAgo: '45m ago',
      isUnread: true
    },
    {
      id: 'n2',
      icon: Briefcase,
      iconBg: 'bg-emerald-100 text-emerald-700',
      title: '3 new Senior Software Engineer roles match your preference in San Francisco, CA.',
      timeAgo: '2h ago',
      isUnread: true
    },
    {
      id: 'n3',
      icon: UserPlus,
      iconBg: 'bg-purple-100 text-purple-700',
      title: 'Alexander Wright (VP of Product at Figma) sent you a connection invitation.',
      timeAgo: '5h ago',
      isUnread: false
    },
    {
      id: 'n4',
      icon: MessageSquare,
      iconBg: 'bg-amber-100 text-amber-800',
      title: 'Daniel Svensson commented on Marcus Chen\'s design tokens post.',
      timeAgo: '1d ago',
      isUnread: false
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#0A66C2]" />
            <span>Notifications</span>
          </h2>
          <button className="text-xs font-semibold text-[#0A66C2] hover:underline">
            Mark all as read
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {notifications.map((notif) => {
            const Icon = notif.icon;
            return (
              <div
                key={notif.id}
                className={`p-4 flex items-start gap-3 transition-colors hover:bg-slate-50 cursor-pointer ${
                  notif.isUnread ? 'bg-blue-50/40' : ''
                }`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${notif.iconBg}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-slate-800 leading-snug">
                    {notif.title}
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">{notif.timeAgo}</span>
                </div>
                {notif.isUnread && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0A66C2] shrink-0 self-center" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
