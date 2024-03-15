TARGETS = \
	./index.html \
	./ann/ann_notes.pdf \
	./calcle/index.html \
	./chimp-mem-game/index.html \
	./flashcards/index.html \
	./js-80/index.html \
	./kanji-practice/index.html

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
