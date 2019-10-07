const input = [
  ["P", "G"],
  ["X", "V"],
  ["H", "R"],
  ["O", "W"],
  ["C", "F"],
  ["U", "M"],
  ["E", "W"],
  ["F", "J"],
  ["W", "K"],
  ["R", "M"],
  ["I", "K"],
  ["D", "B"],
  ["Z", "A"],
  ["A", "N"],
  ["T", "J"],
  ["B", "N"],
  ["Y", "M"],
  ["Q", "N"],
  ["G", "V"],
  ["J", "N"],
  ["M", "V"],
  ["N", "V"],
  ["K", "S"],
  ["V", "L"],
  ["S", "L"],
  ["W", "D"],
  ["A", "V"],
  ["T", "Y"],
  ["H", "W"],
  ["O", "C"],
  ["P", "S"],
  ["Z", "N"],
  ["G", "K"],
  ["I", "T"],
  ["D", "M"],
  ["A", "Q"],
  ["O", "S"],
  ["N", "L"],
  ["V", "S"],
  ["M", "N"],
  ["A", "B"],
  ["H", "B"],
  ["H", "G"],
  ["Q", "M"],
  ["U", "E"],
  ["C", "S"],
  ["M", "L"],
  ["T", "L"],
  ["I", "N"],
  ["Y", "N"],
  ["K", "V"],
  ["U", "B"],
  ["H", "Z"],
  ["H", "Y"],
  ["E", "F"],
  ["F", "Q"],
  ["R", "G"],
  ["T", "S"],
  ["T", "Q"],
  ["X", "H"],
  ["Q", "S"],
  ["Q", "J"],
  ["G", "S"],
  ["D", "S"],
  ["A", "J"],
  ["I", "Y"],
  ["U", "K"],
  ["P", "R"],
  ["A", "T"],
  ["J", "K"],
  ["Z", "J"],
  ["Z", "V"],
  ["P", "X"],
  ["E", "I"],
  ["G", "L"],
  ["G", "N"],
  ["J", "L"],
  ["I", "Q"],
  ["Q", "K"],
  ["B", "J"],
  ["R", "T"],
  ["Z", "K"],
  ["J", "V"],
  ["R", "L"],
  ["R", "N"],
  ["W", "Q"],
  ["U", "W"],
  ["Y", "V"],
  ["C", "T"],
  ["X", "B"],
  ["M", "S"],
  ["B", "K"],
  ["D", "N"],
  ["P", "U"],
  ["N", "K"],
  ["M", "K"],
  ["C", "A"],
  ["W", "B"],
  ["C", "Y"],
  ["T", "V"],
  ["W", "M"]
];

class DAG {
  constructor(deps) {
    // this.nodes = new Set();
    this.deps = {};
    this.ideps = {};
    let roots = [];

    const nodeOptions = new Set();
    const children = new Set();
    for (let [parent, child] of deps) {
      nodeOptions.add(parent);
      nodeOptions.add(child);
      children.add(child);
      if (!this.deps[parent]) {
        this.deps[parent] = new Set();
      }
      if (!this.deps[child]) {
        this.deps[child] = new Set();
      }
      this.deps[parent].add(child);

      if (!this.ideps[child]) {
        this.ideps[child] = new Set();
      }
      if (!this.ideps[parent]) {
        this.ideps[parent] = new Set();
      }
      this.ideps[child].add(parent);
    }

    this.roots = new Set([...nodeOptions].filter(x => !children.has(x)));
  }

  getChildren(str) {
    return this.deps[str];
  }

  getParents(str) {
    return this.ideps[str];
  }

  walk() {
    let order = [];
    let toVisit = [...this.roots];
    toVisit = toVisit.sort();
    while (toVisit.length) {
      const current = toVisit.shift();
      order.push(current);
      let children = [...this.getChildren(current)].sort();
      for (let child of children) {
        let parents = [...this.getParents(child)];
        let isAvailable = parents.reduce(
          (acc, cur) => acc && order.includes(cur),
          true
        );
        if (isAvailable) {
          toVisit.push(child);
        }
      }
      toVisit = toVisit.sort();
    }
    return order;
  }
}

const part1 = () => {
    let dag = new DAG(input);
    console.log(dag.walk().join(''))
};

part1();
