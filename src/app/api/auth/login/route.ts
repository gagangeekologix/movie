import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
    const { username, password } = await request.json();

    try {
        const response = await axios.post('http://localhost:5001/api/auth/login', { username, password });
        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
}
