export default async function handler(req, res) {
  const targetUrl = process.env.TARGET_URL;

  if (!targetUrl) {
    return res.status(500).json({ error: 'Missing TARGET_URL environment variable' });
  }

  try {
    // Reenvía el request recibido al servidor de Equativ
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': req.headers['authorization'], // <-- importante
      },
      body: req.body, // reenvía el cuerpo recibido
    });

    const data = await response.text();

    res.status(response.status).send(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: error.message || 'fetch failed' });
  }
}
