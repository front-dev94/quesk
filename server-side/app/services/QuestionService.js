import Service from './service';

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

  async getAllQuestions() {
    try {
      let items = await this.model.find()
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

      return {
        error: false,
        statusCode: 200,
        data: items
      };
    } catch (errors) {
      return {
        error: true,
        statusCode: 500,
        errors
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
            errors: "Question not found!"
          }
        }

        return {
          error: false,
          statusCode: 200,
          data: item
        }
    } catch (errors) {
      return {
        error: true,
        statusCode: 500,
        errors
      };
    }
  }

  async getAllUserQuestions(userId) {
    try {
      let items = await this.model.find({author: userId})
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

      return {
        error: false,
        statusCode: 200,
        data: items
      };
    } catch (e) {
      return {
        error: true,
        statusCode: 500,
        message: e || "Not able to get user questions"
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
            message: "Title can not be empty. Please try again!"
          }
      }

      // Create a question/though/topic
      const question = await this.model.create({
        title: req.body.title || "Untitled Question", 
        content: req.body.content,
        tags: req.body.tags,
        author: req.user._id,
        upVotes: [],
        downVotes: []
      });

      if(question){
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
        message: e.message || "Not able to create question"
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
                message: "Question not found"
            }
        }
        
        question.upVotes.push(userId);
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
        message: e.message || "Not able to vote up"
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
                message: "Question not found"
            }
        }
        
        question.downVotes.push(userId);
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
        message: e.message || "Not able to vote down"
      };
    }
  }
};

export default QuestionService;