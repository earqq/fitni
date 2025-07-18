export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ message: "API funcionando ✅" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbzDgB5j4-l1AERAcAiwwEXBxHd0W4suNt5h51Y8gqwzzPEKIbS3Aq9A2t3EumxLrxUb/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();

    try {
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch (jsonError) {
      return res.status(502).json({
        error: "Invalid JSON response from Google Script",
        rawResponse: text,
        googleStatus: response.status,
        googleStatusText: response.statusText,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Error forwarding request",
      details: error.message,
      stack: error.stack,
    });
  }
}