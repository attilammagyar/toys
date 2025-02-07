
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

import re
import sys
import os.path

from random import randint


# Collect examples from tatoeba.org exports for a TSV containing
# (WORD, PRONUNCIATION, MEANING) triplets. Output:
# (WORD, PRONUNCIATION, MEANING, JAPANESE + ENGLISH EXAMPLE SENTENCE, TANAKA CORPUS B-LINE) tuples


if len(sys.argv) != 4:
    print(f"Usage: {os.path.basename(sys.argv[0])} sentences.csv jpn_indices.csv words.tsv", file=sys.stderr)
    sys.exit(1)


sentences = {}
indices = {}

find_word = re.compile(r"^([^\[\](){}~]+)")
find_pron = re.compile(r"^.*[(]([^){}\[\]]+)[)]")
appears_with_kanji = re.compile(r"{[^}]*[\u4e00-\u9faf]|[\u3400-\u4dbf][^}]*}")
kanji = re.compile(r"(([\u4e00-\u9faf]|[\u3400-\u4dbf])+)")

avoid = {"107777", "143709", "226819", "224317"}


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

        for raw_word in text.split(" "):
            verified = 1 if raw_word.endswith("~") else 0
            word = find_word.match(raw_word)
            pron = find_pron.match(raw_word)

            if not word:
                continue

            if "{" in raw_word and not appears_with_kanji.search(raw_word):
                continue

            word = word[1]
            key = word

            if pron:
                key = word + "|" + pron[1]

            if (
                (
                    (key not in indices)
                    or (
                        len(sentences[indices[key][0]]) > len(sentences[sidx])
                        and indices[key][2] <= verified
                    )
                    or verified > indices[key][2]
                )
                and (sidx not in avoid)
            ):
                indices[key] = (sidx, midx, verified, text)


with open(sys.argv[3], "r") as f:
    for line in f:
        line = line.strip()
        word, pron, text = line.split("\t", 2)

        if "\t" in text:
            print(line)
            continue

        note = None

        key = word + "|" + pron

        if key not in indices:
            key = word

        if key not in indices:
            print(f"{word}\t{pron}\t{text}")
            continue

        sidx, midx, _, b_line = indices[key]
        note = kanji.sub("{\\1|}", sentences[sidx]) + "\\n" + sentences[midx]

        print(f"{word}\t{pron}\t{text}\t{note}\t#{sidx} {b_line}")
