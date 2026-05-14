// Simple test script for the AI generator
// Run with: node scripts/test-generator.js

const mockGenerate = (niche, type) => {
  return {
    title: `Premium ${niche} ${type}`,
    value_prop: `The ultimate solution for ${niche} professionals.`,
    description: `This high-margin ${type} is designed to solve the core challenges of ${niche} by leveraging AI-powered autonomy.`,
    price: 47.00,
    type: type,
    features: [
      "Customizable Dashboard",
      "AI-Automated Workflows",
      "Priority Support"
    ],
    content_preview: {
      structure: ["Setup Guide", "Main Database", "Resources"],
      sample_content: "Welcome to your new autonomous workflow..."
    },
    seo_metadata: {
      keywords: [niche, type, "automation", "EtherForge"],
      meta_description: `Get the best ${niche} ${type} at EtherForge.`
    }
  };
};

const niche = process.argv[2] || "Productivity";
const type = process.argv[3] || "notion";

console.log(`Generating product for Niche: ${niche}, Type: ${type}...`);
const result = mockGenerate(niche, type);
console.log("Generated Product Data:");
console.log(JSON.stringify(result, null, 2));
