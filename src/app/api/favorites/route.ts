import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const response = await axios.get('http://localhost:5001/api/favorites', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return NextResponse.json({ message: 'Failed to fetch favorites' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    try {
        const response = await axios.post('http://localhost:5001/api/favorites/add', body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error adding favorite:', error);
        return NextResponse.json({ message: 'Failed to add favorite' }, { status: 500 });
    }
}
