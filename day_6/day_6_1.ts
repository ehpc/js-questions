class User {
  name: string;
  age: string;
  skills: string;
  constructor(params) {
    this.name = params.name;
    this.age = params.age;
    this.skills = params.skills;
  }

  static name(name: string) {
    return new UserBuilder().name(name);
  }

  static age(age: number) {
    return new UserBuilder().age(age);
  }

  static skills(skills: string[]) {
    return new UserBuilder().skills(skills);
  }
}

class UserBuilder {
  #name: string = '';
  #age: number = 0;
  #skills: string[] = [];

  name(name: string) {
    this.#name = name;
    return this;
  }

  age(age: number) {
    this.#age = age;
    return this;
  }

  skills(skills: string[]) {
    this.#skills = skills;
    return this;
  }

  create() {
    return new User({
      name: this.#name,
      age: this.#age,
      skills: this.#skills,
    });
  }
}


let user1Partial = User.name('Bob').age(47).skills(['Coding']);
let user2 = User.name('Alex').age(13).skills(['None']).create();
let user1 = user1Partial.create();
console.log(JSON.stringify(user1)); // User({name: 'Bob', age: 47, skills: ['Coding']})
console.log(JSON.stringify(user2)); // User({name: 'Alex', age: 13, skills: ['None']})
