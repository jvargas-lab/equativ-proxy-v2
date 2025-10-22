export default async function handler(req, res) {
  const API_URL = "https://insights.smartadserverapis.com/report-async";
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: token,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
