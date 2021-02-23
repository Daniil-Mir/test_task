export class Parametr {
  // static create(parametr) {
  //   return fetch('https://my-first-app-5a872-default-rtdb.firebaseio.com/parametrs.json', {
  //     method: 'POST',
  //     body: JSON.stringify(parametr),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(response => {
  //       parametr.id = response.name;
  //       return parametr;
  //     })
  //     .then(addToLocalStorage)
  //     .then(Parametr.renderList)
  // }

  static createProfession(profession, categorie) {
    return fetch('https://my-first-app-5a872-default-rtdb.firebaseio.com/professions.json', {
      method: 'POST',
      body: JSON.stringify(profession),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        profession.id = response.name;
        return { parametr: profession, categorie };
      })
      .then(response => {
        addToLocalStorage(response);
        console.log('Pered otpravkoy', response);
        return response.categorie;
      })
      .then(Parametr.renderList)
  }

  static createDepartment(department, categorie) {
    return fetch('https://my-first-app-5a872-default-rtdb.firebaseio.com/departments.json', {
      method: 'POST',
      body: JSON.stringify(department),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        department.id = response.name;
        return { parametr: department, categorie };
      })
      .then(response => {
        addToLocalStorage(response);
        return response.categorie;
      })
      .then(Parametr.renderList)
  }

  static getFromProfessionsDB(categorie) {
    fetch('https://my-first-app-5a872-default-rtdb.firebaseio.com/professions.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        const all = getParametrsFromLocalStorage(categorie);
        for (let prop in response) {
          all.push(response[prop]);
          all[all.length - 1].id = prop;
        }
        all.sort((prev, next) => {
          if (prev.Наименование < next.Наименование) return -1;
          if (prev.Наименование > next.Наименование) return 1;
          return 0;
        });
        localStorage.setItem(`${categorie}`, JSON.stringify(all));
        return  categorie;
      })
      .then(Parametr.renderListAfterGet)
  }

  static deleteFromDB() {
    fetch()
  }

  static renderList(categorie) {
    const parametrs = getParametrsFromLocalStorage(categorie)
    const html = parametrs.length
      ? parametrs.map(toCard).join('')
      : `<div class="mui--text-headline">Параметров нет</div>`;

    const list = document.getElementById('list');
    list.innerHTML = html;
  }

  static renderListAfterGet(categorie) {
    const parametrs = getParametrsFromLocalStorage(categorie)
    const html = parametrs.length
      ? parametrs.map(tableOfProfessions).join('')
      : `<div class="mui--text-headline">Параметров нет</div>`;

    const list = document.getElementById('list');
    list.innerHTML = html;
    list.insertAdjacentHTML('afterbegin', `<tr>
    <th>Наименование</th>
    <th>Примечание</th>
    <th>Дата</th>
  </tr>`);
  }
}

function addToLocalStorage(response) {
  const all = getParametrsFromLocalStorage(response.categorie);
  all.push(response.parametr);
  localStorage.setItem(`${response.categorie}`, JSON.stringify(all));
}

function getParametrsFromLocalStorage(categorie) {
  return JSON.parse(localStorage.getItem(`${categorie}`) || '[]');
}

function toCard(parametr) {
  return `          
  <div class="mui--text-black-54">
    ${new Date(parametr.date).toLocaleDateString()}
    ${new Date(parametr.date).toLocaleTimeString()}
  </div>
  <div>${parametr.text}</div>
  <br>`;
}

function tableOfProfessions(parametr) {
  return `
    <tr><td>${parametr.Наименование}</td><td>${parametr.Примечания}</td><td>${new Date(parametr.date).toLocaleDateString()} ${new Date(parametr.date).toLocaleTimeString()}</td><td id="delete">X</td></tr>
  `;
}