
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

TARGETS = \
	./index.html \
	./ann/ann_notes.pdf \
	./calcle/index.html \
	./chimp-mem-game/index.html \
	./csv6d/index.html \
	./flashcards/index.html \
	./js-80/index.html \
	./kanji-practice/index.html \
	./singing-bowls/index.html

BUILD_SINGLE_HTML = python3 single_html.py $< $@ $(words $^)

.PHONY: all
all: $(TARGETS)

.PHONY: clean
clean:
	rm -vf $(TARGETS)

./index.html: toys.html toys.css
	$(BUILD_SINGLE_HTML)

./ann/ann_notes.pdf: ./ann/ann_notes.tex
	$(MAKE) -C ./ann

./calcle/index.html: \
		./calcle/src/calcle.html ./calcle/src/calcle.css ./calcle/src/calcle.js
	$(BUILD_SINGLE_HTML)

./chimp-mem-game/index.html: \
		./chimp-mem-game/src/chimp-mem-game.html \
		./chimp-mem-game/src/chimp-mem-game.css \
		./chimp-mem-game/src/chimp-mem-game.js
	$(BUILD_SINGLE_HTML)

./csv6d/index.html: \
		./csv6d/src/csv6d.html \
		./csv6d/src/csv6d.css \
		./csv6d/src/csv6d.js
	$(BUILD_SINGLE_HTML)

./flashcards/index.html: \
		./flashcards/src/flashcards.html \
		./flashcards/src/flashcards.css \
		./flashcards/src/flashcards.js
	$(BUILD_SINGLE_HTML)

./js-80/index.html: \
		./js-80/src/js-80.html ./js-80/src/js-80.css ./js-80/src/js-80.js
	$(BUILD_SINGLE_HTML)

./kanji-practice/index.html: \
		./kanji-practice/src/kanji-practice.html \
		./kanji-practice/src/builtins.js \
		./kanji-practice/src/kanjidic.js \
		./kanji-practice/src/kanji-practice.css \
		./kanji-practice/src/kanji-practice.js \
		./kanji-practice/src/kanjivg.js
	$(BUILD_SINGLE_HTML)

./singing-bowls/index.html: \
		./singing-bowls/src/singing-bowls.html \
		./singing-bowls/src/singing-bowls.css \
		./singing-bowls/src/singing-bowls.js
	$(BUILD_SINGLE_HTML)
