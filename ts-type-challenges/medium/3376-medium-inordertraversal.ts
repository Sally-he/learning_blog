const tree1 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
} as TreeNode;

type A3 = InorderTraversal<typeof tree1> // [1, 3, 2]

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}
type InorderTraversal<T extends TreeNode | null, N extends TreeNode = NonNullable<T>> =
  T extends null ? [] : [...InorderTraversal<N['left']>, N['val'], ...InorderTraversal<N['right']>];
