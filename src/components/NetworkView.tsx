import React from 'react';
import { ConnectionCandidate, UserProfile } from '../types';
import { Users, UserPlus, Plus, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface NetworkViewProps {
  user: UserProfile;
  connections: ConnectionCandidate[];
  onToggleConnect: (id: string) => void;
}

export const NetworkView: React.FC<NetworkViewProps> = ({
  user,
  connections,
  onToggleConnect,
}) => {
  return (
    <div className="max-w-[1024px] mx-auto p-3 sm:p-4 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
      {/* Left Sidebar Info */}
      <div className="md:col-span-4 bg-white rounded-lg border border-gray-200 p-4 space-y-3 h-fit">
        <h2 className="font-bold text-slate-900 text-sm">Manage my network</h2>
        <div className="space-y-2 text-xs text-slate-700 font-semibold">
          <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded cursor-pointer">
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-500" />
              <span>Connections</span>
            </span>
            <span className="text-slate-500">{user.connectionsCount}</span>
          </div>
          <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded cursor-pointer">
            <span className="flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-slate-500" />
              <span>Pending Invitations</span>
            </span>
            <span className="bg-blue-100 text-[#0A66C2] px-2 py-0.5 rounded-full font-bold">2</span>
          </div>
        </div>
      </div>

      {/* Main Connection Invitations & Recommendations */}
      <div className="md:col-span-8 space-y-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">Pending Invitations (2)</h3>
            <button className="text-xs font-semibold text-[#0A66C2] hover:underline">See all 2</button>
          </div>

          <div className="divide-y divide-slate-100">
            <div className="py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
                  alt="Alexander Wright"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">Alexander Wright</h4>
                  <p className="text-[11px] text-slate-500">VP of Product at Figma</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">41 mutual connections</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert('Invitation ignored.')}
                  className="px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-full"
                >
                  Ignore
                </button>
                <button
                  onClick={() => alert('Accepted connection!')}
                  className="px-4 py-1 text-xs font-semibold text-[#0A66C2] border border-[#0A66C2] hover:bg-blue-50 rounded-full"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended connections grid */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <h3 className="font-bold text-slate-900 text-sm mb-3">People in Tech you may follow</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {connections.map((candidate) => (
              <div key={candidate.id} className="border border-slate-200 rounded-lg p-3 text-center flex flex-col items-center justify-between bg-white hover:shadow-sm transition-shadow">
                <img
                  src={candidate.avatar}
                  alt={candidate.name}
                  className="w-16 h-16 rounded-full object-cover mb-2 border border-slate-200"
                />
                <h4 className="font-bold text-slate-900 text-xs line-clamp-1">{candidate.name}</h4>
                <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5">{candidate.title}</p>
                <p className="text-[10px] text-slate-400 mt-1 mb-3">{candidate.mutualConnections} mutuals</p>

                <button
                  onClick={() => onToggleConnect(candidate.id)}
                  className={`w-full py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    candidate.status === 'connected'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : candidate.status === 'pending'
                      ? 'bg-slate-100 text-slate-600 border-slate-300'
                      : 'border-[#0A66C2] text-[#0A66C2] hover:bg-blue-50'
                  }`}
                >
                  {candidate.status === 'connected' ? 'Connected' : candidate.status === 'pending' ? 'Pending' : '+ Connect'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
