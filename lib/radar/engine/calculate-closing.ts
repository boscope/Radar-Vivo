export function calculateClosing(
  rvIndex: number
): number {

  if (rvIndex >= 95) return 95;

  if (rvIndex >= 90) return 90;

  if (rvIndex >= 85) return 85;

  if (rvIndex >= 80) return 80;

  if (rvIndex >= 70) return 70;

  if (rvIndex >= 60) return 60;

  return 50;

}