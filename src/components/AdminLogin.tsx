import { useState } from 'react';
import { useNavigate } from 'react-router';
import { getSupabaseClient } from '../utils/supabase/client';
import { AlertCircle, Lock, Mail, Eye, EyeOff } from 'lucide-react';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const supabase = getSupabaseClient();

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError('Forkert email eller password. Husk at oprette admin i Supabase først!');
        console.error('Login error:', signInError);
        return;
      }

      if (data.session) {
        // Store session
        localStorage.setItem('admin_access_token', data.session.access_token);
        navigate('/admin-dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Der skete en fejl. Prøv igen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <AlertCircle className="w-10 h-10 text-red-600" />
            <h1 className="text-4xl font-bold text-gray-900">Akutvagt</h1>
          </div>
          <p className="text-gray-600">Admin Login</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-red-100 p-3 rounded-full">
              <Lock className="w-6 h-6 text-red-600" />
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                <p className="font-medium">{error}</p>
                {error.includes('Supabase') && (
                  <p className="mt-2 text-xs">
                    💡 Se <strong>OPRET_ADMIN.md</strong> for hvordan du opretter admin i Supabase Dashboard.
                  </p>
                )}
              </div>
            )}

            {/* Info box */}
            {!error && (
              <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-xs">
                <p className="font-medium mb-1">ℹ️ Første gang?</p>
                <p>Admin-konti oprettes i <strong>Supabase Dashboard</strong>, ikke her.</p>
                <p className="mt-1">Se <strong>OPRET_ADMIN.md</strong> for guide.</p>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="admin@akutvagt.dk"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
            >
              {loading ? 'Logger ind...' : 'Log ind'}
            </button>
          </form>

          {/* Info */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Beskyttet admin område
          </p>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Tilbage til forsiden
          </a>
        </div>
      </div>
    </div>
  );
}