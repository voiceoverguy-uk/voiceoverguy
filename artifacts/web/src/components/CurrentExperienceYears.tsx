'use client';

import { useEffect, useState } from 'react';
import { getYearsExperience } from '@/lib/experience';

interface CurrentExperienceYearsProps {
  initialYears: number;
}

export default function CurrentExperienceYears({ initialYears }: CurrentExperienceYearsProps) {
  const [years, setYears] = useState(initialYears);

  useEffect(() => {
    const refreshYears = () => setYears(getYearsExperience());

    refreshYears();
    const interval = window.setInterval(refreshYears, 6 * 60 * 60 * 1000);
    return () => window.clearInterval(interval);
  }, []);

  return <>{years}</>;
}
