var express = require('express');
var router = express.Router();
var da = require('../data_access/da');

/* GET parts listing. */
router.get('/', function(req, res, next) {
  da.findParts(function(err, parts) {
    res.render('parts/parts', {title:'Parts listing', parts_list: parts});
  });
});

router.post('/', function(req, res, next) {
  da.savePartFromForm(req.body, function(err) {
    res.redirect('/parts');
  });
});

router.get('/add', function(req, res){
  var userid = req.session['userid'];
  res.render('parts/add', {title: 'Add User', userid: userid});
});

router.get('/delete', function(req, res){
  da.deletePart(req.query.id, function(err){
    res.redirect('/parts');
  });
});

module.exports = router;
