/**
 * Generate 4 custom AI illustrations for AstroKalki service cards.
 * Each illustration matches the platform's dark cinematic aesthetic:
 * Deep obsidian backgrounds, warm gold accents, bone white highlights.
 * 
 * Style: Abstract, moody, symbolic — A24/Dune meets editorial illustration.
 * No text, no faces — purely atmospheric and symbolic.
 */

import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/home/z/my-project/public/images';

const illustrations = [
  {
    filename: 'service-recognition.png',
    prompt: `Abstract dark cinematic illustration representing pattern recognition and seeing hidden structures. A single golden thread weaving through a dense dark fog, forming a geometric knot in the center. Obsidian black background with subtle warm gold luminescence emanating from the thread. Bone white fragments of shattered glass floating around the knot. Moody atmospheric lighting, minimalist composition, no text no faces. Style: editorial dark luxury, A24 film poster aesthetic, deep shadows, high contrast.`,
    size: '1024x1024',
  },
  {
    filename: 'service-diagnosis.png',
    prompt: `Abstract dark cinematic illustration representing deep psychological diagnosis and shadow confrontation. A mirror cracked down the center, reflecting two different versions of the same dark corridor. One side has a faint golden glow, the other side is pure obsidian shadow. The crack in the mirror emits warm gold light like lava. Atmospheric fog, deep blacks, cinematic depth of field. No text no faces. Style: dark editorial luxury, Dune film aesthetic, deep shadows, high contrast gold and black.`,
    size: '1024x1024',
  },
  {
    filename: 'service-realignment.png',
    prompt: `Abstract dark cinematic illustration representing dharma navigation and life realignment. A compass made of golden light floating in a vast dark desert landscape, its needle pointing toward a distant golden horizon. Obsidian sand dunes with subtle bone white highlights. The compass emanates warm gold rays cutting through darkness. Atmospheric fog, cinematic wide composition. No text no faces. Style: editorial dark luxury, Interstellar film aesthetic, deep shadows, warm gold and obsidian black.`,
    size: '1024x1024',
  },
  {
    filename: 'service-integration.png',
    prompt: `Abstract dark cinematic illustration representing warrior integration and complete transformation. A dark obsidian mountain peak with a single warrior silhouette standing at the summit, surrounded by a golden aurora borealis. The aurora forms sacred geometric patterns in warm gold and bone white against the deep black sky. Cinematic scale, epic atmosphere, atmospheric fog layers. No text no faces. Style: dark editorial luxury, A24 film poster, deep shadows, warm gold luminance against obsidian void.`,
    size: '1024x1024',
  },
];

async function generateIllustrations() {
  const zai = await ZAI.create();

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const results = [];

  for (const illustration of illustrations) {
    const outputPath = path.join(OUTPUT_DIR, illustration.filename);

    // Skip if already generated
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipping ${illustration.filename} — already exists`);
      results.push({ ...illustration, success: true, cached: true });
      continue;
    }

    try {
      console.log(`🎨 Generating ${illustration.filename}...`);
      console.log(`   Prompt: ${illustration.prompt.substring(0, 80)}...`);

      const response = await zai.images.generations.create({
        prompt: illustration.prompt,
        size: illustration.size,
      });

      const imageBase64 = response.data[0].base64;
      const buffer = Buffer.from(imageBase64, 'base64');
      fs.writeFileSync(outputPath, buffer);

      const fileSizeMB = (buffer.length / (1024 * 1024)).toFixed(2);
      console.log(`   ✅ Saved: ${outputPath} (${fileSizeMB} MB)`);
      results.push({ ...illustration, success: true, cached: false, fileSize: buffer.length });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error(`   ❌ Failed: ${msg}`);
      results.push({ ...illustration, success: false, error: msg });
    }
  }

  console.log('\n📊 Generation Summary:');
  const successful = results.filter(r => r.success);
  const cached = results.filter(r => r.cached);
  const failed = results.filter(r => !r.success);
  console.log(`   ✅ Generated: ${successful.length - cached.length}`);
  console.log(`   ⏭️  Cached: ${cached.length}`);
  console.log(`   ❌ Failed: ${failed.length}`);

  return results;
}

generateIllustrations().catch(console.error);
