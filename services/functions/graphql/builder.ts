import DataloaderPlugin from '@pothos/plugin-dataloader';
import SchemaBuilder from "@pothos/core";

// const builder = new SchemaBuilder({
//   plugins: [DataloaderPlugin],
// });

export const builder = new SchemaBuilder<{
  Context: {
    user: {
      userId: string
    }
  }
}>({
  plugins: [DataloaderPlugin]
});

builder.queryType({});
builder.mutationType({});
