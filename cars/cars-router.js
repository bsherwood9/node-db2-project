const express = require("express");
const db = require("../data/db-config");

const router = express.Router();

//validation
const validatePost = (req, res, next) => {
  const body = req.body;
  if (!body.VIN || !body.model || !body.make || !body.mileage) {
    res.status(400).json({ message: "Please enter all required fields" });
  } else if (typeof body.mileage !== "number") {
    res.status(400).json({ message: "Please enter a number for mileage" });
  } else {
    next();
  }
};

router.get("/", (req, res) => {
  db("cars")
    .then(data => res.status(200).json(data))
    .catch(err =>
      res
        .status(500)
        .json({ message: "There was an error fetching the data" }, err)
    );
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("cars")
    .where({ id })
    .then(data => res.status(200).json(data))
    .catch(err =>
      res
        .status(500)
        .json(
          { message: "There was an error fetching the data by that ID" },
          err
        )
    );
});

router.post("/", validatePost, (req, res) => {
  const body = req.body;
  db("cars")
    .insert(body)
    .then(data => res.status(200).json({ data }))
    .catch(err =>
      res
        .status(500)
        .json(
          { message: "An error occurred while trying to create this post" },
          err
        )
    );
});

router.put("/:id", validatePost, (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  db("cars")
    .where({ id })
    .update(changes)
    .then(update => {
      if (update) {
        res
          .status(200)
          .json({ message: `Successfully updated post ${id}`, update });
      } else {
        res.status(404).json({ message: "The id could not be found." });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "There was an error while editing this vehicle" }, err)
    );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("cars")
    .where({ id })
    .del()
    .then(data =>
      res
        .status(200)
        .json({ message: `Car ${id} was successfully deleted`, data })
    )
    .catch(err =>
      res.status(500).json(
        {
          message:
            "An error occurred while trying delete that vehicle. ID was not found"
        },
        err
      )
    );
});

module.exports = router;
