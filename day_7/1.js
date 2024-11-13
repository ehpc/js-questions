class User {
  constructor(params) {
    this.name = params.name;
    this.age = params.age;
    this.skills = params.skills;
  }

  static name(name) {
    this.name = name;
    return this;
  }

  static age(age) {
    this.age = age;
    return this;
  }

  static skills(skills) {
    this.skills = skills;
    return this;
  }

  static create() {
    return new this({name: this.name, age: this.age, skills: this.skills});
  }
}

console.log(User.name('Bob').age(47).skills(['Coding']).create()); // User({name: 'Bob', age: 47, skills: ['Coding']})
