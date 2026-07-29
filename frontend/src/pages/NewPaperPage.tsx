import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { papersApi } from '../services/api';
import {
  Type,
  Mic,
  MicOff,
  Scan,
  Sparkles,
  ShieldCheck,
  Info,
  AlertTriangle,
  Upload,
  ArrowLeft
} from 'lucide-react';

export const NewPaperPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTopic = searchParams.get('topic') || '';

  const [inputMode, setInputMode] = useState<'text' | 'voice' | 'scan'>('text');
  const [topic, setTopic] = useState(initialTopic);
  const [domain, setDomain] = useState('Computer Science');
  const [journalTemplate, setJournalTemplate] = useState<'IEEE' | 'Springer' | 'Elsevier'>('IEEE');
  const [citationStyle, setCitationStyle] = useState<'IEEE' | 'APA' | 'MLA' | 'Chicago'>('IEEE');
  const [pageLength, setPageLength] = useState('12-15 Pages');
  
  // Voice input Web Speech API state
  const [isRecording, setIsRecording] = useState(false);
  const [speechRecognizer, setSpeechRecognizer] = useState<any>(null);

  // OCR title upload state
  const [ocrLoading, setOcrLoading] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize Web Speech API if supported by browser
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognizer = new SpeechRecognition();
      recognizer.continuous = true;
      recognizer.interimResults = true;
      
      recognizer.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setTopic(transcript);
      };

      setSpeechRecognizer(recognizer);
    }
  }, []);

  const toggleRecording = () => {
    if (!speechRecognizer) {
      alert("Speech recognition is not supported in your browser. Please type your topic.");
      return;
    }

    if (isRecording) {
      speechRecognizer.stop();
      setIsRecording(false);
    } else {
      speechRecognizer.start();
      setIsRecording(true);
    }
  };

  const handleScanUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setOcrLoading(true);
      try {
        const res = await papersApi.ocrTitle(e.target.files[0]);
        setTopic(res.extracted_text);
      } catch (err) {
        alert("Failed to scan title image.");
      } finally {
        setOcrLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      alert("Please enter or dictate a research topic.");
      return;
    }

    setLoading(true);
    try {
      const paper = await papersApi.create({
        topic,
        input_mode: inputMode,
        target_format: journalTemplate,
        journal_template: journalTemplate,
        citation_style: citationStyle
      });
      navigate(`/tracker/${paper.id}`);
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to start generation pipeline.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FAF8F5]">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Back & Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/dashboard')} className="p-2 bg-white rounded-xl border text-slate-500 hover:bg-slate-50">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Generate New Research Paper</h1>
                <p className="text-xs text-slate-500">Configure your topic, target journal template, and citation parameters.</p>
              </div>
            </div>
            <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              DRAFT MODE
            </span>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 cols: Topic Input Tabs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">RESEARCH TOPIC</h3>
                  <span className="text-[10px] text-slate-400">Describe your research focus in detail</span>
                </div>

                {/* Input Mode Tabs */}
                <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setInputMode('text')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
                      inputMode === 'text' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Type className="w-3.5 h-3.5" /> Text Input
                  </button>

                  <button
                    type="button"
                    onClick={() => setInputMode('voice')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
                      inputMode === 'voice' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" /> Voice Input
                  </button>

                  <button
                    type="button"
                    onClick={() => setInputMode('scan')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
                      inputMode === 'scan' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Scan className="w-3.5 h-3.5" /> OCR Scan Title
                  </button>
                </div>

                {/* Tab 1: Text Mode */}
                {inputMode === 'text' && (
                  <textarea
                    rows={6}
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Empirical analysis of distributed error correction algorithms under high latency conditions..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs focus:outline-none focus:border-brand-500 leading-relaxed"
                  />
                )}

                {/* Tab 2: Voice Input Mode */}
                {inputMode === 'voice' && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center space-y-4">
                    <button
                      type="button"
                      onClick={toggleRecording}
                      className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-all ${
                        isRecording
                          ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/30'
                          : 'bg-brand-600 text-white shadow-lg shadow-brand-500/30 hover:scale-105'
                      }`}
                    >
                      {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                    </button>
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs">
                        {isRecording ? 'Listening... Speak your topic' : 'Click microphone to start dictating'}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-1">Web Speech API realtime transcript</p>
                    </div>
                    {topic && (
                      <div className="bg-white p-3 rounded-xl border text-left text-xs font-medium text-slate-700">
                        "{topic}"
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 3: OCR Scan Title Mode */}
                {inputMode === 'scan' && (
                  <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleScanUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <Upload className="w-8 h-8 text-brand-600 mx-auto mb-2" />
                    <h4 className="font-bold text-slate-800 text-xs">Upload Image of Paper Title</h4>
                    <p className="text-[10px] text-slate-400 mt-1">OCR engine extracts text automatically</p>
                    {ocrLoading && <p className="text-xs font-bold text-brand-600 mt-2">Extracting title via OCR...</p>}
                    {topic && (
                      <div className="mt-4 bg-white p-3 rounded-xl border text-left text-xs font-semibold text-slate-800">
                        Extracted: "{topic}"
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Ethics Guardrails Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <Sparkles className="w-4 h-4 text-brand-600" /> HYPOTHESIS SUPPORT
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    AI will automatically crawl CrossRef and Semantic Scholar databases to find supporting live citations for your claims.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <ShieldCheck className="w-4 h-4 text-green-600" /> ETHICS MANDATE
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Results & Discussion generates structured guidance scaffolds. <b>No fabricated numbers or fake data are created.</b>
                  </p>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Configuration Sidebar */}
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="font-bold text-slate-900 text-sm">CONFIGURATION</h3>

              {/* Research Domain */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Research Domain</label>
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-3 text-xs focus:outline-none focus:border-brand-500"
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Biotechnology">Biotechnology</option>
                  <option value="Quantum Physics">Quantum Physics</option>
                  <option value="Economics & Finance">Economics & Finance</option>
                </select>
              </div>

              {/* Target Journal Template */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Target Journal Template</label>
                <select
                  value={journalTemplate}
                  onChange={(e: any) => setJournalTemplate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-3 text-xs focus:outline-none focus:border-brand-500"
                >
                  <option value="IEEE">IEEE Academic Template (Two Column)</option>
                  <option value="Springer">Springer LNCS Template</option>
                  <option value="Elsevier">Elsevier Structural Template</option>
                </select>
              </div>

              {/* Citation Style */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700">Citation Style</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['IEEE', 'APA', 'MLA', 'Chicago'] as const).map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setCitationStyle(style)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        citationStyle === style
                          ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Page Length */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Page Length Target</span>
                  <span className="text-brand-600">{pageLength}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="3"
                  defaultValue="2"
                  onChange={(e) => {
                    const vals = ['6-8 Pages', '12-15 Pages', '20-25 Pages'];
                    setPageLength(vals[parseInt(e.target.value) - 1]);
                  }}
                  className="w-full accent-brand-600"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-2xl text-xs shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                {loading ? 'Initiating Pipeline...' : 'Generate Paper (Est. Processing: 45s)'}
              </button>

              <div className="bg-amber-50/60 p-3 rounded-2xl border border-amber-100 flex items-start gap-2 text-[10px] text-amber-800">
                <Info className="w-4 h-4 flex-shrink-0 text-amber-600 mt-0.5" />
                <span>Tip: Adding specific domain details helps the AI engine retrieve more accurate CrossRef citations.</span>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
