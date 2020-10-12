const Question = require('../models/question.model.js');
const User = require('../models/user.model.js');

// Create and save a question/though/topic
exports.create = (req, res) => {
    // Validate request
    if(!req.body.title) {
        return res.status(400).send({
            message: "Title can not be empty. Please try again!"
        });
    }

    // Create a question/though/topic
    const question = new Question({
        title: req.body.title || "Untitled Question", 
        content: req.body.content,
        tags: req.body.tags,
        author: req.user,
        upVotes: [],
        downVotes: [],
        voteScore: 0
    });

    // Save question/though/topic in the database
    question
    .save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while creating a Question."
        });
    });
};

exports.getAllQuestions = async (req, res) => {
    try {
        const result = await Question.find()
            .populate('upVotes', 'username firstName lastName')
            .populate('downVotes', 'username firstName lastName')
            .populate('author', 'username firstName lastName')
            .populate('answers', 'content');

        res.status(200).send(result);
    } catch (e) {
        res.status(500).send({ error: true, message: e.message || "Some error occurred while retrieving questions."});
    }
};

exports.getQuestion = async (req, res) => {
    try {
        const result = await Question.findById(req.params.id)
            .populate('upVotes', 'username firstName lastName')
            .populate('downVotes', 'username firstName lastName')
            .populate('author', 'username firstName lastName')
            .populate('answers', 'content');

        if (!result)
            return res.status(404).send({ error: true, message: 'Question not found.'});

        res.status(200).send(result);
    } catch (e) {
        res.status(500).send({ error: true, message: e.message || "Some error occurred while retrieving question."});
    }
};

exports.updateQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).send({
                error: true,
                message: 'Question not found.',
            });
        }

        await Question.update({ _id: req.params.id }, req.body);

        const result = await Question.findById(req.params.id);

        res.status(200).send(result);
    } catch (e) {
        res.status(500).send({ error: true, message: e.message || "Some error occurred while updating question."});
    }
};

exports.deleteQuestion = async (req, res) => {
    try {
        const result = await Question.findById(req.params.id);

        if (!result)
            return res.status(404).send({ error: true, message: 'Question not found.'});
        
        await Question.findByIdAndDelete(result.id);
        res.status(200).send({error: false, message: "Question has been successfuly deleted!"});
        
    } catch (e) {
        res.status(500).send({ error: true, message: e.message || "Some error occurred while deleting question."});
    }
};

exports.voteUp = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question)
            return res.status(404).send({ error: true, message: 'Question not found.'});
        
        question.upVotes.push(req.user._id);

        question
        .save()
            .populate('upVotes', 'username firstName lastName')
            .populate('downVotes', 'username firstName lastName')
            .populate('author', 'username firstName lastName')
            .populate('answers', 'content')
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while voting up."
            });
        });
    } catch (e) {
        res.status(500).send({ error: true, message: e.message || "Some error occurred while deleting question."});
    }
};

exports.voteDown = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question)
            return res.status(404).send({ error: true, message: 'Question not found.'});
        
        question.downVotes.push(req.user._id);

        question
        .save()
            .populate('upVotes', 'username firstName lastName')
            .populate('downVotes', 'username firstName lastName')
            .populate('author', 'username firstName lastName')
            .populate('answers', 'content')
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while voting down."
            });
        });
    } catch (e) {
        res.status(500).send({ error: true, message: e.message || "Some error occurred while deleting question."});
    }
};