import Controller from './controller';
import Question from './../models/Question';
import QuestionService from './../services/QuestionService';

const questionService = new QuestionService(Question);

class QuestionController extends Controller {
  constructor(service) {
    super(service);

    this.getAllQuestions = this.getAllQuestions.bind(this);
    this.getQuestion = this.getQuestion.bind(this);
    this.getAllUserQuestions = this.getAllUserQuestions.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
    this.voteUp = this.voteUp.bind(this);
    this.voteDown = this.voteDown.bind(this);
  }

  async getAllQuestions(req, res){
    let response = await this.service.getAllQuestions(req);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.send(response);
  }

  async getQuestion(req, res){
    let response = await this.service.getQuestion(req.params.id);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.send(response);
  }

  async getAllUserQuestions(req, res){
    let response = await this.service.getAllUserQuestions(req.params.id);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.send(response);
  }

  async createQuestion(req, res){
    let response = await this.service.createQuestion(req);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.send(response);
  }

  async voteUp(req, res){
    let response = await this.service.voteUp(req.params.id, req.user._id);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.send(response);
  }

  async voteDown(req, res){
    let response = await this.service.voteDown(req.params.id, req.user._id);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.send(response);
  }
}

export default new QuestionController(questionService);