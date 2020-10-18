import Http from './../../utils/http';

class QuestionService {
    static async getAllQuestions(query) {
        return await Http.get("/dashboard/questions/?" + query);
    }

    static async getQuestion(id) {
        return await Http.get("/dashboard/questions/" + id);
    }

    static async getAllUserQuestions(id, query){
        return await Http.get("/dashboard/questions/my-questions/" + id + "/?" + query);
    }

    static async voteQuestionUp(id) {
        return await Http.post("/dashboard/questions/" + id + "/vote-up");
    }

    static async voteQuestionDown(id) {
        return await Http.post("/dashboard/questions/" + id + "/vote-down");
    }

    static async createQuestion(content) {
        return await Http.post("/dashboard/questions/", content);
    }

    static async removeQuestion(id) {
        return await Http.delete("/dashboard/questions/" + id);
    }

    static async updateQuestion(id, question) {
        return await Http.put("/dashboard/questions/" + id, question);
    }

    static async answerOnQuestion(id, content) {
        return await Http.post("/dashboard/questions/" + id + "/answers", content);
    }

    static async voteAnswerUp(questionId, answerId) {
        return await Http.post("/dashboard/questions/" + questionId + "/answers/" + answerId + "/vote-up");
    }

    static async voteAnswerDown(questionId, answerId) {
        return await Http.post("/dashboard/questions/" + questionId + "/answers/" + answerId + "/vote-down");
    }
}
  
export default QuestionService;
  