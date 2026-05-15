import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const productsData = JSON.parse(fs.readFileSync('/home/team/shared/initial-products.json', 'utf8'));

async function sync() {
    console.log('Syncing products...');
    
    for (const p of productsData) {
        const slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        let downloadUrl = '';
        
        if (p.type === 'notion') {
            // Placeholder Notion URLs
            if (slug === 'solopreneur-os') {
                downloadUrl = 'https://etherforge.notion.site/Solopreneur-OS-Template-7a8b9c1d2e3f4g5h6i7j8k9l0m';
            } else if (slug === 'adhd-focus-system') {
                downloadUrl = 'https://etherforge.notion.site/ADHD-Focus-System-Template-1d2e3f4g5h6i7j8k9l0m1n2o3p';
            } else {
                downloadUrl = `https://notion.so/etherforge/${slug}`;
            }
        } else if (p.type === 'bundle' || p.type === 'automation' || p.type === 'prompts') {
            downloadUrl = `/downloads/${slug}.zip`;
        } else {
            downloadUrl = `/downloads/${slug}.pdf`;
        }

        console.log(`Updating ${p.title} (${p.type}) -> ${downloadUrl}`);

        const { error } = await supabase
            .from('products')
            .update({ 
                type: p.type,
                download_url: downloadUrl
            })
            .eq('slug', slug);

        if (error) {
            console.error(`Error updating ${p.title}:`, error);
        }
    }
    console.log('Sync complete.');
}

sync();
