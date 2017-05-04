var db = require('./config');
const assert = require('assert');

var dbHelper = {
  /* Get specified Organization */
  getOrg: function(id, callback) {
    return db.query("SELECT * FROM organization WHERE id=?", [id], callback);
  },

  /* Get all of Organization */
  getOrgList: function(callback) {
    return db.query("SELECT * FROM organization", callback);
  },

  /* Get all the users in Organization */
  getUsersByOrg: function(id, callback) {
    return db.query("SELECT * FROM juven.user WHERE id IN (SELECT usr_id FROM juven.org_usr_instance WHERE org_id = ?)", [id], callback);
  },

  /* Get collection of Events by specified organization */
  getEventsByOrgId: function(qObj, callback) {
    var bSort = false;
    var bLimit = false;
    var bOffset = false;
    var sSort = "";
    console.log(qObj);
    if (typeof(qObj.filter) == "undefined") {
      callback("No filter parameter specified");
      return;
    }
    if (typeof(qObj.sort) !== "undefined") {
      bSort = true;
      var sortList = qObj.sort.split(",");
      console.log(sortList);
      for (var i = 0; i < sortList.length; ++i) {
        var bDesc = false;
        sortList[i] = sortList[i].trim();
        if (sortList[i].charAt(0) === "-") {
          bDesc = true;
          sortList[i] = sortList[i].substr(1);
        }
        switch (sortList[i].toLowerCase()) {
          case "name":
          case "date":
          case "location":
          case "price":
            sSort += "event." + sortList[i];
            sSort += bDesc ? " DESC " : "";
            break;
        }
        sSort += (i == sortList.length - 1) ? "" : ", ";
      }
    }
    console.log(sSort);
    bLimit = typeof(qObj.limit) !== "undefined" ? true : false;
    bOffset = typeof(qObj.offset) !== "undefined" ? true : false;
    return db.query({
      sql: "SELECT event.id, event.name, FROM_UNIXTIME(event.date) AS date, event.location, event.price, event.image_url, event.org_id FROM juven.event JOIN juven.organization " +
        "ON event.org_id = organization.id " +
        "WHERE event.org_id = ?" +
        (bSort ? " ORDER BY " : " ") + sSort +
        (bLimit ? " LIMIT " + db.escape(parseInt(qObj.limit)) : "") +
        (bOffset ? " OFFSET " + db.escape(parseInt(qObj.offset)) : ""),
      values: [qObj.filter]
    }, callback);
  },

  getUsersByEvent:function(id, callback){
    return db.query("SELECT * from juven.user WHERE id IN(SELECT usr_id FROM juven.evt_usr_instance WHERE evt_id = ?)", [id], callback);
  },

  /* Add existing user to event */
  addUserToEvent: function(reqParams, callback) {
    // Check valid eventId
    db.query("SELECT org_id FROM event WHERE id = ?", [reqParams.eventId], function(error, results, fields) {
      if (error) throw error;
      if (results.length == 0) {
        callback("Invalid eventId");
      } else {
        // Check usrId is in the Organization
        // assert(results === reqParams.orgId);
        db.query("SELECT usr_id FROM juven.org_usr_instance WHERE org_id = ? AND usr_id = ?", [results[0].org_id, reqParams.userId], function(error, results, fields) {
          if (error) throw error;
          if (results.length == 0) {
            callback("Invalid usrId");
          } else {
            // INSERT usrId and evtId into evt_usr_instance if it doesnt exist
            db.query({
              sql: "INSERT INTO juven.evt_usr_instance(evt_id, usr_id) " +
                "SELECT ?,? FROM DUAL " +
                "WHERE NOT EXISTS (" +
                "   SELECT id FROM juven.evt_usr_instance WHERE evt_id = ? AND usr_id = ?" +
                ")",
              values: [reqParams.eventId, reqParams.userId, reqParams.eventId, reqParams.userId]
            }, function(error, results, fields) {
              if (error) throw error;
              if (results.affectedRows == 0) {
                callback("The User already existed in event");
              } else {
                callback(error, results);
              }
            });
          }
        });
      }
    });
  }

};
module.exports = dbHelper;
