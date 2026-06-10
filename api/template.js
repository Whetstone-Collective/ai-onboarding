export default async function handler(req, res) {
  const GITHUB_ZIP = "https://codeload.github.com/Whetstone-Collective/ai-workspace-template/zip/refs/heads/main";
  
  try {
    const response = await fetch(GITHUB_ZIP);
    if (!response.ok) throw new Error(`GitHub fetch failed: ${response.status}`);
    
    const buffer = await response.arrayBuffer();
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", "attachment; filename=template.zip");
    res.status(200).send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
