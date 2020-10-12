import Http from "utils/http";

class QuestionService {
    static async getAllQuestions() {
        return await Http.get("/dashboard/questions");
    }

    static async getQuestion(id) {
        return await Http.get("/dashboard/questions/" + id);
    }

    static async voteUp(id) {
        return await Http.post("/dashboard/questions/" + id + "/vote-up");
    }

    static async voteDown(id) {
        return await Http.post("/dashboard/questions/" + id + "/vote-down");
    }

    static async removeQuestion(id) {
        return await Http.delete("/dashboard/questions/" + id);
    }

    static async updateQuestion(id, question) {
        return await Http.put("/dashboard/questions/" + id, question);
    }
}
  
export default QuestionService;
  