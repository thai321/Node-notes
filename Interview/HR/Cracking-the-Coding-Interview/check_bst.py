""" Node is defined as
class node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None
"""

def checkBST(root):
  return checkBSTHelper(root, 0, 10000)

def checkBSTHelper(node, minimum, maximum):
  if node is None:
    return True

  if (node.data <= minimum or node.data >= maximum):
    return False

  return checkBSTHelper(node.left, minimum, node.data) and checkBSTHelper(node.right, node.data, maximum)
