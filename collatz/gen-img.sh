#!/bin/bash

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
