

class ApplicantPresenter {
  constructor(model, view) {
      this.model = model;
      this.view = view;

      this.view.bindAddApplicant(this.handleAddApplicant.bind(this));
      this.view.bindDeleteApplicant(this.handleDeleteApplicant.bind(this));
      this.view.bindFilterApplicants(this.handleFilterApplicants.bind(this));

      this.updateView();
  }

  handleAddApplicant(applicant) {
      if (!applicant.fullname || !applicant.email || !applicant.phone || !applicant.faculty) {
          alert("Пожалуйста, заполните все поля.");
          return;
      }

      if (!this.isValidEmail(applicant.email)) {
          alert("Введите корректный email.");
          return;
      }

      if (!this.isValidPhone(applicant.phone)) {
          alert("Введите корректный номер телефона.");
          return;
      }

      this.model.addApplicant(applicant);
      this.view.clearForm();
      this.updateView();
  }

  handleDeleteApplicant(index) {
      this.model.removeApplicant(index);
      this.updateView();
  }

  handleFilterApplicants(filterValues) {
      const filteredApplicants = this.model.filterApplicants(filterValues.faculty, filterValues.fullname);
      this.view.renderApplicants(filteredApplicants);
  }

  updateView() {
      const applicants = this.model.getApplicants();
      const total = this.model.getTotalApplicants();

      this.view.renderApplicants(applicants);
      this.view.updateTotalApplicants(total);
  }

  isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  }

  isValidPhone(phone) {
      const phoneRegex = /^\+?[0-9]{10,15}$/;
      return phoneRegex.test(phone);
  }
}

export default ApplicantPresenter;