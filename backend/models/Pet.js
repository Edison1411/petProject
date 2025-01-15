// This is a simple abstraction layer.
// In a real app, you might use an ORM or direct SQL queries in the controllers.

class Pet {
  constructor(id, category_id, name, status, photoUrls) {
    this.id = id;
    this.category_id = category_id;
    this.name = name;
    this.status = status;
    this.photoUrls = photoUrls;
  }
}

module.exports = Pet;
