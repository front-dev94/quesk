const Answer = require('../models/answer.model.js');
const Question = require('../models/question.model.js');

// Create and save a answer on question
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Content can not be empty. Please try again!"
        });
    }

    // Create a answer
    const answer = new Answer({
        content: req.body.content,
        author: req.user
    });

    // Save answer in the database
    answer
        .save()
        .then(answer => {
            return Question.findById(req.params.questionId);
        })
        .then(question => {
            question.answers.push(answer._id)
            return question.save();
        })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while creating a Question."
            });
        });
};

    
 