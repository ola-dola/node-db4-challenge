exports.up = function(knex) {
  return knex.schema
    .createTable("ingredients", tbl => {
      tbl.increments();
      tbl
        .text("name", 128)
        .unique()
        .notNullable();
    })
    .createTable("recipe", tbl => {
      tbl.increments();
      tbl
        .text("recipe_name", 128)
        .unique()
        .notNullable();
    })
    .createTable("steps", tbl => {
      tbl.increments();
      tbl
        .integer("step_number")
        .unsigned()
        .notNullable();
      tbl.text("description").notNullable();
      tbl
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("recipe")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("ingredient_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("ingredients")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.float("quantity");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("steps")
    .dropTableIfExists("recipe")
    .dropTableIfExists("ingredients");
};
