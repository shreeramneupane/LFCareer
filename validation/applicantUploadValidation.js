module.exports = {
  applicant_id: {
    rule: 'required',
    message: 'Applicant UUID missing'
  },
  resume: {
    rule: 'required',
    message: 'Please provide your resume.'
  },
  profile_picture: {
    rule: 'required',
    message: 'Please provide profile picture.'
  }
};
