
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
