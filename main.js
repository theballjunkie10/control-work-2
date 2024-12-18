
import ApplicantModel from './model/applicant-model.js';
import ApplicantView from './view/applicant-view.js';
import ApplicantPresenter from './presenter/applicant-presenter.js';

// Инициализация приложения при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const model = new ApplicantModel();
    const view = new ApplicantView();
    new ApplicantPresenter(model, view);
});