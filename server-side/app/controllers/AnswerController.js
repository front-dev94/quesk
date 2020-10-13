import Controller from './controller';
import AnswerService from './../services/AnswerService';

import Answer from '../models/Answer';

const answerService = new AnswerService(Answer);

class AnswerController extends Controller {
  constructor(service) {
    super(service);

    this.createAnswer = this.createAnswer.bind(this);
    this.voteUp = this.voteUp.bind(this);
    this.voteDown = this.voteDown.bind(this);
  }

  async createAnswer(req, res){
    let response = await this.service.createAnswer(req);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.send(response);
  }

  async voteUp(req, res){
    let response = await this.service.voteUp(req);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.send(response);
  }

  async voteDown(req, res){
    let response = await this.service.voteDown(req);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.send(response);
  }
}

export default new AnswerController(answerService);