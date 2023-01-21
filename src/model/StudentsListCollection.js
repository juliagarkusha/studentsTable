import StudentsAPI from "./StudentsAPI";

class StudentsListCollection {
  #list = [];

  get list() {
    return this.#list;
  }

  get() {
    return StudentsAPI.getList()
      .then((list) => {
      this.#list = list;

      return this.#list;
    })
  }

  create(data) {
    return StudentsAPI.create(data)
      .then((newStudent) => {
        this.#list.push(newStudent)

        return newStudent;
      })
  }

  update(id, data) {
    return StudentsAPI.update(id, data)
      .then(() => {
        this.#list = this.#list.map(student => {
          if(student.id === id) {
            return {
              ...student,
              ...data,
            }
          }

          return student;
        })
      })
  }

  delete(id) {
    return StudentsAPI.delete(id)
      .then(() => {
        this.#list = this.#list.filter(item => item.id !== id);

        return id;
      })
  }
}

export default StudentsListCollection;
