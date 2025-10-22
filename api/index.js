export default async function handler(req, res) {
  // Verifica el método
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const targetUrl = process.env.TARGET_URL;
    const apiKey = process.env.API_KEY;
    const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";

    // Permitir CORS
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    // Reenviar solicitud al endpoint real de Equativ
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${apiKey}`
      },
      body: new URLSearchParams(req.body).toString()
    });

    const data = await response.text();
    return res.status(response.status).send(data);

  } catch (error) {
    console.error("Error en el proxy:", error);
    return res.status(500).json({ error: error.message });
  }
}
