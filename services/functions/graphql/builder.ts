import DataloaderPlugin from '@pothos/plugin-dataloader';
import SchemaBuilder from "@pothos/core";

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
