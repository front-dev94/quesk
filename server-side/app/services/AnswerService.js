import Service from './Service';
import Question from './../models/Question';

class AnswerService extends Service {
    constructor(model) {
        super(model);

        this.createAnswer = this.createAnswer.bind(this);
        this.voteUp = this.voteUp.bind(this);
        this.voteDown = this.voteDown.bind(this);
    }

    async createAnswer(req) {
        try {
            const {content} = req.body;
            // Validate request
            if(!content) {
                return {
                    error: true,
                    statusCode: 400,
                    message: "Content can not be empty."
                }
            }
        
            // Create a answer
            const answer = await this.model.create({
                content: content,
                author: req.user._id
            });
        
            // Save answer in the database
            answer.save()

            let question = await Question.findById(req.params.questionId);
            let user = await User.findById(answer.author._id);

            if(question && user){
                question.answers.push(answer._id);
                question.save();

                user.answerScore = user.answerScore + 1;
                user.save();

                return {
                    error: false,
                    statusCode: 200,
                    data: answer
                }
            }
        } catch (e) {
            return {
                error: true,
                statusCode: 500,
                message: e.message || "Not able to create answer"
            };
        }
        
    }
    async voteUp(req){
        try {
            const answer = await this.model.findById(req.params.answerId);

            if (!answer){
                return {
                    error: true,
                    statusCode: 404,
                    message: "Answer not found"
                }
            }
            
            answer.upVotes.push(req.user._id);
            answer.save();
            
            return {
                error: false,
                statusCode: 200,
                data: answer
            }
        } catch (e) {
            return {
                error: true,
                statusCode: 500,
                message: e.message || "Not able to vote up"
            }
        }
    }

    async voteDown(req){
        try {
            const answer = await this.model.findById(req.params.answerId);

            if (!answer){
                return {
                    error: true,
                    statusCode: 404,
                    message: "Answer not found"
                }
            }
            
            answer.downVotes.push(req.user._id);
            answer.save();
            
            return {
                error: false,
                statusCode: 200,
                data: answer
            }
        } catch (e) {
            return {
                error: true,
                statusCode: 500,
                message: e.errmsg || "Not able to vote down"
            }
        }
    }
}

export default AnswerService;