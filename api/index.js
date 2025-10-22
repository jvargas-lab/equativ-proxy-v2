export default async function handler(req, res) {
  // Variables desde el entorno de Vercel
  const targetUrl = process.env.TARGET_URL;
  const apiKey = process.env.API_KEY;
  const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";

  // CORS
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // Agregar el encabezado Authorization
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: req.method === "GET" ? undefined : JSON.stringify(req.body),
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({ error: "fetch failed" });
  }
}
