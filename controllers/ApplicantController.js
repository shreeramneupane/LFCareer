exports.Index = function (request, response) {
  response.send('Applicants index');
};

exports.List = function (request, response) {
  response.send('Applicants Listing');
};

exports.Show = function (request, response) {
  response.send('Showing applicants')
};

