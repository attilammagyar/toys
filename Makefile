TARGETS = \
	./index.html \
	./ann/ann_notes.pdf \
	./calcle/index.html \
	./flashcards/index.html \
	./js-80/index.html \
	./kanji-practice/index.html

SINGLE_HTML = python3 single_html.py

.PHONY: all
all: $(TARGETS)

.PHONY: clean
clean:
	rm -vf $(TARGETS)

./index.html: toys.html toys.css
	$(SINGLE_HTML) $< $@ $(words $^)

./calcle/index.html: \
		./calcle/src/calcle.html ./calcle/src/calcle.js ./calcle/src/calcle.css
	$(SINGLE_HTML) $< $@ $(words $^)

./flashcards/index.html: \
		./flashcards/src/flashcards.html \
		./flashcards/src/flashcards.js \
		./flashcards/src/flashcards.css
	$(SINGLE_HTML) $< $@ $(words $^)

./js-80/index.html: \
		./js-80/src/js-80.html ./js-80/src/js-80.js ./js-80/src/js-80.css
	$(SINGLE_HTML) $< $@ $(words $^)

./kanji-practice/index.html: \
		./kanji-practice/src/kanji-practice.html \
		./kanji-practice/src/kanji-practice.js \
		./kanji-practice/src/builtins.js \
		./kanji-practice/src/kanjidic.js \
		./kanji-practice/src/kanjivg.js \
		./kanji-practice/src/kanji-practice.css
	$(SINGLE_HTML) $< $@ $(words $^)

./ann/ann_notes.pdf: ./ann/ann_notes.tex
	$(MAKE) -C ./ann
