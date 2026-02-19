import { useState, useEffect } from 'react';
import { Craftsman } from '../types';
import { api } from '../utils/api';
import { Plus, Edit2, Trash2, X, Save, Home, AlertCircle, LogOut, BarChart3 } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { getSupabaseClient } from '../utils/supabase/client';
import { StatsPanel } from './StatsPanel';
import { AddressAutocomplete } from './AddressAutocomplete';

export function AdminPanel() {
  const [craftsmen, setCraftsmen] = useState<Craftsman[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Craftsman>>({});
  const [authenticating, setAuthenticating] = useState(true);
  const [activeTab, setActiveTab] = useState<'craftsmen' | 'stats'>('craftsmen');
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const accessToken = localStorage.getItem('admin_access_token');
      
      if (!accessToken) {
        navigate('/admin-login');
        return;
      }

      // Verify token with Supabase
      const supabase = getSupabaseClient();

      const { data: { user }, error } = await supabase.auth.getUser(accessToken);

      if (error || !user) {
        localStorage.removeItem('admin_access_token');
        navigate('/admin-login');
        return;
      }

      // User is authenticated
      setAuthenticating(false);
      loadCraftsmen();
    } catch (error) {
      console.error('Auth error:', error);
      navigate('/admin-login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_access_token');
    navigate('/admin-login');
  };

  const loadCraftsmen = async () => {
    try {
      setLoading(true);
      const data = await api.getCraftsmen();
      setCraftsmen(data);
    } catch (error) {
      console.error('Error loading craftsmen:', error);
      alert('Fejl ved indlæsning af håndværkere');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await api.updateCraftsman(editingId, formData);
      } else {
        await api.createCraftsman(formData as Omit<Craftsman, 'id'>);
      }
      await loadCraftsmen();
      setEditingId(null);
      setShowAddForm(false);
      setFormData({});
    } catch (error) {
      console.error('Error saving craftsman:', error);
      alert('Fejl ved gemning af håndværker');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Er du sikker på at du vil slette denne håndværker?')) return;
    
    try {
      await api.deleteCraftsman(id);
      await loadCraftsmen();
    } catch (error) {
      console.error('Error deleting craftsman:', error);
      alert('Fejl ved sletning af håndværker');
    }
  };

  const handleEdit = (craftsman: Craftsman) => {
    setEditingId(craftsman.id);
    setFormData(craftsman);
    setShowAddForm(false);
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({});
  };

  const handleAddNew = () => {
    setShowAddForm(true);
    setEditingId(null);
    setFormData({
      companyName: '',
      address: '',
      phone: '',
      category: 'VVS',
      hourlyRate: undefined,
      website: ''
    });
  };

  if (authenticating) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Godkender adgang...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Indlæser...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-gray-900 hover:text-red-600 transition-colors"
            >
              <AlertCircle className="w-6 h-6" />
              <span className="text-xl font-bold">Akutvagt</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Tilbage til forsiden</span>
                <span className="sm:hidden">Forside</span>
              </Link>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Log ud</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 sm:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('craftsmen')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                  activeTab === 'craftsmen'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Håndværkere ({craftsmen.length})
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors border-b-2 ${
                  activeTab === 'stats'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Statistik
              </button>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'craftsmen' ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Administrer håndværkere</h1>
                  <button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Tilføj ny
                  </button>
                </div>

                {/* Add/Edit Form */}
                {(showAddForm || editingId) && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border-2 border-red-200">
                    <h3 className="font-semibold mb-4">
                      {editingId ? 'Rediger håndværker' : 'Tilføj ny håndværker'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Virksomhedsnavn *
                        </label>
                        <input
                          type="text"
                          value={formData.companyName || ''}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Kategori *
                        </label>
                        <select
                          value={formData.category || 'VVS'}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                          <option value="VVS">VVS</option>
                          <option value="Elektriker">Elektriker</option>
                          <option value="Glarmester">Glarmester</option>
                          <option value="Låsesmed">Låsesmed</option>
                          <option value="Tømrer">Tømrer</option>
                          <option value="Murer">Murer</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Adresse * <span className="text-xs text-gray-500">(Koordinater udfyldes automatisk)</span>
                        </label>
                        <AddressAutocomplete
                          value={formData.address || ''}
                          onChange={(address, lat, lon) => {
                            setFormData({ ...formData, address, lat, lon });
                          }}
                          placeholder="Søg og vælg adresse (f.eks. Nørregade 10, Aarhus)"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Telefon *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone || ''}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+45 12 34 56 78"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Timepris (kr.)
                        </label>
                        <input
                          type="number"
                          value={formData.hourlyRate || ''}
                          onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value ? Number(e.target.value) : undefined })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Hjemmeside
                        </label>
                        <input
                          type="url"
                          value={formData.website || ''}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          placeholder="https://www.eksempel.dk"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={handleSave}
                        disabled={!formData.companyName || !formData.address || !formData.phone || !formData.category}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        Gem
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Annuller
                      </button>
                    </div>
                  </div>
                )}

                {/* List */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Virksomhed</th>
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Kategori</th>
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700 hidden sm:table-cell">Telefon</th>
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700 hidden md:table-cell">Timepris</th>
                        <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">Handlinger</th>
                      </tr>
                    </thead>
                    <tbody>
                      {craftsmen.map((craftsman) => (
                        <tr key={craftsman.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-2 text-sm">{craftsman.companyName}</td>
                          <td className="py-3 px-2 text-sm">
                            <span className="inline-block px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                              {craftsman.category}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-sm text-gray-600 hidden sm:table-cell">{craftsman.phone}</td>
                          <td className="py-3 px-2 text-sm text-gray-600 hidden md:table-cell">
                            {craftsman.hourlyRate ? `${craftsman.hourlyRate} kr.` : '-'}
                          </td>
                          <td className="py-3 px-2 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleEdit(craftsman)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                title="Rediger"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(craftsman.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Slet"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {craftsmen.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    Ingen håndværkere tilføjet endnu
                  </div>
                )}
              </>
            ) : (
              <StatsPanel />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}