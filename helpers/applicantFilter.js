"use restrict"

var _ = require('lodash');


module.exports = {
  urlParser: function(query){
    var parsedUrl = [];
    _.mapKeys(query,function(key,value){
        parsedUrl.push(params[value](key));
    });
    return parsedUrl;
  }
};

var params = [];

var pagination = {};
params['start'] = function(key){
  pagination['type'] = 'paginate'
  pagination['start'] = key;
  return pagination;
};

params['offset'] = function(key){
  pagination['offset'] = key;
  return pagination;
};

params['q'] = function(key) {
  var searchStatement = {
    "searchKey": key,
    "attribute": ["name", "email", "address", "phone_number"],
    "table": "applicants",
    "join": false,
    "type": 'search'
  };
  return searchStatement;

};

params['name'] = function(key){
  var selectStatement ={
    "searchKey": key,
    "attribute": "name",
    "table": "applicants",
    "join": false,
    "type": 'filter'
  };
  return selectStatement;
};

params['job'] = function(key){
  var filterStatement = {
    "searchKey": key,
    "field": 'job',
    "table": 'jobs',
    "attribute": "title",
    "join": true,
    "type": 'filter',
    "foreign_key": 'job_id'
  };
  return filterStatement;
};

params['sort'] = function(key) {
  var l = console.log;
  var sortParams = typeof (key) === 'string' ? [key] : key;
  var sortStatement = '';
  l(sortParams);
  for(var i = 0 ; i < sortParams.length; i++){
    var column = sortParams[i];
    l(column);
    l(_.startsWith('abc', 'a'));
    var order = _.startsWith(column, '-') ? 'desc' : 'asc';
    column = column.replace(/^-+/, "");
    sortStatement += column + ' ' + order;
    if(i < sortParams.length - 1){
      sortStatement += ', ';
    }

  }

  return {
    type: 'sort',
    orderBy: sortStatement
  }

};
