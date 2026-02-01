
import { loadEnvConfig } from '@next/env';
import mongoose from 'mongoose';
import Creator from '../models/Creator';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

async function verify() {
    const MONGODB_URI = process.env.MONGODB_URI;
    console.log('MONGODB_URI:', MONGODB_URI ? 'Set' : 'Not Set');

    if (!MONGODB_URI) {
        console.error('MONGODB_URI must be set');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const count = await Creator.countDocuments();
        console.log(`Creator count: ${count}`);

        if (count > 0) {
            const first = await Creator.findOne().lean();
            console.log('First creator:', JSON.stringify(first, null, 2));
        } else {
            console.log('No creators found. Database is empty.');
        }

    } catch (error) {
        console.error('Error verifying DB:', error);
    } finally {
        await mongoose.disconnect();
    }
}

verify();
