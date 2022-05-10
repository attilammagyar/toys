.PHONY: all
all: ./index.html ./kanji-practice/index.html ./flashcards/index.html ./calcle/index.html

.PHONY: clean
clean:
	test ! -e ./kanji-practice/index.html \
		|| rm ./kanji-practice/index.html
	test ! -e ./flashcards/index.html \
		|| rm ./flashcards/index.html

./index.html:
	python3 single_html.py \
		toys.html \
		index.html \
		1

./flashcards/index.html:
	python3 single_html.py \
		flashcards/src/flashcards.html \
		flashcards/index.html \
		2

./kanji-practice/index.html:
	python3 single_html.py \
		kanji-practice/src/kanji-practice.html \
		kanji-practice/index.html \
		4

./calcle/index.html:
	python3 single_html.py \
		calcle/src/calcle.html \
		calcle/index.html \
		2
