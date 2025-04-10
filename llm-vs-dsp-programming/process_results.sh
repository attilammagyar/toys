#!/bin/bash

set -x
set -e

rm -f sound-*.flac sound-*.png sound.png

for i in *.wav
do
    tmp="$(mktemp --suffix=.wav)"
    png="$(echo "$i" | sed 's/\.wav/.png/')"
    sox "$i" -D -c 1 "$tmp" && sox "$tmp" -D -n spectrogram -x 1500 -y 300 -o "$png"
    rm "$tmp"
done

for i in sound-*.wav
do
    flac -8 --verify --delete-input-file "$i"
done
