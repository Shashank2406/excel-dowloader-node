var express = require('express');
var router = express.Router();

var userController = require('../controllers/user');



router.route('/excel/:dbname')
.get(userController.writefile)

router.route('/user')
 .post(userController.postuser)
 .get(userController.getuser)

router.route('/user/delete/:username')
 .get(userController.deleteusers)

router.route('/user/update/:id')
 .put(userController.updateUsers)

router.route('/series/update/:id')
 .put(userController.updateSeries)

router.route('/comic/update/:id')
 .put(userController.updateComic) 

router.route('/season/update/:id')
 .put(userController.updateSeason) 
 .get(userController.getpatseason)

router.route('/comment/update/')
 .put(userController.postcomment)

router.route('/comment/')
 .get(userController.getcomment) 

router.route('/series/delete/:id')
 .get(userController.deleteseries)

router.route('/season/delete/:id')
 .get(userController.deleteseason) 

router.route('/comic/delete/:id')
 .get(userController.deletecomic) 

router.route('/user/verify')
 .post(userController.searchuser) 

router.route('/series')
 .post(userController.postseries)
 .get(userController.getseries)

router.route('/season')
 .post(userController.postseason)
 .get(userController.getseason)

router.route('/comic')
.get(userController.error)

router.route('/comic/get')
 .post(userController.postcomic)
 .get(userController.getcomic)

router.route('/comic/:reg')
 .get(userController.searchcomic)

module.exports = router;

