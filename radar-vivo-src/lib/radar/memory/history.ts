import type {

  CompanySnapshot,
  CompanyChange,

} from "./types";

export function compareSnapshots(

  oldSnapshot: CompanySnapshot,

  newSnapshot: CompanySnapshot

): CompanyChange[] {

  const changes: CompanyChange[] = [];

  Object.keys(newSnapshot).forEach((key) => {

    const field =
      key as keyof CompanySnapshot;

    if (

      oldSnapshot[field] !==
      newSnapshot[field]

    ) {

      changes.push({

        field,

        oldValue: oldSnapshot[field],

        newValue: newSnapshot[field],

      });

    }

  });

  return changes;

}