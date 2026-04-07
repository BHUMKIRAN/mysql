export function up(knex) {
  return knex.schema.createTable("products", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.decimal("price", 10, 2).notNullable();
    table.integer("category_id").unsigned()
         .references("id").inTable("categories")
         .onDelete("CASCADE");
    table.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTable("products");
}