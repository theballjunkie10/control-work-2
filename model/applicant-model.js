

class ApplicantModel {
  constructor() {
      this.applicants = [];
  }

  addApplicant(applicant) {
      this.applicants.push(applicant);
  }

  removeApplicant(index) {
      this.applicants.splice(index, 1);
  }

  getApplicants() {
      return this.applicants;
  }

  getTotalApplicants() {
      return this.applicants.length;
  }

  filterApplicants(faculty, fullname) {
      return this.applicants.filter(applicant => {
          const matchesFaculty = faculty === "" || applicant.faculty.toLowerCase() === faculty.toLowerCase();
          const matchesFullname = applicant.fullname.toLowerCase().includes(fullname.toLowerCase());
          return matchesFaculty && matchesFullname;
      });
  }
}

export default ApplicantModel;