class StudentAddFormView {
  static FORM_ROOT_ID = 'studentAdd';
  static FORM_ROOT_CLASS = 'form';
  static FORM_BTN_SUBMIT_CLASS = 'btn-submit';

  constructor(options) {
    const { onSubmit } = options;
    this.formRootEl = null;
    this.onSubmit = onSubmit;
  }

  appendTo(containerEl) {
    const formHtml = this.generateFormHtml();
    containerEl.insertAdjacentHTML('beforeend', formHtml);
    this.formRootEl = containerEl.querySelector(`#${StudentAddFormView.FORM_ROOT_ID}`);
    this.formRootEl.addEventListener('submit', this.onFormRootElSubmit.bind(this));
  }

  onFormRootElSubmit(event) {
    const { target } = event;
    event.preventDefault();
    const formData = new FormData(target);
    const data = [];

    formData.forEach((item, name) => {
      data.push({ name, value: String(item) })
    })

    const validFormData = data.reduce((acc, field) => ({...acc, [field.name]: field.value}), {});

    if(!validFormData.name) {
      return;
    }

    this.onSubmit(validFormData);
    event.target.reset();
  }

  generateFormHtml() {
    return `
      <form 
        id="${StudentAddFormView.FORM_ROOT_ID}" 
        name="${StudentAddFormView.FORM_ROOT_ID}" 
        class="${StudentAddFormView.FORM_ROOT_CLASS}"
      >
        <input type="text" name='name' placeholder="Add student" />
        <button type="submit" class="${StudentAddFormView.FORM_BTN_SUBMIT_CLASS}">Save</button>
      </form>
    `
  }
}