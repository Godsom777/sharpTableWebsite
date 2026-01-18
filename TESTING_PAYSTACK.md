# Testing Paystack Payment Integration

## Overview
This guide explains how to test the Paystack payment integration using the test environment.

## Test Environment Setup ✅

The application is already configured for testing:

1. **Test API Key**: `.env` file contains the test public key
   ```
   VITE_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
   > **Note**: The actual test key is already configured in your `.env` file

2. **Test Plan Code**: `contexts/PaymentContext.tsx` uses test plan codes
   ```
   planCode: 'PLN_ujbziu27a1qp3oj' // TEST
   ```

3. **Routing Configuration**: 
   - Development: `vite.config.ts` has `appType: 'spa'` for client-side routing
   - Netlify: `public/_redirects` configured for SPA routing
   - Vercel: `vercel.json` configured for SPA routing

## Testing Payment Flow

### 1. Start Development Server
```bash
npm install
npm run dev
```

The server will start on `http://localhost:3000`

### 2. Initiate Payment
1. Navigate to the pricing section
2. Click "Get Started" on either Pro or Enterprise plan
3. The payment modal will open

### 3. Fill Registration Form
- **Email**: Use any valid email format (e.g., `test@example.com`)
- **Business Name**: Any name (e.g., `Test Restaurant`)
- **Password**: Min 8 characters with uppercase, lowercase, and number
- **Confirm Password**: Must match the password
- Check "I agree to terms"

### 4. Complete Payment with Test Card

When the Paystack payment popup opens, use these **test card details**:

#### Successful Payment
| Field | Value |
|-------|-------|
| Card Number | `4084084084084081` (or `4084 0840 8408 4081` with spaces) |
| Expiry | Any future date (e.g., `12/25`) |
| CVV | `408` |
| Result | ✅ **Success** |

#### Declined Payment
| Field | Value |
|-------|-------|
| Card Number | `4084084084084081` (or `4084 0840 8408 4081` with spaces) |
| Expiry | Any future date (e.g., `12/25`) |
| CVV | `001` |
| Result | ❌ **Declined** |

> **Note**: The same card number produces different results based on the CVV value. Use `408` for success, `001` for declined transactions. Spaces in card numbers are optional when entering.

#### Verve Card Success
| Field | Value |
|-------|-------|
| Card Number | `5060666666666666666` (19 digits - Verve format) |
| Expiry | Any future date (e.g., `12/25`) |
| CVV | `123` |
| Result | ✅ **Success** |

> **Note**: Verve cards can have 16, 18, or 19 digits. This is the correct test card format provided by Paystack.

### 5. Verify Callback Route

After successful payment, you should be redirected to:
```
http://localhost:3000/payment/callback?reference=ST_PRO_...
```

The callback page will display:
- ✅ **Success State**: "Payment Successful!" with subscription details
- ❌ **Failed State**: "Payment Issue" if no reference or cancelled

## Manual Callback Testing

You can test the callback route directly:

```bash
# Test success state (with reference)
http://localhost:3000/payment/callback?reference=test123

# Test failed state (without reference)
http://localhost:3000/payment/callback
```

## Production Deployment

### Important Notes
1. **Revert to Live Keys**: Before deploying to production, update `.env`:
   ```bash
   # Comment out test key
   # VITE_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   
   # Uncomment live key
   VITE_PAYSTACK_PUBLIC_KEY=pk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
   > **Important**: Use your actual live Paystack public key from your Paystack dashboard

2. **Update Plan Codes**: In `contexts/PaymentContext.tsx`, revert to live plan codes:
   ```typescript
   pro: {
     planCode: 'PLN_rknt3upbuue6dmh', // LIVE
   },
   enterprise: {
     planCode: 'PLN_b36ulzsdy6d418n', // LIVE
   }
   ```

3. **Restart Dev Server**: After changing environment variables:
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

## Troubleshooting

### 404 Error on Callback Route
- **Development**: Ensure `vite.config.ts` has `appType: 'spa'`
- **Netlify**: Verify `public/_redirects` exists with `/* /index.html 200`
- **Vercel**: Verify `vercel.json` exists with proper rewrite rules
- **Solution**: Restart dev server after config changes

### Payment Modal Not Opening
- Check browser console for errors
- Verify Paystack script is loaded in `index.html`
- Ensure no ad blockers are blocking Paystack script

### Paystack Popup Not Showing
- Ensure internet connection is available
- Check if Paystack inline script is loaded: `https://js.paystack.co/v1/inline.js`
- Verify test public key is set in `.env`

## Build and Deploy

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

The preview will run on `http://localhost:3000` and you can test the production build locally.

## Additional Resources

- [Paystack Test Cards Documentation](https://paystack.com/docs/payments/test-payments/)
- [Paystack Inline SDK](https://paystack.com/docs/payments/accept-payments/#inline)
- [SharpTable Setup Guide](./PAYSTACK_SETUP.md)

## Screenshots

### Payment Modal
The registration and payment form with test plan configuration:

![Payment Modal](https://github.com/user-attachments/assets/9da4b030-366b-45e7-8509-475b531190c6)

### Success Callback
Payment success confirmation page:

![Success Callback](https://github.com/user-attachments/assets/eeebee28-c49e-4b08-b7b8-bf039fb44b7c)
