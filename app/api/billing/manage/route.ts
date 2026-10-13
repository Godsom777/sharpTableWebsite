import { NextRequest, NextResponse } from 'next/server';
import { handleBillingAction } from '@godsom777/sharptable-backend';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json().catch(() => ({}));
    const result = await handleBillingAction(
      {
        action: payload.action,
        targetPlan: payload.targetPlan,
        authorizationHeader: request.headers.get('authorization'),
      },
      {
        supabaseUrl: process.env.APP_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        supabaseAnonKey: process.env.APP_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
        supabaseServiceRoleKey: process.env.APP_SUPABASE_SERVICE_ROLE_KEY || '',
        paystackSecretKey: process.env.PAYSTACK_SECRET_KEY || '',
      }
    );

    return NextResponse.json(result.body, { status: result.status });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Billing action failed.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
