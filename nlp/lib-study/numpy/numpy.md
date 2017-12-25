# NumPy User Guide

## Quickstart tutorial

### The Basics

NumPy's array class is called `ndarray`

The important attributes of an `ndarray` object are:

- ndarray.ndim
- ndarray.shape
- ndarray.size
- ndarrray.dtype
- ndarray.itemsize
- ndarray.data

####Array Creation

There are several ways to create arrays.

- from a regular Python list or tuple using the `array` function, such as:

  ```python
  a = np.array([2, 3, 4])
  b = np.array([1.2, 3.5, 5.1])
  c = np.array([ [1.5, 2, 3], [4, 5, 6] ])
  d = np.array([ [1, 2], [3, 4] ], dtype=complex)
  ```

- The function `zeros` creates an array full of zeros, the function `ones` creates an array full of ones, and the function `empty` creates an array whose initial content is random and depends on state of the memory. By default, the dtype of the created array is float64.

  ```python
  np.zeros((3, 4))
  '''
  array([[ 0.,  0.,  0.,  0.],
         [ 0.,  0.,  0.,  0.],
         [ 0.,  0.,  0.,  0.]])
  '''
  np.ones((2, 3, 4), dtype=np.int16) # dtype can also be specified
  '''
  array([[[ 1, 1, 1, 1],
          [ 1, 1, 1, 1],
          [ 1, 1, 1, 1]],
         [[ 1, 1, 1, 1],
          [ 1, 1, 1, 1],
          [ 1, 1, 1, 1]]], dtype=int16)
  '''
  np.empty((2, 3)) # uninitialized, output may vary
  '''
  array([[  3.73603959e-262,   6.02658058e-154,   6.55490914e-260],
         [  5.30498948e-313,   3.14673309e-307,   1.00000000e+000]])
  '''
  ```

- To create sequences of numbers, NumPy provides a function analogous to
  `range` that returns arrays instead of lists.

  ```python
  np.arange(10, 30, 5)
  '''
  array([10, 15, 20, 25])
  '''
  np.arange(0, 2, 0.3) # it accepts float arguments
  '''
  array([ 0. ,  0.3,  0.6,  0.9,  1.2,  1.5,  1.8])
  '''
  np.linspace(0, 2, 9) # 9 numbers from 0 to 2
  '''
  array([ 0.  ,  0.25,  0.5 ,  0.75,  1.  ,  1.25,  1.5 ,  1.75,  2.  ])
  '''
  ```

#### Basic Operations

- Arithmetic operators on arrays apply *elementwise*. A new array is created and filled with the result.

  ```python
  a = np.array( [20,30,40,50] )
  b = np.arange( 4 )
  c = a-b
  # array([20, 29, 38, 47])
  b**2
  # array([0, 1, 4, 9])
  10*np.sin(a)
  # array([ 9.12945251, -9.88031624,  7.4511316 , -2.62374854])
  a<35
  # array([ True, True, False, False], dtype=bool)
  ```

- Unlike in many matrix languages, the product operator `*` operates elementwise in NumPy arrays. The matrix product can be performed using the `dot` function or method:

  ```python
  >>> A = np.array( [[1,1],
  ...             [0,1]] )
  >>> B = np.array( [[2,0],
  ...             [3,4]] )
  >>> A*B                         # elementwise product
  array([[2, 0],
         [0, 4]])
  >>> A.dot(B)                    # matrix product
  array([[5, 4],
         [3, 4]])
  >>> np.dot(A, B)                # another matrix product
  array([[5, 4],
         [3, 4]])
  ```

- Some operations, such as `+=` and `*=`, act in place to modify an existing array rather than create a new one.

  ```python
  >>> a = np.ones((2,3), dtype=int)
  >>> b = np.random.random((2,3))
  >>> a *= 3
  >>> a
  array([[3, 3, 3],
         [3, 3, 3]])
  >>> b += a
  >>> b
  array([[ 3.417022  ,  3.72032449,  3.00011437],
         [ 3.30233257,  3.14675589,  3.09233859]])
  >>> a += b                  # b is not automatically converted to integer type
  Traceback (most recent call last):
    ...
  TypeError: Cannot cast ufunc add output from dtype('float64') to dtype('int64') with casting rule 'same_kind'
  ```

