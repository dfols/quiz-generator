import { ReactSession } from 'react-client-session';

var UserProfile = (function() {

    let username = "";
    let userId = 0;
    let firstName = "";
    let lastName = "";
  
    var getFullName = function() {
      return ReactSession.get("firstName") + " " + ReactSession.get("lastName");
    };

    var getFirstName = function() {
        return ReactSession.get("firstName");
    };

    var getLastName = function() {
        return ReactSession.get("lastName");
    };

    var getUserId = function() {
        return ReactSession.get("userId");
    };

    var getUsername = function() {
        return ReactSession.get("username");
    };
  
    var setFirstName = function(fname) {
      firstName = fname;
      ReactSession.set("firstName", firstName);
      // Also set this in cookie/localStorage
    };

    var setLastName = function(lname) {
        lastName = lname;
        ReactSession.set("lastName", lastName);
        // Also set this in cookie/localStorage
    };

    var setUsername = function(uname) {
        username = uname;
        ReactSession.set("username", username);
        // Also set this in cookie/localStorage
    };

    var setUserId = function(id) {
        userId = id;
        ReactSession.set("userId", userId);
        // Also set this in cookie/localStorage
    };
  
    return ({
        getFullName: getFullName,
        getFirstName: getFirstName,
        setFirstName: setFirstName,
        getLastName: getLastName,
        setLastName: setLastName,
        getUsername: getUsername,
        setUsername: setUsername,
        getUserId: getUserId,
        setUserId: setUserId
    });
  
  })();
  
  export default UserProfile;