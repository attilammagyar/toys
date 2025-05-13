import math
import random
import sys


def main(argv):
    print("Id,X,Y,Z,Size,Saturation,Hue")

    n = 21
    p_id = 1

    for x in range(n):
        px = (x / 10.0) - 1.0

        for y in range(n):
            py = (y / 10.0) - 1.0

            for z in range(n):
                pz = (z / 10.0) - 1.0

                if x % 10 == 0 and y % 10 == 0 and z % 10 == 0:
                    size = 5
                elif x % 5 == 0 and y % 5 == 0 and z % 5 == 0:
                    size = 3
                else:
                    size = 1

                sat = (2.0 * pz + px) / 3.0
                hue = (2.0 * px + py) / 3.0

                pxn = math.tanh(2.0 * px) + noise()
                pyn = math.tanh(2.0 * py) + noise()
                pzn = math.tanh(2.0 * pz) + noise()

                p_id = print_point(p_id, pxn, pyn, pzn, size, sat, hue)

    for x in range(3):
        px = (x - 1.0) * 1.5

        for y in range(3):
            py = (y - 1.0) * 1.5

            for z in range(3):
                pz = (z - 1.0) * 1.5
                size = 5
                hue = 0.5
                sat = 1.0
                p_id = print_point(p_id, px, py, pz, size, sat, hue)


def print_point(p_id, px, py, pz, size, sat, hue):
    print(f"{p_id},{px:.3f},{py:.3f},{pz:.3f},{size:.3f},{sat:.3f},{hue:.3f}")

    return p_id + 1


def noise():
    return (random.random() * 2.0 - 1.0) * 0.03


if __name__ == "__main__":
    sys.exit(main(sys.argv))
