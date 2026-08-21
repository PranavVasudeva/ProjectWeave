export default function handler(req, res) {
  res.status(200).json({
    success: true,
    aiConfigured: !!process.env.GEMINI_API_KEY,
    model: "gemini-2.5-flash"
  });
}