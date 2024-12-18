class Model {
  constructor() {
      this.applicants = JSON.parse(localStorage.getItem('applicants')) || [];
  }

  addApplicant(applicant) {
      this.applicants.push(applicant);
      this.saveToLocalStorage();
  }

  deleteApplicant(index) {
      this.applicants.splice(index, 1);
      this.saveToLocalStorage();
  }

  getFilteredApplicants(faculty, searchQuery) {
      return this.applicants.filter(applicant =>
          (faculty === "" || applicant.faculty === faculty) &&
          (searchQuery === "" || applicant.fullname.toLowerCase().includes(searchQuery.toLowerCase()))
      );
  }

  saveToLocalStorage() {
      localStorage.setItem('applicants', JSON.stringify(this.applicants));
  }
}