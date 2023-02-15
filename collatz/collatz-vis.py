from __future__ import division, print_function

import json
import os.path
import sys
import time

from cmath import pi as cpi, cos as ccos, sin as csin, isnan
from math import pi as rpi, cos as rcos, sin as rsin, log

from PIL import Image, ImageDraw, ImageFont


ITERS = 500
CYCLE_MAX = 200

BLACK = (0, 0, 0)
BLUE = (0, 0, 72)
BROWN = (128, 64, 0)
GREEN = (0, 255, 0)
GREY = (128, 128, 128)
PINK = (255, 128, 255)
PURPLE = (128, 0, 128)
RED = (128, 0, 0)
TURQUOISE = (0, 255, 255)
WHITE = (255, 255, 255)
YELLOW = (255, 255, 0)
LIGHT_YELLOW = (255, 255, 128)
ORANGE = (255, 176, 50)

CONV_0 = 0
CYCLE_1 = 1
CYCLE_OTHER = 2
CONV_FIXED_POINT = 3
ESCAPE = 4
STOP = 99999

RESULTS = {
    None: "other",
    CONV_0: "converge to 0",
    CYCLE_1: "cycle (1; 2)",
    CYCLE_OTHER: "other cycle",
    CONV_FIXED_POINT: "fixed point",
    ESCAPE: "escape",
}

COLOR_NAMES = {
    None: "green",
    CONV_0: "black --> grey",
    CYCLE_1: "red --> orange",
    CYCLE_OTHER: "yellow --> white",
    CONV_FIXED_POINT: "purple --> pink",
    ESCAPE: "blue --> turquoise",
}

COLORS = {
    CONV_0: (BLACK, GREY),
    CYCLE_1: (RED, ORANGE),
    CYCLE_OTHER: (YELLOW, WHITE),
    CONV_FIXED_POINT: (PURPLE, PINK),
    ESCAPE: (BLUE, TURQUOISE),
    STOP: (BLUE, LIGHT_YELLOW)
}

INFINITY = complex("inf+infj")


def func_C(z):
    c = INFINITY
    s = INFINITY
    piz = cpi * z / 2

    try:
        c = ccos(piz) ** 2

    except (OverflowError, ValueError):
        pass

    try:
        s = csin(piz) ** 2

    except (OverflowError, ValueError):
        pass

    return (z * c) / 2 + ((3 * z + 1) / 2) * s


def func_T(z):
    s = INFINITY
    p = INFINITY

    try:
        s = csin(cpi * z / 2) ** 2
        p = 3 ** s

    except (OverflowError, ValueError, ZeroDivisionError):
        pass

    return (p * z + s) / 2


def func_F(z):
    c = INFINITY
    piz = cpi * z

    try:
        c = ccos(piz)

    except OverflowError:
        pass

    return 0.75 * ((2 * z + 1) / (c + 2)) - 0.25


FUNCTIONS = {
    "C": (func_C, "f(z) = (z/2) * cos(z*pi/2)^2 + ((3*z+1)/2) * sin(z*pi/2)^2"),
    "T": (func_T, "T(z) = (3^(sin(z*pi/2)^2) + sin(z*pi/2)^2) / 2"),
    "F": (func_F, "F(z) = (3/4) * (2*z+1) / (cos(pi*z)+2) - 1/4"),
}


