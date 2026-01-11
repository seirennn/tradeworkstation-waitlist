import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { LRUCache } from 'lru-cache';

// Initialize LRU Cache for Rate Limiting
// Max 500 unique IPs, TTL 30 minutes
const rateLimit = new LRUCache<string, number>({
    max: 500,
    ttl: 1000 * 60 * 30, // 30 minutes
});

// Initialize Supabase Client (Service Role for secure server-side operations)
// If Service Key is missing, fallback to Anon Key (still works if RLS allows)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
    try {
        // 1. Get Client IP
        // X-Forwarded-For is standard for proxies (Vercel, etc.)
        const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';

        // 2. Check Rate Limit (5 requests per 30 mins)
        const currentCount = rateLimit.get(ip) || 0;
        if (currentCount >= 5) {
            return NextResponse.json(
                { error: 'Rate limit exceeded. Please try again later.' },
                { status: 429 }
            );
        }
        rateLimit.set(ip, currentCount + 1);

        // 3. Parse Body
        const { email } = await req.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
        }

        // 4. Insert into Supabase
        const { error } = await supabase
            .from('waitlist')
            .insert([{ email }]);

        if (error) {
            if (error.code === '23505') { // Unique violation
                // Return 200 for duplicates to not leak info / discourage user
                return NextResponse.json({ message: "You're already on the list!" }, { status: 200 });
            }
            throw error;
        }

        return NextResponse.json({ message: "You're in! We'll be in touch." }, { status: 200 });

    } catch (error) {
        console.error('Waitlist API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
