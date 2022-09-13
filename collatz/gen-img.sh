#!/bin/bash

w=5760
h=3240

conv="1e-9"
esc="1e50"

img_dir="images"
log_dir="log"

mkdir -p "$img_dir"
mkdir -p "$log_dir"

gen_img()
{
    local left="$1"
    local top="$2"
    local right="$3"
    local bottom="$4"

    local l=""
    local p=$(
        printf "%s" "$w $h $conv $esc $left $top $right $bottom" \
            | sed "s/[ .]/_/g"
    )

    for f in F C T
    do
        l=$(echo "$f" | tr [[:upper:]] [[:lower:]])

        python collatz-vis.py \
            "$img_dir/${l}_img_$p.png" \
            "$img_dir/${l}_stop_$p.png" \
            "$f" \
            "$w" "$h" \
            "$conv" "$esc" \
            "$left" "$top" "$right" "$bottom" \
            | gzip -9 -c - > "$log_dir/${l}_log_$p.txt.gz"
    done
}

gen_img     -20.0       11.25           20.0        -11.25
gen_img     -10.0        5.625          10.0         -5.625
gen_img     -5.0         2.8125          5.0         -2.8125
gen_img     -2.5         1.40625         2.5         -1.40625
gen_img      0.25        0.703125        2.75        -0.703125
gen_img      0.875       0.3515625       2.125       -0.3515625
gen_img      1.1875      0.17578125      1.8125      -0.17578125
