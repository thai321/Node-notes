"""
Node is defined as
self.left (the left child of the node)
self.right (the right child of the node)
self.data (the value of the node)
"""
result = []

def preOrder(root):
    if root != None:
        print(root.data, end=' ')
        preOrder(root.left)
        preOrder(root.right)




"""
Node is defined as
self.left (the left child of the node)
self.right (the right child of the node)
self.data (the value of the node)
"""
def postOrder(root):
    #Write your code here
    if root != None:
      postOrder(root.left)
      postOrder(root.right)
      print(root.data)



"""
Node is defined as
self.left (the left child of the node)
self.right (the right child of the node)
self.data (the value of the node)
"""
def inOrder(root):
    #Write your code here

    if root != None:
      inOrder(root.left)
      print root.data
      inOrder(root.right)
