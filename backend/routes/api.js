var express = require('express');
var router = express.Router();
var assert = require('assert');

var dbHelper = require('./dbHelper');

/* GET Collection of Organization */
// /organization
// /organization/{orgId}
router.get('/organization/:orgId?', function(req, res, next) {
  var orgId = req.params.orgId;
  if (orgId) {
    dbHelper.getOrg(orgId, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        // Start TestCase
        //assert.equal(rows.length, 1, 'Specified organization');
        // End TestCase
        res.json(rows[0]);
      }
    });
  } else {
    dbHelper.getOrgList(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        // Start TestCase
        //assert.equal(rows.length, 2, 'All organization');
        // End TestCase
        res.json(rows);
      }
    });
  }
});

/* Get Users by Organization id*/
// /organization/[orgId]/user
router.get('/organization/:orgId/user', function(req, res, next) {
  dbHelper.getUsersByOrg(req.params.orgId, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

/* GET Collection of Event */
// /event?filter={orgId} Must
// /event?filter={orgId}&sort={field}&limit={Number}&offset={Number} OPINIONAL
router.get('/event', function(req, res, next) {
  var qObj = req.query;
  dbHelper.getEventsByOrgId(qObj, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      // Start TestCase
      // assert.equal(rows.length, 3, 'filter=1 length is 3');
      // assert.equal(rows.length, 0, 'filter=10 length is 0');
      // assert.equal(rows[0].price, 5, 'filter=1&sort=price price is 5');
      // assert.equal(rows[0].price, 50, 'filter=1&sort=-price price is 50');
      // assert.equal(rows[0].price, 64, 'filter=2&sort=-price price is 64');
      // assert.equal(rows[1].price, 22, 'filter=2&sort=-price price is 22');
      // assert.equal(rows[2].price, 9, 'filter=2&sort=-price price is 9');
      // assert.equal(rows.length, 1, 'filter=1&sort=-price&limit=1 length is 1');
      // assert.equal(rows[0].price, 50, 'filter=1&sort=-price&limit=1 length is 50');
      // assert.equal(rows.length, 10, 'filter=1&sort=-price&limit=1&offset=1 price is 10');
      // End TestCase
      res.json(rows);
    }
  });
});

/* Get User by Event id*/
// /event/[evtId]/user
router.get('/event/:eventId/user', function(req, res, next) {
  dbHelper.getUsersByEvent(req.params.eventId, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

/* ADD User to Event */
// POST /event/{evtId}/user
// Request Body- userId: {userId}
router.post('/event/:eventId/user', function(req, res, next) {
  var RequestParams = {
    eventId: -1,
    userId: -1
  };
  RequestParams.eventId = req.params.eventId;
  RequestParams.userId = req.body.userId;
  console.log(req.body);
  console.log(req.body.userId);
  console.log(RequestParams);
  dbHelper.addUserToEvent(RequestParams, function(err, rows) {
    if (err) {
      // Start TestCase
      // Invalid eventId
      // assert.equal(err, "Invalid eventId", '/event/22/user ');
      // Invalid usrId
      // assert.equal(err, "Invalid usrId", 'Request Body- userId: {22} ');
      // Guess Already in the event
      // assert.equal(err, "The User already existed in event", '/event/1/user Request Body- userId: 1');
      // End TestCase
      res.status(400);
      res.json({
        "description": err
      });
    } else {
      // Start TestCase
      // Guess didnt exist in the event
      // assert.equal(rows.affectedRows, "1", '/event/2/user Request Body- userId: 2 is affectedRows =1');
      // End TestCase
      res.status(201);
      res.json(rows);
    }
  });
});

module.exports = router;
