export default async function handler(req, res) {
  const GITHUB_ZIP = "https://api.github.com/repos/Whetstone-Collective/ai-workspace-template/zipball/main";
  
  try {
    const response = await fetch(GITHUB_ZIP, {
      headers: {
        "User-Agent": "ai-onboarding-app",
        "Accept": "application/vnd.github+json"
      },
      redirect: "follow"
    });
    
    if (!response.ok) throw new Error(`GitHub fetch failed: ${response.status}`);
    
    const buffer = await response.arrayBuffer();
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/zip");
    res.status(200).send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
