import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const query = url.searchParams.get('query');
    const response = await axios.get(`http://localhost:5001/api/search`, { params: { query } });
    return NextResponse.json(response.data);
}
