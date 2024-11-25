"use client";

import { useState } from "react";
import { FiCopy, FiCheckCircle } from "react-icons/fi";

export default function ShortenForm() {
  const [url, setUrl] = useState<string>("");
  const [customAlias, setCustomAlias] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl: url, customAlias }),
    });

    const data = await res.json();
    if (res.ok) {
      setShortUrl(`${data.shortUrl}`);
      setCopied(false);
    } else {
      alert(data.error);
    }
  };

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-extrabold text-center text-gray-800">
          ✂️ URL Shortener
        </h1>
        <p className="text-sm text-gray-500 text-center mt-2">
          Create short and memorable links with ease.
        </p>

        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Enter URL:
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-700"
              placeholder="https://example.com"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 font-medium mb-1">
              Custom Alias (Optional):
            </label>
            <input
              type="text"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-600"
              placeholder="my-custom-alias"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 rounded-lg mt-6 transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            Shorten URL 🚀
          </button>
        </form>

        {shortUrl && (
          <div className="mt-8 bg-gray-100 p-4 rounded-lg shadow-md">
            <p className="text-gray-700 text-sm">Your Shortened URL:</p>
            <div className="flex items-center justify-between mt-2">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium underline truncate"
              >
                {shortUrl}
              </a>
              <button
                onClick={handleCopy}
                className="ml-2 p-2 rounded-full text-gray-600 hover:bg-gray-200 transition"
              >
                {copied ? (
                  <FiCheckCircle className="text-green-500" size={20} />
                ) : (
                  <FiCopy size={20} />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
