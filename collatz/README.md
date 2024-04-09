Yet Another Continuous Extension of the Collatz Function
========================================================

<a name="toc"></a>

Table of Contents
-----------------

 * [Table of Contents](#toc)
 * [The Collatz Conjecture](#conjecture)
 * [Extending to the Complex Plane](#extending)
 * [Non-negative Real Fixed Points of F<sub>m</sub> (for a given m ∈ ℕ)](#fixed-points)
 * [Condition for x ≤ F<sub>m</sub>(x) for m ∈ ℕ, 1/2 < x ∈ ℝ](#condition)
 * [Properties of F<sub>m</sub> (for m ∈ ℕ)](#properties)
 * [Visualizations of Convergence and Stopping Times](#visualizations)
    * [Convergence (m = 0)](#conv-0)
       * [Region: (-20.000000, 11.250000), (20.000000, -11.250000)](#region-1)
       * [Region: (-10.000000, 5.625000), (10.000000, -5.625000)](#region-2)
       * [Region: (-5.000000, 2.812500), (5.000000, -2.812500)](#region-3)
       * [Region: (-2.500000, 1.406250), (2.500000, -1.406250)](#region-4)
       * [Region: (0.250000, 0.703125), (2.750000, -0.703125)](#region-5)
       * [Region: (0.875000, 0.351562), (2.125000, -0.351562)](#region-6)
       * [Region: (1.187500, 0.175781), (1.812500, -0.175781)](#region-7)
       * [Region: (95.000000, 2.812500), (105.000000, -2.812500)](#region-8)
       * [Region: (1095.000000, 2.812500), (1105.000000, -2.812500)](#region-9)
       * [Region: (9095.000000, 2.812500), (9105.000000, -2.812500)](#region-10)
    * [Stopping Times (m = 0)](#stop-0)
       * [Region: (-20.000000, 11.250000), (20.000000, -11.250000)](#region-11)
       * [Region: (-10.000000, 5.625000), (10.000000, -5.625000)](#region-12)
       * [Region: (-5.000000, 2.812500), (5.000000, -2.812500)](#region-13)
       * [Region: (-2.500000, 1.406250), (2.500000, -1.406250)](#region-14)
       * [Region: (0.250000, 0.703125), (2.750000, -0.703125)](#region-15)
       * [Region: (0.875000, 0.351562), (2.125000, -0.351562)](#region-16)
       * [Region: (1.187500, 0.175781), (1.812500, -0.175781)](#region-17)
       * [Region: (95.000000, 2.812500), (105.000000, -2.812500)](#region-18)
       * [Region: (1095.000000, 2.812500), (1105.000000, -2.812500)](#region-19)
       * [Region: (9095.000000, 2.812500), (9105.000000, -2.812500)](#region-20)
    * [Convergence (m = 5)](#conv-5)
       * [Region: (-5.000000, 2.812500), (5.000000, -2.812500)](#region-21)
       * [Region: (0.250000, 0.703125), (2.750000, -0.703125)](#region-22)
       * [Region: (1.187500, 0.175781), (1.812500, -0.175781)](#region-23)
    * [Stopping Times (m = 5)](#stop-5)
       * [Region: (-5.000000, 2.812500), (5.000000, -2.812500)](#region-24)
       * [Region: (0.250000, 0.703125), (2.750000, -0.703125)](#region-25)
       * [Region: (1.187500, 0.175781), (1.812500, -0.175781)](#region-26)

<a name="conjecture"></a>

The Collatz Conjecture
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

where $C^{(k)}(n)$ denotes repeated application of $C$.
For $k, n \in \mathbb{N}$:

$$ C^{(k)}(n) =
\begin{cases}
n & \text{if $k = 0$} \\
C(C^{(k-1)}(n)) & \text{if $k > 0$}
\end{cases} $$

The _stopping time_ for a given $n \in \mathbb{N}$ is defined as the smallest
$k \in \mathbb{N}$ for which $C^{(k)}(n) < n$. If no such $k$ exists, then the
stopping time for $n$ is considered to be infinite.

A shortcut version of the Collatz function can be defined by exploiting that

$$ \forall n \in \mathbb{N} :
n \equiv 1 \pmod 2 \Rightarrow 3n+1 \equiv 0 \pmod 2 $$

The shortcut or speedup version of the function:

$$ t \colon \mathbb{N} \to \mathbb{N}, \quad t(n) =
\begin{cases}
\frac{n}{2} & \text{if $n \equiv 0 \pmod 2$} \\
\frac{3n+1}{2} & \text{if $n \equiv 1 \pmod 2$}
\end{cases} $$

<a name="extending"></a>

Extending to the Complex Plane
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
\frac{3^{\text{mod}_2(z)}z + \text{mod}_2(z)}{2} $$

  [p3]: https://webbox.lafayette.edu/~reiterc/3x%2B1/w3x%2B1_pp.pdf

For a given $m \in \mathbb{N}$ non-negative integer, $\text{mod}_2(z)^{2m+2}$
can also be used for constructing both kinds of extension functions.

A different approach might be to extend only the $\frac{3n+1}{2}$ branch, which
is obviously wrong for even numbers, but it can be corrected by undoing the
operations that are unwanted in their case: subtract $1 - \text{mod}_2(z)$ from
the numerator (this is equivalent to replacing the addition of $1$ with the
addition of $\text{mod}_2(z)$ ), and add $4 \cdot (1 - \text{mod}_2(z))$ to the
denominator, so that the division by $6$ cancels the multiplication by $3$.
This is the idea behind the following extension:

$$ F \colon \mathbb{C} \to \mathbb{C}, \quad
F(z) = \frac{3z + \sin^2(\frac{\pi}{2} z)}{2 + 4 \cos^2(\frac{\pi}{2} z)} $$

Note that

$$ \forall n \in \mathbb{N} \quad n \equiv 1 \pmod 2 \Rightarrow
F(n) = \frac{3n + 1}{2 + 4 \cdot 0} = \frac{3n + 1}{2} $$

and

$$ \forall n \in \mathbb{N} \quad n \equiv 0 \pmod 2 \Rightarrow
F(n) = \frac{3n + 0}{2 + 4 \cdot 1} = \frac{3n}{6} = \frac{n}{2} $$

Therefore $F$ restricted to the positive integers is equivalent to the
shortcut Collatz function $t$.

Using the following trigonometric identities

$$ \begin{align}
\sin^2 \theta + \cos^2 \theta &= 1 \\
\cos(2 \theta) &= \cos^2 \theta - \sin^2 \theta = 2 \cos^2 \theta - 1
\end{align}$$

$F$ can be written as

$$ F(z) = \frac{3}{4} \cdot \frac{2z+1}{\cos(\pi z)+2} - \frac{1}{4} $$

This format then inspires a family of extension functions: let
$m \in \mathbb{N}$ be a non-negative integer, and let's define the following
function:

$$ F_m \colon \mathbb{C} \to \mathbb{C}, \quad
F_m(z) = \frac{3}{4} \cdot \frac{2z+1}{\cos(\pi z)^{2m+1}+2} - \frac{1}{4} $$

<a name="fixed-points"></a>

Non-negative Real Fixed Points of $F_m$ (for a given $m \in \mathbb{N}$)
------------------------------------------------------------------------

The original Collatz function does not have any positive integer fixed points
(proof left for the reader), but $\forall m \in \mathbb{N}$, $F_m$ has
infinitely many non-negative real fixed points which can be obtained by solving
the following equation for $0 \le x \in \mathbb{R}$:

$$ (1) \quad F_m(x) =
\frac{3}{4} \cdot \frac{2x+1}{\cos(\pi x)^{2m+1}+2} - \frac{1}{4} = x $$

$0$ is a fixed point of $F_m$, because

$$ F_m(0) =
\frac{3}{4} \cdot \frac{2 \cdot 0+1}{\cos(0 \cdot \pi)^{2m+1}+2} - \frac{1}{4} =
\frac{3}{4} \cdot \frac{1}{1+2} - \frac{1}{4} = 0 $$

$\frac{1}{2}$ is also a fixed point of $F_m$, since

$$ F_m \left( \frac{1}{2} \right) =
\frac{3}{4} \cdot \frac{2 \cdot \frac{1}{2} + 1}{\cos(\frac{\pi}{2})^{2m+1}+2} - \frac{1}{4} =
\frac{3}{4} \cdot \frac{1+1}{0+2} - \frac{1}{4} = \frac{1}{2} $$

It can be proven that
$\forall x \in \mathbb{R} \quad 0 < x < \frac{1}{2} \Rightarrow F_m(x) \neq x$
(proof left for the reader).

As for fixed points $\frac{1}{2} < x \in \mathbb{R}$, one can notice that
$\forall \frac{1}{2} < x \in \mathbb{R} \quad \cos(\pi x)^{2m+1}+2 > 0$ and
$4x+1>0$, so $(1)$ can be rearranged as

$$ (2) \quad \cos(\pi x)^{2m+1} = - \frac{2x-1}{4x+1} $$

One way to solve this for $\frac{1}{2} < x \in \mathbb{R}$ is to notice that

$$ \lim_{x \to \infty} - \frac{2x-1}{4x+1} = - \frac{1}{2} $$

therefore the fixed points of the form $\frac{1}{2} < x \in \mathbb{R}$ are
located where $\cos(\pi x)^{2m+1}$ is close to $- \frac{1}{2}$, thus, they are
of the form

$$ 2k + \frac{1}{\pi} \cdot \arccos \left( \sqrt[2m+1]{- \frac{1}{2}} \right) + \varepsilon_1(k) $$

and

$$ 2k - \left( \frac{1}{\pi} \cdot \arccos \left( \sqrt[2m+1]{- \frac{1}{2}} \right) + \varepsilon_2(k) \right) $$

where $k \in \mathbb{N}$, and $\varepsilon_1, \varepsilon_2 \colon \mathbb{N} \to \mathbb{R}$, and

$$ \lim_{k \to \infty} \varepsilon_1(k) =
\lim_{k \to \infty} \varepsilon_2(k) = 0 $$

Notice that

$$ \lim_{m \to \infty} \sqrt[2m+1]{- \frac{1}{2}} = \lim_{m \to \infty} - \frac{1}{\sqrt[2m+1]{2}} = -1 $$

therefore:

$$ \lim_{m \to \infty} \frac{1}{\pi} \cdot \arccos \left( \sqrt[2m+1]{- \frac{1}{2}} \right) = 1 $$

In other words, the positive real fixed points of $F_m$ that are greater than
$\frac{1}{2}$ are located in the vicinity of positive odd integers, and the
greater $m$ is chosen, the closer the fixed points are to the corresponding
positive odd integers. (One can use [Newton's method][newton] to find them.)

  [newton]: https://en.wikipedia.org/wiki/Newton%27s_method

Note that $F_m$ does not have any positive integer fixed points, because the
original Collatz function does not have any either.

<a name="condition"></a>

Condition for $x \le F_m(x)$ for $\frac{1}{2} \lt x \in \mathbb{R}, m \in \mathbb{N}$
-------------------------------------------------------------------------------------

$x \le F_m(x)$ can be solved for $\frac{1}{2} \lt x \in \mathbb{R}$ the same way
it was presented for the fixed points, leading to the following statement for
$\frac{1}{2} \lt x \in \mathbb{R}$:

$$ x \le F_m(x) \quad \Longleftrightarrow \quad \exists k \in \mathbb{N} \quad
2k + \frac{1}{\pi} \cdot \arccos \left( \sqrt[2m+1]{- \frac{1}{2}} \right) + \varepsilon_1(k) \le x $$

and

$$ x \le 2 \cdot (k + 1) - \left( \frac{1}{\pi} \cdot \arccos \left( \sqrt[2m+1]{- \frac{1}{2}} \right) + \varepsilon_2(k+1) \right) $$

where $\varepsilon_1, \varepsilon_2 \colon \mathbb{N} \to \mathbb{R}$ are so
that $2k + \frac{1}{\pi} \cdot \arccos \left( \sqrt[2m+1]{- \frac{1}{2}} \right) + \varepsilon_1(k)$
and $2 \cdot (k + 1) - \left( \frac{1}{\pi} \cdot \arccos \left( \sqrt[2m+1]{- \frac{1}{2}} \right) + \varepsilon_2(k+1) \right)$
are fixed points of $F_m$, and

$$ \lim_{k \to \infty} \varepsilon_1(k) =
\lim_{k \to \infty} \varepsilon_2(k) = 0 $$

In other words, for $\frac{1}{2} \lt x \in \mathbb{R}$, for $x \le F_m(x)$ to
hold, $x$ must be inside a roughly $1 - \frac{1}{\pi} \cdot \arccos \left( \sqrt[2m+1]{- \frac{1}{2}} \right)$
radius of an odd positive integer.

<a name="properties"></a>

Properties of $F_m$ (for $m \in \mathbb{N}$)
--------------------------------------------

Numerical experiments seem to suggest that:

 * For positive real numbers, the $F_m$ functions have no other cycles than
   $(1; \\, 2)$ and their fixed points.

 * For positive real numbers, even if the iteration starts from a value close
   to a fixed point, $F_m$ often converges to $1$ after a while.

 * $F_m$ functions tend to have lower stopping times than other continuous
   extensions of the Collatz function.

The stopping time for a given $G \colon \mathbb{C} \to \mathbb{C}$ continuous
extension of the Collatz function to the complex plane, and a given
$z \in \mathbb{C}$, can be  defined as the smallest $k \in \mathbb{N}$ such
that $\|G^{(k)}(z)\| < \|z\|$, where $G^{(k)}(z)$ denotes repeated application
of the $G$ function starting from $z$, similarly to above. If no such $k$
exists, then the stopping time for $z$ is considered to be infinite. (This
definition is compatible with the original definition of stopping times for
the discrete case.)

<a name="visualizations"></a>

Visualizations of Convergence and Stopping Times
------------------------------------------------

The following visualizations represent the behaviour of a series that is
obtained by repeatedly applying one of the continuous extensions of the Collatz
function presented above, to each number in the complex plane.

<a name="conv-0"></a>

#### Convergence ($m = 0$)

Maximum iterations: $500$, convergence threshold: $10^{-9}$, escape threshold:
$10^{50}$

<a name="region-1"></a>

##### Region: (-20.000000, 11.250000), (20.000000, -11.250000)

 * F: [`images/f_conv_5760_3240_1e-9_1e50_-20_0_11_25_20_0_-11_25.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/f_conv_5760_3240_1e-9_1e50_-20_0_11_25_20_0_-11_25.png)

        function:       F(z) = (3/4) * (2*z+1) / (cos(pi*z)+2) - 1/4
        left-top:       (      -20.000000, 11.250000       )
        right-bottom:   (       20.000000, -11.250000      )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:      1.00000     29.18102     72.00000     99.49943%
        cycle (1; 2)            [red --> orange]:      2.00000    115.60675    149.00000      0.19117%
        escape              [blue --> turquoise]:      2.00000      2.10924      5.00000      0.00128%
        fixed point            [purple --> pink]:      1.00000     28.99984     64.00000      0.30313%
        other                            [green]:    500.00000    500.00000    500.00000      0.00005%
        other cycle           [yellow --> white]:      3.00000    192.97727    354.00000      0.00495%


 * f: [`images/c_conv_5760_3240_1e-9_1e50_-20_0_11_25_20_0_-11_25.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/c_conv_5760_3240_1e-9_1e50_-20_0_11_25_20_0_-11_25.png)

        function:       f(z) = (z/2) * cos(z*pi/2)^2 + ((3*z+1)/2) * sin(z*pi/2)^2
        left-top:       (      -20.000000, 11.250000       )
        right-bottom:   (       20.000000, -11.250000      )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:      1.00000     30.29276     98.00000      0.20134%
        cycle (1; 2)            [red --> orange]:      2.00000    111.40606    285.00000      0.03114%
        escape              [blue --> turquoise]:      2.00000      2.12743     47.00000     99.62285%
        fixed point            [purple --> pink]:      1.00000     24.82990    156.00000      0.11847%
        other                            [green]:    500.00000    500.00000    500.00000      0.00001%
        other cycle           [yellow --> white]:      3.00000     42.66619    452.00000      0.02620%


 * T: [`images/t_conv_5760_3240_1e-9_1e50_-20_0_11_25_20_0_-11_25.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/t_conv_5760_3240_1e-9_1e50_-20_0_11_25_20_0_-11_25.png)

        function:       T(z) = (3^(sin(z*pi/2)^2) + sin(z*pi/2)^2) / 2
        left-top:       (      -20.000000, 11.250000       )
        right-bottom:   (       20.000000, -11.250000      )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:      1.00000     32.05190    378.00000      0.65492%
        cycle (1; 2)            [red --> orange]:      2.00000    121.46714    193.00000      0.08986%
        escape              [blue --> turquoise]:      1.00000      1.71956     50.00000     98.90463%
        fixed point            [purple --> pink]:      1.00000     31.79165    347.00000      0.33237%
        other                            [green]:    500.00000    500.00000    500.00000      0.00083%
        other cycle           [yellow --> white]:      3.00000    198.46580    497.00000      0.01739%


<a name="region-2"></a>

##### Region: (-10.000000, 5.625000), (10.000000, -5.625000)

 * F: [`images/f_conv_5760_3240_1e-9_1e50_-10_0_5_625_10_0_-5_625.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/f_conv_5760_3240_1e-9_1e50_-10_0_5_625_10_0_-5_625.png)

        function:       F(z) = (3/4) * (2*z+1) / (cos(pi*z)+2) - 1/4
        left-top:       (      -10.000000, 5.625000        )
        right-bottom:   (       10.000000, -5.625000       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:      1.00000     29.32882     73.00000     98.75129%
        cycle (1; 2)            [red --> orange]:      2.00000    116.07439    149.00000      0.50727%
        escape              [blue --> turquoise]:      2.00000      2.18750      4.00000      0.00069%
        fixed point            [purple --> pink]:      1.00000     28.76864     57.00000      0.73512%
        other                            [green]:    500.00000    500.00000    500.00000      0.00001%
        other cycle           [yellow --> white]:      3.00000    200.63749    334.00000      0.00563%


 * f: [`images/c_conv_5760_3240_1e-9_1e50_-10_0_5_625_10_0_-5_625.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/c_conv_5760_3240_1e-9_1e50_-10_0_5_625_10_0_-5_625.png)

        function:       f(z) = (z/2) * cos(z*pi/2)^2 + ((3*z+1)/2) * sin(z*pi/2)^2
        left-top:       (      -10.000000, 5.625000        )
        right-bottom:   (       10.000000, -5.625000       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:      1.00000     30.07372     84.00000      0.78212%
        cycle (1; 2)            [red --> orange]:      2.00000    109.95441    253.00000      0.08803%
        escape              [blue --> turquoise]:      2.00000      2.31886     54.00000     98.61630%
        fixed point            [purple --> pink]:      1.00000     24.05507    124.00000      0.44007%
        other                            [green]:    500.00000    500.00000    500.00000      0.00001%
        other cycle           [yellow --> white]:      3.00000     35.49508    334.00000      0.07347%


 * T: [`images/t_conv_5760_3240_1e-9_1e50_-10_0_5_625_10_0_-5_625.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/t_conv_5760_3240_1e-9_1e50_-10_0_5_625_10_0_-5_625.png)

        function:       T(z) = (3^(sin(z*pi/2)^2) + sin(z*pi/2)^2) / 2
        left-top:       (      -10.000000, 5.625000        )
        right-bottom:   (       10.000000, -5.625000       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:      1.00000     31.12646    188.00000      1.98170%
        cycle (1; 2)            [red --> orange]:      2.00000    123.28840    197.00000      0.27517%
        escape              [blue --> turquoise]:      1.00000      1.95888     88.00000     96.79055%
        fixed point            [purple --> pink]:      1.00000     28.93618    222.00000      0.93193%
        other                            [green]:    500.00000    500.00000    500.00000      0.00068%
        other cycle           [yellow --> white]:      3.00000    171.63090    489.00000      0.01998%


<a name="region-3"></a>

##### Region: (-5.000000, 2.812500), (5.000000, -2.812500)

 * F: [`images/f_conv_5760_3240_1e-9_1e50_-5_0_2_8125_5_0_-2_8125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/f_conv_5760_3240_1e-9_1e50_-5_0_2_8125_5_0_-2_8125.png)

        function:       F(z) = (3/4) * (2*z+1) / (cos(pi*z)+2) - 1/4
        left-top:       (       -5.000000, 2.812500        )
        right-bottom:   (        5.000000, -2.812500       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:      1.00000     29.55736     62.00000     97.10101%
        cycle (1; 2)            [red --> orange]:      2.00000    116.60517    157.00000      1.23035%
        escape              [blue --> turquoise]:      2.00000      2.60000      9.00000      0.00048%
        fixed point            [purple --> pink]:      1.00000     28.27201     52.00000      1.66759%
        other cycle           [yellow --> white]:      3.00000    192.40566    327.00000      0.00057%


 * f: [`images/c_conv_5760_3240_1e-9_1e50_-5_0_2_8125_5_0_-2_8125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/c_conv_5760_3240_1e-9_1e50_-5_0_2_8125_5_0_-2_8125.png)

        function:       f(z) = (z/2) * cos(z*pi/2)^2 + ((3*z+1)/2) * sin(z*pi/2)^2
        left-top:       (       -5.000000, 2.812500        )
        right-bottom:   (        5.000000, -2.812500       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:      1.00000     29.82876     75.00000      2.94912%
        cycle (1; 2)            [red --> orange]:      2.00000    109.69233    209.00000      0.25158%
        escape              [blue --> turquoise]:      2.00000      2.76773     59.00000     94.99572%
        fixed point            [purple --> pink]:      1.00000     23.68695     82.00000      1.59632%
        other cycle           [yellow --> white]:      3.00000     32.73382    269.00000      0.20726%


 * T: [`images/t_conv_5760_3240_1e-9_1e50_-5_0_2_8125_5_0_-2_8125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/t_conv_5760_3240_1e-9_1e50_-5_0_2_8125_5_0_-2_8125.png)

        function:       T(z) = (3^(sin(z*pi/2)^2) + sin(z*pi/2)^2) / 2
        left-top:       (       -5.000000, 2.812500        )
        right-bottom:   (        5.000000, -2.812500       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:      1.00000     30.60213    108.00000      6.05412%
        cycle (1; 2)            [red --> orange]:      2.00000    125.23555    205.00000      0.79667%
        escape              [blue --> turquoise]:      1.00000      2.48299     88.00000     90.82019%
        fixed point            [purple --> pink]:      1.00000     28.19221    166.00000      2.31852%
        other                            [green]:    500.00000    500.00000    500.00000      0.00040%
        other cycle           [yellow --> white]:      3.00000    173.36113    475.00000      0.01009%


<a name="region-4"></a>

##### Region: (-2.500000, 1.406250), (2.500000, -1.406250)

 * F: [`images/f_conv_5760_3240_1e-9_1e50_-2_5_1_40625_2_5_-1_40625.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/f_conv_5760_3240_1e-9_1e50_-2_5_1_40625_2_5_-1_40625.png)

        function:       F(z) = (3/4) * (2*z+1) / (cos(pi*z)+2) - 1/4
        left-top:       (       -2.500000, 1.406250        )
        right-bottom:   (        2.500000, -1.406250       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:      1.00000     29.86155     62.00000     94.09548%
        cycle (1; 2)            [red --> orange]:      2.00000    116.98120    157.00000      2.52516%
        escape              [blue --> turquoise]:      2.00000      3.21053      9.00000      0.00020%
        fixed point            [purple --> pink]:      1.00000     27.52778     53.00000      3.37911%
        other cycle           [yellow --> white]:     43.00000    217.00000    264.00000      0.00005%


 * f: [`images/c_conv_5760_3240_1e-9_1e50_-2_5_1_40625_2_5_-1_40625.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/c_conv_5760_3240_1e-9_1e50_-2_5_1_40625_2_5_-1_40625.png)

        function:       f(z) = (z/2) * cos(z*pi/2)^2 + ((3*z+1)/2) * sin(z*pi/2)^2
        left-top:       (       -2.500000, 1.406250        )
        right-bottom:   (        2.500000, -1.406250       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:      1.00000     29.44018     71.00000     10.61550%
        cycle (1; 2)            [red --> orange]:      2.00000    110.19890    199.00000      0.62811%
        escape              [blue --> turquoise]:      2.00000      3.76924     59.00000     83.00148%
        fixed point            [purple --> pink]:      1.00000     23.10820     62.00000      5.10329%
        other cycle           [yellow --> white]:     17.00000     31.71349    296.00000      0.65162%


 * T: [`images/t_conv_5760_3240_1e-9_1e50_-2_5_1_40625_2_5_-1_40625.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/t_conv_5760_3240_1e-9_1e50_-2_5_1_40625_2_5_-1_40625.png)

        function:       T(z) = (3^(sin(z*pi/2)^2) + sin(z*pi/2)^2) / 2
        left-top:       (       -2.500000, 1.406250        )
        right-bottom:   (        2.500000, -1.406250       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:      1.00000     30.04964     92.00000     18.61960%
        cycle (1; 2)            [red --> orange]:      2.00000    127.89934    206.00000      2.07306%
        escape              [blue --> turquoise]:      2.00000      3.42123     85.00000     74.13150%
        fixed point            [purple --> pink]:      1.00000     27.68363     70.00000      5.17175%
        other cycle           [yellow --> white]:    108.00000    140.65707    231.00000      0.00409%


<a name="region-5"></a>

##### Region: (0.250000, 0.703125), (2.750000, -0.703125)

 * F: [`images/f_conv_5760_3240_1e-9_1e50_0_25_0_703125_2_75_-0_703125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/f_conv_5760_3240_1e-9_1e50_0_25_0_703125_2_75_-0_703125.png)

        function:       F(z) = (3/4) * (2*z+1) / (cos(pi*z)+2) - 1/4
        left-top:       (        0.250000, 0.703125        )
        right-bottom:   (        2.750000, -0.703125       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:     20.00000     31.11406     66.00000     89.00857%
        cycle (1; 2)            [red --> orange]:      2.00000    116.96411    158.00000     10.07950%
        escape              [blue --> turquoise]:      2.00000      3.05556     11.00000      0.00077%
        fixed point            [purple --> pink]:      1.00000     29.01138     53.00000      0.91103%
        other cycle           [yellow --> white]:     23.00000    222.75000    269.00000      0.00013%


 * f: [`images/c_conv_5760_3240_1e-9_1e50_0_25_0_703125_2_75_-0_703125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/c_conv_5760_3240_1e-9_1e50_0_25_0_703125_2_75_-0_703125.png)

        function:       f(z) = (z/2) * cos(z*pi/2)^2 + ((3*z+1)/2) * sin(z*pi/2)^2
        left-top:       (        0.250000, 0.703125        )
        right-bottom:   (        2.750000, -0.703125       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:     21.00000     31.04877     86.00000      4.35053%
        cycle (1; 2)            [red --> orange]:      2.00000    110.02842    297.00000      2.32605%
        escape              [blue --> turquoise]:      3.00000      4.49869     64.00000     90.25205%
        fixed point            [purple --> pink]:     16.00000     25.29211     68.00000      0.69731%
        other                            [green]:    500.00000    500.00000    500.00000      0.00001%
        other cycle           [yellow --> white]:     15.00000     31.53219    281.00000      2.37404%


 * T: [`images/t_conv_5760_3240_1e-9_1e50_0_25_0_703125_2_75_-0_703125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/t_conv_5760_3240_1e-9_1e50_0_25_0_703125_2_75_-0_703125.png)

        function:       T(z) = (3^(sin(z*pi/2)^2) + sin(z*pi/2)^2) / 2
        left-top:       (        0.250000, 0.703125        )
        right-bottom:   (        2.750000, -0.703125       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:     21.00000     31.02449     92.00000     11.90309%
        cycle (1; 2)            [red --> orange]:      2.00000    127.63318    213.00000      7.68780%
        escape              [blue --> turquoise]:      2.00000      4.24312     83.00000     79.36629%
        fixed point            [purple --> pink]:     22.00000     30.37598     76.00000      1.04092%
        other cycle           [yellow --> white]:    116.00000    140.78531    241.00000      0.00190%


<a name="region-6"></a>

##### Region: (0.875000, 0.351562), (2.125000, -0.351562)

 * F: [`images/f_conv_5760_3240_1e-9_1e50_0_875_0_3515625_2_125_-0_3515625.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/f_conv_5760_3240_1e-9_1e50_0_875_0_3515625_2_125_-0_3515625.png)

        function:       F(z) = (3/4) * (2*z+1) / (cos(pi*z)+2) - 1/4
        left-top:       (        0.875000, 0.351562        )
        right-bottom:   (        2.125000, -0.351562       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:     20.00000     32.59594     70.00000     66.37957%
        cycle (1; 2)            [red --> orange]:      2.00000    116.71777    158.00000     33.16269%
        escape              [blue --> turquoise]:      3.00000      4.31034      9.00000      0.00093%
        fixed point            [purple --> pink]:     22.00000     31.56105     61.00000      0.45670%
        other cycle           [yellow --> white]:     31.00000    193.80000    269.00000      0.00011%


 * f: [`images/c_conv_5760_3240_1e-9_1e50_0_875_0_3515625_2_125_-0_3515625.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/c_conv_5760_3240_1e-9_1e50_0_875_0_3515625_2_125_-0_3515625.png)

        function:       f(z) = (z/2) * cos(z*pi/2)^2 + ((3*z+1)/2) * sin(z*pi/2)^2
        left-top:       (        0.875000, 0.351562        )
        right-bottom:   (        2.125000, -0.351562       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:     23.00000     32.37936     88.00000      4.64588%
        cycle (1; 2)            [red --> orange]:      2.00000    109.79590    219.00000      7.74947%
        escape              [blue --> turquoise]:      4.00000      6.32934     80.00000     79.27593%
        fixed point            [purple --> pink]:     19.00000     26.91408     68.00000      0.66954%
        other cycle           [yellow --> white]:     15.00000     31.27651    279.00000      7.65918%


 * T: [`images/t_conv_5760_3240_1e-9_1e50_0_875_0_3515625_2_125_-0_3515625.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/t_conv_5760_3240_1e-9_1e50_0_875_0_3515625_2_125_-0_3515625.png)

        function:       T(z) = (3^(sin(z*pi/2)^2) + sin(z*pi/2)^2) / 2
        left-top:       (        0.875000, 0.351562        )
        right-bottom:   (        2.125000, -0.351562       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:     22.00000     32.90233    105.00000      7.94719%
        cycle (1; 2)            [red --> orange]:      2.00000    126.99849    218.00000     25.34132%
        escape              [blue --> turquoise]:      3.00000      5.94547     83.00000     65.60802%
        fixed point            [purple --> pink]:     22.00000     31.31793     90.00000      1.10213%
        other cycle           [yellow --> white]:    120.00000    144.10040    224.00000      0.00133%


<a name="region-7"></a>

##### Region: (1.187500, 0.175781), (1.812500, -0.175781)

 * F: [`images/f_conv_5760_3240_1e-9_1e50_1_1875_0_17578125_1_8125_-0_17578125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/f_conv_5760_3240_1e-9_1e50_1_1875_0_17578125_1_8125_-0_17578125.png)

        function:       F(z) = (3/4) * (2*z+1) / (cos(pi*z)+2) - 1/4
        left-top:       (        1.187500, 0.175781        )
        right-bottom:   (        1.812500, -0.175781       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:     22.00000     34.06997     69.00000     51.22942%
        cycle (1; 2)            [red --> orange]:     63.00000    116.99388    158.00000     48.21085%
        escape              [blue --> turquoise]:      4.00000      6.16216     17.00000      0.00079%
        fixed point            [purple --> pink]:     22.00000     31.96294     64.00000      0.55885%
        other cycle           [yellow --> white]:     31.00000    231.87500    265.00000      0.00009%


 * f: [`images/c_conv_5760_3240_1e-9_1e50_1_1875_0_17578125_1_8125_-0_17578125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/c_conv_5760_3240_1e-9_1e50_1_1875_0_17578125_1_8125_-0_17578125.png)

        function:       f(z) = (z/2) * cos(z*pi/2)^2 + ((3*z+1)/2) * sin(z*pi/2)^2
        left-top:       (        1.187500, 0.175781        )
        right-bottom:   (        1.812500, -0.175781       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:     24.00000     34.28866     88.00000      3.14229%
        cycle (1; 2)            [red --> orange]:     60.00000    110.82102    207.00000      8.48900%
        escape              [blue --> turquoise]:      4.00000      7.63534     80.00000     73.32756%
        fixed point            [purple --> pink]:     18.00000     28.86050     70.00000      0.45244%
        other cycle           [yellow --> white]:     14.00000     30.83210    274.00000     14.58871%


 * T: [`images/t_conv_5760_3240_1e-9_1e50_1_1875_0_17578125_1_8125_-0_17578125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/t_conv_5760_3240_1e-9_1e50_1_1875_0_17578125_1_8125_-0_17578125.png)

        function:       T(z) = (3^(sin(z*pi/2)^2) + sin(z*pi/2)^2) / 2
        left-top:       (        1.187500, 0.175781        )
        right-bottom:   (        1.812500, -0.175781       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:     23.00000     34.62811    118.00000      6.27067%
        cycle (1; 2)            [red --> orange]:     28.00000    130.58447    219.00000     33.64824%
        escape              [blue --> turquoise]:      4.00000      7.31507     87.00000     59.20974%
        fixed point            [purple --> pink]:     22.00000     33.04009     90.00000      0.86974%
        other cycle           [yellow --> white]:    124.00000    147.40667    250.00000      0.00161%


<a name="region-8"></a>

##### Region: (95.000000, 2.812500), (105.000000, -2.812500)

 * F: [`images/f_conv_2880_1620_1e-9_1e50_95_0_2_8125_105_0_-2_8125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/f_conv_2880_1620_1e-9_1e50_95_0_2_8125_105_0_-2_8125.png)

        function:       F(z) = (3/4) * (2*z+1) / (cos(pi*z)+2) - 1/4
        left-top:       (       95.000000, 2.812500        )
        right-bottom:   (      105.000000, -2.812500       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:     19.00000     29.94793     55.00000     98.49456%
        cycle (1; 2)            [red --> orange]:     11.00000    116.29431    168.00000      0.36638%
        escape              [blue --> turquoise]:      2.00000      2.01693      9.00000      0.41019%
        fixed point            [purple --> pink]:     22.00000     28.48257     47.00000      0.72805%
        other cycle           [yellow --> white]:     24.00000    201.00000    283.00000      0.00081%


 * f: [`images/c_conv_2880_1620_1e-9_1e50_95_0_2_8125_105_0_-2_8125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/c_conv_2880_1620_1e-9_1e50_95_0_2_8125_105_0_-2_8125.png)

        function:       f(z) = (z/2) * cos(z*pi/2)^2 + ((3*z+1)/2) * sin(z*pi/2)^2
        left-top:       (       95.000000, 2.812500        )
        right-bottom:   (      105.000000, -2.812500       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:     29.00000     30.42857     35.00000      0.00030%
        cycle (1; 2)            [red --> orange]:     11.00000    132.08337    376.00000      0.05039%
        escape              [blue --> turquoise]:      2.00000      2.14116     18.00000     99.93600%
        fixed point            [purple --> pink]:     18.00000     24.84615     31.00000      0.00056%
        other cycle           [yellow --> white]:     28.00000     71.93950    276.00000      0.01275%


 * T: [`images/t_conv_2880_1620_1e-9_1e50_95_0_2_8125_105_0_-2_8125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/t_conv_2880_1620_1e-9_1e50_95_0_2_8125_105_0_-2_8125.png)

        function:       T(z) = (3^(sin(z*pi/2)^2) + sin(z*pi/2)^2) / 2
        left-top:       (       95.000000, 2.812500        )
        right-bottom:   (      105.000000, -2.812500       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:     23.00000     32.75394     98.00000      0.30976%
        cycle (1; 2)            [red --> orange]:     11.00000    120.27374    222.00000      0.07673%
        escape              [blue --> turquoise]:      1.00000      2.14105     43.00000     99.41212%
        fixed point            [purple --> pink]:     22.00000     30.39081     73.00000      0.18806%
        other                            [green]:    500.00000    500.00000    500.00000      0.00086%
        other cycle           [yellow --> white]:    121.00000    175.90893    334.00000      0.01247%


<a name="region-9"></a>

##### Region: (1095.000000, 2.812500), (1105.000000, -2.812500)

 * F: [`images/f_conv_2880_1620_1e-9_1e50_1095_0_2_8125_1105_0_-2_8125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/f_conv_2880_1620_1e-9_1e50_1095_0_2_8125_1105_0_-2_8125.png)

        function:       F(z) = (3/4) * (2*z+1) / (cos(pi*z)+2) - 1/4
        left-top:       (     1095.000000, 2.812500        )
        right-bottom:   (     1105.000000, -2.812500       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:     22.00000     30.19708     54.00000     84.27349%
        cycle (1; 2)            [red --> orange]:     16.00000    118.41080    214.00000      0.33929%
        escape              [blue --> turquoise]:      2.00000      2.00273      4.00000     14.65179%
        fixed point            [purple --> pink]:     21.00000     28.46612     48.00000      0.73453%
        other cycle           [yellow --> white]:     31.00000    226.23810    264.00000      0.00090%


 * f: [`images/c_conv_2880_1620_1e-9_1e50_1095_0_2_8125_1105_0_-2_8125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/c_conv_2880_1620_1e-9_1e50_1095_0_2_8125_1105_0_-2_8125.png)

        function:       f(z) = (z/2) * cos(z*pi/2)^2 + ((3*z+1)/2) * sin(z*pi/2)^2
        left-top:       (     1095.000000, 2.812500        )
        right-bottom:   (     1105.000000, -2.812500       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        cycle (1; 2)            [red --> orange]:     16.00000    161.53150    451.00000      0.05069%
        escape              [blue --> turquoise]:      2.00000      2.02330     11.00000     99.93806%
        fixed point            [purple --> pink]:     28.00000     29.00000     30.00000      0.00021%
        other cycle           [yellow --> white]:     45.00000    103.52233    301.00000      0.01104%


 * T: [`images/t_conv_2880_1620_1e-9_1e50_1095_0_2_8125_1105_0_-2_8125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/t_conv_2880_1620_1e-9_1e50_1095_0_2_8125_1105_0_-2_8125.png)

        function:       T(z) = (3^(sin(z*pi/2)^2) + sin(z*pi/2)^2) / 2
        left-top:       (     1095.000000, 2.812500        )
        right-bottom:   (     1105.000000, -2.812500       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:     25.00000     33.57961     98.00000      0.14566%
        cycle (1; 2)            [red --> orange]:     16.00000    133.44396    257.00000      0.06846%
        escape              [blue --> turquoise]:      1.00000      2.02738     55.00000     99.65246%
        fixed point            [purple --> pink]:     20.00000     31.24631     73.00000      0.12061%
        other                            [green]:    500.00000    500.00000    500.00000      0.00086%
        other cycle           [yellow --> white]:    120.00000    172.60573    334.00000      0.01196%


<a name="region-10"></a>

##### Region: (9095.000000, 2.812500), (9105.000000, -2.812500)

 * F: [`images/f_conv_2880_1620_1e-9_1e50_9095_0_2_8125_9105_0_-2_8125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/f_conv_2880_1620_1e-9_1e50_9095_0_2_8125_9105_0_-2_8125.png)

        function:       F(z) = (3/4) * (2*z+1) / (cos(pi*z)+2) - 1/4
        left-top:       (     9095.000000, 2.812500        )
        right-bottom:   (     9105.000000, -2.812500       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:     24.00000     30.07238     65.00000     55.75311%
        cycle (1; 2)            [red --> orange]:     18.00000    123.83282    253.00000      0.11756%
        escape              [blue --> turquoise]:      2.00000      2.00205      4.00000     44.06970%
        fixed point            [purple --> pink]:     21.00000     30.40455     47.00000      0.05748%
        other cycle           [yellow --> white]:     23.00000    197.82000    331.00000      0.00214%


 * f: [`images/c_conv_2880_1620_1e-9_1e50_9095_0_2_8125_9105_0_-2_8125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/c_conv_2880_1620_1e-9_1e50_9095_0_2_8125_9105_0_-2_8125.png)

        function:       f(z) = (z/2) * cos(z*pi/2)^2 + ((3*z+1)/2) * sin(z*pi/2)^2
        left-top:       (     9095.000000, 2.812500        )
        right-bottom:   (     9105.000000, -2.812500       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        cycle (1; 2)            [red --> orange]:     19.00000    190.10214    476.00000      0.05015%
        escape              [blue --> turquoise]:      2.00000      2.00421      6.00000     99.93827%
        other                            [green]:    500.00000    500.00000    500.00000      0.00004%
        other cycle           [yellow --> white]:     57.00000    139.03346    412.00000      0.01153%


 * T: [`images/t_conv_2880_1620_1e-9_1e50_9095_0_2_8125_9105_0_-2_8125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/t_conv_2880_1620_1e-9_1e50_9095_0_2_8125_9105_0_-2_8125.png)

        function:       T(z) = (3^(sin(z*pi/2)^2) + sin(z*pi/2)^2) / 2
        left-top:       (     9095.000000, 2.812500        )
        right-bottom:   (     9105.000000, -2.812500       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:     25.00000     34.09361     98.00000      0.08288%
        cycle (1; 2)            [red --> orange]:     19.00000    146.51795    269.00000      0.06807%
        escape              [blue --> turquoise]:      1.00000      1.98476     40.00000     99.75851%
        fixed point            [purple --> pink]:     24.00000     31.93726     73.00000      0.07823%
        other                            [green]:    500.00000    500.00000    500.00000      0.00086%
        other cycle           [yellow --> white]:    119.00000    174.39700    334.00000      0.01145%


<a name="stop-0"></a>

#### Stopping Times ($m = 0$)

Maximum iterations: $500$

<a name="region-11"></a>

##### Region: (-20.000000, 11.250000), (20.000000, -11.250000)

 * F: [`images/f_stop_5760_3240_1e-9_1e50_-20_0_11_25_20_0_-11_25.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/f_stop_5760_3240_1e-9_1e50_-20_0_11_25_20_0_-11_25.png)

        function:       F(z) = (3/4) * (2*z+1) / (cos(pi*z)+2) - 1/4
        left-top:       (      -20.000000, 11.250000       )
        right-bottom:   (       20.000000, -11.250000      )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.01669     33.00000     99.99044%


 * f: [`images/c_stop_5760_3240_1e-9_1e50_-20_0_11_25_20_0_-11_25.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/c_stop_5760_3240_1e-9_1e50_-20_0_11_25_20_0_-11_25.png)

        function:       f(z) = (z/2) * cos(z*pi/2)^2 + ((3*z+1)/2) * sin(z*pi/2)^2
        left-top:       (      -20.000000, 11.250000       )
        right-bottom:   (       20.000000, -11.250000      )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.14799    146.00000      2.51781%


 * T: [`images/t_stop_5760_3240_1e-9_1e50_-20_0_11_25_20_0_-11_25.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/t_stop_5760_3240_1e-9_1e50_-20_0_11_25_20_0_-11_25.png)

        function:       T(z) = (3^(sin(z*pi/2)^2) + sin(z*pi/2)^2) / 2
        left-top:       (      -20.000000, 11.250000       )
        right-bottom:   (       20.000000, -11.250000      )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.31264    339.00000      6.67411%


<a name="region-12"></a>

##### Region: (-10.000000, 5.625000), (10.000000, -5.625000)

 * F: [`images/f_stop_5760_3240_1e-9_1e50_-10_0_5_625_10_0_-5_625.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/f_stop_5760_3240_1e-9_1e50_-10_0_5_625_10_0_-5_625.png)

        function:       F(z) = (3/4) * (2*z+1) / (cos(pi*z)+2) - 1/4
        left-top:       (      -10.000000, 5.625000        )
        right-bottom:   (       10.000000, -5.625000       )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.03467     32.00000     99.96597%


 * f: [`images/c_stop_5760_3240_1e-9_1e50_-10_0_5_625_10_0_-5_625.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/c_stop_5760_3240_1e-9_1e50_-10_0_5_625_10_0_-5_625.png)

        function:       f(z) = (z/2) * cos(z*pi/2)^2 + ((3*z+1)/2) * sin(z*pi/2)^2
        left-top:       (      -10.000000, 5.625000        )
        right-bottom:   (       10.000000, -5.625000       )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.19320    109.00000      5.34924%


 * T: [`images/t_stop_5760_3240_1e-9_1e50_-10_0_5_625_10_0_-5_625.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/t_stop_5760_3240_1e-9_1e50_-10_0_5_625_10_0_-5_625.png)

        function:       T(z) = (3^(sin(z*pi/2)^2) + sin(z*pi/2)^2) / 2
        left-top:       (      -10.000000, 5.625000        )
        right-bottom:   (       10.000000, -5.625000       )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.17688    187.00000     11.83621%


<a name="region-13"></a>

##### Region: (-5.000000, 2.812500), (5.000000, -2.812500)

 * F: [`images/f_stop_5760_3240_1e-9_1e50_-5_0_2_8125_5_0_-2_8125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/f_stop_5760_3240_1e-9_1e50_-5_0_2_8125_5_0_-2_8125.png)

        function:       F(z) = (3/4) * (2*z+1) / (cos(pi*z)+2) - 1/4
        left-top:       (       -5.000000, 2.812500        )
        right-bottom:   (        5.000000, -2.812500       )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.07225     68.00000     99.86583%


 * f: [`images/c_stop_5760_3240_1e-9_1e50_-5_0_2_8125_5_0_-2_8125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/c_stop_5760_3240_1e-9_1e50_-5_0_2_8125_5_0_-2_8125.png)

        function:       f(z) = (z/2) * cos(z*pi/2)^2 + ((3*z+1)/2) * sin(z*pi/2)^2
        left-top:       (       -5.000000, 2.812500        )
        right-bottom:   (        5.000000, -2.812500       )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.25507    109.00000     11.51601%


 * T: [`images/t_stop_5760_3240_1e-9_1e50_-5_0_2_8125_5_0_-2_8125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/t_stop_5760_3240_1e-9_1e50_-5_0_2_8125_5_0_-2_8125.png)

        function:       T(z) = (3^(sin(z*pi/2)^2) + sin(z*pi/2)^2) / 2
        left-top:       (       -5.000000, 2.812500        )
        right-bottom:   (        5.000000, -2.812500       )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.21339    134.00000     20.94857%


<a name="region-14"></a>

##### Region: (-2.500000, 1.406250), (2.500000, -1.406250)

 * F: [`images/f_stop_5760_3240_1e-9_1e50_-2_5_1_40625_2_5_-1_40625.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/f_stop_5760_3240_1e-9_1e50_-2_5_1_40625_2_5_-1_40625.png)

        function:       F(z) = (3/4) * (2*z+1) / (cos(pi*z)+2) - 1/4
        left-top:       (       -2.500000, 1.406250        )
        right-bottom:   (        2.500000, -1.406250       )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.12332     78.00000     99.46541%


 * f: [`images/c_stop_5760_3240_1e-9_1e50_-2_5_1_40625_2_5_-1_40625.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/c_stop_5760_3240_1e-9_1e50_-2_5_1_40625_2_5_-1_40625.png)

        function:       f(z) = (z/2) * cos(z*pi/2)^2 + ((3*z+1)/2) * sin(z*pi/2)^2
        left-top:       (       -2.500000, 1.406250        )
        right-bottom:   (        2.500000, -1.406250       )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.25989     80.00000     27.90177%


 * T: [`images/t_stop_5760_3240_1e-9_1e50_-2_5_1_40625_2_5_-1_40625.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/t_stop_5760_3240_1e-9_1e50_-2_5_1_40625_2_5_-1_40625.png)

        function:       T(z) = (3^(sin(z*pi/2)^2) + sin(z*pi/2)^2) / 2
        left-top:       (       -2.500000, 1.406250        )
        right-bottom:   (        2.500000, -1.406250       )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.25061     63.00000     43.10738%


<a name="region-15"></a>

##### Region: (0.250000, 0.703125), (2.750000, -0.703125)

 * F: [`images/f_stop_5760_3240_1e-9_1e50_0_25_0_703125_2_75_-0_703125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/f_stop_5760_3240_1e-9_1e50_0_25_0_703125_2_75_-0_703125.png)

        function:       F(z) = (3/4) * (2*z+1) / (cos(pi*z)+2) - 1/4
        left-top:       (        0.250000, 0.703125        )
        right-bottom:   (        2.750000, -0.703125       )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.43662     78.00000     99.23338%


 * f: [`images/c_stop_5760_3240_1e-9_1e50_0_25_0_703125_2_75_-0_703125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/c_stop_5760_3240_1e-9_1e50_0_25_0_703125_2_75_-0_703125.png)

        function:       f(z) = (z/2) * cos(z*pi/2)^2 + ((3*z+1)/2) * sin(z*pi/2)^2
        left-top:       (        0.250000, 0.703125        )
        right-bottom:   (        2.750000, -0.703125       )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.46887    178.00000     33.06704%


 * T: [`images/t_stop_5760_3240_1e-9_1e50_0_25_0_703125_2_75_-0_703125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/t_stop_5760_3240_1e-9_1e50_0_25_0_703125_2_75_-0_703125.png)

        function:       T(z) = (3^(sin(z*pi/2)^2) + sin(z*pi/2)^2) / 2
        left-top:       (        0.250000, 0.703125        )
        right-bottom:   (        2.750000, -0.703125       )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.44390     57.00000     51.54657%


<a name="region-16"></a>

##### Region: (0.875000, 0.351562), (2.125000, -0.351562)

 * F: [`images/f_stop_5760_3240_1e-9_1e50_0_875_0_3515625_2_125_-0_3515625.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/f_stop_5760_3240_1e-9_1e50_0_875_0_3515625_2_125_-0_3515625.png)

        function:       F(z) = (3/4) * (2*z+1) / (cos(pi*z)+2) - 1/4
        left-top:       (        0.875000, 0.351562        )
        right-bottom:   (        2.125000, -0.351562       )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.58330     82.00000     98.67263%


 * f: [`images/c_stop_5760_3240_1e-9_1e50_0_875_0_3515625_2_125_-0_3515625.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/c_stop_5760_3240_1e-9_1e50_0_875_0_3515625_2_125_-0_3515625.png)

        function:       f(z) = (z/2) * cos(z*pi/2)^2 + ((3*z+1)/2) * sin(z*pi/2)^2
        left-top:       (        0.875000, 0.351562        )
        right-bottom:   (        2.125000, -0.351562       )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.56188     50.00000     68.58441%


 * T: [`images/t_stop_5760_3240_1e-9_1e50_0_875_0_3515625_2_125_-0_3515625.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/t_stop_5760_3240_1e-9_1e50_0_875_0_3515625_2_125_-0_3515625.png)

        function:       T(z) = (3^(sin(z*pi/2)^2) + sin(z*pi/2)^2) / 2
        left-top:       (        0.875000, 0.351562        )
        right-bottom:   (        2.125000, -0.351562       )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.60415     70.00000     80.88317%


<a name="region-17"></a>

##### Region: (1.187500, 0.175781), (1.812500, -0.175781)

 * F: [`images/f_stop_5760_3240_1e-9_1e50_1_1875_0_17578125_1_8125_-0_17578125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/f_stop_5760_3240_1e-9_1e50_1_1875_0_17578125_1_8125_-0_17578125.png)

        function:       F(z) = (3/4) * (2*z+1) / (cos(pi*z)+2) - 1/4
        left-top:       (        1.187500, 0.175781        )
        right-bottom:   (        1.812500, -0.175781       )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.35224      2.00000    100.00000%


 * f: [`images/c_stop_5760_3240_1e-9_1e50_1_1875_0_17578125_1_8125_-0_17578125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/c_stop_5760_3240_1e-9_1e50_1_1875_0_17578125_1_8125_-0_17578125.png)

        function:       f(z) = (z/2) * cos(z*pi/2)^2 + ((3*z+1)/2) * sin(z*pi/2)^2
        left-top:       (        1.187500, 0.175781        )
        right-bottom:   (        1.812500, -0.175781       )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.70464     20.00000     92.96697%


 * T: [`images/t_stop_5760_3240_1e-9_1e50_1_1875_0_17578125_1_8125_-0_17578125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/t_stop_5760_3240_1e-9_1e50_1_1875_0_17578125_1_8125_-0_17578125.png)

        function:       T(z) = (3^(sin(z*pi/2)^2) + sin(z*pi/2)^2) / 2
        left-top:       (        1.187500, 0.175781        )
        right-bottom:   (        1.812500, -0.175781       )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.51734     11.00000     97.50324%


<a name="region-18"></a>

##### Region: (95.000000, 2.812500), (105.000000, -2.812500)

 * F: [`images/f_stop_2880_1620_1e-9_1e50_95_0_2_8125_105_0_-2_8125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/f_stop_2880_1620_1e-9_1e50_95_0_2_8125_105_0_-2_8125.png)

        function:       F(z) = (3/4) * (2*z+1) / (cos(pi*z)+2) - 1/4
        left-top:       (       95.000000, 2.812500        )
        right-bottom:   (      105.000000, -2.812500       )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.05845     42.00000     99.59341%


 * f: [`images/c_stop_2880_1620_1e-9_1e50_95_0_2_8125_105_0_-2_8125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/c_stop_2880_1620_1e-9_1e50_95_0_2_8125_105_0_-2_8125.png)

        function:       f(z) = (z/2) * cos(z*pi/2)^2 + ((3*z+1)/2) * sin(z*pi/2)^2
        left-top:       (       95.000000, 2.812500        )
        right-bottom:   (      105.000000, -2.812500       )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.03533    241.00000      9.03112%


 * T: [`images/t_stop_2880_1620_1e-9_1e50_95_0_2_8125_105_0_-2_8125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/t_stop_2880_1620_1e-9_1e50_95_0_2_8125_105_0_-2_8125.png)

        function:       T(z) = (3^(sin(z*pi/2)^2) + sin(z*pi/2)^2) / 2
        left-top:       (       95.000000, 2.812500        )
        right-bottom:   (      105.000000, -2.812500       )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.01061     45.00000     39.57868%


<a name="region-19"></a>

##### Region: (1095.000000, 2.812500), (1105.000000, -2.812500)

 * F: [`images/f_stop_2880_1620_1e-9_1e50_1095_0_2_8125_1105_0_-2_8125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/f_stop_2880_1620_1e-9_1e50_1095_0_2_8125_1105_0_-2_8125.png)

        function:       F(z) = (3/4) * (2*z+1) / (cos(pi*z)+2) - 1/4
        left-top:       (     1095.000000, 2.812500        )
        right-bottom:   (     1105.000000, -2.812500       )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.01787     32.00000     95.53498%


 * f: [`images/c_stop_2880_1620_1e-9_1e50_1095_0_2_8125_1105_0_-2_8125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/c_stop_2880_1620_1e-9_1e50_1095_0_2_8125_1105_0_-2_8125.png)

        function:       f(z) = (z/2) * cos(z*pi/2)^2 + ((3*z+1)/2) * sin(z*pi/2)^2
        left-top:       (     1095.000000, 2.812500        )
        right-bottom:   (     1105.000000, -2.812500       )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.02706    162.00000      9.01089%


 * T: [`images/t_stop_2880_1620_1e-9_1e50_1095_0_2_8125_1105_0_-2_8125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/t_stop_2880_1620_1e-9_1e50_1095_0_2_8125_1105_0_-2_8125.png)

        function:       T(z) = (3^(sin(z*pi/2)^2) + sin(z*pi/2)^2) / 2
        left-top:       (     1095.000000, 2.812500        )
        right-bottom:   (     1105.000000, -2.812500       )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.00245     47.00000     51.58486%


<a name="region-20"></a>

##### Region: (9095.000000, 2.812500), (9105.000000, -2.812500)

 * F: [`images/f_stop_2880_1620_1e-9_1e50_9095_0_2_8125_9105_0_-2_8125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/f_stop_2880_1620_1e-9_1e50_9095_0_2_8125_9105_0_-2_8125.png)

        function:       F(z) = (3/4) * (2*z+1) / (cos(pi*z)+2) - 1/4
        left-top:       (     9095.000000, 2.812500        )
        right-bottom:   (     9105.000000, -2.812500       )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.00382     25.00000     94.19689%


 * f: [`images/c_stop_2880_1620_1e-9_1e50_9095_0_2_8125_9105_0_-2_8125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/c_stop_2880_1620_1e-9_1e50_9095_0_2_8125_9105_0_-2_8125.png)

        function:       f(z) = (z/2) * cos(z*pi/2)^2 + ((3*z+1)/2) * sin(z*pi/2)^2
        left-top:       (     9095.000000, 2.812500        )
        right-bottom:   (     9105.000000, -2.812500       )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.02495    164.00000      9.01170%


 * T: [`images/t_stop_2880_1620_1e-9_1e50_9095_0_2_8125_9105_0_-2_8125.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/t_stop_2880_1620_1e-9_1e50_9095_0_2_8125_9105_0_-2_8125.png)

        function:       T(z) = (3^(sin(z*pi/2)^2) + sin(z*pi/2)^2) / 2
        left-top:       (     9095.000000, 2.812500        )
        right-bottom:   (     9105.000000, -2.812500       )

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.00228     70.00000     51.59600%


<a name="conv-5"></a>

#### Convergence ($m = 5$)

Maximum iterations: $500$, convergence threshold: $10^{-9}$, escape threshold:
$10^{50}$

<a name="region-21"></a>

##### Region: (-5.000000, 2.812500), (5.000000, -2.812500)

 * F: [`images/f_conv_2880_1620_1e-9_1e50_-5_0_2_8125_5_0_-2_8125_5.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/f_conv_2880_1620_1e-9_1e50_-5_0_2_8125_5_0_-2_8125_5.png)

        function:       F(z) = (3/4) * (2*z+1) / (cos(pi*z)^11+2) - 1/4
        left-top:       (       -5.000000, 2.812500        )
        right-bottom:   (        5.000000, -2.812500       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:      1.00000     27.23832     80.00000     98.90263%
        cycle (1; 2)            [red --> orange]:      2.00000    100.78241    134.00000      0.02364%
        escape              [blue --> turquoise]:      2.00000      2.60465     18.00000      0.00553%
        fixed point            [purple --> pink]:      1.00000     62.97133     95.00000      1.04527%
        other                            [green]:    298.00000    499.58653    500.00000      0.02291%
        other cycle           [yellow --> white]:      3.00000      3.00000      3.00000      0.00002%


 * f: [`images/c_conv_2880_1620_1e-9_1e50_-5_0_2_8125_5_0_-2_8125_5.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/c_conv_2880_1620_1e-9_1e50_-5_0_2_8125_5_0_-2_8125_5.png)

        function:       f(z) = (z/2) * cos(z*pi/2)^12 + ((3*z+1)/2) * sin(z*pi/2)^12
        left-top:       (       -5.000000, 2.812500        )
        right-bottom:   (        5.000000, -2.812500       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:      1.00000     28.15754     70.00000      4.59051%
        cycle (1; 2)            [red --> orange]:      2.00000     98.09355    120.00000      0.03620%
        escape              [blue --> turquoise]:      2.00000      2.14188     20.00000     95.31674%
        fixed point            [purple --> pink]:      1.00000     26.95484     40.00000      0.05648%
        other cycle           [yellow --> white]:      3.00000    165.00000    246.00000      0.00006%


 * T: [`images/t_conv_2880_1620_1e-9_1e50_-5_0_2_8125_5_0_-2_8125_5.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/t_conv_2880_1620_1e-9_1e50_-5_0_2_8125_5_0_-2_8125_5.png)

        function:       T(z) = (3^(sin(z*pi/2)^12) + sin(z*pi/2)^12) / 2
        left-top:       (       -5.000000, 2.812500        )
        right-bottom:   (        5.000000, -2.812500       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:      1.00000     31.15932     61.00000      6.36030%
        cycle (1; 2)            [red --> orange]:      2.00000    110.97097    326.00000      0.55232%
        escape              [blue --> turquoise]:      1.00000      1.85594     48.00000     92.56794%
        fixed point            [purple --> pink]:      1.00000     27.67095     46.00000      0.51933%
        other cycle           [yellow --> white]:      3.00000    209.40000    261.00000      0.00011%


<a name="region-22"></a>

##### Region: (0.250000, 0.703125), (2.750000, -0.703125)

 * F: [`images/f_conv_2880_1620_1e-9_1e50_0_25_0_703125_2_75_-0_703125_5.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/f_conv_2880_1620_1e-9_1e50_0_25_0_703125_2_75_-0_703125_5.png)

        function:       F(z) = (3/4) * (2*z+1) / (cos(pi*z)^11+2) - 1/4
        left-top:       (        0.250000, 0.703125        )
        right-bottom:   (        2.750000, -0.703125       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:     19.00000     27.96768     80.00000     88.12620%
        cycle (1; 2)            [red --> orange]:      2.00000    101.28556    126.00000      0.21954%
        escape              [blue --> turquoise]:      2.00000      3.38920     29.00000      0.01509%
        fixed point            [purple --> pink]:      1.00000     63.62618    110.00000     11.59712%
        other                            [green]:     95.00000    499.76096    500.00000      0.04205%


 * f: [`images/c_conv_2880_1620_1e-9_1e50_0_25_0_703125_2_75_-0_703125_5.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/c_conv_2880_1620_1e-9_1e50_0_25_0_703125_2_75_-0_703125_5.png)

        function:       f(z) = (z/2) * cos(z*pi/2)^12 + ((3*z+1)/2) * sin(z*pi/2)^12
        left-top:       (        0.250000, 0.703125        )
        right-bottom:   (        2.750000, -0.703125       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:     19.00000     28.12041     56.00000     21.40736%
        cycle (1; 2)            [red --> orange]:      2.00000     98.72492    155.00000      0.37307%
        escape              [blue --> turquoise]:      2.00000      2.74319     25.00000     78.19174%
        fixed point            [purple --> pink]:     22.00000     27.08796     38.00000      0.02778%
        other cycle           [yellow --> white]:    246.00000    246.00000    246.00000      0.00004%



 * T: [`images/t_conv_2880_1620_1e-9_1e50_0_25_0_703125_2_75_-0_703125_5.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/t_conv_2880_1620_1e-9_1e50_0_25_0_703125_2_75_-0_703125_5.png)

        function:       T(z) = (3^(sin(z*pi/2)^12) + sin(z*pi/2)^12) / 2
        left-top:       (        0.250000, 0.703125        )
        right-bottom:   (        2.750000, -0.703125       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:     21.00000     30.47144     74.00000     19.51556%
        cycle (1; 2)            [red --> orange]:      2.00000    109.77897    329.00000      2.19423%
        escape              [blue --> turquoise]:      1.00000      3.32505     51.00000     78.18326%
        fixed point            [purple --> pink]:     22.00000     29.56047     53.00000      0.10670%
        other cycle           [yellow --> white]:    248.00000    253.50000    259.00000      0.00026%


<a name="region-23"></a>

##### Region: (1.187500, 0.175781), (1.812500, -0.175781)

 * F: [`images/f_conv_2880_1620_1e-9_1e50_1_1875_0_17578125_1_8125_-0_17578125_5.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/f_conv_2880_1620_1e-9_1e50_1_1875_0_17578125_1_8125_-0_17578125_5.png)

        function:       F(z) = (3/4) * (2*z+1) / (cos(pi*z)^11+2) - 1/4
        left-top:       (        1.187500, 0.175781        )
        right-bottom:   (        1.812500, -0.175781       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:     22.00000     32.02135     98.00000     90.25219%
        cycle (1; 2)            [red --> orange]:     72.00000    103.31471    147.00000      0.65518%
        escape              [blue --> turquoise]:      3.00000      6.22422     32.00000      0.03824%
        fixed point            [purple --> pink]:     24.00000     68.29474    110.00000      8.99267%
        other                            [green]:     95.00000    499.74132    500.00000      0.06173%


 * f: [`images/c_conv_2880_1620_1e-9_1e50_1_1875_0_17578125_1_8125_-0_17578125_5.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/c_conv_2880_1620_1e-9_1e50_1_1875_0_17578125_1_8125_-0_17578125_5.png)

        function:       f(z) = (z/2) * cos(z*pi/2)^12 + ((3*z+1)/2) * sin(z*pi/2)^12
        left-top:       (        1.187500, 0.175781        )
        right-bottom:   (        1.812500, -0.175781       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:     18.00000     28.15333     57.00000     67.48898%
        cycle (1; 2)            [red --> orange]:     71.00000     99.78873    125.00000      0.05783%
        escape              [blue --> turquoise]:      3.00000      3.71073     22.00000     32.44089%
        fixed point            [purple --> pink]:     21.00000     28.02797     38.00000      0.01226%
        other cycle           [yellow --> white]:    247.00000    247.00000    247.00000      0.00004%


 * T: [`images/t_conv_2880_1620_1e-9_1e50_1_1875_0_17578125_1_8125_-0_17578125_5.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/t_conv_2880_1620_1e-9_1e50_1_1875_0_17578125_1_8125_-0_17578125_5.png)

        function:       T(z) = (3^(sin(z*pi/2)^12) + sin(z*pi/2)^12) / 2
        left-top:       (        1.187500, 0.175781        )
        right-bottom:   (        1.812500, -0.175781       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        converge to 0           [black --> grey]:     22.00000     32.25002     73.00000     24.66315%
        cycle (1; 2)            [red --> orange]:     67.00000    111.04050    361.00000      2.40372%
        escape              [blue --> turquoise]:      2.00000      5.02894     48.00000     72.84178%
        fixed point            [purple --> pink]:     24.00000     31.18116     53.00000      0.09122%
        other cycle           [yellow --> white]:    262.00000    269.00000    280.00000      0.00013%


<a name="stop-5"></a>

#### Stopping Times ($m = 5$)

Maximum iterations: $500$

<a name="region-24"></a>

##### Region: (-5.000000, 2.812500), (5.000000, -2.812500)

 * F: [`images/f_stop_2880_1620_1e-9_1e50_-5_0_2_8125_5_0_-2_8125_5.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/f_stop_2880_1620_1e-9_1e50_-5_0_2_8125_5_0_-2_8125_5.png)

        function:       F(z) = (3/4) * (2*z+1) / (cos(pi*z)^11+2) - 1/4
        left-top:       (       -5.000000, 2.812500        )
        right-bottom:   (        5.000000, -2.812500       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.01164     40.00000     99.76687%


 * f: [`images/c_stop_2880_1620_1e-9_1e50_-5_0_2_8125_5_0_-2_8125_5.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/c_stop_2880_1620_1e-9_1e50_-5_0_2_8125_5_0_-2_8125_5.png)

        function:       f(z) = (z/2) * cos(z*pi/2)^12 + ((3*z+1)/2) * sin(z*pi/2)^12
        left-top:       (       -5.000000, 2.812500        )
        right-bottom:   (        5.000000, -2.812500       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.06061     40.00000      9.08417%


 * T: [`images/t_stop_2880_1620_1e-9_1e50_-5_0_2_8125_5_0_-2_8125_5.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/t_stop_2880_1620_1e-9_1e50_-5_0_2_8125_5_0_-2_8125_5.png)

        function:       T(z) = (3^(sin(z*pi/2)^12) + sin(z*pi/2)^12) / 2
        left-top:       (       -5.000000, 2.812500        )
        right-bottom:   (        5.000000, -2.812500       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.04775     36.00000     14.96830%


<a name="region-25"></a>

##### Region: (0.250000, 0.703125), (2.750000, -0.703125)

 * F: [`images/f_stop_2880_1620_1e-9_1e50_0_25_0_703125_2_75_-0_703125_5.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/f_stop_2880_1620_1e-9_1e50_0_25_0_703125_2_75_-0_703125_5.png)

        function:       F(z) = (3/4) * (2*z+1) / (cos(pi*z)^11+2) - 1/4
        left-top:       (        0.250000, 0.703125        )
        right-bottom:   (        2.750000, -0.703125       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.06947     46.00000     97.41956%


 * f: [`images/c_stop_2880_1620_1e-9_1e50_0_25_0_703125_2_75_-0_703125_5.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/c_stop_2880_1620_1e-9_1e50_0_25_0_703125_2_75_-0_703125_5.png)

        function:       f(z) = (z/2) * cos(z*pi/2)^12 + ((3*z+1)/2) * sin(z*pi/2)^12
        left-top:       (        0.250000, 0.703125        )
        right-bottom:   (        2.750000, -0.703125       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.06736     44.00000     36.84583%


 * T: [`images/t_stop_2880_1620_1e-9_1e50_0_25_0_703125_2_75_-0_703125_5.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/t_stop_2880_1620_1e-9_1e50_0_25_0_703125_2_75_-0_703125_5.png)

        function:       T(z) = (3^(sin(z*pi/2)^12) + sin(z*pi/2)^12) / 2
        left-top:       (        0.250000, 0.703125        )
        right-bottom:   (        2.750000, -0.703125       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.07890     72.00000     57.18459%


<a name="region-26"></a>

##### Region: (1.187500, 0.175781), (1.812500, -0.175781)

 * F: [`images/f_stop_2880_1620_1e-9_1e50_1_1875_0_17578125_1_8125_-0_17578125_5.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/f_stop_2880_1620_1e-9_1e50_1_1875_0_17578125_1_8125_-0_17578125_5.png)

        function:       F(z) = (3/4) * (2*z+1) / (cos(pi*z)^11+2) - 1/4
        left-top:       (        1.187500, 0.175781        )
        right-bottom:   (        1.812500, -0.175781       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.01271      7.00000     99.99991%


 * f: [`images/c_stop_2880_1620_1e-9_1e50_1_1875_0_17578125_1_8125_-0_17578125_5.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/c_stop_2880_1620_1e-9_1e50_1_1875_0_17578125_1_8125_-0_17578125_5.png)

        function:       f(z) = (z/2) * cos(z*pi/2)^12 + ((3*z+1)/2) * sin(z*pi/2)^12
        left-top:       (        1.187500, 0.175781        )
        right-bottom:   (        1.812500, -0.175781       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.00465      5.00000     93.33140%


 * T: [`images/t_stop_2880_1620_1e-9_1e50_1_1875_0_17578125_1_8125_-0_17578125_5.png`](https://github.com/attilammagyar/toys/raw/gh-pages/collatz/images/t_stop_2880_1620_1e-9_1e50_1_1875_0_17578125_1_8125_-0_17578125_5.png)

        function:       T(z) = (3^(sin(z*pi/2)^12) + sin(z*pi/2)^12) / 2
        left-top:       (        1.187500, 0.175781        )
        right-bottom:   (        1.812500, -0.175781       )
        conv_threshold: 1.000000e-09          esc_threshold: 1.000000e+50

                                                           min      average          max      percent
        stop time        [blue --> light yellow]:      1.00000      1.02989     12.00000     96.47992%
