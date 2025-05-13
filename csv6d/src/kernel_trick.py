import math
import random
import sys


def main(argv):
    print("Id,X,Y,Class")

    n = 101
    p_id = 1

    for x in range(n):
        px = (x / 50.0) - 1.0

        for y in range(n):
            py = (y / 50.0) - 1.0

            cls = 1 if math.sqrt(px ** 2.0 + py ** 2.0) < 0.7 else 0

            p_id = print_point(p_id, px + noise(), py + noise(), cls);


def print_point(p_id, px, py, cls):
    print(f"{p_id},{px:.3f},{py:.3f},{cls:.3f}")

    return p_id + 1


def noise():
    return (random.random() * 2.0 - 1.0) * 0.1


if __name__ == "__main__":
    sys.exit(main(sys.argv))
