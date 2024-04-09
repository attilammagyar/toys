import os.path
import sys

from math import pi, sin, cos

import matplotlib.pyplot as plt


def F(x, p):
    pix = pi * x

    try:
        c = cos(pix)

    except OverflowError:
        return -1.0

    return 0.75 * ((2 * x + 1) / (c ** p + 2)) - 0.25


def C(x, p):
    return (x/2) * cos(pi*x/2)**p + ((3*x+1)/2) * sin(pi*x/2)**p


def T(x, p):
    m = sin(pi*x/2)**p

    return ((3**m)*x + m) / 2


def main(argv):
    FUNCS = {
        "F": F,
        "C": C,
        "T": T,
    }

    try:
        if len(argv) < 3:
            raise ValueError(f"Usage: python {argv[0]} F|C|T iterations [power]")

        func = FUNCS[argv[1]]
        iters = int(argv[2])

        if iters < 1:
            raise ValueError(f"Number of iterations must be positive, got {iters}")
    except Exception as error:
        print(error)

        raise

    WIDTH = 30
    OFFSET = -10
    N = 150000
    xs = []
    fs = tuple([] for j in range(iters))

    p = (2 * int(argv[3]) + 1) if len(argv) > 3 else 1

    if argv[1] != "F":
        p += 1

    print(f"power={p}")

    for i in range(N):
        x = WIDTH * (i / N) + OFFSET
        xs.append(x)

        for j in range(iters):
            x = func(x, p)
            fs[j].append(x)

    plt.plot(xs, xs)

    for j in range(iters):
        plt.plot(xs, fs[iters - j - 1])

    plt.show()

    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))

