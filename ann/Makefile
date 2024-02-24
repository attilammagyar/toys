BUILD_DIR ?= build

CD ?= cd
RM ?= rm -vf
MKDIR ?= mkdir -v
COPY ?= cp -v
PDFLATEX ?= /usr/bin/pdflatex

PDFLATEX_FLAGS = \
	-halt-on-error \
	-file-line-error \
	-output-directory $(BUILD_DIR)

.PHONY: all clean

all: ann_notes.pdf

clean:
	$(RM) \
		$(BUILD_DIR)/ann_notes.aux \
		$(BUILD_DIR)/ann_notes.log \
		$(BUILD_DIR)/ann_notes.out \
		$(BUILD_DIR)/ann_notes.pdf \
		$(BUILD_DIR)/ann_notes.toc

ann_notes.pdf: $(BUILD_DIR)/ann_notes.pdf
	$(COPY) $< $@

$(BUILD_DIR)/ann_notes.pdf: ann_notes.tex | $(BUILD_DIR)
	$(PDFLATEX) $(PDFLATEX_FLAGS) $<
	$(PDFLATEX) $(PDFLATEX_FLAGS) $<

$(BUILD_DIR):
	$(MKDIR) $@
