import RbTree from "../node_modules/red-black-tree-js"


const rbTree = new RbTree();
rbTree.insert(1, "foo");
rbTree.insert(2, "bar");
rbTree.insert(3, "bar");
rbTree.insert(4, "bar");
rbTree.insert(5, "bar");
rbTree.insert(6, "bar");
rbTree.remove(6);

const iterator = rbTree.createIterator();

let result = [];
while (iterator.hasNext()) {
  console.log(iterator.next());
}