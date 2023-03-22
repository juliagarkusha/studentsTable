class StudentsAPI {
  static URL = "https://6391adecac688bbe4c4f165a.mockapi.io/api/students";

  static getList() {
    return fetch(StudentsAPI.URL).then(res => {
      if(res.ok) {
        return res.json();
      }

      throw new Error('Can not fetch todo list from server');
    })
  }

  static create(data) {
    return fetch(StudentsAPI.URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      }
    }).then(res => {
      if(res.ok) {
        return res.json();
      }

      throw new Error('Can not create student on a server');
    })
  }

  static update(id, data) {
    return fetch(`${StudentsAPI.URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      }
    }).then(res => {
      if(res.ok) {
        return res.json();
      }

      throw new Error('Can not update student on a server');
    })
  }

  static delete(id) {
    return fetch(`${StudentsAPI.URL}/${id}`, { method: 'DELETE' }).then(res => {
      if(res.ok) {
        return res.json();
      }

      throw new Error('Can not delete student on a server');
    })
  }
}

export default StudentsAPI;
