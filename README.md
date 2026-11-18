# Polytropos

**What Do Vision-Language Model Descriptions Make of a Cultural Object?**

- [Project website](https://carolyn-jiang.github.io/Polytropos/)
- [Dataset, outputs and published result tables](https://huggingface.co/datasets/Carolyn-Jiang/Culture-Ground-Description)

Polytropos turns unchanged museum-object descriptions into images and examines cultural-attribution recoverability alongside specific-object identity.

The buildless project website includes:

- An interactive ranked lollipop chart with full, matched and explicit-nonrecognition cohorts, metric selection, bootstrap confidence intervals where reported, separate museum and photograph reference lines, search, sorting and CSV export.
- AI and museum-authored word clouds for the same 230 objects, with clickable raw counts and rates per 10,000 retained content tokens. Identical POS-based content-word filtering and stopwords; independent font scaling within each cloud.
- A compact, synthetic-first 20-object mosaic spanning all 15 populated region × type strata, pointer-local magnification, filtering, search and shuffle. Object views compare original museum photographs against 97 available benchmark reconstructions using a model selector and image slider.

## Run locally

No API keys or build dependencies are required. Serve this directory with `python -m http.server --bind 127.0.0.1`. Publish the `main` branch from the repository root using GitHub Pages.

## Evidence and interpretation

Leaderboard values come from the released result CSVs and manuscript tables. Primary culture accuracy uses fixed denominators; generation refusals and unusable predictions remain non-matches. The fixed generator/recogniser execution does not establish overall description quality or statistically significant differences between all ranks. Bootstrap intervals describe artefact-sampling variation conditional on that execution.

The AI cloud pools 1,150 descriptions (five models × 230 objects; 59,712 retained content tokens). The human cloud covers 230 Getty museum descriptions (13,165 retained content tokens). The same POS filter retains nouns, proper nouns and adjectives, followed by identical stopword, number-word and weak-framing exclusions. No stemming or lemmatisation is applied. Colours are decorative.

## Sources and rights

Original gallery photographs are from the Metropolitan Museum of Art and J. Paul Getty Museum. Their object-specific CC0 status is documented in `gallery-rights-audit.json` and in the website source credits. The gallery covers all 15 populated strata; East Asia has no sculpture stratum in this corpus. Synthetic reconstructions are separately labelled with model names and linked to their benchmark source records.

The matched museum-authored descriptions are © J. Paul Getty Trust, CC BY 4.0 unless otherwise noted, under [Getty terms of use](https://www.getty.edu/legal/terms-of-use/). Credit the source museum and catalogue record. CC0 statements apply only to the verified original photographs, not to descriptive text.

Word frequencies, corpus metadata and rights evidence accompany this source for review. Images are loaded from official museum servers and the public dataset release; external source availability can affect display.
