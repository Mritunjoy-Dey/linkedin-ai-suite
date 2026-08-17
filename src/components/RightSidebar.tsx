import React from 'react';
import { Plus, Check, Bookmark, ArrowRight, Info, ExternalLink, Sparkles } from 'lucide-react';
import { ConnectionCandidate, JobListing, NewsItem } from '../types';

interface RightSidebarProps {
  connections: ConnectionCandidate[];
  onToggleConnect: (candidateId: string) => void;
  jobs: JobListing[];
  onToggleSaveJob: (jobId: string) => void;
  news: NewsItem[];
  onSelectJob?: (job: JobListing) => void;
  onNavigateJobsTab?: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  connections,
  onToggleConnect,
  jobs,
  onToggleSaveJob,
  news,
  onSelectJob,
  onNavigateJobsTab,
}) => {
  return (
    <aside className="space-y-3 w-full flex flex-col">
      {/* 1. LinkedIn News */}
      <div className="bg-white rounded-lg border border-gray-200 p-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">LinkedIn News</h3>
          <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        </div>
        <ul className="space-y-3">
          {news.map((item) => (
            <li key={item.id} className="cursor-pointer group">
              <p className="text-xs font-semibold text-gray-900 group-hover:underline">
                {item.title}
              </p>
              <p className="text-[10px] text-gray-500 mt-0.5">
                {item.timeAgo} • {item.readersCount.toLocaleString()} readers
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* 2. People You May Know */}
      <div className="bg-white rounded-lg border border-gray-200 p-3">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">People you may know</h3>
        <div className="space-y-4">
          {connections.map((candidate) => (
            <div key={candidate.id} className="flex items-start space-x-3">
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-semibold text-gray-900 truncate hover:underline cursor-pointer">
                  {candidate.name}
                </p>
                <p className="text-[10px] text-gray-500 truncate">{candidate.title}</p>
                <button
                  onClick={() => onToggleConnect(candidate.id)}
                  className={`mt-2 border text-xs font-semibold rounded-full px-3 py-1 w-full transition-colors cursor-pointer ${
                    candidate.status === 'connected'
                      ? 'bg-gray-100 text-gray-400 border-transparent'
                      : candidate.status === 'pending'
                      ? 'bg-gray-100 text-gray-600 border-transparent'
                      : 'border-gray-500 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {candidate.status === 'connected'
                    ? 'Connected'
                    : candidate.status === 'pending'
                    ? 'Pending'
                    : 'Connect'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Jobs For You */}
      <div className="bg-white rounded-lg border border-gray-200 p-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Recommended Jobs</h3>
          <button
            onClick={onNavigateJobsTab}
            className="text-xs font-semibold text-[#0A66C2] hover:underline cursor-pointer"
          >
            See all
          </button>
        </div>

        <div className="space-y-3">
          {jobs.slice(0, 2).map((job) => (
            <div key={job.id} className="flex items-start justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0">
              <div className="flex items-start space-x-2.5 min-w-0 pr-2">
                <div className="w-8 h-8 rounded bg-gray-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {job.company[0]}
                </div>
                <div className="min-w-0">
                  <h4
                    onClick={() => {
                      if (onSelectJob) onSelectJob(job);
                      if (onNavigateJobsTab) onNavigateJobsTab();
                    }}
                    className="text-xs font-semibold text-[#0A66C2] truncate hover:underline cursor-pointer"
                  >
                    {job.title}
                  </h4>
                  <p className="text-[10px] text-gray-600 truncate">{job.company}</p>
                  <p className="text-[10px] text-gray-500">{job.location.split(' ')[0]}</p>
                </div>
              </div>

              <button
                onClick={() => onToggleSaveJob(job.id)}
                className={`text-xs font-semibold border rounded-full px-2.5 py-0.5 shrink-0 transition-colors cursor-pointer ${
                  job.isSaved
                    ? 'bg-[#0A66C2] text-white border-[#0A66C2]'
                    : 'text-[#0A66C2] border-[#0A66C2] hover:bg-blue-50'
                }`}
              >
                {job.isSaved ? 'Saved' : 'Save'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10px] text-gray-500 mt-auto pb-2 pt-2">
        <span>About</span>
        <span>Accessibility</span>
        <span>Help Center</span>
        <span>Privacy & Terms</span>
        <span>Advertising</span>
        <span>Business Services</span>
      </div>
    </aside>
  );
};
