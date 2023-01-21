class StudentsTableView {
  static MARKS_COUNT = 10;
  static TABLE_CLASS= 'table';
  static TABLE_ITEM_CLASS= 'table__item';
  static TABLE_CONTAINER_CLASS= 'table__container';
  static TABLE_HEAD_CLASS= 'table__head';
  static TABLE_BODY_CLASS= 'table__body';
  static TABLE_TD_EDITABLE_CLASS = 'table__td--editable';
  static TABLE_BTN_DELETE_CLASS= 'btn-danger';

  constructor(options) {
    const { onEdit, onDelete } = options;
    this.listRootEl = null;
    this.tableRootEl = null;
    this.onEdit = onEdit;
    this.onDelete = onDelete;
  }

  appendTo(containerEl) {
    const rootHtml = this.generateRootHtml();
    containerEl.insertAdjacentHTML('beforeend', rootHtml);
    this.listRootEl = containerEl.querySelector(`${StudentsTableView.TABLE_CLASS}`);
    this.tableRootEl = this.listRootEl.querySelector(`.${StudentsTableView.TABLE_BODY_CLASS}`);
    this.tableRootEl.addEventListener('click', this.onTableRootElClick.bind(this));
    this.tableRootEl.addEventListener('focusout', this.onTableRootElClick.bind(this));
  }

  onTableRootElClick(event) {
    const { target, type } = event;
    const studentEl = target.closest(`.${StudentsTableView.TABLE_ITEM_CLASS}`);

    if(!studentEl) {
      return;
    }

    const id = studentEl.dataset.id;
    const isDeleteBtn = target.dataset.action === 'delete';
    const isTdWidthMark = target.getAttribute('contenteditable');

    if(isDeleteBtn && type === 'click') {
      this.onDelete(id);
    }

    if(isTdWidthMark && type === 'focusout') {
      const index = target.dataset.index;
      const value = target.textContent.trim();

      this.onEdit(id, index, value);
    }
  }

  renderTable(list) {
    this.tableRootEl.innerHTML = '';

    list.forEach(item => this.renderTRow(this.tableRootEl, item));
  }

  renderTRow(containerEl, student) {
    const tRowHtml = this.generateTrowHtml(student);

    containerEl.insertAdjacentHTML('beforeend', tRowHtml);
  }

  add(student) {
    this.renderTRow(this.tableRootEl, student)
  }

  remove(id) {
    const studentEl = this.getStudentElById(id)

    studentEl.remove();
  }

  getStudentElById(id) {
    return this.listRootEl.querySelector(`[data-id="${id}"]`);
  }

  generateRootHtml() {
    return `
      <section class="${StudentsTableView.TABLE_CONTAINER_CLASS}">
        <table class="${StudentsTableView.TABLE_CLASS}">
          <thead class="${StudentsTableView.TABLE_HEAD_CLASS}">
            <tr>
              ${this.generateTdHtml({ tdText: 'Name' })}
              ${this.generateTdHtml({ tdText: 'Marks', colspanNumber: StudentsTableView.MARKS_COUNT })}
              ${this.generateTdHtml({ tdText: 'Actions' })}
            </tr>
          </thead>
          <tbody class="${StudentsTableView.TABLE_BODY_CLASS}"></tbody>
        </table>
      </section>
    `
  }

  generateTrowHtml({id, name, marks}) {
    return `
      <tr class="${StudentsTableView.TABLE_ITEM_CLASS}" data-id="${id}">
        ${this.generateTdHtml({ tdText: name })}
        ${this.generateTdGroupHtml(id, marks)}
        ${this.generateTdBtnHtml()}
      </tr>
    `
  }

  generateTdGroupHtml(id, textArray) {
    return textArray.map((textItem, index) => {
      return this.generateTdHtml({
        id,
        index,
        tdText: textItem,
        isContentEditable: true,
        className: StudentsTableView.TABLE_TD_EDITABLE_CLASS,
      });
    }).join('')
  }

  generateTdHtml(props) {
    const {
      tdText,
      colspanNumber = '1',
      isContentEditable = false,
      className = '',
      id = '',
      index = ''
    } = props;

    return `
      <td 
        colspan="${colspanNumber}" 
        contenteditable="${isContentEditable}" 
        class="${className}"
        data-id="${id}"
        data-index="${index}"
      >
        ${tdText}
      </td>
    `
  }

  generateTdBtnHtml(btnText='Delete', action='delete') {
    return `
      <td>
        <button class="${StudentsTableView.TABLE_BTN_DELETE_CLASS}" data-action="${action}">${btnText}</button>
      </td>
    `
  }
}

export default StudentsTableView;
