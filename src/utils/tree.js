class TreeNode {
  constructor(key, value, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.children = [];
  }

  get isLeaf() {
    return this.children.length === 0;
  }

  get hasChildren() {
    return !this.isLeaf;
  }
}

class Tree {
  constructor(key, value) {
    this.root = new TreeNode(key, value);
  }

  /**
   * Traverse the tree from starting node (default root) to leafs
   * @param node starting node of the traversal
   * @returns {Generator<Node|*, void, *>} An iterator of nodes
   */
  *topDownTraversal(node = this.root) {
    yield node;
    if (node.hasChildren) {
      for (const child of node.children) {
        yield* this.topDownTraversal(child);
      }
    }
  }

  /**
   * Traverse the tree from starting node (default root) to root
   * @param node starting node of the traversal
   * @returns {Generator<Node|*, void, *>} An iterator of nodes
   */
  *bottomUpTraversal(node = this.root) {
    if (node.hasChildren) {
      for (const child of node.children) {
        yield* this.bottomUpTraversal(child);
      }
    }
    yield node;
  }

  insert(parentKey, key, value) {
    if (this.has(key)) return;
    for (const node of this.topDownTraversal()) {
      if (node.key === parentKey) {
        node.children.push(new TreeNode(key, value, node.key));
        return;
      }
    }
  }

  remove(key) {
    for (const node of this.bottomUpTraversal()) {
      if (node.key === key) {
        node.parent.children = node.parent.children.filter(child => child.key !== key);
        return;
      }
    }
  }

  find(key) {
    for (const node of this.topDownTraversal()) {
      if (node.key === key) return node;
    }
    return undefined;
  }

  findValue(key) {
    return this.find(key)?.value;
  }

  has(key) {
    return this.find(key) !== undefined;
  }

  /**
   * Traverse the branch from a starting form key (excluding the starting node)
   * @param key
   * @returns {Generator<Container<Node.ChildNode> | Document, void, *>}
   */
  *branchTraversal(key) {
    let startingNode = this.find(key);
    while (startingNode?.parent) {
      startingNode = this.find(startingNode.parent);
      yield startingNode;
    }
  }

}

module.exports = {Tree, TreeNode};
