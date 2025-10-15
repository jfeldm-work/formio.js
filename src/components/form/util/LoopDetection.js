import {GlobalFormio as Formio} from "../../../Formio";

function detectNestedFormLoop(parentId, componentId, formId) {
  let nestedFormTree = Formio.nestedFormTree;
  if (!nestedFormTree) {
    throw new Error("Nested Form Tree not initialized, even though it should be.");
  }
  for (const node of nestedFormTree.branchTraversal(parentId)) {
    if (node.value === formId) {
      //Form has already been added to the tree, loop detected
      throw new Error("Loop detected in nested forms");
    }
  }
  nestedFormTree.insert(parentId, componentId, formId);
  Formio.nestedFormTree = nestedFormTree;
}

export default detectNestedFormLoop;