def main(argv):
    try:
        conv_file = str(argv[1])
        stop_file = str(argv[2])
        func = str(argv[3])
        width, height = int(argv[4]), int(argv[5])
        conv_threshold, esc_threshold = float(argv[6]), float(argv[7])
        left, top = float(argv[8]), float(argv[9])
        right, bottom = float(argv[10]), float(argv[11])
        f, f_str = FUNCTIONS[func]

        if width < 1 or height < 1:
            raise ValueError("width and height must be greater than 0")

    except:
        print(
            "Usage: {} conv.png stop.png C|T|F width height conv_threshold esc_threshold left top right bottom\n".format(
                os.path.basename(argv[0])
            ),
            file=sys.stderr
        )
        raise

    out_bn = os.path.basename(conv_file)
    stop_bn = os.path.basename(stop_file)

    dw = right - left
    dh = top - bottom
    all_pixels = width * height
    next_progress = 0
    min_steps = {
        None: ITERS + 1,
        CONV_0: ITERS + 1,
        CYCLE_1: ITERS + 1,
        CYCLE_OTHER: ITERS + 1,
        CONV_FIXED_POINT: ITERS + 1,
        ESCAPE: ITERS + 1,
    }
    max_steps = {
        None: 1,
        CONV_0: 1,
        CYCLE_1: 1,
        CYCLE_OTHER: 1,
        CONV_FIXED_POINT: 1,
        ESCAPE: 1,
    }
    avg_steps = {
        None: [],
        CONV_0: [],
        CYCLE_1: [],
        CYCLE_OTHER: [],
        CONV_FIXED_POINT: [],
        ESCAPE: [],
    }
    max_stop = 0
    min_stop = ITERS + 1
    avg_stop = []

    lines = []

    n = 0

    for iy in range(height):
        line = []

        for ix in range(width):
            n += 1

            if n % 1000 == 0:
                time.sleep(0.01)

            progress = (iy * width + ix) / all_pixels

            if progress > next_progress:
                next_progress = progress + 0.001
                print("{}: {:.1f}%".format(out_bn, progress * 100.0), file=sys.stderr)

            x = left + dw * ix / width
            y = top - dh * iy / height

            z0 = x + y * 1j
            z_str = "({x}+i*{y})".format(x=x, y=y)

            result, steps, stop, cycle, seq = repeat(f, z0, ITERS, conv_threshold, esc_threshold)
            line.append((result, steps, stop))

            if stop is not None:
                if stop > max_stop:
                    max_stop = stop

                if stop < min_stop:
                    min_stop = stop

                avg_stop.append(stop)

            if steps > max_steps[result]:
                max_steps[result] = steps

            if steps < min_steps[result]:
                min_steps[result] = steps

            avg_steps[result].append(steps)

            if result is None:
                print(
                    "Unrecognized result or long cycle for {z_str} (pixel [{ix}, {iy}]) after {steps} step(s) (stop: {stop})".format(
                        z_str=z_str,
                        ix=ix,
                        iy=iy,
                        steps=steps,
                        stop=stop
                    )
                )
                print("    " + "\n    ".join(str(l) for l in seq))
            else:
                last = None

                if len(cycle):
                    last = cycle[-1]

                print(
                    "Result for {z_str} (pixel [{ix}, {iy}]) after {steps} step(s): {res} (last: {last}, stop: {stop})".format(
                        z_str=z_str,
                        ix=ix,
                        iy=iy,
                        steps=steps,
                        res=RESULTS[result],
                        last=last,
                        stop=stop
                    )
                )

                if (result == CYCLE_OTHER or result == ESCAPE) and len(cycle) < CYCLE_MAX:
                    print("    " + "\n    ".join(str(c) for c in cycle))

            result, steps, stop, cycle, seq = None, None, None, None, None

        lines.append(line)

    info = [
        "function:       " + f_str,
        "left-top:       ({:>16.6f}, {:<16.6f})".format(left, top),
        "right-bottom:   ({:>16.6f}, {:<16.6f})".format(right, bottom),
        "conv_threshold: {:<16.6e}      esc_threshold: {:<16.6e}".format(
            conv_threshold, esc_threshold
        ),
        "",
        "{:15} {:25} {:>12} {:>12} {:>12} {:>12}".format("", "", "min", "average", "max", "percent")
    ]

    stats = []

    for result, name in sorted(RESULTS.items(), key=lambda i: i[1]):
        avg = avg_steps[result]
        avg_len = len(avg)

        if avg_len:
            perc = (avg_len / all_pixels) * 100.0
            avg = sum(avg) / len(avg)
            stats.append(
                "{:<15} {:>25} {:>12.5f} {:>12.5f} {:>12.5f} {:>12.5f}%".format(
                    name, "[" + COLOR_NAMES[result] + "]:", min_steps[result], avg, max_steps[result], perc
                )
            )


    stop_stats = ""
    avg_len = len(avg_stop)

    if avg_len:
        perc = (avg_len / all_pixels) * 100.0
        avg = sum(avg_stop) / avg_len
        stop_stats = "{:<15} {:>25} {:>12.5f} {:>12.5f} {:>12.5f} {:>12.5f}%".format(
            "stop time", "[blue --> light yellow]:", min_stop, avg, max_stop, perc
        )

    print("\nStatistics")
    print("\n".join(info + stats + [stop_stats]))

    del avg_steps
    del avg_stop

    print("Generating {}...".format(out_bn), file=sys.stderr)

    font_size = int(height / 36 + 1)
    line_height = int(font_size * 1.2 + 1)
    padding = 5
    info_height = 12 * line_height + padding * 2
    info_box = [(0, height), (width, height + info_height)]

    font = ImageFont.truetype("Pillow/Tests/fonts/FreeMono.ttf", font_size)

    img = Image.new("RGB", (width, height + info_height), GREEN)
    canvas = ImageDraw.Draw(img)

    for iy, line in enumerate(lines):
        for ix, (result, steps, stop) in enumerate(line):
            if result is not None:
                canvas.point(
                    (ix, iy),
                    compute_color(
                        COLORS[result],
                        steps,
                        min_steps[result],
                        max_steps[result]
                    ),
                )

    print_lines(canvas, font, info_box, padding, line_height, info + stats)
    img.save(conv_file)

    del img
    del canvas

    print("Generating {}...".format(stop_bn), file=sys.stderr)

    img = Image.new("RGB", (width, height + info_height), BLACK)
    canvas = ImageDraw.Draw(img)

    for iy, line in enumerate(lines):
        for ix, (result, steps, stop) in enumerate(line):
            if stop is not None:
                canvas.point(
                    (ix, iy),
                    compute_color(
                        COLORS[STOP],
                        stop,
                        min_stop,
                        max_stop
                    ),
                )

    stop_info = [info[0], info[1], info[2], "",  info[-1], stop_stats]
    print_lines(canvas, font, info_box, padding, line_height, stop_info)
    img.save(stop_file)

    return 0


