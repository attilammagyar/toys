
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
    if len(argv) < 2:
        print(f"Usage: {os.path.basename(argv[0])} patch_1_-_patch_2.json patch_3_-_patch_4.json ...", file=sys.stderr)
        return 1

    presets = {}
    ctls = {
        "volume": "vrt1",
        "vrt1": "volume",
        "pitch": "vrt2",
        "vrt2": "pitch",
        "mod": "vrt3",
        "vrt3": "mod",
        "note": "vrtnote",
        "vrtnote": "note",
        "vel": "vrtvel",
        "vrtvel": "vel",
    }
    c = 0
    preset_names = {}
    argv.pop(0)

    for preset_file in sorted(argv):
        c += 1
        preset_id = f"p{c}"
        preset_name = (
            os.path.basename(preset_file)
                .replace(".json", "")
                .replace("_", " ")
                .title()
                .replace("Add Am Fm ", "Add + AM + FM ")
        )

        with open(preset_file, "r") as f:
            preset = json.load(f)

        presets[preset_id] = preset
        preset_names[preset_id] = preset_name

        version = None

        if "version" in preset:
            version = preset["version"]

        if " - " in preset_name:
            c += 1
            swapped_preset_id = f"p{c}"

            p1, p2 = preset_name.split(" - ", 1)
            swapped_preset_name = f"{p2} - {p1}"

            swapped_preset = {}

            if version is not None:
                swapped_preset["version"] = version

            for key, exported in preset.items():
                if key == "version":
                    swapped_preset["version"] = exported
                    continue

                if key.startswith("cmp_"):
                    key = "midi_" + key[4:]
                elif key.startswith("midi_"):
                    key = "cmp_" + key[5:]

                val, ctl = exported
                ctl = ctls.get(ctl, ctl)
                swapped_preset[key] = [val, ctl]

            presets[swapped_preset_id] = swapped_preset
            preset_names[swapped_preset_id] = swapped_preset_name

    print("preset_names = " + json.dumps(preset_names, indent=4, sort_keys=True) + ";")
    print(
        "presets = " + json.dumps(presets, indent=4, sort_keys=True)
            .replace("[\n            ", "[")
            .replace(",\n            ", ", ")
            .replace("\n        ]", "]") + ";"
    )


if __name__ == "__main__":
    sys.exit(main(list(sys.argv)))
