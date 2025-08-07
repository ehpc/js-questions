type GraphNode = Record<string, any>;
type Graph = GraphNode[];
type MapperFn<T = GraphNode> = (obj: T) => [string, string[] | undefined];

function topoSort<T extends GraphNode = GraphNode>(graph: T[], mapper: MapperFn<T>) {
  const depsByVertex = new Map<string, string[]>();
  const nodeByVertex = new Map<string, T>();
  const verticies: string[] = [];
  for (const node of graph) {
    const [vertex, deps] = mapper(node);
    depsByVertex.set(vertex, deps ?? []);
    nodeByVertex.set(vertex, node);
    verticies.push(vertex);
  }
  const visiting = new Set();
  const visited = new Set();

  const result: T[] = [];

  function visit(vertex: string) {
    if (visiting.has(vertex)) throw new Error(`Cyclic dependency detected at "${vertex}"`);

    visiting.add(vertex);
    const deps = depsByVertex.get(vertex)!;
    if (deps.length) {
      for (const dep of deps) {
        if (!visited.has(dep)) {
          visit(dep);
        }
      }
    }
    visiting.delete(vertex);

    if (!visited.has(vertex)) {
      visited.add(vertex);
      result.push(nodeByVertex.get(vertex)!);
    }
  }

  for (const vertex of verticies) {
    visit(vertex);
  }

  return result;
}

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
console.log(JSON.stringify(
  topoSort(skills, ({name, need}) => [name, need]),
  undefined,
  '  '
));

/*
firehands     magicspell
     \         /     \
      v       v       v
     fireball        crazymind
            \         /
             v       v
              inferno
*/