
import { loadEnvConfig } from '@next/env';
const projectDir = process.cwd();
loadEnvConfig(projectDir);

async function testRegistration() {
    console.log('Testing registration with multiple niches and media links...');

    // Dynamic import to ensure env vars are loaded first
    const { registerCreator, getCreatorBySlug } = await import('../lib/actions');
    const mongoose = (await import('mongoose')).default;

    const testData = {
        name: 'Test Multi Niche',
        handle: '@testmulti' + Date.now(),
        platform: 'instagram',
        niche: ['Tech', 'Gaming', 'Education'],
        rate: 1500,
        mediaLinks: ['https://example.com/photo1.jpg', 'https://example.com/video1.mp4'],
        portfolioUrl: 'https://test.com'
    };

    const result = await registerCreator(testData);

    if (result.success) {
        console.log('Registration success:', result.data.slug);

        // Verify data
        const creator = await getCreatorBySlug(result.data.slug);
        if (!creator) {
            console.error('Failed to fetch creator after registration');
            process.exit(1);
        }

        console.log('Fetched Creator Niche:', creator.niche);
        console.log('Fetched Creator Media Links:', creator.mediaLinks);

        if (Array.isArray(creator.niche) && creator.niche.length === 3 && Array.isArray(creator.mediaLinks) && creator.mediaLinks.length === 2) {
            console.log('VERIFICATION PASSED: Data saved correctly as arrays.');
        } else {
            console.error('VERIFICATION FAILED: Data shape mismatch.');
        }

    } else {
        console.error('Registration failed:', result.error);
    }
}

testRegistration().then(() => {
    console.log('Test complete');
    process.exit(0);
}).catch(err => {
    console.error('Test error:', err);
    process.exit(1);
});
