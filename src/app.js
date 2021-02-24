import { Parametr } from './parametr';
import { isValid } from './utils';
import { Forms } from './forms';
import './styles.css';

const form = document.getElementById('form');
//const input = form.querySelectorAll('#param-text');
//const submitBtn = form.querySelector('#submit');
const professions = document.getElementById('professions');
const departments = document.getElementById('departments');
const categories = document.querySelectorAll('.categories');

window.addEventListener('load', Parametr.renderList);
form.addEventListener('submit', submitFormHandler);
professions.addEventListener('click', createProfessionForm);
departments.addEventListener('click', createDepartmentsForm);
// input.addEventListener('input', () => {
//   submitBtn.disabled = !isValid(input.value);
// });

function createProfessionForm(event) {
  categories.forEach(div => {
    div.classList.remove('active');
  });
  professions.classList.add('active');
  form.innerHTML = Forms.professions();

  const fields = document.getElementById('fields');
  const input = form.querySelectorAll('#param-text');

  fields.innerText = professions.innerText;
  Parametr.getFromProfessionsDB(fields.innerText)
    .then(() => {
      const table = document.getElementById('list');
      const deleteBtns = table.querySelectorAll('#delete');
     
      deleteBtns.forEach(button => button.addEventListener('click', deleteProfession));
    });
  input.forEach(elem => elem.addEventListener('input', () => {isSubmitBtnDisabled(input)}));
};

function createDepartmentsForm(event) {
  categories.forEach(div => {
    div.classList.remove('active');
  })
  departments.classList.add('active');
  form.innerHTML = Forms.departments();

  const fields = document.getElementById('fields');
  const input = form.querySelectorAll('#param-text');

  fields.innerText = departments.innerText;
  input.forEach(elem => elem.addEventListener('input', () => {isSubmitBtnDisabled(input)}));
};

function isSubmitBtnDisabled(inputArr) {
  const submitBtn = form.querySelector('#submit');
  let flag = false;

  inputArr.forEach(input => flag = isValid(input.value));
  submitBtn.disabled = !flag;
  return flag;
}

function submitFormHandler(event) {
  event.preventDefault();

  const fields = document.getElementById('fields');
  const input = form.querySelectorAll('#param-text');
  const submitBtn = form.querySelector('#submit');

  if ( isSubmitBtnDisabled(input) ) {
    const parametr = {}
    input.forEach(oneInput => {
      parametr[oneInput.offsetParent.innerText] = oneInput.value;
    });
    parametr.date = new Date().toJSON();

    // const parametr = {
    //   text: input.value.trim(),
    //   date: new Date().toJSON()
    // }
    submitBtn.disabled = true;
    // Async request to server to save parametr
    if (fields.innerText === 'Профессии') {
      Parametr.createProfession(parametr, fields.innerText).then(() => {
        input.forEach(oneInput => {
          oneInput.value = '';
          oneInput.className = ''; 
        });
        submitBtn.disabled = false;
      })
        .then(deleteProfession);
    } else if (fields.innerText === 'Отделы') {
      Parametr.createDepartment(parametr, fields.innerText).then(() => {
        input.forEach(oneInput => {
          oneInput.value = '';
          oneInput.className = ''; 
        });
        submitBtn.disabled = false;
      })
    }
    // Parametr.create(parametr).then(() => {
    //   input.value = '';
    //   input.className = '';
    //   submitBtn.disabled = false;
    // });

  }
}

function deleteProfession(event) {
  let numberLikeText = event.target.parentNode.children[0].innerText;
  let elemOfArray = Number(numberLikeText) - 1;
  Parametr.deleteProfession(elemOfArray, "Профессии");
}
