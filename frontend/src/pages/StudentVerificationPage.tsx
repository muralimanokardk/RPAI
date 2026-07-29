import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onboardingApi } from '../services/api';
import { StudentVerification } from '../types';
import { Upload, FileCheck, CheckCircle2, Clock, Camera, Sparkles } from 'lucide-react';

export const StudentVerificationPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [verification, setVerification] = useState<StudentVerification | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setLoading(true);
      try {
        const res = await onboardingApi.verifyStudentId(selectedFile);
        setVerification(res);
      } catch (err) {
        alert("OCR parsing failed. Please upload a clear student ID card image.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-900">Student Verification</h1>
          <p className="text-xs text-slate-500">
            Confirm your academic status to unlock premium research tools and institutional pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Upload Card */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <div className="border-2 border-dashed border-brand-200 rounded-3xl p-8 text-center bg-brand-50/20 hover:bg-brand-50/40 transition-colors relative">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Upload Academic ID</h3>
              <p className="text-xs text-slate-500 mb-4">Drag and drop your school or college ID card here, or browse files.</p>
              <div className="flex justify-center gap-3">
                <button type="button" className="bg-brand-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm">
                  Browse Files
                </button>
                <button type="button" className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5" /> Take Photo
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-4">JPG / PNG • Max 5MB • Encrypted</p>
            </div>

            {file && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <FileCheck className="w-5 h-5 text-brand-600" />
                  <div>
                    <div className="font-bold text-slate-800">{file.name}</div>
                    <div className="text-[10px] text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB • Ready to analyze</div>
                  </div>
                </div>
                <span className="text-brand-600 font-bold text-[10px]">Loaded</span>
              </div>
            )}
          </div>

          {/* Right: OCR Extracted Data Panel */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Extracted Data</h3>
              <Sparkles className="w-4 h-4 text-brand-600" />
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">FULL NAME</label>
                <div className="bg-slate-50 p-3 rounded-2xl font-bold text-slate-800 border border-slate-100 mt-1">
                  {verification?.ocr_extracted_json?.student_name || "Julian Vance"}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">INSTITUTION</label>
                <div className="bg-slate-50 p-3 rounded-2xl font-bold text-slate-800 border border-slate-100 mt-1">
                  {verification?.ocr_extracted_json?.institution || "Stanford University"}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">EXPIRY DATE</label>
                <div className="bg-slate-50 p-3 rounded-2xl font-bold text-slate-800 border border-slate-100 mt-1">
                  {verification?.ocr_extracted_json?.expiry_date || "June 2026"}
                </div>
              </div>
            </div>

            <div className="bg-brand-50/60 p-3 rounded-2xl border border-brand-100 text-[11px] text-slate-600 leading-relaxed">
              Our AI automatically extracts this data. Please verify the details are correct before submitting.
            </div>

            {/* Verification Status Pill */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Verification Status</span>
              {verification?.status === 'approved' ? (
                <span className="flex items-center gap-1 bg-green-100 text-green-700 text-[10px] font-extrabold px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                </span>
              ) : (
                <span className="flex items-center gap-1 bg-amber-100 text-amber-700 text-[10px] font-extrabold px-3 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5" /> Pending Review
                </span>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-2xl text-xs transition-all shadow-md shadow-brand-500/25"
            >
              Submit for Verification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
