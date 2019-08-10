var express = require('express');
var router = express.Router();
var da = require('../data_access/da');

router.post('/', function(req, res){
    da.searchPart(req.body['search'], function(err, parts){
        res.render('parts/parts', {title:'Parts listing', parts_list: parts});
    });
});

module.exports = router;