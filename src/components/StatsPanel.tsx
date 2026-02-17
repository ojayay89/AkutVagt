import { useState, useEffect } from 'react';
import { BarChart3, Phone, ExternalLink, TrendingUp, Calendar } from 'lucide-react';
import { Craftsman } from '../types';

interface ClickData {
  id: string;
  craftsmanId: string;
  type: 'phone' | 'website';
  timestamp: string;
}

interface CraftsmanStats {
  craftsman: Craftsman;
  phoneClicks: number;
  websiteClicks: number;
  totalClicks: number;
}

export function StatsPanel() {
  const [stats, setStats] = useState<CraftsmanStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');

  useEffect(() => {
    loadStats();
  }, [timeFilter]);

  const loadStats = async () => {
    setLoading(true);
    try {
      const { projectId, publicAnonKey } = await import('../utils/supabase/info');
      const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-27acf415`;

      // Fetch all craftsmen
      const craftsmenRes = await fetch(`${API_URL}/craftsmen`, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      const craftsmenData = await craftsmenRes.json();
      const craftsmen: Craftsman[] = craftsmenData.data || [];

      // Fetch all clicks from KV store
      const clicksRes = await fetch(`${API_URL}/all-clicks`, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      const clicksData = await clicksRes.json();
      const allClicks: ClickData[] = clicksData.data || [];

      // Filter clicks by time
      const filteredClicks = filterClicksByTime(allClicks, timeFilter);

      // Calculate stats per craftsman
      const statsData: CraftsmanStats[] = craftsmen.map(craftsman => {
        const craftsmanClicks = filteredClicks.filter(c => c.craftsmanId === craftsman.id);
        return {
          craftsman,
          phoneClicks: craftsmanClicks.filter(c => c.type === 'phone').length,
          websiteClicks: craftsmanClicks.filter(c => c.type === 'website').length,
          totalClicks: craftsmanClicks.length
        };
      });

      // Sort by total clicks
      statsData.sort((a, b) => b.totalClicks - a.totalClicks);

      setStats(statsData);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterClicksByTime = (clicks: ClickData[], filter: string): ClickData[] => {
    if (filter === 'all') return clicks;

    const now = new Date();
    const cutoff = new Date();

    switch (filter) {
      case 'today':
        cutoff.setHours(0, 0, 0, 0);
        break;
      case 'week':
        cutoff.setDate(now.getDate() - 7);
        break;
      case 'month':
        cutoff.setMonth(now.getMonth() - 1);
        break;
    }

    return clicks.filter(click => new Date(click.timestamp) >= cutoff);
  };

  const totalStats = stats.reduce(
    (acc, stat) => ({
      phoneClicks: acc.phoneClicks + stat.phoneClicks,
      websiteClicks: acc.websiteClicks + stat.websiteClicks,
      totalClicks: acc.totalClicks + stat.totalClicks
    }),
    { phoneClicks: 0, websiteClicks: 0, totalClicks: 0 }
  );

  const exportToCSV = () => {
    const headers = ['Virksomhed', 'Kategori', 'Telefon Klik', 'Hjemmeside Klik', 'Total Klik'];
    const rows = stats.map(s => [
      s.craftsman.companyName,
      s.craftsman.category,
      s.phoneClicks.toString(),
      s.websiteClicks.toString(),
      s.totalClicks.toString()
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `akutvagt_statistik_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-red-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Klik-statistik</h2>
            <p className="text-sm text-gray-600">Se hvor mange der klikker på dine håndværkere</p>
          </div>
        </div>
        <button
          onClick={exportToCSV}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
        >
          Eksporter til Excel
        </button>
      </div>

      {/* Time Filter */}
      <div className="flex gap-2 flex-wrap">
        {[
          { value: 'all', label: 'Alle tid' },
          { value: 'today', label: 'I dag' },
          { value: 'week', label: 'Sidste 7 dage' },
          { value: 'month', label: 'Sidste 30 dage' }
        ].map(filter => (
          <button
            key={filter.value}
            onClick={() => setTimeFilter(filter.value as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              timeFilter === filter.value
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Total Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 opacity-80" />
          </div>
          <div className="text-3xl font-bold">{totalStats.totalClicks}</div>
          <div className="text-blue-100 text-sm">Total klik</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Phone className="w-8 h-8 opacity-80" />
          </div>
          <div className="text-3xl font-bold">{totalStats.phoneClicks}</div>
          <div className="text-green-100 text-sm">Telefon klik</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <ExternalLink className="w-8 h-8 opacity-80" />
          </div>
          <div className="text-3xl font-bold">{totalStats.websiteClicks}</div>
          <div className="text-purple-100 text-sm">Hjemmeside klik</div>
        </div>
      </div>

      {/* Stats Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Placering
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Virksomhed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center justify-center gap-1">
                    <Phone className="w-4 h-4" />
                    Telefon
                  </div>
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center justify-center gap-1">
                    <ExternalLink className="w-4 h-4" />
                    Hjemmeside
                  </div>
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Indlæser statistik...
                  </td>
                </tr>
              ) : stats.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Ingen klik-data endnu. Vent på at brugere klikker på "Se nummer" eller "Hjemmeside".
                  </td>
                </tr>
              ) : (
                stats.map((stat, index) => (
                  <tr key={stat.craftsman.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-center font-bold ${
                        index === 0 ? 'text-yellow-600 text-xl' :
                        index === 1 ? 'text-gray-400 text-lg' :
                        index === 2 ? 'text-orange-600 text-lg' :
                        'text-gray-600'
                      }`}>
                        #{index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{stat.craftsman.companyName}</div>
                      <div className="text-sm text-gray-500">{stat.craftsman.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                        {stat.craftsman.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="text-lg font-semibold text-green-600">{stat.phoneClicks}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="text-lg font-semibold text-blue-600">{stat.websiteClicks}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="text-xl font-bold text-gray-900">{stat.totalClicks}</div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          💡 <strong>Tips:</strong> Data opdateres automatisk når siden indlæses. 
          Klik på tidsfiltrene for at se statistik for forskellige perioder. 
          Brug "Eksporter til Excel" for at gemme data til videre analyse.
        </p>
      </div>
    </div>
  );
}