def repeat(f, z, iters, conv_threshold, esc_threshold):
    result = None
    stop = None
    seen = {z}
    seq = [z]
    cycle = []
    cycle_threshold = conv_threshold * 10
    z0 = abs(z)

    for steps in range(ITERS):
        z = f(z)
        seq.append(z)
        az = abs(z)

        if stop is None and abs(z) < z0:
            stop = steps + 1

        if z in seen or min(abs(z - s) for s in seen) < conv_threshold:
            cycle = build_cycle(f, z, cycle_threshold)
            result = analyze_cycle(cycle, cycle_threshold)
            break

        else:
            az = abs(z)

            if az > esc_threshold or isnan(az):
                result = ESCAPE
                cycle.append(z)
                break

        seen.add(z)

    return result, steps + 1, stop, cycle, seq


def build_cycle(f, z, threshold):
    cycle = [z]
    z = f(z)

    while (min(abs(z - c) for c in cycle) >= threshold) and (len(cycle) < CYCLE_MAX):
        cycle.append(z)
        z = f(z)

    return cycle


def analyze_cycle(cycle, threshold):
    if len(cycle) == 1:
        if abs(cycle[0]) < threshold:
            return CONV_0

        else:
            return CONV_FIXED_POINT

    elif len(cycle) == 2:
        if (
            (abs(cycle[0] - 1) < threshold and abs(cycle[1] - 2) < threshold)
            or (abs(cycle[0] - 2) < threshold and abs(cycle[1] - 1) < threshold)
        ):
            return CYCLE_1
        else:
            return CYCLE_OTHER

    elif len(cycle) < CYCLE_MAX:
        return CYCLE_OTHER

    return None


def compute_color(colors, steps, min_steps, max_steps):
    # l = steps / ITERS
    l = (steps - min_steps) / (max_steps - min_steps + 0.00001)

    return tuple(
        int(i) for i in vsum(
            vscale(1 - l, colors[0]),
            vscale(l, colors[1]),
        )
    )


def vsum(a, b):
    return tuple(ai + bi for ai, bi in zip(a, b))


def vscale(s, v):
    return tuple(s * vi for vi in v)


def print_lines(canvas, font, box, padding, line_height, lines):
    canvas.rectangle(box, outline=WHITE, fill=WHITE)

    y = box[0][1] + padding

    for line in lines:
        canvas.text((padding, y), line, font=font, fill=BLACK)
        y += line_height


if __name__ == "__main__":
    sys.exit(main(sys.argv))
