import { loadEnvConfig } from '@next/env';
import Creator from '../models/Creator';
import { creators } from '../lib/mockData';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

// Dynamic import to ensure env vars are loaded
const dbConnect = async () => {
    const { default: connect } = await import('../lib/db');
    return connect();
};

// Enrich mock data with new required fields
const enrichedCreators = creators.map((c) => ({
    ...c,
    numPosts: Math.floor(Math.random() * 500) + 50,
    geography: c.demographics.topLocations,
    experience: `${Math.floor(Math.random() * 5) + 1} Years`,
    brandDeals: Math.floor(Math.random() * 20) + 5,
    frequency: '2-3 posts/week',
    socials: [
        { platform: c.platform, url: `https://${c.platform}.com/${c.handle.replace('@', '')}` }
    ]
}));

async function seed() {
    await dbConnect();

    console.log('Connected to DB. Clearing existing creators...');
    await Creator.deleteMany({});

    console.log('Seeding creators...');
    await Creator.insertMany(enrichedCreators);

    console.log('Seeding complete!');
    process.exit(0);
}

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});
