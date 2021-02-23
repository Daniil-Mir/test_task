export class Forms {
  static professions() {
    return `
    <div class="mui-textfield mui-textfield--float-label">
      <input type="text" id="param-text" required minlength="10" maxlength="256">
      <label for="param-text">Наименование</label>
    </div>
    <div class="mui-textfield mui-textfield--float-label">
      <input type="text" id="param-text" required minlength="10" maxlength="256">
      <label for="param-text">Примечания</label>
    </div>
    <button 
      type="submit"
      id="submit"
      disabled
      class="mui-btn mui-btn--raised mui-btn--primary"
    >
      Записать
    </button>
    `
  }

  static departments() {
    return `
    <div class="mui-textfield mui-textfield--float-label">
      <input type="text" id="param-text" required minlength="10" maxlength="256">
      <label for="param-text">Наименование</label>
    </div>
    <div class="mui-textfield mui-textfield--float-label">
      <input type="text" id="param-text" required minlength="10" maxlength="256">
      <label for="param-text">Примечания</label>
    </div>
    <div class="mui-textfield mui-textfield--float-label">
      <input type="text" id="param-text" required minlength="10" maxlength="256">
      <label for="param-text">Родительский отдел</label>
    </div>
    <button 
      type="submit"
      id="submit"
      disabled
      class="mui-btn mui-btn--raised mui-btn--primary"
    >
      Записать
    </button> 
    `
  }
}