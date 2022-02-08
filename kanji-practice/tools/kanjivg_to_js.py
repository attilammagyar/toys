import re
import sys
import json
import os.path
import fileinput

from lxml import etree


PATHS_XPATH = etree.XPath("//*[name()='path']")
GROUPS_XPATH = etree.XPath("//*[name()='g']")
ELEMENT = "{http://kanjivg.tagaini.net}element"
STROKE_NUM_RE = re.compile(r"^.*s([0-9]+)$")


def main(argv):
    """
    Usage:

        $ find /path/to/kanjivg/kanji -name '?????.svg' \
            | python3 kanjivg_to_js.py >kanjivg.js
    """
    char_data = {}

    for line in fileinput.input():
        line = line.strip()
        print(f"Processing {line}...", file=sys.stderr)
        code, elements, paths = process_kanji(line)
        char_data[f"k{code}"] = [elements, paths]

    j = json.dumps(char_data, indent=1, ensure_ascii=False)
    print("""\
/*

The following stroke data is from Ulrich Apel's KanjiVG project [1].
(See also: https://github.com/KanjiVG/kanjivg/)

  [1]: https://kanjivg.tagaini.net/

Creative Commons Attribution-Share Aline 3.0:
https://creativecommons.org/licenses/by-sa/3.0/

*/
""")
    print(f"window.kanjivg = {j};")

    return 0


def process_kanji(file_name):
    code = os.path.basename(file_name).replace(".svg", "").lstrip("0")
    c = chr(int("0x" + code, 16))

    paths = []
    elements = [c]
    elements_set = set(c)
    prev_stroke = 0

    with open(file_name, "r") as xml:
        dom = etree.parse(xml)
        root = dom.getroot()

        for g in GROUPS_XPATH(root):
            if ELEMENT in g.attrib:
                e = str(g.attrib[ELEMENT])

                if e not in elements_set:
                    elements.append(e)
                    elements_set.add(e)

        for path in PATHS_XPATH(root):
            stroke_num = int(STROKE_NUM_RE.match(str(path.attrib["id"]))[1])

            if stroke_num != prev_stroke + 1:
                raise Exception(f"Out of order stroke: {path.attrib['id']}")

            prev_stroke = stroke_num
            paths.append(str(path.attrib["d"]))

    return [
        code,
        "".join(elements),
        paths
    ]


if __name__ == "__main__":
    sys.exit(main(sys.argv))
