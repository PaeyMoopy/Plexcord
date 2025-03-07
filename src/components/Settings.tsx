import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';

interface Settings {
  discordToken: string;
  overseerrUrl: string;
  overseerrApiKey: string;
  tmdbApiKey: string;
  tautulliUrl: string;
  tautulliApiKey: string;
  maxResults: number;
}

export function Settings() {
  const [settings, setSettings] = useState<Settings>({
    discordToken: '',
    overseerrUrl: '',
    overseerrApiKey: '',
    tmdbApiKey: '',
    tautulliUrl: '',
    tautulliApiKey: '',
    maxResults: 5
  });

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('botSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('botSettings', JSON.stringify(settings));
    toast.success('Settings saved successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Bot Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="discordToken" className="block text-sm font-medium text-gray-700">
            Discord Bot Token
          </label>
          <input
            type="password"
            name="discordToken"
            id="discordToken"
            value={settings.discordToken}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="overseerrUrl" className="block text-sm font-medium text-gray-700">
            Overseerr URL
          </label>
          <input
            type="text"
            name="overseerrUrl"
            id="overseerrUrl"
            value={settings.overseerrUrl}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="overseerrApiKey" className="block text-sm font-medium text-gray-700">
            Overseerr API Key
          </label>
          <input
            type="password"
            name="overseerrApiKey"
            id="overseerrApiKey"
            value={settings.overseerrApiKey}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="tmdbApiKey" className="block text-sm font-medium text-gray-700">
            TMDB API Key
          </label>
          <input
            type="password"
            name="tmdbApiKey"
            id="tmdbApiKey"
            value={settings.tmdbApiKey}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="tautulliUrl" className="block text-sm font-medium text-gray-700">
            Tautulli URL
          </label>
          <input
            type="text"
            name="tautulliUrl"
            id="tautulliUrl"
            value={settings.tautulliUrl}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="tautulliApiKey" className="block text-sm font-medium text-gray-700">
            Tautulli API Key
          </label>
          <input
            type="password"
            name="tautulliApiKey"
            id="tautulliApiKey"
            value={settings.tautulliApiKey}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="maxResults" className="block text-sm font-medium text-gray-700">
            Maximum Search Results
          </label>
          <input
            type="number"
            name="maxResults"
            id="maxResults"
            min="1"
            max="10"
            value={settings.maxResults}
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