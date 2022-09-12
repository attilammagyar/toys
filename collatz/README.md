Another continuous extension of the Collatz function
====================================================

The Collatz conjecture
----------------------

The [Collatz conjecture][cc] states that repeatedly applying the following
function to any positive integer will eventually reach $1$:

$$ C \colon \mathbb{N} \to \mathbb{N}, \quad C(n) =
\begin{cases}
\frac{n}{2} & \text{if $n \equiv 0 \pmod 2$} \\
3n+1 & \text{if $n \equiv 1 \pmod 2$}
\end{cases} $$

  [cc]: https://en.wikipedia.org/wiki/Collatz_conjecture

$$ \forall n \in \mathbb{N} \quad
\exists k \in \mathbb{N} \quad C^{(k)}(n) = 1 $$

A shortcut version of this function can be defined by using that

$$ \forall n \in \mathbb{N} :
n \equiv 1 \pmod 2 \Rightarrow 3n+1 \equiv 0 \pmod 2 $$

The shortcut or speedup version of the function:

$$ t \colon \mathbb{N} \to \mathbb{N}, \quad t(n) =
\begin{cases}
\frac{n}{2} & \text{if $n \equiv 0 \pmod 2$} \\
\frac{3n+1}{2} & \text{if $n \equiv 1 \pmod 2$}
\end{cases} $$

Extending to the complex plane
------------------------------

A common approach to eliminate the branching and extend this function to the
real or complex numbers is to find a function $\text{mod}_2(z)$ which is $0$
for even integers and $1$ for odd integers, and use it to combine the two
branches of the function definition into a single expression. (See [The 3x+1
problem: An annotated bibliography (1963-1999)][l1] and [The 3x+1 Problem: An
Annotated Bibliography, II (2000-2009)][l2] by Jeffrey C.  Lagarias.)

  [l1]: https://arxiv.org/abs/math/0309224
  [l2]: https://arxiv.org/abs/math/0608208

[One such example][ch] uses $\text{mod}_2(z) = \sin^2(\frac{\pi}{2}z)$ and
$1 - \text{mod}_2(z) = 1 - \sin^2(\frac{\pi}{2}z) = \cos^2(\frac{\pi}{2}z)$:

$$ f \colon \mathbb{C} \to \mathbb{C}, \quad f(z) =
\frac{z}{2} \cos^2(\frac{\pi}{2}z) +
\frac{3z+1}{2} \sin^2(\frac{\pi}{2}z) $$

  [ch]: https://chamberland.math.grinnell.edu/3x.html

The [3-power extension of the 3x+1 function][p3] raises $3$ to the power of
$\text{mod}_2(z)$:

$$ T \colon \mathbb{C} \to \mathbb{C}, \quad T(z) =
\frac{1}{2} \cdot (3^{\text{mod}_2(z)}z + \text{mod}_2(z)) $$

  [p3]: https://webbox.lafayette.edu/~reiterc/3x%2B1/w3x%2B1_pp.pdf

A different approach might be to start from only the $\frac{3n+1}{2}$ case,
replace the $1$ with $\text{mod}_2(z) = \sin^2(\frac{\pi}{2}z)$ so that only
odd values for $n$ are incremented after the multiplication, and undo the
multiplication for even numbers by dividing by 6. This is the idea of the
following extension:

$$ F \colon \mathbb{C} \to \mathbb{C}, \quad
F(z) = \frac{3z + \sin^2(\frac{\pi}{2} z)}{2 + 4 \cos^2(\frac{\pi}{2} z)} $$

Note that

$$ \forall n \in \mathbb{N} \quad n \equiv 1 \pmod 2 \Rightarrow
F(n) = \frac{3n + 1}{2 + 4 \cdot 0} = \frac{3n + 1}{2} $$

and

$$ \forall n \in \mathbb{N} \quad n \equiv 0 \pmod 2 \Rightarrow
F(n) = \frac{3n + 0}{2 + 4 \cdot 1} = \frac{3n}{6} = \frac{n}{2} $$

Therefore $F$ restricted to the positive integers is equivalent with the
shortcut Collatz function $t$.

Using the following trigonometric identities

$$ \begin{align}
\sin^2 \theta + \cos^2 \theta &= 1 \\
\cos(2 \theta) &= \cos^2 \theta - \sin^2 \theta = 2 \cos^2 \theta - 1
\end{align}$$

$F$ can be written as

$$ F(z) = \frac{3}{4} \cdot \frac{2z+1}{\cos(\pi z)+2} - \frac{1}{4} $$

Fixed points
------------

The original Collatz function does not have any positive integer fixed points,
but $F$ has infinitely many real fixed points which can be obtained by solving:

$$ (1) \quad F(z) =
\frac{3}{4} \cdot \frac{2z+1}{\cos(\pi z)+2} - \frac{1}{4} = z $$

$0$ is a fixed point of $F$, because

$$ F(0) =
\frac{3}{4} \cdot \frac{2 \cdot 0+1}{\cos(0 \cdot \pi)+2} - \frac{1}{4} =
\frac{3}{4} \cdot \frac{1}{1+2} - \frac{1}{4} = 0 $$

$\frac{1}{2}$ is also a fixed point of $F$, since

$$ F(\frac{1}{2}) =
\frac{3}{4} \cdot \frac{2 \cdot \frac{1}{2} + 1}{\cos(\frac{\pi}{2})+2} - \frac{1}{4} =
\frac{3}{4} \cdot \frac{1+1}{0+2} - \frac{1}{4} = \frac{1}{2} $$

It can be proven that
$\forall x \in \mathbb{R} \quad 0 < x < \frac{1}{2} \Rightarrow F(x) \neq x$
(proof left for the reader).

As for fixed points $\frac{1}{2} < z \in \mathbb{R}$, one can notice that
$\forall x \in \mathbb{R} \quad \cos(\pi x)+2 > 0$ and $4x+1>0$, so $(1)$ can
be rearranged as

$$ (2) \quad \cos(\pi z) = - \frac{2z-1}{4z+1} $$

One way to solve this for $\frac{1}{2} < z \in \mathbb{R}$ is to notice that

$$ \lim_{z \to \infty} - \frac{2z-1}{4z+1} = - \frac{1}{2} $$

therefore

$$ \lim_{z \to \infty} \cos(\pi z) = - \frac{1}{2} $$

So the fixed points in question should be close to $\frac{2}{3}+2k$ and
$\frac{4}{3}+2k$ for $\forall k \in \mathbb{N}$. One can use
[Newton's method][nm] with starting points from
$x_0 \in \\{ \frac{2}{3}+2k, \frac{4}{3}+2k \mid k \in \mathbb{N} \\}$ to find
them.

  [nm]: https://en.wikipedia.org/wiki/Newton%27s_method

Properties of $F$
-----------------

Numerical experiments seem to suggest that for positive real numbers, $F$ has
no other cycles than $(1; \\, 2)$ and its fixed points. Even if the iteration
starts from a value close to a fixed point, $F$ starts to converge to $1$ after
a while.
