'use client';

import { useEffect, useState } from 'react';
import { Activity, Users, TrendingUp, AlertCircle } from 'lucide-react';

interface Metrics {
  totalVisitors: number;
  uniqueUsers: number;
  avgLoadTime: number;
  errorRate: number;
  conversionRate: number;
  emailSignups: number;
  consultationBookings: number;
  assessmentStarted: number;
}

interface PageMetric {
  path: string;
  visitors: number;
  avgLoadTime: number;
  errorCount: number;
}

export default function AdminMetrics() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [pageMetrics, setPageMetrics] = useState<PageMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/admin/metrics');
        if (!response.ok) throw new Error('Failed to fetch metrics');
        const data = await response.json();
        setMetrics(data.metrics);
        setPageMetrics(data.pageMetrics || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#e8e0d4] p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4a574] mx-auto mb-4" />
          <p>Loading metrics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#e8e0d4] p-8">
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p>Error loading metrics: {error}</p>
        </div>
      </div>
    );
  }

  if (!metrics) return null;

  const MetricCard = ({ label, value, icon: Icon, subtext }: any) => (
    <div className="bg-[#080808] border border-white/[0.08] rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/60 text-sm mb-2">{label}</p>
          <p className="text-3xl font-semibold text-[#d4a574]">{value}</p>
          {subtext && <p className="text-white/40 text-xs mt-2">{subtext}</p>}
        </div>
        <Icon className="w-8 h-8 text-white/20" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-[#e8e0d4]">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#d4a574] mb-2">
            Performance Dashboard
          </h1>
          <p className="text-white/60">Real-time metrics and analytics</p>
          <p className="text-white/40 text-sm mt-2">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <MetricCard
            label="Total Visitors (24h)"
            value={metrics.totalVisitors.toLocaleString()}
            icon={Activity}
            subtext={`Unique: ${metrics.uniqueUsers}`}
          />
          <MetricCard
            label="Avg Page Load Time"
            value={`${metrics.avgLoadTime.toFixed(2)}s`}
            icon={TrendingUp}
            subtext="Optimal: <3s"
          />
          <MetricCard
            label="Error Rate"
            value={`${metrics.errorRate.toFixed(2)}%`}
            icon={AlertCircle}
            subtext={metrics.errorRate > 1 ? 'Action needed' : 'Healthy'}
          />
          <MetricCard
            label="Conversion Rate"
            value={`${metrics.conversionRate.toFixed(2)}%`}
            icon={Users}
            subtext="Email signups → Visitors"
          />
          <MetricCard
            label="Email Signups"
            value={metrics.emailSignups.toLocaleString()}
            icon={Users}
            subtext="New this week"
          />
          <MetricCard
            label="Consultation Bookings"
            value={metrics.consultationBookings.toLocaleString()}
            icon={Activity}
            subtext={`Assessments: ${metrics.assessmentStarted}`}
          />
        </div>

        {/* Page-Level Metrics */}
        <div className="bg-[#080808] border border-white/[0.08] rounded-lg p-6">
          <h2 className="text-xl font-semibold text-[#d4a574] mb-4">
            Page Performance
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-4 text-white/60 font-medium">
                    Page
                  </th>
                  <th className="text-right py-3 px-4 text-white/60 font-medium">
                    Visitors
                  </th>
                  <th className="text-right py-3 px-4 text-white/60 font-medium">
                    Avg Load Time
                  </th>
                  <th className="text-right py-3 px-4 text-white/60 font-medium">
                    Errors
                  </th>
                </tr>
              </thead>
              <tbody>
                {pageMetrics.length > 0 ? (
                  pageMetrics.map((page) => (
                    <tr
                      key={page.path}
                      className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-3 px-4 text-white/90">{page.path}</td>
                      <td className="text-right py-3 px-4 text-white/80">
                        {page.visitors.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-4 text-white/80">
                        {page.avgLoadTime.toFixed(2)}s
                      </td>
                      <td
                        className={`text-right py-3 px-4 ${
                          page.errorCount > 0
                            ? 'text-red-400'
                            : 'text-green-400'
                        }`}
                      >
                        {page.errorCount}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-white/40">
                      No data available yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-white/40 text-sm">
          <p>Auto-refreshes every 30 seconds</p>
        </div>
      </div>
    </div>
  );
}
