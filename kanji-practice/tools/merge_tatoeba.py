
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
