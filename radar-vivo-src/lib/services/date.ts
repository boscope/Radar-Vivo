export function now(): Date {

  return new Date();

}

export function addDays(
  days: number
): Date {

  const date = new Date();

  date.setDate(
    date.getDate() + days
  );

  return date;

}
