import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Example response data
        const menus = [
            { id: 1, name: 'Menu 1', description: 'Description for Menu 1' },
            { id: 2, name: 'Menu 2', description: 'Description for Menu 2' },
        ];

        return NextResponse.json(menus, { status: 200 });
    } catch (error) {
        console.error('Error fetching menus:', error);
        return NextResponse.json({ error: 'Failed to fetch menus' }, { status: 500 });
    }
}