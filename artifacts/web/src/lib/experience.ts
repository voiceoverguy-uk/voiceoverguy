const CAREER_START_YEAR = 2000;

export function getYearsExperience(): number {
  return new Date().getFullYear() - CAREER_START_YEAR;
}