- When operating with arrays of different types, the type of the resulting array corresponds to the more general or precise one (a behavior known as upcasting).

  ```python
  >>> a = np.ones(3, dtype=np.int32)
  >>> b = np.linspace(0,pi,3)
  >>> b.dtype.name
  'float64'
  >>> c = a+b
  >>> c
  array([ 1.        ,  2.57079633,  4.14159265])
  >>> c.dtype.name
  'float64'
  >>> d = np.exp(c*1j)
  >>> d
  array([ 0.54030231+0.84147098j, -0.84147098+0.54030231j,
         -0.54030231-0.84147098j])
  >>> d.dtype.name
  'complex128'
  ```

- Many unary operations, such as computing the sum of all the elements in the array, are implemented as methods of the `ndarray` class.

  ```python
  >>> a = np.random.random((2,3))
  >>> a
  array([[ 0.18626021,  0.34556073,  0.39676747],
         [ 0.53881673,  0.41919451,  0.6852195 ]])
  >>> a.sum()
  2.5718191614547998
  >>> a.min()
  0.1862602113776709
  >>> a.max()
  0.6852195003967595
  ```

- By default, these operations apply to the array as though it were a list of numbers, regardless of its shape. However, by specifying the `axis` parameter you can apply an operation along the specified axis of an array:

  ```python
  >>> b = np.arange(12).reshape(3,4)
  >>> b
  array([[ 0,  1,  2,  3],
         [ 4,  5,  6,  7],
         [ 8,  9, 10, 11]])
  >>>
  >>> b.sum(axis=0)                            # sum of each column
  array([12, 15, 18, 21])
  >>>
  >>> b.min(axis=1)                            # min of each row
  array([0, 4, 8])
  >>>
  >>> b.cumsum(axis=1)                         # cumulative sum along each row
  array([[ 0,  1,  3,  6],
         [ 4,  9, 15, 22],
         [ 8, 17, 27, 38]])
  ```

#### Universal Functions

NumPy provides familiar mathematical functions such as sin, cos, and exp. In NumPy, these are called “universal functions”(`ufunc`). Within NumPy, these functions operate elementwise on an array, producing an array as output.

```python
>>> B = np.arange(3)
>>> B
array([0, 1, 2])
>>> np.exp(B)
array([ 1.        ,  2.71828183,  7.3890561 ])
>>> np.sqrt(B)
array([ 0.        ,  1.        ,  1.41421356])
>>> C = np.array([2., -1., 4.])
>>> np.add(B, C)
array([ 2.,  0.,  6.])
```

**Indexing, Slicing and Iterating**

