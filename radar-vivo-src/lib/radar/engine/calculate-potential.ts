export function calculatePotential(
  rvIndex: number
): number {

  if (rvIndex >= 95) return 25000;

  if (rvIndex >= 90) return 20000;

  if (rvIndex >= 85) return 15000;

  if (rvIndex >= 80) return 12000;

  if (rvIndex >= 70) return 9000;

  if (rvIndex >= 60) return 6000;

  return 3000;

}