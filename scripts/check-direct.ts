
import { loadEnvConfig } from '@next/env';
import mongoose from 'mongoose';
import Creator from '../models/Creator';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

async function check() {
    console.log('--- Checking Database ---');
    if (!process.env.MONGODB_URI) {
        console.error('MONGODB_URI not found!');
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB.');

        const count = await Creator.countDocuments();
        console.log(`\nTotal Creators: ${count}`);

        if (count > 0) {
            const sample = await Creator.findOne().lean();
            console.log('\nSample Creator:');
            console.log(`Name: ${sample.name}`);
            console.log(`Platform: ${sample.platform}`);
            console.log(`Slug: ${sample.slug}`);
        } else {
            console.warn('\nWARNING: Database is empty!');
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
        console.log('\n--- Done ---');
    }
}

check();
