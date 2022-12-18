TARGETS = \
	./index.html \
	./calcle/index.html \
	./flashcards/index.html \
	./js-80/index.html \
	./kanji-practice/index.html

CALCLE_SRC = \
	./calcle/src/calcle.css \
	./calcle/src/calcle.html \
	./calcle/src/calcle.js

FLASHCARDS_SRC = \
	./flashcards/src/flashcards.css \
	./flashcards/src/flashcards.html \
	./flashcards/src/flashcards.js

JS80_SRC = \
	./js-80/src/js-80.css \
	./js-80/src/js-80.html \
	./js-80/src/js-80.js

KANJI_PRACTICE_SRC = \
	./kanji-practice/src/builtins.js \
	./kanji-practice/src/kanjidic.js \
	./kanji-practice/src/kanjivg.js \
	./kanji-practice/src/kanji-practice.css \
	./kanji-practice/src/kanji-practice.html \
	./kanji-practice/src/kanji-practice.js

TOYS_SRC = \
	toys.css \
	toys.html

.PHONY: all
all: $(TARGETS)

.PHONY: clean
clean:
	rm -vf $(TARGETS)

./index.html: $(TOYS_SRC)
	python3 single_html.py \
		toys.html \
		index.html \
		1

./calcle/index.html: $(CALCLE_SRC)
	python3 single_html.py \
		calcle/src/calcle.html \
		calcle/index.html \
		2

./flashcards/index.html: $(FLASHCARDS_SRC)
	python3 single_html.py \
		flashcards/src/flashcards.html \
		flashcards/index.html \
		2

./js-80/index.html: $(JS80_SRC)
	python3 single_html.py \
		js-80/src/js-80.html \
		js-80/index.html \
		2

./kanji-practice/index.html: $(KANJI_PRACTICE_SRC)
	python3 single_html.py \
		kanji-practice/src/kanji-practice.html \
		kanji-practice/index.html \
		5
