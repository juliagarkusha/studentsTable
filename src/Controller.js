class Controller {
  constructor(rootEl) {
    this.rootEl = rootEl;
    this.studentsListCollection = new StudentsListCollection();

    this.studentAddFormView = new StudentAddFormView({
      onSubmit: (formData) => {
        const data = {...formData, marks: (new Array(10)).fill(0)};

        this.create(data);
      }
    });

    this.StudentsTableView = new StudentsTableView( {
      onEdit: (id, index, value) => this.update(id, index, value),
      onDelete: (id) => this.delete(id),
    });
  }

  renderStudentsTable() {
    this.studentAddFormView.appendTo(this.rootEl);
    this.StudentsTableView.appendTo(this.rootEl);

    this.studentsListCollection.get().then(list => {
      this.StudentsTableView.renderTable(list);
    });
  }

  delete(id) {
    this.studentsListCollection
      .delete(id)
      .then((removedId) => {
        this.StudentsTableView.remove(removedId);
      })
  }

  create(data) {
    this.studentsListCollection
      .create(data)
      .then((newStudent) => {
        this.StudentsTableView.add(newStudent);
      })
  }

  update(updatedId, index, value) {
    const newStudent = this.studentsListCollection.list.find(student => student.id === updatedId);
    newStudent.marks[Number(index)] = Number(value);

    const { id, ...data } = newStudent;
    this.studentsListCollection.update(updatedId, data);
  }
}