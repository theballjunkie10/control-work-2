
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

// View
class ApplicantView {
  constructor() {
      this.form = document.getElementById('applicant-form');
      this.fullnameInput = document.getElementById('fullname');
      this.emailInput = document.getElementById('email');
      this.phoneInput = document.getElementById('phone');
      this.facultySelect = document.getElementById('faculty');
      this.totalApplicants = document.getElementById('total-applicants');
      this.applicantsContainer = document.getElementById('applicants-container');
      this.facultyFilter = document.getElementById('faculty-filter');
      this.fullnameFilter = document.getElementById('fullname-filter');
  }

  getInputValues() {
      return {
          fullname: this.fullnameInput.value.trim(),
          email: this.emailInput.value.trim(),
          phone: this.phoneInput.value.trim(),
          faculty: this.facultySelect.value.trim(),
      };
  }

  getFilterValues() {
      return {
          faculty: this.facultyFilter.value.trim(),
          fullname: this.fullnameFilter.value.trim(),
      };
  }

  clearForm() {
      this.fullnameInput.value = '';
      this.emailInput.value = '';
      this.phoneInput.value = '';
      this.facultySelect.value = '';
  }

  renderApplicants(applicants) {
      this.applicantsContainer.innerHTML = '';
      applicants.forEach((applicant, index) => {
          const card = document.createElement('div');
          card.className = 'applicant-card';
          card.innerHTML = `
              <div>
                  <p><strong>ФИО:</strong> ${applicant.fullname}</p>
                  <p><strong>Email:</strong> ${applicant.email}</p>
                  <p><strong>Телефон:</strong> ${applicant.phone}</p>
                  <p><strong>Факультет:</strong> ${applicant.faculty}</p>
              </div>
              <button class="delete-btn" data-index="${index}">Удалить</button>
          `;
          this.applicantsContainer.appendChild(card);
      });
  }

  updateTotalApplicants(count) {
      this.totalApplicants.textContent = count;
  }

  bindAddApplicant(handler) {
      this.form.addEventListener('submit', (event) => {
          event.preventDefault();
          handler(this.getInputValues());
      });
  }

  bindDeleteApplicant(handler) {
      this.applicantsContainer.addEventListener('click', (event) => {
          if (event.target.classList.contains('delete-btn')) {
              const index = event.target.dataset.index;
              handler(index);
          }
      });
  }

  bindFilterApplicants(handler) {
      this.facultyFilter.addEventListener('input', () => handler(this.getFilterValues()));
      this.fullnameFilter.addEventListener('input', () => handler(this.getFilterValues()));
  }
}

// Presenter
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

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  const app = new ApplicantPresenter(new ApplicantModel(), new ApplicantView());
});
