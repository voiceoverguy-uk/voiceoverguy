const CAREER_START_YEAR = 2000;

export function getYearsExperience(): number {
  return new Date().getFullYear() - CAREER_START_YEAR;
}

const ARABELLA_DOB = new Date(2016, 5, 4); // June 4 2016

export function getArabellaAge(): number {
  const today = new Date();
  let age = today.getFullYear() - ARABELLA_DOB.getFullYear();
  if (
    today.getMonth() < ARABELLA_DOB.getMonth() ||
    (today.getMonth() === ARABELLA_DOB.getMonth() && today.getDate() < ARABELLA_DOB.getDate())
  ) {
    age--;
  }
  return age;
}