- **One-dimensional** arrays can be indexed, sliced and iterated over, much like [lists](https://docs.python.org/tutorial/introduction.html#lists) and other Python sequences.

- **Multidimensional** arrays can have one index per axis. These indices are given in a tuple separated by commas:

  ```python
  >>> def f(x,y):
  ...     return 10*x+y
  ...
  >>> b = np.fromfunction(f,(5,4),dtype=int)
  >>> b
  array([[ 0,  1,  2,  3],
         [10, 11, 12, 13],
         [20, 21, 22, 23],
         [30, 31, 32, 33],
         [40, 41, 42, 43]])
  >>> b[2,3]
  23
  >>> b[0:5, 1]                       # each row in the second column of b
  array([ 1, 11, 21, 31, 41])
  >>> b[ : ,1]                        # equivalent to the previous example
  array([ 1, 11, 21, 31, 41])
  >>> b[1:3, : ]                      # each column in the second and third row of b
  array([[10, 11, 12, 13],
         [20, 21, 22, 23]])
  ```

  When fewer indices are provided than the number of axes, the missing indices are considered complete slices`:`

  ```python
  >>> b[-1]                                  # the last row. Equivalent to b[-1,:]
  array([40, 41, 42, 43])
  ```

  The expression within brackets in `b[i]` is treated as an `i` followed by as many instances of `:` as needed to represent the remaining axes. NumPy also allows you to write this using dots as `b[i,...]` .

  The **dots** (`...`) represent as many colons as needed to produce acomplete indexing tuple. For example, if `x` is a rank 5 array (i.e.,it has 5 axes), then

  - `x[1,2,...]` is equivalent to `x[1,2,:,:,:]`,
  - `x[...,3]` to `x[:,:,:,:,3]` and
  - `x[4,...,5,:]` to `x[4,:,:,5,:]`.

- **Iterating** over multidimensional arrays is done with respect to the first axis:

  ```python
  >>> for row in b:
  ...     print(row)
  ```

  However, if one wants to perform an operation on each element in the array, one can use the `flat` attribute which is an [iterator](https://docs.python.org/2/tutorial/classes.html#iterators) over all the elements of the array:

  ```python
  >>> for element in b.flat:
  ...     print(element)
  ```

### Shape Manipulation

#### Changing the shape of an array

An array has a shape given by the number of elements along each axis:

```python
>>> a = np.floor(10*np.random.random((3,4)))
>>> a
array([[ 2.,  8.,  0.,  6.],
       [ 4.,  5.,  1.,  1.],
       [ 8.,  9.,  3.,  6.]])
>>> a.shape
(3, 4)
```

The shape of an array can be changed with various commands. Note that the following three commands all return a modified array, but do not change the original array:

```python
>>> a.ravel()  # returns the array, flattened
array([ 2.,  8.,  0.,  6.,  4.,  5.,  1.,  1.,  8.,  9.,  3.,  6.])
>>> a.reshape(6,2)  # returns the array with a modified shape
array([[ 2.,  8.],
       [ 0.,  6.],
       [ 4.,  5.],
       [ 1.,  1.],
       [ 8.,  9.],
       [ 3.,  6.]])
>>> a.T  # returns the array, transposed
array([[ 2.,  4.,  8.],
       [ 8.,  5.,  9.],
       [ 0.,  1.,  3.],
       [ 6.,  1.,  6.]])
>>> a.T.shape
(4, 3)
>>> a.shape
(3, 4)
```

If a dimension is given as -1 in a reshaping operation, the other dimensions are automatically calculated:

```python
>>> a.reshape(3,-1)
array([[ 2.,  8.,  0.,  6.],
       [ 4.,  5.,  1.,  1.],
       [ 8.,  9.,  3.,  6.]])
```

#### Stacking together different arrays

Several arrays can be stacked together along different axes:

```python
>>> a = np.floor(10*np.random.random((2,2)))
>>> a
array([[ 8.,  8.],
       [ 0.,  0.]])
>>> b = np.floor(10*np.random.random((2,2)))
>>> b
array([[ 1.,  8.],
       [ 0.,  4.]])
>>> np.vstack((a,b))
array([[ 8.,  8.],
       [ 0.,  0.],
       [ 1.,  8.],
       [ 0.,  4.]])
>>> np.hstack((a,b))
array([[ 8.,  8.,  1.,  8.],
       [ 0.,  0.,  0.,  4.]])
```

#### Splitting one array into several smaller ones

Using [`hsplit`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.hsplit.html#numpy.hsplit), , you can split an array along its horizontal axis, either by specifying the number of equally shaped arrays to return, or by specifying the columns after which the division should occur:

```python
>>> a = np.floor(10*np.random.random((2,12)))
>>> a
array([[ 9.,  5.,  6.,  3.,  6.,  8.,  0.,  7.,  9.,  7.,  2.,  7.],
       [ 1.,  4.,  9.,  2.,  2.,  1.,  0.,  6.,  2.,  2.,  4.,  0.]])
>>> np.hsplit(a,3)   # Split a into 3
[array([[ 9.,  5.,  6.,  3.],
       [ 1.,  4.,  9.,  2.]]), array([[ 6.,  8.,  0.,  7.],
       [ 2.,  1.,  0.,  6.]]), array([[ 9.,  7.,  2.,  7.],
       [ 2.,  2.,  4.,  0.]])]
>>> np.hsplit(a,(3,4))   # Split a after the third and the fourth column
[array([[ 9.,  5.,  6.],
       [ 1.,  4.,  9.]]), array([[ 3.],
       [ 2.]]), array([[ 6.,  8.,  0.,  7.,  9.,  7.,  2.,  7.],
       [ 2.,  1.,  0.,  6.,  2.,  2.,  4.,  0.]])]

```

[`vsplit`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.vsplit.html#numpy.vsplit) splits along the vertical axis, and [`array_split`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.array_split.html#numpy.array_split) allows one to specify along which axis to split.

### Copies and Views

#### No Copy at All

Simple assignments make no copy of array objects or of their data.

```python
>>> a = np.arange(12)
>>> b = a            # no new object is created
>>> b is a           # a and b are two names for the same ndarray object
True
>>> b.shape = 3,4    # changes the shape of a
>>> a.shape
(3, 4)
```

Different array objects can share the same data. The `view` method creates a new array object that looks at the same data.

```python
>>> c = a.view()
>>> c is a
False
>>> c.base is a                        # c is a view of the data owned by a
True
>>> c.flags.owndata
False
>>>
>>> c.shape = 2,6                      # a's shape doesn't change
>>> a.shape
(3, 4)
>>> c[0,4] = 1234                      # a's data changes
>>> a
array([[   0,    1,    2,    3],
       [1234,    5,    6,    7],
       [   8,    9,   10,   11]])
```

Slicing an array returns a view of it:

```python
>>> s = a[ : , 1:3]     # spaces added for clarity; could also be written "s = a[:,1:3]"
>>> s[:] = 10           # s[:] is a view of s. Note the difference between s=10 and s[:]=10
>>> a
array([[   0,   10,   10,    3],
       [1234,   10,   10,    7],
       [   8,   10,   10,   11]])
```

#### Deep Copy

The `copy` method makes a complete copy of the array and its data.

```python
>>> d = a.copy()                          # a new array object with new data is created
>>> d is a
False
>>> d.base is a                           # d doesn't share anything with a
False
>>> d[0,0] = 9999
>>> a
array([[   0,   10,   10,    3],
       [1234,   10,   10,    7],
       [   8,   10,   10,   11]])
```

### Functions and Methods Overview

Here is a list of some useful NumPy functions and methods names ordered in categories. See [*Routines*](https://docs.scipy.org/doc/numpy-dev/reference/routines.html#routines) for the full list.

- Array Creation

[`arange`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.arange.html#numpy.arange),[`array`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.array.html#numpy.array),[`copy`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.copy.html#numpy.copy),[`empty`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.empty.html#numpy.empty),[`empty_like`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.empty_like.html#numpy.empty_like),[`eye`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.eye.html#numpy.eye),[`fromfile`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.fromfile.html#numpy.fromfile),[`fromfunction`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.fromfunction.html#numpy.fromfunction),[`identity`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.identity.html#numpy.identity),[`linspace`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.linspace.html#numpy.linspace),[`logspace`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.logspace.html#numpy.logspace),[`mgrid`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.mgrid.html#numpy.mgrid),[`ogrid`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.ogrid.html#numpy.ogrid),[`ones`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.ones.html#numpy.ones),[`ones_like`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.ones_like.html#numpy.ones_like),*r*,[`zeros`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.zeros.html#numpy.zeros),[`zeros_like`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.zeros_like.html#numpy.zeros_like)

- Conversions

  [`ndarray.astype`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.ndarray.astype.html#numpy.ndarray.astype),[`atleast_1d`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.atleast_1d.html#numpy.atleast_1d),[`atleast_2d`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.atleast_2d.html#numpy.atleast_2d),[`atleast_3d`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.atleast_3d.html#numpy.atleast_3d),[`mat`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.mat.html#numpy.mat)

- Manipulations

  [`array_split`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.array_split.html#numpy.array_split),[`column_stack`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.column_stack.html#numpy.column_stack),[`concatenate`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.concatenate.html#numpy.concatenate),[`diagonal`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.diagonal.html#numpy.diagonal),[`dsplit`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.dsplit.html#numpy.dsplit),[`dstack`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.dstack.html#numpy.dstack),[`hsplit`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.hsplit.html#numpy.hsplit),[`hstack`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.hstack.html#numpy.hstack),[`ndarray.item`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.ndarray.item.html#numpy.ndarray.item),[`newaxis`](https://docs.scipy.org/doc/numpy-dev/reference/arrays.indexing.html#numpy.newaxis),[`ravel`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.ravel.html#numpy.ravel),[`repeat`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.repeat.html#numpy.repeat),[`reshape`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.reshape.html#numpy.reshape),[`resize`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.resize.html#numpy.resize),[`squeeze`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.squeeze.html#numpy.squeeze),[`swapaxes`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.swapaxes.html#numpy.swapaxes),[`take`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.take.html#numpy.take),[`transpose`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.transpose.html#numpy.transpose),[`vsplit`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.vsplit.html#numpy.vsplit),[`vstack`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.vstack.html#numpy.vstack)

- Questions

  [`all`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.all.html#numpy.all),[`any`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.any.html#numpy.any),[`nonzero`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.nonzero.html#numpy.nonzero),[`where`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.where.html#numpy.where)

- Ordering

  [`argmax`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.argmax.html#numpy.argmax),[`argmin`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.argmin.html#numpy.argmin),[`argsort`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.argsort.html#numpy.argsort),[`max`](https://docs.python.org/dev/library/functions.html#max),[`min`](https://docs.python.org/dev/library/functions.html#min),[`ptp`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.ptp.html#numpy.ptp),[`searchsorted`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.searchsorted.html#numpy.searchsorted),[`sort`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.sort.html#numpy.sort)

- Operations

  [`choose`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.choose.html#numpy.choose),[`compress`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.compress.html#numpy.compress),[`cumprod`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.cumprod.html#numpy.cumprod),[`cumsum`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.cumsum.html#numpy.cumsum),[`inner`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.inner.html#numpy.inner),[`ndarray.fill`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.ndarray.fill.html#numpy.ndarray.fill),[`imag`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.imag.html#numpy.imag),[`prod`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.prod.html#numpy.prod),[`put`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.put.html#numpy.put),[`putmask`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.putmask.html#numpy.putmask),[`real`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.real.html#numpy.real),[`sum`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.sum.html#numpy.sum)

- Basic Statistics

  [`cov`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.cov.html#numpy.cov),[`mean`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.mean.html#numpy.mean),[`std`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.std.html#numpy.std),[`var`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.var.html#numpy.var)

- Basic Linear Algebra

  [`cross`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.cross.html#numpy.cross),[`dot`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.dot.html#numpy.dot),[`outer`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.outer.html#numpy.outer),[`linalg.svd`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.linalg.svd.html#numpy.linalg.svd),[`vdot`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.vdot.html#numpy.vdot)

### Less Basic

#### Broadcasting rules

Broadcasting allows universal functions to deal in a meaningful way with inputs that do not have exactly the same shape.

The first rule of broadcasting is that if all input arrays do not have the same number of dimensions, a “1” will be repeatedly prepended to the shapes of the smaller arrays until all the arrays have the same number of dimensions.

The second rule of broadcasting ensures that arrays with a size of 1 along a particular dimension act as if they had the size of the array with the largest shape along that dimension. The value of the array element is assumed to be the same along that dimension for the“broadcast” array.

After application of the broadcasting rules, the sizes of all arrays must match. More details can be found in [*Broadcasting*](https://docs.scipy.org/doc/numpy-dev/user/basics.broadcasting.html).

### Fancy indexing and index tricks

####Indexing with Arrays of Indices

```python
>>> a = np.arange(12)**2                       # the first 12 square numbers
>>> i = np.array( [ 1,1,3,8,5 ] )              # an array of indices
>>> a[i]                                       # the elements of a at the positions i
array([ 1,  1,  9, 64, 25])
>>>
>>> j = np.array( [ [ 3, 4], [ 9, 7 ] ] )      # a bidimensional array of indices
>>> a[j]                                       # the same shape as j
array([[ 9, 16],
       [81, 49]])
```

#### Indexing with Boolean Arrays

The most natural way one can think of for boolean indexing is to use boolean arrays that have *the same shape* as the original array:

```python
>>> a = np.arange(12).reshape(3,4)
>>> b = a > 4
>>> b                                          # b is a boolean with a's shape
array([[False, False, False, False],
       [False,  True,  True,  True],
       [ True,  True,  True,  True]], dtype=bool)
>>> a[b]                                       # 1d array with the selected elements
array([ 5,  6,  7,  8,  9, 10, 11])
```

This property can be very useful in assignments:

```python
>>> a[b] = 0                                   # All elements of 'a' higher than 4 become 0
>>> a
array([[0, 1, 2, 3],
       [4, 0, 0, 0],
       [0, 0, 0, 0]])

```

The second way of indexing with booleans is more similar to integer indexing; for each dimension of the array we give a 1D boolean array selecting the slices we want:

```python
>>> a = np.arange(12).reshape(3,4)
>>> b1 = np.array([False,True,True])             # first dim selection
>>> b2 = np.array([True,False,True,False])       # second dim selection
>>>
>>> a[b1,:]                                   # selecting rows
array([[ 4,  5,  6,  7],
       [ 8,  9, 10, 11]])
>>>
>>> a[b1]                                     # same thing
array([[ 4,  5,  6,  7],
       [ 8,  9, 10, 11]])
>>>
>>> a[:,b2]                                   # selecting columns
array([[ 0,  2],
       [ 4,  6],
       [ 8, 10]])
>>>
>>> a[b1,b2]                                  # a weird thing to do
array([ 4, 10])
```

#### The ix_() function

The [`ix_`](https://docs.scipy.org/doc/numpy-dev/reference/generated/numpy.ix_.html#numpy.ix_) function can be used to combine different vectors so as to obtain the result for each n-uplet. For example, if you want to compute all the a+b*c for all the triplets taken from each of the vectors a, band c:

```python
>>> a = np.array([2,3,4,5])
>>> b = np.array([8,5,4])
>>> c = np.array([5,4,6,8,3])
>>> ax,bx,cx = np.ix_(a,b,c)
>>> ax
array([[[2]],
       [[3]],
       [[4]],
       [[5]]])
>>> bx
array([[[8],
        [5],
        [4]]])
>>> cx
array([[[5, 4, 6, 8, 3]]])
>>> ax.shape, bx.shape, cx.shape
((4, 1, 1), (1, 3, 1), (1, 1, 5))
>>> result = ax+bx*cx
>>> result
array([[[42, 34, 50, 66, 26],
        [27, 22, 32, 42, 17],
        [22, 18, 26, 34, 14]],
       [[43, 35, 51, 67, 27],
        [28, 23, 33, 43, 18],
        [23, 19, 27, 35, 15]],
       [[44, 36, 52, 68, 28],
        [29, 24, 34, 44, 19],
        [24, 20, 28, 36, 16]],
       [[45, 37, 53, 69, 29],
        [30, 25, 35, 45, 20],
        [25, 21, 29, 37, 17]]])
>>> result[3,2,4]
17
>>> a[3]+b[2]*c[4]
17
```

#### Indexing with strings

See [*Structured arrays*](https://docs.scipy.org/doc/numpy-dev/user/basics.rec.html#structured-arrays).

### Linear Algebra

#### Simple Array Operations

See linalg.py in numpy folder for more.

```python
>>> import numpy as np
>>> a = np.array([[1.0, 2.0], [3.0, 4.0]])
>>> print(a)
[[ 1.  2.]
 [ 3.  4.]]

>>> a.transpose()
array([[ 1.,  3.],
       [ 2.,  4.]])

>>> np.linalg.inv(a)
array([[-2. ,  1. ],
       [ 1.5, -0.5]])

>>> u = np.eye(2) # unit 2x2 matrix; "eye" represents "I"
>>> u
array([[ 1.,  0.],
       [ 0.,  1.]])
>>> j = np.array([[0.0, -1.0], [1.0, 0.0]])

>>> np.dot (j, j) # matrix product
array([[-1.,  0.],
       [ 0., -1.]])

>>> np.trace(u)  # trace
2.0

>>> y = np.array([[5.], [7.]])
>>> np.linalg.solve(a, y)
array([[-3.],
       [ 4.]])

>>> np.linalg.eig(j)
(array([ 0.+1.j,  0.-1.j]), array([[ 0.70710678+0.j        ,  0.70710678-0.j        ],
       [ 0.00000000-0.70710678j,  0.00000000+0.70710678j]]))

Parameters:
    square matrix
Returns
    The eigenvalues, each repeated according to its multiplicity.
    The normalized (unit "length") eigenvectors, such that the
    column ``v[:,i]`` is the eigenvector corresponding to the
    eigenvalue ``w[i]`` 
```

### Tricks and Tips

#### “Automatic” Reshaping

To change the dimensions of an array, you can omit one of the sizes which will then be deduced automatically:

```python
>>> a = np.arange(30)
>>> a.shape = 2,-1,3  # -1 means "whatever is needed"
>>> a.shape
(2, 5, 3)
>>> a
array([[[ 0,  1,  2],
        [ 3,  4,  5],
        [ 6,  7,  8],
        [ 9, 10, 11],
        [12, 13, 14]],
       [[15, 16, 17],
        [18, 19, 20],
        [21, 22, 23],
        [24, 25, 26],
        [27, 28, 29]]])
```

#### Vector Stacking

How do we construct a 2D array from a list of equally-sized row vectors? In MATLAB this is quite easy: if `x` and `y` are two vectors of the same length you only need do `m=[x;y]`. In NumPy this works via the functions `column_stack`, `dstack`, `hstack` and `vstack`,depending on the dimension in which the stacking is to be done. For example:

```python
x = np.arange(0,10,2)                     # x=([0,2,4,6,8])
y = np.arange(5)                          # y=([0,1,2,3,4])
m = np.vstack([x,y])                      # m=([[0,2,4,6,8],
                                          #     [0,1,2,3,4]])
xy = np.hstack([x,y])                     # xy =([0,2,4,6,8,0,1,2,3,4])
```

#### Histograms

The NumPy `histogram` function applied to an array returns a pair of vectors: the histogram of the array and the vector of bins. Beware:`matplotlib` also has a function to build histograms (called `hist`,as in Matlab) that differs from the one in NumPy. The main difference is that `pylab.hist` plots the histogram automatically, while`numpy.histogram` only generates the data.

```python
>>> import numpy as np
>>> import matplotlib.pyplot as plt
>>> # Build a vector of 10000 normal deviates with variance 0.5^2 and mean 2
>>> mu, sigma = 2, 0.5
>>> v = np.random.normal(mu,sigma,10000)
>>> # Plot a normalized histogram with 50 bins
>>> plt.hist(v, bins=50, normed=1)       # matplotlib version (plot)
>>> plt.show()
```

![../_images/quickstart-2_00_00.png](https://docs.scipy.org/doc/numpy-dev/_images/quickstart-2_00_00.png)

```python
>>> # Compute the histogram with numpy and then plot it
>>> (n, bins) = np.histogram(v, bins=50, normed=True)  # NumPy version (no plot)
>>> plt.plot(.5*(bins[1:]+bins[:-1]), n)
>>> plt.show()
```

![../_images/quickstart-2_01_00.png](https://docs.scipy.org/doc/numpy-dev/_images/quickstart-2_01_00.png)

