export function isDigitalServiceProvider(category?: string): boolean {
  if (!category) return false;

  return /ag[eê]ncia|marketing|consultoria|digital|desenvolvimento|software|web|tecnologia|publicidade|tr[aá]fego|social.?media|webdesign|design|dropshipping|campanha/i.test(
    category
  );
}