'use server'

import dbConnect from './db';
import Creator, { ICreator } from '@/models/Creator';

// Provide a type safe way to get creators
export async function getCreators(search: string = '', filter: string = '') {
    await dbConnect();

    const query: any = {};

    if (search) {
        const searchRegex = new RegExp(search, 'i');
        query.$or = [
            { name: searchRegex },
            { niche: searchRegex },
            { platform: searchRegex },
            { recentActivity: searchRegex }
        ];
    }

    if (filter) {
        const filterRegex = new RegExp(filter, 'i');
        query.$or = [
            { niche: filterRegex },
            { recentActivity: filterRegex },
            { platform: filterRegex }
        ];
    }

    const creators = await Creator.find(query).sort({ createdAt: -1 }).lean();

    // Robust serialization
    const deepClean = JSON.parse(JSON.stringify(creators));
    return deepClean.map((c: any) => ({ ...c, id: c.id || c._id })) as ICreator[];
}

export async function getCreatorBySlug(slug: string) {
    await dbConnect();
    const creator = await Creator.findOne({ slug }).lean();
    if (!creator) return null;

    const deepClean = JSON.parse(JSON.stringify(creator));
    return { ...deepClean, id: deepClean.id || deepClean._id } as ICreator;
}

export async function registerCreator(data: any) {
    console.log('registerCreator called with:', data);
    await dbConnect();

    try {
        // Generate slug from handle if not provided
        const slug = data.handle.replace(/[^a-z0-9]/gi, '-').toLowerCase();

        // Default values for new creators
        const newCreator = new Creator({
            ...data,
            slug,
            followers: 0,
            engagementRate: 0,
            numPosts: 0,
            brandDeals: 0,
            geography: [],
            packages: [],
            topPosts: [],
            demographics: {
                ageRange: [],
                gender: [],
                topLocations: []
            },
            recentActivity: 'New Joiner'
        });

        await newCreator.save();

        // Return the created creator as a plain object
        const saved = await Creator.findById(newCreator._id).lean();

        const deepClean = JSON.parse(JSON.stringify(saved));
        const result = { ...deepClean, id: deepClean.id || deepClean._id };

        return {
            success: true,
            data: result
        };
    } catch (error: any) {
        console.error('Registration failed:', error);
        return { success: false, error: error.message };
    }
}
