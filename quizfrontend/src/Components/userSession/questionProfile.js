import { ReactSession } from 'react-client-session';

var questionProfile = (function() {

    let question = [];
    let questionId = [];
    let questionType = [];
    let chapterId = [];
  

    var getQuestionType = function() {
        return ReactSession.get("questionType");
    };

    var getChapterId = function() {
        return ReactSession.get("chapterId");
    };

    var getQuestionId = function() {
        return ReactSession.get("questionId");
    };

    var getQuestion = function() {
        return ReactSession.get("question");
    };
  
    var setQuestionType = function(questionT) {
      questionType[questionType.length] = questionT;
      ReactSession.set("questionType", questionType);
      // Also set this in cookie/localStorage
    };

    var setChapterId = function(chapter) {
        chapterId.push(chapter);
        ReactSession.set("chapterId", chapterId);
        // Also set this in cookie/localStorage
    };

    var setQuestion = function(qu) {
        question.push(qu);
        ReactSession.set("question", question);
        // Also set this in cookie/localStorage
    };

    var setQuestionId = function(id) {
        questionId.push(id);
        ReactSession.set("questionId", questionId);
        // Also set this in cookie/localStorage
    };
  
    return ({
        getQuestionType: getQuestionType,
        setQuestionType: setQuestionType,
        getChapterId: getChapterId,
        setChapterId: setChapterId,
        getQuestion: getQuestion,
        setQuestion: setQuestion,
        setQuestionId: setQuestionId,
        getQuestionId: getQuestionId
    });
  
  })();
  
  export default questionProfile;