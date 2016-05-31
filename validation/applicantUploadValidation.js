module.exports = {
  applicant_id: {
    rule: 'required',
    message: "Applicant's id missing to upload files."
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
