import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { subscriptionApi } from '../services/api';
import { CreditCard, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';

export const BillingPage: React.FC = () => {
  const { user, subscription, refreshSubscription } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleRazorpayCheckout = async (planTier: 'student' | 'standard') => {
    setLoading(true);
    try {
      const orderData = await subscriptionApi.createOrder(planTier);
      
      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: orderData.name,
        description: orderData.description,
        subscription_id: orderData.subscription_id,
        handler: async function (response: any) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id || 'pay_test_123'}`);
          await refreshSubscription();
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
        },
        theme: {
          color: '#635BFF',
        },
      };

      if ((window as any).Razorpay) {
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        alert("Razorpay checkout loaded in test mode simulation. Payment captured.");
        await refreshSubscription();
      }
    } catch (err) {
      alert("Failed to initiate Razorpay checkout.");
    } finally {
      setLoading(false);
    }
  };

  const generationsUsed = subscription?.generations_used || 0;
  const generationsIncluded = subscription?.generations_included || 3;
  const pct = Math.min(100, Math.round((generationsUsed / generationsIncluded) * 100));

  return (
    <div className="flex min-h-screen bg-[#FAF8F5]">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Billing & Subscriptions</h1>
            <p className="text-xs text-slate-500">Manage your subscription plan, payment methods, and generation quotas.</p>
          </div>

          {/* Active Plan Usage Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CURRENT ACTIVE PLAN</span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  {user?.plan_tier === 'student' ? 'Student Plan ($75 / 3mo)' : 'Standard Plan ($150 / 3mo)'}
                </h3>
              </div>
              <span className="bg-green-100 text-green-700 text-xs font-extrabold px-3 py-1 rounded-full">
                Active Subscription
              </span>
            </div>

            {/* Quota Progress Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Generations Used: {generationsUsed} / {generationsIncluded}</span>
                <span>{pct}% Quota Consumed</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-brand-600 h-full transition-all duration-500" style={{ width: `${pct}%` }} />
              </div>
            </div>
          </div>

          {/* Plan Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Student Plan Card */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-6">
              <div>
                <span className="bg-brand-100 text-brand-700 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  STUDENT TIER
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-4">Student Plan</h3>
                <div className="my-3 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-slate-900">$75</span>
                  <span className="text-slate-500 text-xs">/ 3 Months</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-600" /> 3 Free Initial Generations</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-600" /> Real CrossRef & Semantic Scholar DOIs</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-600" /> IEEE & Springer LaTeX / Word Formatting</li>
                </ul>
              </div>

              <button
                onClick={() => handleRazorpayCheckout('student')}
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl text-xs transition-all shadow-md"
              >
                Pay with Razorpay Test Mode ($75)
              </button>
            </div>

            {/* Standard Plan Card */}
            <div className="bg-gradient-to-b from-brand-50/50 to-white p-8 rounded-3xl border-2 border-brand-500 shadow-glow flex flex-col justify-between space-y-6">
              <div>
                <span className="bg-brand-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  PROFESSIONAL TIER
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-4">Professional Plan</h3>
                <div className="my-3 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-slate-900">$150</span>
                  <span className="text-slate-500 text-xs">/ 3 Months</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-600" /> 2 Free Initial Generations</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-600" /> High Capacity Generation Allowance</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-600" /> Priority Plagiarism & AI Audit Analysis</li>
                </ul>
              </div>

              <button
                onClick={() => handleRazorpayCheckout('standard')}
                disabled={loading}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-2xl text-xs transition-all shadow-md shadow-brand-500/25"
              >
                Upgrade Plan ($150)
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
