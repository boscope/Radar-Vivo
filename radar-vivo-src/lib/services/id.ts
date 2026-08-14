export function generateId(
  prefix = "RV"
): string {

  return `${prefix}-${crypto.randomUUID()}`;

}
