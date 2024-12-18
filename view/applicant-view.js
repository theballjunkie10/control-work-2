

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

export default ApplicantView;