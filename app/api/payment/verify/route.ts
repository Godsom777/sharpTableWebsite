import { NextRequest, NextResponse } from 'next/server';

// Confirms a Paystack transaction on the server before the site tells anyone
// their payment succeeded. The browser only ever sees the outcome, never the
// secret key or the customer's details.

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

// Plan codes we sell, mapped to display names. Anything else is not ours.
const PLAN_NAMES: Record<string, string> = {
  PLN_mquahijhgi8tzux: 'Lite',
  PLN_rknt3upbuue6dmh: 'Pro',
  PLN_b36ulzsdy6d418n: 'Enterprise',
  PLN_2a41260dnw7z99x: 'Lite (yearly)',
  PLN_lu2vu0x7b0z4esc: 'Pro (yearly)',
  PLN_geld4bet9hwqca0: 'Enterprise (yearly)',
};

const REFERENCE_PATTERN = /^[A-Za-z0-9._=-]{6,100}$/;

type VerifyStatus = 'success' | 'pending' | 'failed';

function respond(status: VerifyStatus, extra: Record<string, unknown> = {}, httpStatus = 200) {
  return NextResponse.json(
    { status, ...extra },
    { status: httpStatus, headers: { 'Cache-Control': 'no-store' } },
  );
}

export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get('reference')?.trim() ?? '';

  if (!REFERENCE_PATTERN.test(reference)) {
    return respond('failed', { message: 'Invalid payment reference.' }, 400);
  }

  if (!PAYSTACK_SECRET_KEY) {
    console.error('[payment/verify] PAYSTACK_SECRET_KEY is not set');
    return respond('pending', { message: 'Payment could not be verified right now.' }, 503);
  }

  let body: any;
  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
        cache: 'no-store',
      },
    );
    body = await response.json().catch(() => null);

    if (response.status === 404 || body?.status === false) {
      return respond('failed', { message: 'We could not find this payment.' });
    }
    if (!response.ok || !body?.data) {
      return respond('pending', { message: 'Payment could not be verified right now.' }, 502);
    }
  } catch (error) {
    console.error('[payment/verify] Paystack request failed', error);
    return respond('pending', { message: 'Payment could not be verified right now.' }, 502);
  }

  const tx = body.data;
  const planCode: string | undefined =
    typeof tx.plan === 'string' ? tx.plan : tx.plan?.plan_code ?? tx.plan_object?.plan_code;

  if (tx.status === 'success') {
    if (!planCode || !PLAN_NAMES[planCode]) {
      return respond('failed', { message: 'This payment is not for a SharpTable plan.' });
    }
    return respond('success', {
      reference: tx.reference,
      plan: PLAN_NAMES[planCode],
      amount: typeof tx.amount === 'number' ? tx.amount / 100 : null,
      currency: tx.currency ?? null,
      paidAt: tx.paid_at ?? null,
    });
  }

  if (tx.status === 'ongoing' || tx.status === 'pending' || tx.status === 'processing' || tx.status === 'queued') {
    return respond('pending', { message: 'Your payment is still being processed.' });
  }

  return respond('failed', { message: 'Your payment was not completed.' });
}
