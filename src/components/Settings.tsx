import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { getSettings, updateSettings, type Settings } from '../services/settings';

export function Settings() {
  const [settings, setSettings] = useState<Partial<Settings>>({
    discord_token: '',
    overseerr_url: '',
    overseerr_api_key: '',
    tmdb_api_key: '',
    tautulli_url: '',
    tautulli_api_key: '',
    max_results: 5
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await getSettings();
      if (data) {
        setSettings(data);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = await updateSettings(settings);
      if (updated) {
        toast.success('Settings saved successfully!');
        // Reload the bot to apply new settings
        await fetch('/api/reload', { method: 'POST' });
      } else {
        throw new Error('Failed to update settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value, 10) : value
    }));
  };

  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6, 7].map(i => (
              <div key={i} className="h-10 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Bot Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="discord_token" className="block text-sm font-medium text-gray-700">
            Discord Bot Token
          </label>
          <input
            type="password"
            name="discord_token"
            id="discord_token"
            value={settings.discord_token}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="overseerr_url" className="block text-sm font-medium text-gray-700">
            Overseerr URL
          </label>
          <input
            type="text"
            name="overseerr_url"
            id="overseerr_url"
            value={settings.overseerr_url}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="overseerr_api_key" className="block text-sm font-medium text-gray-700">
            Overseerr API Key
          </label>
          <input
            type="password"
            name="overseerr_api_key"
            id="overseerr_api_key"
            value={settings.overseerr_api_key}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="tmdb_api_key" className="block text-sm font-medium text-gray-700">
            TMDB API Key
          </label>
          <input
            type="password"
            name="tmdb_api_key"
            id="tmdb_api_key"
            value={settings.tmdb_api_key}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="tautulli_url" className="block text-sm font-medium text-gray-700">
            Tautulli URL
          </label>
          <input
            type="text"
            name="tautulli_url"
            id="tautulli_url"
            value={settings.tautulli_url}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="tautulli_api_key" className="block text-sm font-medium text-gray-700">
            Tautulli API Key
          </label>
          <input
            type="password"
            name="tautulli_api_key"
            id="tautulli_api_key"
            value={settings.tautulli_api_key}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="max_results" className="block text-sm font-medium text-gray-700">
            Maximum Search Results
          </label>
          <input
            type="number"
            name="max_results"
            id="max_results"
            min="1"
            max="10"
            value={settings.max_results}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <p className="mt-1 text-sm text-gray-500">Number of results to show for media searches (1-10)</p>
        </div>

        <div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}