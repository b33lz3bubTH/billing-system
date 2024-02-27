import fs from "fs";
import { gql } from "apollo-server-express";

export class GQLTypesGen {
  constructor(private schemaPath: string) {}

  generateTypeDefs() {
    // Read all schema files from the schemas directory
    const schemaFiles = fs
      .readdirSync(this.schemaPath)
      .filter((filename) => filename.endsWith(".graphql"));

    // Initialize an empty string to store combined schema
    let combinedSchema = "";

    // Add base types to the combined schema
    combinedSchema += `
    type Query {
      _empty: String
    }

    type Mutation {
      _empty: String
    }
    `;

    // Loop through each schema file and concatenate them
    schemaFiles.forEach((filename) => {
      const schemaContent = fs.readFileSync(
        `${this.schemaPath}/${filename}`,
        "utf8"
      );
      combinedSchema += `${schemaContent}\n`; // Add newline separator between schemas
    });

    console.log(`combinedSchema: `, combinedSchema);

    // Create type definitions using gql tag
    const typeDefs = gql`
      ${combinedSchema}
    `;
    return typeDefs;
  }
}
