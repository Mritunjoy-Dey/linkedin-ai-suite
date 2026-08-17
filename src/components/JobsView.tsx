import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Bookmark,
  Building,
  CheckCircle,
  Briefcase,
  DollarSign,
  Clock,
  Sparkles,
  Share2,
  Send,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Star,
  Globe,
  Building2,
  Award,
  ExternalLink,
  MessageSquare,
  X,
  Filter,
  ArrowUpDown,
  ThumbsUp,
  Bot,
  HelpCircle,
  Check
} from 'lucide-react';
import { JobListing, UserProfile, CompanyReview } from '../types';
import { EasyApplyModal } from './EasyApplyModal';

interface JobsViewProps {
  currentUser: UserProfile;
  jobs: JobListing[];
  onToggleSaveJob: (jobId: string) => void;
  selectedJobIdFromParent?: string;
}

export const JobsView: React.FC<JobsViewProps> = ({
  currentUser,
  jobs,
  onToggleSaveJob,
  selectedJobIdFromParent,
}) => {
  const [selectedJobId, setSelectedJobId] = useState<string>(
    selectedJobIdFromParent || jobs[0]?.id || ''
  );

  // Search & AI query states
  const [jobSearch, setJobSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('San Francisco, CA');
  const [aiQuery, setAiQuery] = useState('Remote AI PM jobs with salary ranging $ 180k-250k');
  const [isAiSearchActive, setIsAiSearchActive] = useState(true);
  const [isRefineModalOpen, setIsRefineModalOpen] = useState(false);
  const [refineInput, setRefineInput] = useState(aiQuery);

  // Sort & Filter state
  const [sortOption, setSortOption] = useState<'relevance' | 'recent' | 'salaryHighToLow'>('relevance');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Detailed Filter options
  const [filterWorkplace, setFilterWorkplace] = useState<'All' | 'Remote' | 'Hybrid' | 'On-site'>('All');
  const [filterDatePosted, setFilterDatePosted] = useState<'All' | '24h' | '3d' | '7d' | '30d'>('All');
  const [filterExperience, setFilterExperience] = useState<'All' | 'Entry' | 'Mid-Senior' | 'Senior' | 'Director'>('All');
  const [filterMinSalary, setFilterMinSalary] = useState<number>(0);
  const [filterEmploymentType, setFilterEmploymentType] = useState<'All' | 'Full-time' | 'Part-time' | 'Contract'>('All');
  const [filterEasyApplyOnly, setFilterEasyApplyOnly] = useState<boolean>(false);

  // Detail pane interactions
  const [isKnowMoreOpen, setIsKnowMoreOpen] = useState(true);
  const [isCompanyReviewsOpen, setIsCompanyReviewsOpen] = useState(false);
  const [isAskJobModalOpen, setIsAskJobModalOpen] = useState(false);
  const [askQuestionInput, setAskQuestionInput] = useState('');
  const [qaHistory, setQaHistory] = useState<{ question: string; answer: string }[]>([]);

  // Apply Modal state
  const [applyingJob, setApplyingJob] = useState<JobListing | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  const selectedJob = jobs.find(j => j.id === selectedJobId) || jobs[0];

  // Apply Sort & Filter Logic
  const processedJobs = jobs.filter(job => {
    // Basic filter pills / quick match
    if (filterWorkplace !== 'All' && job.workPolicy !== filterWorkplace) return false;
    if (filterEasyApplyOnly && !job.easyApply) return false;
    
    // Experience level
    if (filterExperience !== 'All' && job.experienceLevel && job.experienceLevel !== filterExperience) return false;

    // Employment Type
    if (filterEmploymentType !== 'All' && job.employmentType && job.employmentType !== filterEmploymentType) return false;

    // Salary filter
    if (filterMinSalary > 0 && job.salaryMinNumeric && job.salaryMinNumeric < filterMinSalary) return false;

    // Date posted filter
    if (filterDatePosted !== 'All') {
      const days = job.postedDaysAgo ?? 0;
      if (filterDatePosted === '24h' && days > 0) return false;
      if (filterDatePosted === '3d' && days > 3) return false;
      if (filterDatePosted === '7d' && days > 7) return false;
      if (filterDatePosted === '30d' && days > 30) return false;
    }

    // Keyword Search / AI Query filtering
    if (jobSearch.trim()) {
      const q = jobSearch.toLowerCase();
      const matchQuery = (
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.description.toLowerCase().includes(q)
      );
      if (!matchQuery) return false;
    }

    if (locationSearch.trim() && locationSearch.toLowerCase() !== 'all') {
      const loc = locationSearch.toLowerCase();
      if (!job.location.toLowerCase().includes(loc) && !job.workPolicy.toLowerCase().includes(loc)) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    if (sortOption === 'recent') {
      return (a.postedDaysAgo ?? 0) - (b.postedDaysAgo ?? 0);
    }
    if (sortOption === 'salaryHighToLow') {
      return (b.salaryMinNumeric ?? 0) - (a.salaryMinNumeric ?? 0);
    }
    // Relevance default
    return 0;
  });

  const handleExecuteAiSearch = (prompt: string) => {
    setAiQuery(prompt);
    setIsAiSearchActive(true);
    setJobSearch('');
    // Auto preset filters based on intent string
    if (prompt.toLowerCase().includes('remote')) setFilterWorkplace('Remote');
    if (prompt.toLowerCase().includes('180k')) setFilterMinSalary(180000);
    setIsRefineModalOpen(false);
  };

  const handleAskJobQuestion = (questionText?: string) => {
    const query = questionText || askQuestionInput;
    if (!query.trim() || !selectedJob) return;

    let ans = '';
    const qLower = query.toLowerCase();

    if (qLower.includes('salary') || qLower.includes('compensation') || qLower.includes('pay')) {
      ans = `The salary range for ${selectedJob.title} at ${selectedJob.company} is ${selectedJob.salaryRange}. Plus equity and comprehensive benefits (${selectedJob.benefits[0] || 'healthcare'}).`;
    } else if (qLower.includes('remote') || qLower.includes('hybrid') || qLower.includes('location')) {
      ans = `This role is categorized as ${selectedJob.workPolicy} in ${selectedJob.location}.`;
    } else if (qLower.includes('skill') || qLower.includes('requirement') || qLower.includes('qualif')) {
      ans = `Key qualifications required include:\n• ${selectedJob.requirements.join('\n• ')}`;
    } else if (qLower.includes('culture') || qLower.includes('recommend') || qLower.includes('review')) {
      ans = `${selectedJob.company} has a ${selectedJob.rating || 4.2} ★ rating based on ${selectedJob.ratingsCount || '10,000+'} employee reviews. ${selectedJob.recommendPercent || 80}% of employees would recommend it to a friend.`;
    } else {
      ans = `Based on the listing for ${selectedJob.title} at ${selectedJob.company}:\n${selectedJob.aiSummary || selectedJob.description}`;
    }

    setQaHistory(prev => [...prev, { question: query, answer: ans }]);
    setAskQuestionInput('');
  };

  return (
    <div className="max-w-[1024px] mx-auto p-3 sm:p-4 space-y-4">
      {/* 1. TOP SEARCH BAR CARD */}
      <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 space-y-3 shadow-xs">
        {/* Search Inputs Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3 items-center">
          {/* Job Title / Skill Input with AI Job Search Button Inside */}
          <div className="md:col-span-6 relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search job title, skills, or company"
              value={jobSearch}
              onChange={(e) => setJobSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-28 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0A66C2] focus:bg-white"
            />
            {/* AI Job Search Pill inside search bar matching screenshot */}
            <button
              onClick={() => handleExecuteAiSearch('Remote AI PM jobs with salary ranging $ 180k-250k')}
              className="absolute right-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#0A66C2] text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors cursor-pointer"
              title="Search using LinkedIn AI Intent Matching"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>AI Job Search</span>
            </button>
          </div>

          {/* Location Input */}
          <div className="md:col-span-4 relative flex items-center">
            <MapPin className="absolute left-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="San Francisco, CA"
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0A66C2] focus:bg-white"
            />
          </div>

          {/* Search Button */}
          <div className="md:col-span-2">
            <button
              onClick={() => setIsAiSearchActive(false)}
              className="w-full bg-[#0A66C2] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm py-2 px-4 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 h-full shadow-2xs"
            >
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Active AI Prompt Pill Row + Right Side Sort & Filter Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-1 border-t border-slate-100">
          {/* Active AI Query Bubble + Refine Button */}
          {isAiSearchActive ? (
            <div className="flex items-center gap-2 flex-wrap">
              <div className="bg-slate-50 border border-slate-300 rounded-full px-3 py-1 text-xs text-slate-800 font-mono flex items-center gap-1.5">
                <span>"{aiQuery}"</span>
              </div>

              {/* Refine Your Search Pill Button matching screenshot */}
              <button
                onClick={() => {
                  setRefineInput(aiQuery);
                  setIsRefineModalOpen(true);
                }}
                className="bg-blue-50 hover:bg-blue-100 border border-blue-300 text-[#0A66C2] text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-[#0A66C2]" />
                <span>Refine your search</span>
              </button>
            </div>
          ) : (
            <div className="text-xs text-slate-500 font-medium">
              Showing standard keyword search results
            </div>
          )}

          {/* Right Side Sort & Filter Buttons */}
          <div className="flex items-center gap-3 self-end sm:self-auto relative">
            {/* SORT BUTTON */}
            <div className="relative">
              <button
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="text-xs font-bold text-slate-700 hover:text-[#0A66C2] px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                <span>Sort</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* Sort Dropdown */}
              {isSortDropdownOpen && (
                <div className="absolute right-0 mt-1 w-52 bg-white rounded-lg border border-slate-200 shadow-lg py-1 z-30 text-xs">
                  <div className="px-3 py-1.5 font-bold text-slate-400 text-[10px] uppercase tracking-wider border-b border-slate-100">
                    Sort Order
                  </div>
                  <button
                    onClick={() => {
                      setSortOption('relevance');
                      setIsSortDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 ${
                      sortOption === 'relevance' ? 'font-bold text-[#0A66C2] bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>Relevance (Best Match)</span>
                    {sortOption === 'relevance' && <Check className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => {
                      setSortOption('recent');
                      setIsSortDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 ${
                      sortOption === 'recent' ? 'font-bold text-[#0A66C2] bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>Most Recent First</span>
                    {sortOption === 'recent' && <Check className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => {
                      setSortOption('salaryHighToLow');
                      setIsSortDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 ${
                      sortOption === 'salaryHighToLow' ? 'font-bold text-[#0A66C2] bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>Salary: High → Low</span>
                    {sortOption === 'salaryHighToLow' && <Check className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}
            </div>

            {/* FILTER BUTTON */}
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="text-xs font-bold text-slate-700 hover:text-[#0A66C2] px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. SPLIT PANE CONTENT AREA */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Left List Pane (5 cols) */}
        <div className="md:col-span-5 bg-white rounded-xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden max-h-[820px] overflow-y-auto">
          <div className="p-3 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-700 flex items-center justify-between">
            <span>Jobs based on your profile ({processedJobs.length})</span>
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
          </div>

          {processedJobs.length > 0 ? (
            processedJobs.map((job) => {
              const isSelected = job.id === selectedJob?.id;
              const hasApplied = appliedJobs.includes(job.id);

              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJobId(job.id)}
                  className={`p-3.5 sm:p-4 cursor-pointer transition-colors hover:bg-slate-50 relative ${
                    isSelected ? 'bg-blue-50/70 border-l-4 border-[#0A66C2]' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-xl shrink-0 overflow-hidden">
                      {job.company[0]}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 text-xs sm:text-sm truncate hover:underline">
                        {job.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">{job.company}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{job.location} ({job.workPolicy})</p>
                      <p className="text-[11px] font-semibold text-emerald-700 mt-1">{job.salaryRange}</p>

                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        {job.easyApply && (
                          <span className="bg-blue-100 text-[#0A66C2] font-semibold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>Easy Apply</span>
                          </span>
                        )}
                        {hasApplied && (
                          <span className="bg-emerald-100 text-emerald-800 font-semibold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle className="w-2.5 h-2.5" />
                            <span>Applied</span>
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400">{job.timeAgo}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSaveJob(job.id);
                      }}
                      className="text-slate-400 hover:text-[#0A66C2] p-1 rounded hover:bg-slate-100"
                    >
                      <Bookmark className={`w-4 h-4 ${job.isSaved ? 'fill-[#0A66C2] text-[#0A66C2]' : ''}`} />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-500 text-xs">
              No jobs matching your filter criteria. Try refining your search.
            </div>
          )}
        </div>

        {/* Right Job Detail Pane (7 cols) */}
        {selectedJob ? (
          <div className="md:col-span-7 bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-4 max-h-[820px] overflow-y-auto">
            
            {/* Header: Title, Verified Recruiter & Action Buttons */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-2xl shrink-0">
                    {selectedJob.company[0]}
                  </div>
                  <div>
                    <h2 className="text-base sm:text-xl font-bold text-slate-900 leading-tight">
                      {selectedJob.title}
                    </h2>

                    {/* Company & Verified Recruiter Tag */}
                    <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                      <span className="text-xs sm:text-sm text-slate-800 font-bold">
                        {selectedJob.company}
                      </span>
                      <span className="text-xs text-slate-500">• {selectedJob.location}</span>
                      {selectedJob.verifiedRecruiter && (
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-1.5 py-0.2 rounded flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          <span>Verified recruiter ✔</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 mt-1">
                      {selectedJob.timeAgo} · <span className="text-emerald-700 font-semibold">{selectedJob.applicantsCount} applicants</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleSaveJob(selectedJob.id)}
                    className={`p-2 rounded-full border transition-colors ${
                      selectedJob.isSaved
                        ? 'border-[#0A66C2] bg-blue-50 text-[#0A66C2]'
                        : 'border-slate-300 text-slate-600 hover:bg-slate-100'
                    }`}
                    title={selectedJob.isSaved ? 'Saved' : 'Save job'}
                  >
                    <Bookmark className={`w-4 h-4 ${selectedJob.isSaved ? 'fill-[#0A66C2]' : ''}`} />
                  </button>
                  <button
                    onClick={() => alert(`Shared job link for ${selectedJob.title}!`)}
                    className="p-2 rounded-full border border-slate-300 text-slate-600 hover:bg-slate-100"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Company Sentiment Feedback Section matching screenshot */}
              <div className="mt-3 p-3 bg-amber-50/50 border border-amber-200/80 rounded-xl flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-bold text-slate-900">{selectedJob.rating || 3.4}</span>
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    based on {selectedJob.ratingsCount || '18,504'} ratings
                  </p>
                  <p className="text-[11px] font-medium text-emerald-700 mt-0.5">
                    {selectedJob.recommendPercent || 48}% would recommend to a friend
                  </p>
                </div>

                {/* Know More Dropdown Trigger */}
                <button
                  onClick={() => setIsKnowMoreOpen(!isKnowMoreOpen)}
                  className="text-xs font-bold text-[#0A66C2] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Know more</span>
                  {isKnowMoreOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Know More Expanded Card Content matching screenshot */}
              {isKnowMoreOpen && (
                <div className="mt-2 p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    {/* Offices */}
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex flex-col items-center justify-center">
                      <Building2 className="w-5 h-5 text-slate-600 mb-1" />
                      <span className="font-bold text-xs text-slate-800">{selectedJob.officesCount || '21 Offices'}</span>
                      <span className="text-[10px] text-slate-400">Locations</span>
                    </div>

                    {/* Industry */}
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex flex-col items-center justify-center">
                      <Building className="w-5 h-5 text-slate-600 mb-1" />
                      <span className="font-bold text-xs text-slate-800 truncate max-w-full px-1">{selectedJob.industry || 'Internet & Web'}</span>
                      <span className="text-[10px] text-slate-400">Industry</span>
                    </div>

                    {/* Awards */}
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex flex-col items-center justify-center">
                      <Award className="w-5 h-5 text-slate-600 mb-1" />
                      <span className="font-bold text-xs text-slate-800 truncate max-w-full px-1">{selectedJob.awards || 'Top Workplace'}</span>
                      <span className="text-[10px] text-slate-400">Awards</span>
                    </div>

                    {/* View Site */}
                    <a
                      href={selectedJob.websiteUrl || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-white p-2.5 rounded-lg border border-slate-200 flex flex-col items-center justify-center hover:bg-blue-50/50 transition-colors cursor-pointer group"
                    >
                      <ExternalLink className="w-5 h-5 text-[#0A66C2] group-hover:scale-110 transition-transform mb-1" />
                      <span className="font-bold text-xs text-[#0A66C2]">View site</span>
                      <span className="text-[10px] text-slate-400">Website</span>
                    </a>
                  </div>

                  {/* Reviews Button Row */}
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => setIsCompanyReviewsOpen(true)}
                      className="text-xs bg-white border border-slate-300 hover:border-[#0A66C2] hover:text-[#0A66C2] font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                      <span>Read Verified Employee Reviews</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Primary Apply Buttons Row */}
              <div className="flex items-center gap-3 mt-4 pt-1">
                {appliedJobs.includes(selectedJob.id) ? (
                  <div className="px-6 py-2 bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-xs sm:text-sm rounded-full flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Application Submitted</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setApplyingJob(selectedJob)}
                    className="px-6 py-2.5 bg-[#0A66C2] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-full transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                    id="easy-apply-btn"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>{selectedJob.easyApply ? 'Easy Apply' : 'Apply on Company Site'}</span>
                  </button>
                )}

                <button
                  onClick={() => onToggleSaveJob(selectedJob.id)}
                  className="px-5 py-2.5 border border-[#0A66C2] text-[#0A66C2] font-semibold text-xs sm:text-sm rounded-full hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  {selectedJob.isSaved ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>

            {/* 3. AI GENERATED SUMMARY OF THE JOB BLOCK matching screenshot */}
            <div className="bg-blue-50/90 border border-blue-200 rounded-2xl p-4 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[#0A66C2] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#0A66C2]" />
                  <span>AI generated summary of the job</span>
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {selectedJob.aiSummary || selectedJob.description}
              </p>

              {/* Ask about this job Button matching screenshot */}
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => setIsAskJobModalOpen(true)}
                  className="bg-white hover:bg-blue-100/60 text-[#0A66C2] border border-blue-300 font-bold text-xs px-4 py-2 rounded-full transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Bot className="w-4 h-4 text-[#0A66C2]" />
                  <span>Ask about this Job</span>
                </button>
              </div>
            </div>

            {/* Detailed Description Sections */}
            <div className="border-t border-slate-100 pt-4 space-y-4 text-xs sm:text-sm text-slate-800">
              {/* Job Highlights */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-slate-500" />
                  <span>Work Policy: <strong>{selectedJob.workPolicy}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-slate-500" />
                  <span>Salary: <strong>{selectedJob.salaryRange}</strong></span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-2">About the Job</h3>
                <p className="whitespace-pre-line leading-relaxed text-slate-700">
                  {selectedJob.description}
                </p>
              </div>

              {/* Requirements */}
              {selectedJob.requirements.length > 0 && (
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-2">Key Qualifications</h3>
                  <ul className="space-y-1.5 list-disc pl-5 text-slate-700">
                    {selectedJob.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {selectedJob.benefits.length > 0 && (
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-2">Benefits & Perks</h3>
                  <ul className="space-y-1.5 list-disc pl-5 text-slate-700">
                    {selectedJob.benefits.map((ben, idx) => (
                      <li key={idx}>{ben}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="md:col-span-7 flex items-center justify-center p-8 bg-white rounded-xl border border-slate-200 text-slate-400 text-sm">
            Select a job to view details
          </div>
        )}
      </div>

      {/* MODAL 1: REFINE YOUR SEARCH MODAL */}
      {isRefineModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#0A66C2]" />
                <h3 className="font-bold text-base text-slate-900">Refine Your AI Search</h3>
              </div>
              <button
                onClick={() => setIsRefineModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Modify your intent query or specify target compensation, technologies, work arrangement, and seniority:
            </p>

            <textarea
              rows={3}
              value={refineInput}
              onChange={(e) => setRefineInput(e.target.value)}
              className="w-full border border-slate-300 rounded-xl p-3 text-xs sm:text-sm focus:ring-2 focus:ring-[#0A66C2] focus:outline-hidden"
              placeholder="e.g. Remote AI PM jobs with salary $180k-250k in Bay Area with equity..."
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsRefineModalOpen(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-full hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleExecuteAiSearch(refineInput)}
                className="px-5 py-2 bg-[#0A66C2] hover:bg-blue-700 text-white text-xs font-bold rounded-full transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Apply AI Search</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: FILTER MODAL */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#0A66C2]" />
                <span>Filter Jobs</span>
              </h3>
              <button onClick={() => setIsFilterModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Workplace Type */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">Workplace Type</label>
              <div className="flex gap-2 flex-wrap text-xs">
                {['All', 'Remote', 'Hybrid', 'On-site'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFilterWorkplace(type as any)}
                    className={`px-3 py-1.5 rounded-full border font-medium transition-colors ${
                      filterWorkplace === type
                        ? 'bg-[#0A66C2] text-white border-[#0A66C2]'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Posted */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">Date Posted</label>
              <div className="flex gap-2 flex-wrap text-xs">
                {[
                  { label: 'Any time', val: 'All' },
                  { label: 'Past 24 hours', val: '24h' },
                  { label: 'Past 3 days', val: '3d' },
                  { label: 'Past week', val: '7d' },
                  { label: 'Past month', val: '30d' }
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setFilterDatePosted(item.val as any)}
                    className={`px-3 py-1.5 rounded-full border font-medium transition-colors ${
                      filterDatePosted === item.val
                        ? 'bg-[#0A66C2] text-white border-[#0A66C2]'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">Experience Level</label>
              <div className="flex gap-2 flex-wrap text-xs">
                {['All', 'Entry', 'Mid-Senior', 'Senior', 'Director'].map((exp) => (
                  <button
                    key={exp}
                    type="button"
                    onClick={() => setFilterExperience(exp as any)}
                    className={`px-3 py-1.5 rounded-full border font-medium transition-colors ${
                      filterExperience === exp
                        ? 'bg-[#0A66C2] text-white border-[#0A66C2]'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {exp}
                  </button>
                ))}
              </div>
            </div>

            {/* Minimum Salary */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">Minimum Salary</label>
              <div className="flex gap-2 flex-wrap text-xs">
                {[
                  { label: 'Any Salary', val: 0 },
                  { label: '$100K+', val: 100000 },
                  { label: '$150K+', val: 150000 },
                  { label: '$180K+', val: 180000 },
                  { label: '$200K+', val: 200000 }
                ].map((s) => (
                  <button
                    key={s.val}
                    type="button"
                    onClick={() => setFilterMinSalary(s.val)}
                    className={`px-3 py-1.5 rounded-full border font-medium transition-colors ${
                      filterMinSalary === s.val
                        ? 'bg-[#0A66C2] text-white border-[#0A66C2]'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Employment Type */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">Employment Type</label>
              <div className="flex gap-2 flex-wrap text-xs">
                {['All', 'Full-time', 'Part-time', 'Contract'].map((emp) => (
                  <button
                    key={emp}
                    type="button"
                    onClick={() => setFilterEmploymentType(emp as any)}
                    className={`px-3 py-1.5 rounded-full border font-medium transition-colors ${
                      filterEmploymentType === emp
                        ? 'bg-[#0A66C2] text-white border-[#0A66C2]'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {emp}
                  </button>
                ))}
              </div>
            </div>

            {/* Easy Apply */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-xs font-bold text-slate-800">Easy Apply Only</span>
              <button
                type="button"
                onClick={() => setFilterEasyApplyOnly(!filterEasyApplyOnly)}
                className={`w-11 h-6 rounded-full transition-colors p-0.5 ${
                  filterEasyApplyOnly ? 'bg-[#0A66C2]' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  filterEasyApplyOnly ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <button
                onClick={() => {
                  setFilterWorkplace('All');
                  setFilterDatePosted('All');
                  setFilterExperience('All');
                  setFilterMinSalary(0);
                  setFilterEmploymentType('All');
                  setFilterEasyApplyOnly(false);
                }}
                className="text-xs text-slate-500 font-semibold hover:underline"
              >
                Reset All Filters
              </button>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="px-6 py-2 bg-[#0A66C2] text-white text-xs font-bold rounded-full hover:bg-blue-700"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: COMPANY REVIEWS MODAL */}
      {isCompanyReviewsOpen && selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-5 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-[#0A66C2]" />
                <h3 className="font-bold text-base text-slate-900">{selectedJob.company} Verified Employee Reviews</h3>
              </div>
              <button onClick={() => setIsCompanyReviewsOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Overall Rating Score Banner */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-slate-900">{selectedJob.rating || 4.2}</span>
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <Star className="w-4 h-4 fill-amber-500" />
                    <Star className="w-4 h-4 fill-amber-500" />
                    <Star className="w-4 h-4 fill-amber-500" />
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-1">Based on verified feedback from {selectedJob.ratingsCount || '18,504'} employees</p>
              </div>

              <div className="text-right">
                <span className="text-lg font-bold text-emerald-700">{selectedJob.recommendPercent || 80}%</span>
                <p className="text-[11px] text-slate-600">Would recommend to a friend</p>
              </div>
            </div>

            {/* Individual Reviews List */}
            <div className="space-y-3">
              {(selectedJob.reviews && selectedJob.reviews.length > 0
                ? selectedJob.reviews
                : [
                    {
                      id: 'r_def_1',
                      authorRole: 'Engineering Manager',
                      authorStatus: 'Current Employee',
                      rating: 4.5,
                      headline: 'Inspiring peers, strong innovation mindset',
                      pros: 'Great autonomy, generous compensation, modern codebase.',
                      cons: 'High delivery cadence during core release periods.',
                      date: 'Jul 2026',
                      recommend: true
                    }
                  ]
              ).map((rev) => (
                <div key={rev.id} className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800">{rev.authorRole}</span>
                      <span className="text-slate-400 text-[11px]"> • {rev.authorStatus}</span>
                    </div>
                    <span className="text-slate-400 text-[10px]">{rev.date}</span>
                  </div>

                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span className="font-bold text-slate-800">{rev.rating}</span>
                    <span className="text-slate-800 font-semibold ml-2">"{rev.headline}"</span>
                  </div>

                  <div className="space-y-1 text-slate-700 pt-1">
                    <p><strong className="text-emerald-700">Pros:</strong> {rev.pros}</p>
                    <p><strong className="text-rose-700">Cons:</strong> {rev.cons}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setIsCompanyReviewsOpen(false)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-full"
              >
                Close Reviews
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: ASK ABOUT THIS JOB MODAL */}
      {isAskJobModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-[#0A66C2]" />
                <h3 className="font-bold text-base text-slate-900">Ask LinkedIn AI About This Role</h3>
              </div>
              <button onClick={() => setIsAskJobModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Get instant clarification on responsibilities, requirements, compensation, culture, or skill fit for <strong>{selectedJob.title}</strong> at <strong>{selectedJob.company}</strong>.
            </p>

            {/* Quick Questions Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
              {[
                "What is the compensation structure?",
                "What are the required skills?",
                "Is travel required?",
                "How is team culture?"
              ].map((qText, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAskJobQuestion(qText)}
                  className="bg-blue-50 hover:bg-blue-100 text-[#0A66C2] text-[11px] font-semibold px-3 py-1.5 rounded-full shrink-0 transition-colors border border-blue-200 cursor-pointer"
                >
                  {qText}
                </button>
              ))}
            </div>

            {/* Q&A Conversation History */}
            <div className="flex-1 min-h-[160px] max-h-[260px] overflow-y-auto space-y-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
              {qaHistory.length === 0 ? (
                <div className="text-slate-400 text-center py-8">
                  Click a quick question above or type your question below!
                </div>
              ) : (
                qaHistory.map((qa, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 font-semibold text-slate-800">
                      ❓ {qa.question}
                    </div>
                    <div className="bg-blue-100/60 p-2.5 rounded-lg border border-blue-200 text-slate-800 whitespace-pre-line leading-relaxed">
                      🤖 {qa.answer}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input Box */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                placeholder="Ask anything about compensation, skills, or interview process..."
                value={askQuestionInput}
                onChange={(e) => setAskQuestionInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskJobQuestion()}
                className="flex-1 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#0A66C2] focus:outline-hidden"
              />
              <button
                onClick={() => handleAskJobQuestion()}
                className="bg-[#0A66C2] hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                Ask
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EASY APPLY MODAL */}
      {applyingJob && (
        <EasyApplyModal
          job={applyingJob}
          user={currentUser}
          onClose={() => setApplyingJob(null)}
          onComplete={() => {
            setAppliedJobs(prev => [...prev, applyingJob.id]);
            setApplyingJob(null);
          }}
        />
      )}
    </div>
  );
};
