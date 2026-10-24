import * as React from 'react';
import type { LucideIcon, LucideProps } from 'lucide-react';

/** Renders a lucide-react icon at 1em by default (drop-in for the old FontAwesome usage). */
export function Icon({ icon: Glyph, ...props }: LucideProps & { icon: LucideIcon }) {
  return <Glyph width="1em" height="1em" aria-hidden {...props} />;
}
