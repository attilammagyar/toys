#!/bin/bash

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

conv="1e-9"
esc="1e50"

img_dir="images"
log_dir="log"

mkdir -p "$img_dir"
mkdir -p "$log_dir"

gen_img()
{
    local w="$1"
    local h="$2"
    local left="$3"
    local top="$4"
    local right="$5"
    local bottom="$6"
    local m="$7"

    local l=""
    local p=$(
        printf "%s" "$w $h $conv $esc $left $top $right $bottom $m" \
            | sed "s/[ .]/_/g"
    )

    for f in F C T
    do
        l=$(echo "$f" | tr [[:upper:]] [[:lower:]])

        python3 collatz-vis.py \
            "$img_dir/${l}_conv_$p.png" \
            "$img_dir/${l}_stop_$p.png" \
            "$f" \
            "$w" "$h" \
            "$conv" "$esc" \
            "$left" "$top" "$right" "$bottom" \
            "$m" \
            | gzip -9 -c - > "$log_dir/${l}_log_$p.txt.gz"
    done
}

gen_img 2880 1620     95.0         2.8125        105.0         -2.8125      0
gen_img 2880 1620   1095.0         2.8125       1105.0         -2.8125      0
gen_img 2880 1620   9095.0         2.8125       9105.0         -2.8125      0
gen_img 5760 3240    -20.0        11.25           20.0        -11.25        0
gen_img 5760 3240    -10.0         5.625          10.0         -5.625       0
gen_img 5760 3240     -5.0         2.8125          5.0         -2.8125      0
gen_img 5760 3240     -2.5         1.40625         2.5         -1.40625     0
gen_img 5760 3240      0.25        0.703125        2.75        -0.703125    0
gen_img 5760 3240      0.875       0.3515625       2.125       -0.3515625   0
gen_img 5760 3240      1.1875      0.17578125      1.8125      -0.17578125  0

gen_img 2880 1620     -5.0         2.8125          5.0         -2.8125      5
gen_img 2880 1620      0.25        0.703125        2.75        -0.703125    5
gen_img 2880 1620      1.1875      0.17578125      1.8125      -0.17578125  5
