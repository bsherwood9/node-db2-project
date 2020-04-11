exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
    tbl.increments();
    tbl
      .text("VIN", 17)
      .unique()
      .notNullable();
    tbl.text("make").notNullable();
    tbl.text("model").notNullable();
    tbl.integer("mileage", 7).notNullable();
    tbl.text("transmission", 64);
    tbl.text("title_type", 64);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
