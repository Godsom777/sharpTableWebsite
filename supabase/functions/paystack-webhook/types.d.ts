// Type declarations for Deno runtime in Supabase Edge Functions
// These silence VS Code errors - the actual types come from Deno runtime

declare global {
  const Deno: {
    env: {
      get(key: string): string | undefined;
    };
  };
}

declare module 'https://deno.land/std@0.177.0/http/server.ts' {
  export function serve(handler: (req: Request) => Response | Promise<Response>): void;
}

declare module 'https://esm.sh/@supabase/supabase-js@2' {
  export function createClient(url: string, key: string): any;
}

declare module 'https://deno.land/std@0.177.0/node/crypto.ts' {
  export function createHmac(algorithm: string, key: string): {
    update(data: string): {
      digest(encoding: string): string;
    };
  };
}

export {};
