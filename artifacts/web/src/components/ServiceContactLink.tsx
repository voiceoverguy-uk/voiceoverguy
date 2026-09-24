'use client';

import { useEffect, useState, type MouseEventHandler, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { generatorSourceForService } from '@/lib/generatorSource';

interface Props {
  children: ReactNode;
  className?: string;
  role?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export default function ServiceContactLink({ children, className, role, onClick }: Props) {
  const pathname = usePathname();
  const [href, setHref] = useState('/contact-guy');

  useEffect(() => {
    const updateHref = () => {
      const service = generatorSourceForService(pathname, window.location.search);
      setHref(service ? `/contact-guy?source=${service.source}` : '/contact-guy');
    };

    updateHref();
    window.addEventListener('popstate', updateHref);
    return () => window.removeEventListener('popstate', updateHref);
  }, [pathname]);

  return (
    <Link href={href} className={className} role={role} onClick={onClick}>
      {children}
    </Link>
  );
}