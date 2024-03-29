export const baseUrl = process.env.REACT_APP_API_URL;
export const getQuestionsUrl = baseUrl + "/questions";
export const getMyQuestionsUrl = baseUrl + "/questions/my_questions";
export const deleteMyQuestion = baseUrl + "/questions";
export const signupUrl = baseUrl + "/auth/signup";
export const loginUrl = baseUrl + "/auth/login";
export const logoutUrl = baseUrl + "/auth/logout";
export const profileUrl = baseUrl + "/auth/profile";
export const answerUrl = baseUrl + "/answers";
export const searchURL = baseUrl + "/search/?q=";
export const voteQuestionUrl = baseUrl + "/votes/question/";
export const voteAnswerUrl = baseUrl + "/votes/answer/";
export const getTagListUrl = baseUrl + "/tags";
