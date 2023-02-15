import re
import sys


RAW_URL = "https://github.com/attilammagyar/toys/raw/gh-pages/collatz"
DESCRIPTION_INDENT = " " * 8
TITLES = {
    "stop": "Stopping Times\n\nMaximum iterations: $500$",
    "conv": "Convergence\n\nMaximum iterations: $500$, convergence threshold: $10^{-9}$, escape threshold:\n$10^{50}$"
}
FUNCS = {"f": "F", "c": "f", "t": "T"}


def main(argv):
    imgs = {}

    found_image = False
    file_name = ""
    func_name = ""
    img_type = ""
    region = ""
    left_top = ""
    right_bottom = ""
    description = []

    with open("images.txt", "r") as f:
        for line in f:
            if line == "" and not found_image:
                continue

            if line.startswith("# "):
                store(
                    imgs,
                    file_name,
                    img_type,
                    func_name,
                    left_top,
                    right_bottom,
                    description,
                )

                file_name = line.strip().split(" ", 1)[1]
                func_name, img_type, region = file_name.split("_", 2)
                file_name = "images/" + file_name

                description = []
                left_top = ""
                right_bottom = ""
                found_image = True

                continue

            description.append(line)

            match = re.match(r"left-top: *\( *([^,]*, [^ ]*) *\)", line)

            if match:
                left_top = f"({match[1]})"

            match = re.match(r"right-bottom: *\( *([^,]*, [^ ]*) *\)", line)

            if match:
                right_bottom = f"({match[1]})"


    store(
        imgs,
        file_name,
        img_type,
        func_name,
        left_top,
        right_bottom,
        description,
    )

    print_list(imgs)


def store(imgs, file_name, img_type, func_name, left_top, right_bottom, description):
    if file_name != "" and len(description) > 0:
        markdown = "".join(
            [
                f" * {FUNCS[func_name]}: [`{file_name}`]({RAW_URL}/{file_name})\n",
                "\n",
                DESCRIPTION_INDENT + DESCRIPTION_INDENT.join(description)
            ]
        )
        region = f"{left_top}, {right_bottom}"

        (
            imgs
                .setdefault(img_type, {})
                .setdefault(region, {})
                .setdefault(func_name, markdown)
        )


def print_list(imgs):
    parse_region = lambda r: int(1000 * float(r[1:].split(",", 1)[0]))
    toc = []
    i = 0

    for img_type in sorted(imgs.keys()):
        title = TITLES.get(img_type, img_type)
        toc_entry = title.split("\n", 1)[0]
        toc.append(f"    * [{toc_entry}](#{img_type})")

        print(f"<a name=\"{img_type}\"></a>")
        print("")
        print(f"### {title}")
        print("")

        for region in sorted(imgs[img_type].keys(), key=parse_region):
            i += 1
            title = f"Region: {region}"
            toc_entry = title.split("\n", 1)[0]
            toc.append(f"       * [{toc_entry}](#region-{i})")

            print(f"<a name=\"region-{i}\"></a>")
            print("")
            print(f"#### {title}")
            print("")

            for func_name in ("f", "c", "t"):
                print(imgs[img_type][region][func_name])

    print("\n".join(toc))


if __name__ == "__main__":
    sys.exit(main(sys.argv))
