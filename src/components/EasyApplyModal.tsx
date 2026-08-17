import React, { useState } from 'react';
import { X, CheckCircle2, FileText, Upload, ChevronRight, ArrowLeft } from 'lucide-react';
import { JobListing, UserProfile } from '../types';

interface EasyApplyModalProps {
  job: JobListing;
  user: UserProfile;
  onClose: () => void;
  onComplete: () => void;
}

export const EasyApplyModal: React.FC<EasyApplyModalProps> = ({
  job,
  user,
  onClose,
  onComplete,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [phoneNumber, setPhoneNumber] = useState('+1 (415) 892-3490');
  const [selectedResume, setSelectedResume] = useState('Mritunjoy_Dey_Senior_Engineer_Resume.pdf');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onComplete();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-5 shadow-2xl relative border border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
              <div className="w-10 h-10 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-lg shrink-0">
                {job.company[0]}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Apply to {job.company}</h3>
                <p className="text-xs text-slate-600">{job.title} · {job.location}</p>
              </div>
            </div>

            {/* Step Progress Bar */}
            <div className="flex items-center justify-between py-3 px-1 text-xs text-slate-500 border-b border-slate-100">
              <span className={`font-semibold ${step === 1 ? 'text-[#0A66C2]' : ''}`}>1. Contact Info</span>
              <span>→</span>
              <span className={`font-semibold ${step === 2 ? 'text-[#0A66C2]' : ''}`}>2. Resume</span>
              <span>→</span>
              <span className={`font-semibold ${step === 3 ? 'text-[#0A66C2]' : ''}`}>3. Review</span>
            </div>

            {/* Step 1: Contact Info */}
            {step === 1 && (
              <div className="py-4 space-y-3">
                <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">Contact Information</h4>
                <div>
                  <label className="block text-xs text-slate-600 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    disabled
                    value={user.name}
                    className="w-full bg-slate-100 border border-slate-200 rounded p-2 text-xs text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-600 font-medium mb-1">Email address</label>
                  <input
                    type="email"
                    disabled
                    value="mritunjoy.dey@figma.com"
                    className="w-full bg-slate-100 border border-slate-200 rounded p-2 text-xs text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-600 font-medium mb-1">Phone number</label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full border border-slate-300 rounded p-2 text-xs text-slate-800 focus:ring-2 focus:ring-[#0A66C2]"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Resume */}
            {step === 2 && (
              <div className="py-4 space-y-3">
                <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">Select Resume</h4>
                <div className="p-3 border-2 border-[#0A66C2] bg-blue-50/50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-6 h-6 text-[#0A66C2]" />
                    <div>
                      <p className="text-xs font-semibold text-slate-900">{selectedResume}</p>
                      <p className="text-[10px] text-slate-500">Uploaded 3 days ago · PDF</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#0A66C2]">Selected</span>
                </div>

                <button
                  type="button"
                  onClick={() => alert('File picker opened!')}
                  className="w-full border border-dashed border-slate-300 hover:border-slate-400 p-3 rounded-lg text-xs font-semibold text-slate-600 flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload another resume</span>
                </button>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="py-4 space-y-3 text-xs">
                <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">Review Application</h4>
                <div className="bg-slate-50 p-3 rounded-lg space-y-1.5 border border-slate-200">
                  <p><strong>Applicant:</strong> {user.name}</p>
                  <p><strong>Email:</strong> mritunjoy.dey@figma.com</p>
                  <p><strong>Phone:</strong> {phoneNumber}</p>
                  <p><strong>Resume:</strong> {selectedResume}</p>
                  <p><strong>Current Title:</strong> {user.title}</p>
                </div>
                <p className="text-[11px] text-slate-500">
                  By clicking Submit Application, your LinkedIn Profile and attached resume will be sent directly to {job.company}'s hiring team.
                </p>
              </div>
            )}

            {/* Footer buttons */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              {step > 1 ? (
                <button
                  onClick={() => setStep((step - 1) as any)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-full flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              ) : <div />}

              {step < 3 ? (
                <button
                  onClick={() => setStep((step + 1) as any)}
                  className="px-5 py-1.5 bg-[#0A66C2] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-full transition-colors flex items-center gap-1"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-5 py-1.5 bg-[#0A66C2] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-full transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">Application Submitted!</h3>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Your application for <strong>{job.title}</strong> at <strong>{job.company}</strong> has been sent successfully.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 bg-[#0A66C2] text-white font-semibold text-xs rounded-full hover:bg-blue-700"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
