
import { loadEnvConfig } from '@next/env';
import mongoose from 'mongoose';
import Creator from '../models/Creator';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

async function checkSlugs() {
    console.log('--- Checking Slugs ---');
    if (!process.env.MONGODB_URI) {
        console.error('MONGODB_URI not found!');
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const creators = await Creator.find({}, 'name slug').lean();
        console.log(`Found ${creators.length} creators:`);
        creators.forEach(c => {
            console.log(`- Name: "${c.name}", Slug: "${c.slug}"`);
        });

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
    }
}

checkSlugs();
