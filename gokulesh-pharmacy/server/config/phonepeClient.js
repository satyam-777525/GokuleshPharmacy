const { StandardCheckoutClient, Env } = require('pg-sdk-node');

let clientInstance = null;
let cachedClientKey = '';

/**
 * PUBLIC_URL base for redirects and CORS — no trailing slash.
 * PhonePe rejects pay requests if redirectUrl does not exactly match the URL
 * registered in the merchant dashboard (including https vs http).
 */
function normalizeClientBaseUrl(url) {
  const fallback = 'http://localhost:3000';
  if (!url || typeof url !== 'string') return fallback;
  const trimmed = url.trim().replace(/\/+$/, '');
  return trimmed || fallback;
}

function ensurePhonePeConfigured() {
  if (!process.env.PHONEPE_CLIENT_ID || !process.env.PHONEPE_CLIENT_SECRET) {
    throw new Error('PhonePe gateway not configured');
  }
}

function getPhonePeClient() {
  const clientId = process.env.PHONEPE_CLIENT_ID;
  const clientSecret = process.env.PHONEPE_CLIENT_SECRET;
  const clientVersion = process.env.PHONEPE_CLIENT_VERSION || '1.0.0';
  const envFlag = process.env.PHONEPE_ENV === 'PROD' ? 'PROD' : 'SANDBOX';
  const env = envFlag === 'PROD' ? Env.PRODUCTION : Env.SANDBOX;

  // Recreate client if credentials or environment changed (e.g. after .env reload in dev)
  const key = `${clientId}|${clientSecret}|${envFlag}|${clientVersion}`;
  if (clientInstance && cachedClientKey === key) {
    return clientInstance;
  }

  ensurePhonePeConfigured();
  clientInstance = StandardCheckoutClient.getInstance(clientId, clientSecret, clientVersion, env);
  cachedClientKey = key;
  return clientInstance;
}

module.exports = {
  getPhonePeClient,
  ensurePhonePeConfigured,
  normalizeClientBaseUrl
};

