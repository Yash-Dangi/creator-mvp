import { loadEnvConfig } from '@next/env';
const projectDir = process.cwd();
loadEnvConfig(projectDir);

// Dynamic import to ensure env vars are loaded
const run = async () => {
    const { default: dbConnect } = await import('../lib/db');
    const { default: Creator } = await import('../models/Creator');

    await dbConnect();
    const count = await Creator.countDocuments();
    const sample = await Creator.findOne();

    console.log(`Total Creators: ${count}`);
    if (sample) {
        console.log('Sample Creator:', JSON.stringify(sample, null, 2));
    } else {
        console.log('No creators found.');
    }
    process.exit(0);
};

run().catch(console.error);
