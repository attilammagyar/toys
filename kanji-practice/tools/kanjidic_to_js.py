import re
import sys
import json
import os.path
import fileinput

from lxml import etree


def main(argv):
    if len(argv) < 2:
        print(f"Usage: {argv[0]} kanjidic2.xml", file=sys.stderr)

        return 1

    kanjidic = argv[1]
    char_data = {}

    with open(kanjidic, "r") as xml:
        dom = etree.parse(xml)
        root = dom.getroot()
        chars_xpath = etree.XPath("/kanjidic2/character")
        literal_xpath = etree.XPath("literal/text()")
        grade_xpath = etree.XPath("misc/grade/text()")
        jlpt_xpath = etree.XPath("misc/jlpt/text()")
        rad_names_xpath = etree.XPath("misc/rad_name/text()")
        jlpt_xpath = etree.XPath("misc/jlpt/text()")
        rmgroups_xpath = etree.XPath("reading_meaning/rmgroup")
        on_readings_xpath = etree.XPath("reading[@r_type = 'ja_on']/text()")
        kun_readings_xpath = etree.XPath("reading[@r_type = 'ja_kun']/text()")
        meanings_xpath = etree.XPath("meaning[@m_lang = 'en' or count(@m_lang) = 0]/text()")
        nanoris_xpath = etree.XPath("reading_meaning/nanori/text()")

        for char in chars_xpath(root):
            literal = str(literal_xpath(char)[0])

            grade = grade_xpath(char)
            grade = int(grade[0]) if len(grade) == 1 else 0

            rad_names = [str(r) for r in rad_names_xpath(char)]
            jlpt = jlpt_xpath(char)
            jlpt = str(jlpt[0]) if len(jlpt) == 1 else ""
            nanoris = [str(r) for r in nanoris_xpath(char)]

            on_readings = []
            kun_readings = []
            meanings = []

            for rmgroup in rmgroups_xpath(char):
                on_readings.extend([str(r) for r in on_readings_xpath(rmgroup)])
                kun_readings.extend([str(r) for r in kun_readings_xpath(rmgroup)])
                meanings.extend([str(r) for r in meanings_xpath(rmgroup)])

            if grade or rad_names or nanoris or on_readings or kun_readings or meanings:
                char_data["k" + hex(ord(literal)).replace("0x", "")] = [
                    grade, rad_names, nanoris, on_readings, kun_readings, meanings, jlpt
                ]

    print("""\
/*

The following data is generated from the KANJIDIC [1] dictionary files.
This data is the property of the Electronic Dictionary Research and
Development Group [2] and are used in conformance with the Group's
license [3].

  [1]: https://www.edrdg.org/wiki/index.php/KANJIDIC_Project
  [2]: http://www.edrdg.org/
  [3]: http://www.edrdg.org/edrdg/licence.html

Creative Commons Attribution-ShareAlike Licence 3.0:
https://creativecommons.org/licenses/by-sa/3.0/

*/
window.kanjidic = {
""")

    print(
        ",\n".join(
            "".join(
                [
                    " ",
                    json.dumps(k, ensure_ascii=False),
                    ": ",
                    json.dumps(char_data[k], ensure_ascii=False),
                ]
            )
            for k in sorted(char_data.keys())
        )
    )

    print("};")

    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))

