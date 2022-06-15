.PHONY: all
all: ./index.html ./calcle/index.html ./flashcards/index.html ./js-80/index.html ./kanji-practice/index.html

.PHONY: clean
clean:
	test ! -e ./index.html \
		|| rm ./index.html
	test ! -e ./calcle/index.html \
		|| rm ./calcle/index.html
	test ! -e ./flashcards/index.html \
		|| rm ./flashcards/index.html
	test ! -e ./js-80/index.html \
		|| rm ./js-80/index.html
	test ! -e ./kanji-practice/index.html \
		|| rm ./kanji-practice/index.html

./index.html:
	python3 single_html.py \
		toys.html \
		index.html \
		1

./calcle/index.html:
	python3 single_html.py \
		calcle/src/calcle.html \
		calcle/index.html \
		2

./flashcards/index.html:
	python3 single_html.py \
		flashcards/src/flashcards.html \
		flashcards/index.html \
		2

./js-80/index.html:
	python3 single_html.py \
		js-80/src/js-80.html \
		js-80/index.html \
		2

./kanji-practice/index.html:
	python3 single_html.py \
		kanji-practice/src/kanji-practice.html \
		kanji-practice/index.html \
		4
