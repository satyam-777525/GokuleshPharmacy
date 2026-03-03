const { StandardCheckoutClient, Env } = require('pg-sdk-node');

let clientInstance = null;

function ensurePhonePeConfigured() {
  if (!process.env.PHONEPE_CLIENT_ID || !process.env.PHONEPE_CLIENT_SECRET) {
    throw new Error('PhonePe gateway not configured');
  }
}

function getPhonePeClient() {
  if (clientInstance) return clientInstance;

  ensurePhonePeConfigured();

  const clientId = process.env.PHONEPE_CLIENT_ID;
  const clientSecret = process.env.PHONEPE_CLIENT_SECRET;
  const clientVersion = process.env.PHONEPE_CLIENT_VERSION || '1.0.0';
  const env = process.env.PHONEPE_ENV === 'PROD' ? Env.PRODUCTION : Env.SANDBOX;

  clientInstance = StandardCheckoutClient.getInstance(clientId, clientSecret, clientVersion, env);
  return clientInstance;
}

module.exports = {
  getPhonePeClient,
  ensurePhonePeConfigured
};

