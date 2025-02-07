
# Copyright (c) 2025, Attila M. Magyar
# All rights reserved.
#
# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions are met:
#
# 1. Redistributions of source code must retain the above copyright notice,
#    this list of conditions and the following disclaimer.
#
# 2. Redistributions in binary form must reproduce the above copyright notice,
#    this list of conditions and the following disclaimer in the documentation
#    and/or other materials provided with the distribution.
#
# 3. Neither the name of the copyright holder nor the names of its contributors
#    may be used to endorse or promote products derived from this software
#    without specific prior written permission.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
# AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
# IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
# ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
# LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
# CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
# SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
# INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
# CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
# ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
# POSSIBILITY OF SUCH DAMAGE.

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

