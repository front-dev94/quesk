
import Http from './../../utils/http';

class AnswerService {
    static async answerOnQuestion(id, content) {
        return await Http.post("/dashboard/questions/" + id + "/answers", content);
    }

    static async removeAnswer(questionId, id) {
        return await Http.delete("/dashboard/questions/" + questionId + "/answers/" + id);
    }

    static async voteAnswerUp(questionId, answerId) {
        return await Http.post("/dashboard/questions/" + questionId + "/answers/" + answerId + "/vote-up");
    }
    
    static async voteAnswerDown(questionId, answerId) {
        return await Http.post("/dashboard/questions/" + questionId + "/answers/" + answerId + "/vote-down");
    }
}
  
export default AnswerService;
  