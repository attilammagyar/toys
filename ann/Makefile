BUILD_DIR ?= build

CD ?= cd
RM ?= rm -vf
MKDIR ?= mkdir -v
COPY ?= cp -v
PDFLATEX ?= pdflatex \
	-halt-on-error \
	-file-line-error \
	-output-directory $(BUILD_DIR)

.PHONY: all

all: ann_notes.pdf

ann_notes.pdf: $(BUILD_DIR)/ann_notes.pdf
	cp -v $< $@

$(BUILD_DIR)/ann_notes.pdf: ann_notes.tex | $(BUILD_DIR)
	$(PDFLATEX) $<
	$(PDFLATEX) $<

$(BUILD_DIR):
	$(MKDIR) $@
