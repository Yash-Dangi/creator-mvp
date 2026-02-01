
import { NextResponse } from 'next/server';
import { getCreators } from '@/lib/actions';

export async function GET() {
    try {
        const creators = await getCreators();
        return NextResponse.json({
            success: true,
            count: creators.length,
            sample: creators.slice(0, 1)
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
