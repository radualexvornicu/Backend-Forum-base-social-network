const db = require("../models");
const Topics = db.topics;
const Op = db.Sequelize.Op;

// Create and Save a new Topics
exports.create = (req, res) => {
  // Validate request
  if (!req.body.topicsubject) {
    res.status(400).send({
      message: "Topics subject can not be empty!"
    });
    return;
  }
  // Create a Topics
  const topics = {
    topicsubject: req.body.topicsubject,
    categorieId: req.body.categorieId,
    userId: req.body.userId
  };
  // Save Topic in the database
  Topics.create(topics).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Topic."
    });
  });
};

// Retrieve all Topics from the database with Categori Id.
exports.findAll = (req, res) => {
    const categorieId = req.params.id;
    console.log(categorieId);
    var condition = categorieId ? { categorieId: { [Op.like]: `%${categorieId}%` } } : null;
  
    Topics.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving topic."
        });
      });
};

// Find a single Topic with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Topics.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving topic with id=" + id
        });
      });
};

// Update a Topic by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Topics.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Topic was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Topic with id=${id}. Maybe Topic was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Topic with id=" + id
        });
      });
};

// Delete a Topic with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Topics.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Topic was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Topics with id=${id}. Maybe Topic was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Topic with id=" + id
        });
      });
};

// Delete all Topics from the database.
exports.deleteAll = (req, res) => {
    Topics.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Topic were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Topics."
          });
        });
};