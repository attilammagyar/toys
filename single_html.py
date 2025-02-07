
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


SCRIPT_PROBLEM_STRINGS = ["<!--", "-->", "<script", "</script"]
STYLE_PROBLEM_STRINGS = ["</style>"]


def main(argv):
    if len(argv) != 4:
        print(f"Usage: {os.path.basename(argv[0])} in.html out.html number_of_all_input_files", file=sys.stderr)
        return 1

    out_lines = []
    conversions = []
    expected_conversions = int(argv[3]) - 1
    base_dir = os.path.dirname(argv[1]) or "."
    script_re = re.compile(r'<script *type="text/javascript" *src="([^"]+)"> *</script>')
    style_re = re.compile(r'<link *rel="stylesheet" *href="([^"]+)" */>')

    try:
        with open(argv[1], "r") as in_file:
            for line in in_file:
                line = line.strip("\r\n")
                script = script_re.search(line)
                style = style_re.search(line)

                if script:
                    script_name = base_dir + "/" + script[1]
                    script = read_file(script_name, SCRIPT_PROBLEM_STRINGS)
                    out_lines.extend(
                        [
                            '<script type="text/javascript">',
                            '<!--',
                            script,
                            '//-->',
                            '</script>',
                        ]
                    )
                    conversions.append(script_name)
                elif style:
                    style_name = base_dir + "/" + style[1]
                    style = read_file(style_name, STYLE_PROBLEM_STRINGS)
                    out_lines.extend(
                        [
                            '<style>',
                            style,
                            '</style>',
                        ]
                    )
                    conversions.append(style_name)
                else:
                    out_lines.append(line)

        if len(conversions) != expected_conversions:
            raise Exception(
                f"Did {len(conversions)} conversions, but {expected_conversions} were expected:\n  "
                + "\n  ".join(conversions)
            )

        with open(argv[2], "w") as out_file:
            print("\n".join(out_lines), file=out_file)

    except Exception as e:
        print(f"ERROR ({type(e).__name__}): {str(e)}")
        return 2


def read_file(file_name: str, problem_strings: list):
    with open(file_name, "r") as f:
        contents = f.read()

    validate_file_contents(file_name, contents, problem_strings)

    return contents


def validate_file_contents(
    file_name: str,
    contents: str,
    problem_strings: list
):

    lc = contents.lower()

    for infix in problem_strings:
        if infix in lc:
            raise ValueError(
                f"{repr(file_name)} contains an invalid character sequence: {repr(infix)}"
            )


if __name__ == "__main__":
    sys.exit(main(sys.argv))
