import Auth from "../app/middleware/Auth";
import QuestionController from "../app/controllers/QuestionController";
import AuthController from "../app/controllers/AuthController";
import UserController from "../app/controllers/UserController";
import AnswerController from "../app/controllers/AnswerController";

export default (router) => {

    // Auth routes
    router.post(`/api/auth/login`, AuthController.login);
    router.post(`/api/auth/sign-up`, AuthController.signUp);

    // Question routes
    router.get(`/api/dashboard/questions`, QuestionController.getAllQuestions);
    router.get(`/api/dashboard/questions/:id`, QuestionController.getQuestion);
    router.put(`/api/dashboard/questions/:id`, Auth, QuestionController.update);
    router.delete(`/api/dashboard/questions/:id`, Auth, QuestionController.delete);
    router.get(`/api/dashboard/questions/my-questions/:id`, Auth, QuestionController.getAllUserQuestions);
    router.post(`/api/dashboard/questions`, Auth, QuestionController.createQuestion);
    router.post(`/api/dashboard/questions/:id/vote-up`, Auth, QuestionController.voteUp);
    router.post(`/api/dashboard/questions/:id/vote-down`, Auth, QuestionController.voteDown);

    // Answer routes
    router.post(`/api/dashboard/questions/:questionId/answers`, Auth, AnswerController.createAnswer);
    router.post(`/api/dashboard/questions/:questionId/answers/:answerId/vote-up`, Auth, AnswerController.voteUp);
    router.post(`/api/dashboard/questions/:questionId/answers/:answerId/vote-down`, Auth, AnswerController.voteDown);


    // User routes
    router.get(`/api/dashboard/users`, UserController.getAll);
    router.get(`/api/dashboard/users`, UserController.getSpecificUser);
}