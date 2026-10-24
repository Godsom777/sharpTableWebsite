'use client';

import React, { useState } from 'react';
import { Alert, Box, Button, CircularProgress, Container, InputBase, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { getAppSupabaseClient } from '../lib/supabase';


export const ResetPasswordPage: React.FC = () => {
  const { user, isLoading, isConfigured } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (password.length < 8) {
      setError('Use at least 8 characters for the new password.');
      return;
    }

    if (password !== confirmPassword) {
      setError('The passwords do not match.');
      return;
    }

    const client = getAppSupabaseClient();
    if (!client) {
      setError('Authentication is not configured.');
      return;
    }

    setIsSaving(true);
    const { error: updateError } = await client.auth.updateUser({ password });
    setIsSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setMessage('Password updated. You can now use this password on the website and in the app.');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <>
      <section className="tile pale pb">
        <div className="head">
          <h1>Reset password.</h1>
          <p className="sub">Set a new password for your account.</p>
        </div>
      </section>

      <Box component="section" sx={{ bgcolor: '#fff', pt: { xs: 6, md: 10 }, pb: { xs: 10, md: 16 } }}>
        <Container maxWidth="sm">
          {!isConfigured && <Alert severity="error">App Supabase is not configured on this website.</Alert>}

          <Box
            sx={{
              mt: 2,
              bgcolor: '#eef4fb',
              border: '1px solid rgba(11,27,51,0.08)',
              borderRadius: '1.5rem',
              p: { xs: 3, md: 4 },
            }}
          >
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            {message && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {message}
              </Alert>
            )}

            {isLoading ? (
              <Box sx={{ minHeight: 200, display: 'grid', placeItems: 'center' }}>
                <CircularProgress sx={{ color: '#0b1b33' }} />
              </Box>
            ) : !user ? (
              <Alert severity="warning">
                The recovery session is missing or expired. Request a new password setup link from the account page.
              </Alert>
            ) : (
              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2.5 }}>
                <Typography sx={{ color: '#0b1b33', fontWeight: 600, fontSize: { xs: '1.35rem', md: '1.7rem' } }}>
                  Set a new password for {user.email}
                </Typography>
                <Typography sx={{ color: '#5b6476', lineHeight: 1.7 }}>
                  This updates your login password only. Your current plan stays the same.
                </Typography>

                <Box>
                  <Typography sx={{ color: '#5b6476', fontSize: '0.8rem', fontWeight: 700, mb: 1 }}>
                    New Password
                  </Typography>
                  <InputBase
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                    sx={{
                      width: '100%',
                      bgcolor: '#fff',
                      border: '1px solid rgba(11,27,51,0.12)',
                      borderRadius: '0.85rem',
                      color: '#0b1b33',
                      input: { px: 2, py: 1.6 },
                    }}
                  />
                </Box>

                <Box>
                  <Typography sx={{ color: '#5b6476', fontSize: '0.8rem', fontWeight: 700, mb: 1 }}>
                    Confirm Password
                  </Typography>
                  <InputBase
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    type="password"
                    sx={{
                      width: '100%',
                      bgcolor: '#fff',
                      border: '1px solid rgba(11,27,51,0.12)',
                      borderRadius: '0.85rem',
                      color: '#0b1b33',
                      input: { px: 2, py: 1.6 },
                    }}
                  />
                </Box>

                <Button
                  type="submit"
                  disabled={isSaving}
                  sx={{
                    mt: 1,
                    bgcolor: '#F5C518',
                    color: '#1d1d1f',
                    borderRadius: '999px',
                    py: 1.5,
                    fontWeight: 800,
                    '&:hover': { bgcolor: '#F5C518' },
                  }}
                >
                  {isSaving ? <CircularProgress size={18} sx={{ color: 'inherit' }} /> : 'Save New Password'}
                </Button>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};
