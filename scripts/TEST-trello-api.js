'use strict'

var trello = require("node-trello");
var q = require('q');
var rp = require('request-promise');

// auth
var key = process.env.HUBOT_TRELLO_KEY;
var token = process.env.HUBOT_TRELLO_TOKEN;
var t = require('./trello-login.js');

module.exports = function (robot) {

	robot.hear('trello login', function (res) {
		console.log(t);
	})

	robot.hear('trello token check', function (res) {

		var t = new trello(key, token)
		t.get(`/1/tokens/${token}`, function (err, data) {
			if (err) {
				if (err.responseBody = 'invalid token') {
					res.send('Your Token is Invalid. Please authorize your account to get you a new one.')
				}
				robot.logger.error(err);
				return 0;
			};
			console.log(data)
		})
	})


	var encryption = require('./encryption.js');

	robot.hear('encrypt (.*)', function (res) {
		var str = res.match[1];
		var k = encryption.encrypt(str)
		res.send(k);
	})



	robot.hear('decrypt (.*)', function (res) {
		var str = res.match[1];
		var k = encryption.decrypt(str)
		res.send(k);
	})



}




// module.exports ={ 




//     /*******************************************************************/
//     /*                              BOARDS                             */
//     /*******************************************************************/

// 	getBoard: function(id, pars, callback){
//         var deferred = q.defer();
//         t.get("/1/board/"+id, pars, function(err, data){
// 			if (err) {
//       		    deferred.reject(err);
// 	        };
//             deferred.resolve(data);
// 	    });
//         deferred.promise.nodeify(callback);
// 	    return deferred.promise;
// 	},

//     /*******************************************************************/
//     /*                              MEMBERS                            */
//     /*******************************************************************/
// 	getMembers: function(id, pars, callback){
//         var deferred = q.defer();
// 	    t.get("/1/members/"+id, function(err, data) {
// 	        if (err) {
//       		    deferred.reject(err);
// 	        };
//             deferred.resolve(data);
// 	    });
//         deferred.promise.nodeify(callback);
// 	    return deferred.promise;
// 	},

//     /*******************************************************************/
//     /*                              LISTS                              */
//     /*******************************************************************/
// 	getList: function(id, pars, callback){
// 		var deferred = q.defer();
// 		t.get("1/lists/"+id, pars, function(err, data){
// 			if (err){
// 				deferred.reject(err);
// 			};
// 			deferred.resolve(data);
// 		});
// 		deferred.promise.nodeify(callback);
// 		return deferred.promise;
// 	},



//     /*******************************************************************/
//     /*                         TESTING PURPOSES                        */
//     /*******************************************************************/
// 	test: function(k){
// 		var k;
// 		k = t.get("1/board/BE7seI7e",'', function(err, data){
// 			if (err){
// 				k = err;
// 			};
// 			console.log(`cb: ${data}`);
// 			k = data;
// 			return k;
// 		})
// 		return k;
// 		console.log(`k - test: ${k}`);
// 	}


// }



