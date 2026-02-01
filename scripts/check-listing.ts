
import { loadEnvConfig } from '@next/env';
import { getCreators } from '../lib/actions';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

async function test() {
    try {
        console.log('Fetching creators...');
        const creators = await getCreators();
        console.log(`Found ${creators.length} creators.`);
        if (creators.length > 0) {
            console.log('First creator:', creators[0].name);
        } else {
            console.log('No creators returned.');
        }
    } catch (error) {
        console.error('Error fetching creators:', error);
    }
}

test();
