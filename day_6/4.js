const skills = [
  {
    name: 'fireball',
    need: ['firehands', 'magicspell']
  },

  {
    name: 'firehands'
  },

  {
    name: 'magicspell'
  },

  {
    name: 'inferno',
    need: ['fireball', 'crazymind']
  },

  {
    name: 'crazymind',
    need: ['magicspell']
  }
];

/*
[
  {
    name: 'firehands'
  },

  {
    name: 'magicspell'
  },

  {
    name: 'crazymind',
    need: ['magicspell']
  }

  {
    name: 'fireball',
    need: ['firehands', 'magicspell']
  },

  {
    name: 'inferno',
    need: ['fireball', 'crazymind']
  }
]
*/
console.log(sort(skills, ({name, need}) => [name, need]));

function sort(skills, fn) {
  const map = new Map(skills.map((value) => {
    const [key, dependencies = []] = fn(value);

    return [
      key,
      {
        value, dependencies, marked: false
      }
    ]
  }));

  const queue = [];

  function traverse(mapInstance) {
    mapInstance.forEach((el) => {
      if (el.marked) {
        return;
      }

      if (el.dependencies.length) {
        traverse(new Map(el.dependencies.map((key) => [key, map.get(key)])));
      }

      el.marked = true;
      queue.push(el.value);
    })
  }

  traverse(map);

  skills.forEach((_, i) => {
    skills[i] = queue[i];
  });

  return skills;
}