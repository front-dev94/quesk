import Service from './service';
import User from './../models/User';

class QuestionService extends Service {
  constructor(model) {
    super(model);

    this.getAllQuestions = this.getAllQuestions.bind(this);
    this.getQuestion = this.getQuestion.bind(this);
    this.getAllUserQuestions = this.getAllUserQuestions.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
    this.voteUp = this.voteUp.bind(this);
    this.voteDown = this.voteDown.bind(this);
  }

  async getAllQuestions(query) {
    try {
      let { page, size } = query;

      page = page ? Number(page) : 1;
      size = size ? Number(size) : 10;

      delete query.page,
      delete query.size;

      let items = await this.model.find()
        .sort(query)
        .skip((page - 1) * size)
        .limit(size)
        .populate('upVotes', 'username firstName lastName')
        .populate('downVotes', 'username firstName lastName')
        .populate('author', 'username firstName lastName')
        .populate('answers')
        .populate({
            path: 'answers',
            populate: {
                path: 'author',
                model: 'User'
            }
        })

      let count = await this.model.countDocuments();

      return {
        error: false,
        statusCode: 200,
        data: {
          page,
          size,
          count,
          payload: items
        }
      };
    } catch (e) {
      return {
        error: true,
        statusCode: 500,
        message: e || "Not able to get questions"
      };
    }
  }

  async getQuestion(questionId){
    try {
      const item = await this.model.findById(questionId)
        .populate('upVotes', 'username firstName lastName')
        .populate('downVotes', 'username firstName lastName')
        .populate('author', 'username firstName lastName')
        .populate('answers')
        .populate({
            path: 'answers',
            populate: {
                path: 'author',
                model: 'User'
            }
        });
      
        if (!item){
          return {
            error: true,
            statusCode: 404,
            errors: "Question not found."
          }
        }

        return {
          error: false,
          statusCode: 200,
          data: item
        }
    } catch (e) {
      return {
        error: true,
        statusCode: 500,
        message: e || "Not able to get getQuestion."
      };
    }
  }

  async getAllUserQuestions(userId, query) {
    try {
      let { page, size } = query;

      page = page ? Number(page) : 0;
      size = size ? Number(size) : 10;

      delete query.page,
      delete query.size;

      let items = await this.model.find({author: userId})
        .sort(query)
        .skip(page)
        .limit(size)
        .populate('upVotes', 'username firstName lastName')
        .populate('downVotes', 'username firstName lastName')
        .populate('author', 'username firstName lastName')
        .populate('answers')
        .populate({
            path: 'answers',
            populate: {
                path: 'author',
                model: 'User'
            }
        })

      let count = await this.model.countDocuments();

      return {
        error: false,
        statusCode: 200,
        data: {
          page,
          size,
          count,
          payload: items
        }
      };
    } catch (e) {
      return {
        error: true,
        statusCode: 500,
        message: e || "Not able to get user questions."
      };
    }
  }

  async createQuestion(req){
    try {
      // Validate request
      if(!req.body.title) {
          return {
            error: true,
            statusCode: 400,
            message: "Title can not be empty."
          }
      }

      // Create a question/though/topic
      const question = await this.model.create({
        title: req.body.title || "Untitled Question", 
        content: req.body.content,
        tags: req.body.tags,
        author: req.user._id,
        upVotes: [],
        downVotes: [],
        voteScore: 0
      });

      if(question){

        let user = await User.findById(req.user._id);

        if(user){
          user.questionScore = user.questionScore + 1;
          user.save();
        }
        
        return {
          error: false,
          statusCode: 200,
          data: question
        }
      }
    } catch (e) {
      return {
        error: true,
        statusCode: 500,
        message: e || "Not able to create question."
      };
    }
  }

  async voteUp(questionId, userId){
    try {
        const question = await this.model.findById(questionId);

        if (!question){
            return {
                error: true,
                statusCode: 404,
                message: "Question not found."
            }
        }
        
        question.upVotes.push(userId);
        question.voteScore = question.voteScore + 1;
        question.save();
        
        return {
          error: false,
          statusCode: 200,
          data: question
        }
    } catch (e) {
      return {
        error: true,
        statusCode: 500,
        message: e || "Not able to vote up."
      };
    }
  }

  async voteDown(questionId, userId){
    try {
        const question = await this.model.findById(questionId);
        if (!question){
            return {
                error: true,
                statusCode: 404,
                message: "Question not found."
            }
        }
        
        question.downVotes.push(userId);
        question.voteScore = question.voteScore - 1;
        question.save();
        
        return {
          error: false,
          statusCode: 200,
          data: question
        }
    } catch (e) {
      return {
        error: true,
        statusCode: 500,
        message: e || "Not able to vote down."
      };
    }
  }
};

export default QuestionService;