Artificial Neural Networks (work in progress draft)
===================================================

Getting Up To Speed With The Math From Scratch
----------------------------------------------

I decided to brush up my knowledge on the math behind artificial neural
networks, and `ann_notes.tex` contains the notes that I've taken along the way.

To build the [PDF version](https://github.com/attilammagyar/toys/raw/gh-pages/ann/ann_notes.pdf)
from the LaTeX file (use `make ann_notes.pdf`), the following packages are
required on a typical Debian or Ubuntu system:

    apt install \
        tex-common \
        texlive-base \
        texlive-latex-base \
        texlive-latex-recommended \
        texlive-pictures \
        texlive-science

Once these are installed, you can use the `Makefile`:

    make ann_notes.pdf
