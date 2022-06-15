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
        )

        with open(preset_file, "r") as f:
            preset = json.load(f)

        presets[preset_id] = preset
        preset_names[preset_id] = preset_name

        if " - " in preset_name:
            c += 1
            switched_preset_id = f"p{c}"

            p1, p2 = preset_name.split(" - ", 1)
            switched_preset_name = f"{p2} - {p1}"

            switched_preset = {}

            for key, (val, ctl) in preset.items():
                if key.startswith("cmp_"):
                    key = "midi_" + key[4:]
                elif key.startswith("midi_"):
                    key = "cmp_" + key[5:]

                ctl = ctls.get(ctl, ctl)
                switched_preset[key] = [val, ctl]

            presets[switched_preset_id] = switched_preset
            preset_names[switched_preset_id] = switched_preset_name

    print("preset_names = " + json.dumps(preset_names, indent=4, sort_keys=True) + ";")
    print(
        "presets = " + json.dumps(presets, indent=4, sort_keys=True)
            .replace("[\n            ", "[")
            .replace(",\n            ", ", ")
            .replace("\n        ]", "]") + ";"
    )


if __name__ == "__main__":
    sys.exit(main(list(sys.argv)))
