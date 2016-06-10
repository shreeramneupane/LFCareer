"use restrict"

var _ = require('lodash');

module.exports = {

  parse: function (model, query) {
    var parsedUrl = {};

    _.mapKeys(query, function (key, value) {
      _.merge(parsedUrl, params[value](key, model));
    });

    return parsedUrl;
  }
};

var params = [];

params['q'] = function (key, model) {
  var whitelistedAttribute = [];
  var searchQueryBuilder = {$or: []};

  _.forEach(model.attributes, function (attribute) {
    if (attribute.type._length) {
      whitelistedAttribute.push(attribute.fieldName)
    }
  });

  _(whitelistedAttribute).forEach(function (attribute) {
    searchQueryBuilder.$or.push({[attribute]: {$iLike: '%' + key + '%'}})
  });

  return {where: searchQueryBuilder};
};

params['start'] = function (key) {
  return {offset: key}
};

params['offset'] = function (key) {
  return {limit: key}
};

params['sort'] = function (keys, model) {
  var modelAttributes = _.keys(model.attributes);
  var sortParams = [];

  if (typeof(keys) === 'string') {
    keys = [keys];
  }

  _.forEach(keys, function (key) {
    var order = _.startsWith(key, '-') ? 'DESC' : 'ASC';
    key = key.replace(/^-+/, "");
    if (modelAttributes.indexOf(key) > -1) {
      sortParams.push([key, order])
    }
  });

  return {order: sortParams}
};
