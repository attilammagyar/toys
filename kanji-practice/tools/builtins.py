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
