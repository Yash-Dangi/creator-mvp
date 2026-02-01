import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICreator extends Document {
    id: string; // Mapped from _id
    slug: string;
    name: string;
    handle: string;
    platform: 'instagram' | 'youtube' | 'tiktok';
    niche: string;
    followers: number;
    engagementRate: number;
    rate: number;

    // New/Existing Fields requested
    numPosts: number;
    recentActivity: string;
    geography: string[];
    experience: string;
    brandDeals: number;

    topPosts: Array<{
        id: string; // can be internal ID
        imageUrl: string;
        likes: number;
        comments: number;
    }>;

    demographics: {
        ageRange: Array<{ label: string; value: number }>;
        gender: Array<{ label: string; value: number }>;
        topLocations: string[];
    };

    packages: Array<{
        id: string;
        name: string;
        description: string;
        price: number;
    }>;

    socials: Array<{
        platform: string;
        url: string;
    }>;

    frequency: string; // Frequency of content posting
}

const CreatorSchema = new Schema<ICreator>({
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    handle: { type: String, required: true },
    platform: { type: String, enum: ['instagram', 'youtube', 'tiktok'], required: true },
    niche: { type: String, required: true },
    followers: { type: Number, required: true },
    engagementRate: { type: Number, required: true },
    rate: { type: Number, required: true },

    numPosts: { type: Number, default: 0 },
    recentActivity: { type: String },
    geography: [String],
    experience: { type: String },
    brandDeals: { type: Number, default: 0 },

    topPosts: [{
        id: String,
        imageUrl: String,
        likes: Number,
        comments: Number
    }],

    demographics: {
        ageRange: [{ label: String, value: Number }],
        gender: [{ label: String, value: Number }],
        topLocations: [String]
    },

    packages: [{
        id: String,
        name: String,
        description: String,
        price: Number
    }],

    socials: [{
        platform: String,
        url: String
    }],

    frequency: { type: String }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            ret.id = ret._id.toHexString();
            delete ret._id;
            delete ret.__v;
        }
    }
});

// Prevent model recompilation error in development
const Creator: Model<ICreator> = mongoose.models.Creator || mongoose.model<ICreator>('Creator', CreatorSchema);

export default Creator;
