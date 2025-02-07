
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

import json
import os.path
import sys


def main(argv):
    decks = ("hiragana", "katakana", "basic-kanji", "lower-intermediate-kanji")
    builtins = {}

    for deck in decks:
        with open(os.path.join("lists", f"{deck}.json"), "r") as f:
            builtins[deck.replace("-", "_")] = json.load(f)

    builtins = (
        json.dumps(builtins, indent=1)
        .replace("[\n    ", "[")
        .replace(",\n    ", ", ")
        .replace("\n   ]", "]")
    )

    print("""\
/*

The following data uses the EDICT [1] and KANJIDIC [2] dictionary
files. These files are the property of the Electronic Dictionary Research and
Development Group [3] and are used in conformance with the Group's
license [4].

The following data contains example sentences from the Tatoeba project [5] and
the Tanaka Corpus [6] which are licensed under Creative Commons CC-BY [7].

  [1]: http://www.csse.monash.edu.au/~jwb/edict.html
  [2]: https://www.edrdg.org/wiki/index.php/KANJIDIC_Project
  [3]: http://www.edrdg.org/
  [4]: http://www.edrdg.org/edrdg/licence.html
  [5]: http://tatoeba.org/
  [6]: https://www.edrdg.org/wiki/index.php/Tanaka_Corpus
  [7]: http://creativecommons.org/licenses/by/2.0/

*/
window.builtin_decks = """ + builtins)

    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
