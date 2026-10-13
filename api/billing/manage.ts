import type { IncomingMessage, ServerResponse } from 'http';
import { handleBillingAction } from '@godsom777/sharptable-backend';

function sendJson(response: any, status: number, body: Record<string, unknown>) {
  response.status(status).setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify(body));
}

export default async function handler(request: IncomingMessage & { body?: any }, response: ServerResponse) {
  if (request.method !== 'POST') {
    sendJson(response, 405, { error: 'Method not allowed.' });
    return;
  }

  try {
    const payload = typeof request.body === 'string' ? JSON.parse(request.body || '{}') : request.body || {};
    const result = await handleBillingAction(
      {
        action: payload.action,
        targetPlan: payload.targetPlan,
        authorizationHeader: (request.headers['authorization'] as string) || null,
      },
      {
        supabaseUrl: process.env.APP_SUPABASE_URL || process.env.VITE_APP_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        supabaseAnonKey: process.env.APP_SUPABASE_ANON_KEY || process.env.VITE_APP_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
        supabaseServiceRoleKey: process.env.APP_SUPABASE_SERVICE_ROLE_KEY || '',
        paystackSecretKey: process.env.PAYSTACK_SECRET_KEY || '',
      }
    );

    sendJson(response, result.status, result.body);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Billing action failed.';
    sendJson(response, 500, { error: message });
  }
}
