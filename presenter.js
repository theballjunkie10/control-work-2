class Presenter {
  constructor(model, view) {
      this.model = model;
      this.view = view;

      this.facultyTranslations = {
          IT: "Информационных технологий",
          ECONOMICS: "Экономический",
          MEDICINE: "Медицинский",
          HUMANITIES: "Гуманитарный",
      };

      // Установка обработчиков событий
      this.view.applicantForm.addEventListener('submit', this.handleFormSubmit.bind(this));
      this.view.facultyFilter.addEventListener('change', this.updateView.bind(this));
      this.view.searchInput.addEventListener('input', this.updateView.bind(this));

      this.updateView();
  }

  handleFormSubmit(event) {
      event.preventDefault();
      const fullname = event.target.fullname.value;
      const email = event.target.email.value;
      const phone = event.target.phone.value;
      const faculty = event.target.faculty.value;

      if (!this.isValidFullname(fullname)) {
          alert("Ошибка: ФИО должно содержать как минимум имя и фамилию.");
          return;
      }

      if (!this.isValidEmail(email)) {
          alert("Ошибка: Некорректный email.");
          return;
      }

      if (!this.isValidPhone(phone)) {
          alert("Ошибка: Номер телефона должен содержать только цифры и быть длиной 11 символов.");
          return;
      }

      const applicant = { fullname, email, phone, faculty };
      this.model.addApplicant(applicant);
      this.view.clearForm();
      this.updateView();
  }

  handleDeleteApplicant(index) {
      this.model.deleteApplicant(index);
      this.updateView();
  }

  updateView() {
      const faculty = this.view.facultyFilter.value;
      const searchQuery = this.view.searchInput.value;
      const filteredApplicants = this.model.getFilteredApplicants(faculty, searchQuery);

      this.view.updateTotalApplicants(this.model.applicants.length);
      this.view.renderApplicants(
          filteredApplicants.map(applicant => ({
              ...applicant,
              faculty: this.facultyTranslations[applicant.faculty],
          })),
          this.handleDeleteApplicant.bind(this)
      );
  }

  isValidFullname(fullname) {
      const namePattern = /^[А-Яа-яЁё\s]+$/;
      return fullname.split(" ").length >= 2 && namePattern.test(fullname);
  }

  isValidEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(email);
  }

  isValidPhone(phone) {
      const phonePattern = /^\d{11}$/;
      return phonePattern.test(phone);
  }
}

const app = new Presenter(new Model(), new View());