class View {
  constructor() {
      this.totalApplicants = document.getElementById('total-applicants');
      this.applicantForm = document.getElementById('applicant-form');
      this.facultyFilter = document.getElementById('faculty-filter');
      this.searchInput = document.getElementById('search-input');
      this.applicantsContainer = document.getElementById('applicants-container');
  }

  updateTotalApplicants(count) {
      this.totalApplicants.textContent = count;
  }

renderApplicants(applicants, deleteHandler) {
  this.applicantsContainer.innerHTML = '';
  applicants.forEach((applicant, index) => {
      const div = document.createElement('div');
      div.className = 'applicant';
      div.innerHTML = `
          <p><strong>ФИО:</strong> <strong>${applicant.fullname}</strong></p>
          <p><strong>Email:</strong> ${applicant.email}</p>
          <p><strong>Телефон:</strong> ${applicant.phone}</p>
          <p><strong>Факультет:</strong> ${applicant.faculty}</p>
          <button class="delete-btn" data-index="${index}">Удалить</button>
      `;
      div.querySelector('.delete-btn').addEventListener('click', () => deleteHandler(index));
      this.applicantsContainer.appendChild(div);
  });
}

  clearForm() {
      this.applicantForm.reset();
  }
}