import React from 'react';

export function Home() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Media Bot</h2>
      <p className="text-gray-600 mb-4">
        This bot helps you manage media requests and subscriptions. Use the following commands in Discord:
      </p>
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="font-semibold text-gray-900">!request [title] (movie|tv)</h3>
          <p className="text-gray-600">Search and request movies or TV shows. Add (movie) or (tv) to filter results.</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="font-semibold text-gray-900">!subscribe [title] (movie|tv) [-e|-episode]</h3>
          <p className="text-gray-600">
            Subscribe to get notified when content becomes available. Add (movie) or (tv) to filter results.
            Use -e or -episode flag to subscribe to new episodes of a TV show.
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="font-semibold text-gray-900">!list</h3>
          <p className="text-gray-600">View your current subscriptions</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="font-semibold text-gray-900">!unsubscribe</h3>
          <p className="text-gray-600">Remove a subscription</p>
        </div>
      </div>
    </div>
  );
}