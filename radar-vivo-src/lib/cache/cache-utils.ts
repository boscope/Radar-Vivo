export function isExpired(date: Date): boolean {

  return date.getTime() < Date.now();

}

export function minutesFromNow(
  minutes: number
): Date {

  return new Date(
    Date.now() + minutes * 60 * 1000
  );

}
