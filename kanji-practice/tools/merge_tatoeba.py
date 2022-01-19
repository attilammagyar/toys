import re
import sys
import os.path

from random import randint


# Merge examples from tatoeba.org exports into a single text file. Output:
# Japanese sentence
# English sentence
# Japanese sentence id TAB English sentence id TAB Tanaka corpus B-line
# (Empty line)


if len(sys.argv) != 3:
    print(f"Usage: {os.path.basename(sys.argv[0])} sentences.csv jpn_indices.csv", file=sys.stderr)
    sys.exit(1)


sentences = {}
indices = {}


with open(sys.argv[1], "r") as f:
    for line in f:
        line = line.strip()

        if line:
            idx, lng, text = line.split("\t", 2)

        if lng == "eng" or lng == "jpn":
            sentences[idx] = text


with open(sys.argv[2], "r") as f:
    for line in f:
        line = line.strip()

        if not line:
            continue

        try:
            sidx, midx, text = line.split("\t", 2)

        except:
            print(f"Ignoring broken line: {line}", file=sys.stderr)
            continue

        if sidx not in sentences or midx not in sentences:
            print(f"Ignoring line due to missing sentences: {line}", file=sys.stderr)
            continue

        print(sentences[sidx])
        print(sentences[midx])
        print(line)
        print("")
