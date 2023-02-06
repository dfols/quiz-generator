import { ReactSession } from 'react-client-session';

var chapterSubjectProfile = (function() {

    let subjectName = "";
    let subjectId = 0;
    let chapterName = "";
    let chapterId = 0;
   

    var getSubjectId = function() {
        return ReactSession.get("subjectId");
    };

    var getSubjectName = function() {
        return ReactSession.get("subjectName");
    };
    var getChapterName = function() {
        return ReactSession.get("chapterName");
    };
    var getChapterId = function() {
        return ReactSession.get("chapterId");
    };
  
   
    var setChapterId = function(uname) {
        chapterId = uname;
        ReactSession.set("chapterId", chapterId);
        // Also set this in cookie/localStorage
    };
   
   
    var setChapterName = function(uname) {
        chapterName = uname;
        ReactSession.set("chapterName", chapterName);
        // Also set this in cookie/localStorage
    };
   
    var setSubjectName = function(uname) {
        subjectName = uname;
        ReactSession.set("subjectName", subjectName);
        // Also set this in cookie/localStorage
    };

    var setSubjectId = function(id) {
        subjectId = id;
        ReactSession.set("subjectId", subjectId);
        // Also set this in cookie/localStorage
    };
  
    return ({
        getSubjectName: getSubjectName,
        setSubjectName: setSubjectName,
        getSubjectId: getSubjectId,
        setSubjectId: setSubjectId,
        getChapterName: getChapterName,
        setChapterName: setChapterName,
        getChapterId: getChapterId,
        setChapterId: setChapterId,
    });
  
  })();
  
  export default chapterSubjectProfile;