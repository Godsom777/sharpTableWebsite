'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../hooks/useSubscription';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Features', href: '/features' },
  { label: 'Hotels', href: '/for-hotels' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Partnership', href: '/partnership' },
  { label: 'FAQ', href: '/faq' },
];

export const NavBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();
  const { subscription } = useSubscription(user?.email);
  const accountLabel = user ? subscription?.businessName || user.email || 'Account' : 'Log in';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b backdrop-blur-md transition-colors',
        scrolled ? 'border-border bg-navy-950/95' : 'border-transparent bg-navy-950/70'
      )}
    >
      <nav aria-label="Main" className="container flex h-16 items-center justify-between gap-3">
        <Link href="/" className="flex min-h-11 items-center gap-2" aria-label="SharpTable home">
          <img src="/assets/logos/logo-white.png" alt="" className="h-6 w-auto md:h-7" />
          <span className="text-lg font-extrabold tracking-tight text-white">SharpTable</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={cn(
                  'inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium transition-colors hover:text-white',
                  pathname === l.href ? 'text-white' : 'text-muted-foreground'
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" className="max-w-[200px] truncate text-muted-foreground hover:bg-white/5 hover:text-white">
            <Link href="/account">{accountLabel}</Link>
          </Button>
          <Button asChild>
            <Link href="/pricing">Get started</Link>
          </Button>
        </div>

        <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground={false}>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 md:hidden" aria-label="Open menu">
              <Menu className="!size-6" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="border-border bg-navy-900 pb-[max(1.5rem,env(safe-area-inset-bottom))]" data-testid="menu-sheet">
            <div className="flex items-center justify-between px-5 pt-2">
              <DrawerTitle className="text-base font-semibold text-white">Menu</DrawerTitle>
              <DrawerDescription className="sr-only">Site navigation</DrawerDescription>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" aria-label="Close menu">
                  <X className="!size-6" />
                </Button>
              </DrawerClose>
            </div>
            <ul className="flex flex-col px-3 py-2">
              {[{ label: 'Home', href: '/' }, ...navLinks].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex min-h-12 items-center rounded-xl px-3 text-lg font-medium hover:bg-white/5',
                      pathname === l.href ? 'text-brand-yellow' : 'text-white'
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 px-5 pt-2">
              <Button asChild size="lg" className="w-full">
                <Link href="/pricing" onClick={() => setOpen(false)}>Get started</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full border-white/20 bg-transparent text-white hover:bg-white/5 hover:text-white">
                <Link href="/account" onClick={() => setOpen(false)}>
                  {user ? accountLabel : 'Existing customer? Log in'}
                </Link>
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      </nav>
    </header>
  );
};
