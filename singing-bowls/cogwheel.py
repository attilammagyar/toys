
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

import math
import os.path
import sys


def main(argv):
    cogs = 9
    angle = 15
    r_in = 0.4
    r_out = 0.5
    r_hole = 0.21
    angle_cog_ratio = 0.9
    angle_in_out_ratio = 0.86
    title = "Settings"

    origin = (0.5, 0.5)
    angle_delta = 360.0 / float(cogs * 2)
    origin_svg = to_svg(origin, " ")
    r_in_svg = to_svg((r_in, r_in), " ", pad=False)
    r_out_svg = to_svg((r_out, r_out), " ", pad=False)
    point_out = rotate(vdiff(origin, (0.0, r_out)), origin, angle)
    point_in =  rotate(vdiff(origin, (0.0, r_in)), origin, angle)

    path = []
    path.append("M " + to_svg(point_out, ","))

    for i in range(cogs):
        angle = angle_delta * angle_cog_ratio * angle_in_out_ratio
        point_out = rotate(point_out, origin, angle)
        point_in = rotate(point_in, origin, angle)
        path.append("A " + r_out_svg + " 0 0 1 " + to_svg(point_out, " "))

        angle = angle_delta * (1.0 - angle_cog_ratio)
        point_out = rotate(point_out, origin, angle)
        point_in = rotate(point_in, origin, angle)
        path.append("L " + to_svg(point_in, ","))

        angle = angle_delta * angle_cog_ratio * (2.0 - angle_in_out_ratio)
        point_out = rotate(point_out, origin, angle)
        point_in = rotate(point_in, origin, angle)
        path.append("A " + r_in_svg + " 0 0 1 " + to_svg(point_in, " "))

        angle = angle_delta * (1.0 - angle_cog_ratio)
        point_out = rotate(point_out, origin, angle)
        point_in = rotate(point_in, origin, angle)
        path.append("L " + to_svg(point_out, ","))

    path = " ".join(path)

    print(f"""
  <svg
    viewBox="0 0 200 200"
    stroke="#ffffff"
    stroke-width="15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
   <g>
    <title>{title}</title>
    <path d="{path}" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="100" cy="100" r="{to_svg(r_hole, pad=False)}" />
   </g>
  </svg>
""")

    return 0


def to_svg(p, sep="", pad=True):
    if isinstance(p, tuple):
        x, y = p

        return to_svg(x, pad=pad) + sep + to_svg(y, pad=pad)

    return str(int(p * 180) + (10 if pad else 0))


def rotate(point, origin, degrees):
    rad = (degrees * math.pi) / 180.0
    sin = math.sin(rad)
    cos = math.cos(rad)
    x, y = vdiff(point, origin)

    return vsum(origin, (x * cos - y * sin, x * sin + y * cos))


def vsum(a, b):
    return tuple(ai + bi for ai, bi in zip(a, b))


def vdiff(a, b):
    return tuple(ai - bi for ai, bi in zip(a, b))


if __name__ == "__main__":
    sys.exit(main(sys.argv))
