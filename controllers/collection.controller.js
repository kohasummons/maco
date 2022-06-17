const db = require("../models");

const Collection = db.collections;

//create and save a new collection
exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "x-Content can not be empty!" });
    return;
  }
  // create a collection
  const collection = new Collection({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false,
  });

  // Save collection in the db
  collection
    .save(collection)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Creating collections failed",
      });
    });
};

// Retrive all collection
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};
  Collection.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "some error occurred while retrieving Collections.",
      });
    });
};

// Find a single collections
exports.findOne = (req, res) => {
  const id = req.params.id;
  Collection.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Collection with id" + id });
      else res.send(data);
    })
    .catch((error) => {
      res
        .status(500)
        .send({ message: "Error retrieving Collection with id: " + id });
    });
};

// Update a collections by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  Collection.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Collection with id=${id}. Maybe Collection was not found`,
        });
      } else
        res
          .status(200)
          .send({ message: `Collection was updated successfullly.` });
    })
    .catch((error) => {
      res.status(500).send({
        message: `Error updating Collection with id: ` + id,
      });
    });
};

// Delete a collections with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Collection.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Collection with id=${id}. Maybe Collection wasn't found`,
        });
      } else res.send({ message: "Collection was deleted successfully!" });
    })
    .catch((error) => {
      res.status(500).send({
        message: err.message || `Could not delete Collection with id of ${id}`,
      });
    });
};

// Delete all collections from db
exports.deleteAll = (req, res) => {
  Collection.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Collections were flushed out`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while removing all the Collections`,
      });
    });
};

exports.findAllPublished = (req, res) => {
  Collection.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while retrieving Collections",
      });
    });
};
