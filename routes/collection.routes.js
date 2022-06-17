module.exports = app => {
    const collections = require("../controllers/collection.controller.js");
    var router = require("express").Router();

    router.post("/", collections.create);
    router.get("/", collections.findAll);
    router.get("/published", collections.findAllPublished);

    router.get("/:id", collections.findOne);
    router.put("/:id", collections.update);
    router.delete("/:id", collections.delete);

    router.delete("/", collections.deleteAll);
    app.use('/api/collections', router);
}