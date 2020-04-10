exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cars").insert([
        {
          VIN: "1G2ZA5EK7A4138435",
          make: "Toyota",
          model: "Corolla",
          mileage: 47000
        },
        {
          VIN: "1FMCU93G49KB57980",
          make: "Chevy",
          model: "Avalanche",
          mileage: 85000,
          transmission: "Auto"
        },
        {
          VIN: "1GNDT13S722246554",
          make: "Ford",
          model: "Focus",
          mileage: 124000
        }
      ]);
    });
};
