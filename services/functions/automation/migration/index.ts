import * as migrations from "./migrations";

export const handler = async (event: {
  migration: "000";
  type: "up" | "down";
}) => {
  const migration = migrations[`_${event.migration}`];

  console.log(`running ${event.type} migration ${event.migration}:`);
  console.log(migration.description);

  await migration[event.type]();

  console.log("finished");
};
