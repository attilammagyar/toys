.PHONY: all
all: ./kanji-practice/index.html

.PHONY: clean
clean:
	test ! -e ./kanji-practice/index.html \
		|| rm ./kanji-practice/index.html

./kanji-practice/index.html:
	python3 single_html.py \
		kanji-practice/src/kanji-practice.html \
		kanji-practice/index.html \
		4
