import { createHighlighterCore, createWasmOnigEngine, HighlighterCore } from 'shiki/core';
import catppuccinMocha from 'shiki/themes/catppuccin-mocha.mjs';
import catppuccinLatte from 'shiki/themes/catppuccin-latte.mjs';
import typescript from 'shiki/langs/typescript.mjs';
import bash from 'shiki/langs/bash.mjs';
import css from 'shiki/langs/css.mjs';
import html from 'shiki/langs/html.mjs';
import javascript from 'shiki/langs/javascript.mjs';
import json from 'shiki/langs/json.mjs';
import markdown from 'shiki/langs/markdown.mjs';
import sass from 'shiki/langs/sass.mjs';
import tsx from 'shiki/langs/tsx.mjs';
import jsx from 'shiki/langs/jsx.mjs';
import python from 'shiki/langs/python.mjs';




export let highlighter: HighlighterCore;

(async () => {
    highlighter = await createHighlighterCore({
        themes: [
            catppuccinLatte,
            catppuccinMocha
        ],
        langs: [
            bash,
            css,
            html,
            javascript,
            json,
            markdown,
            sass,
            typescript,
            tsx,
            jsx,
            python
        ],
        engine: createWasmOnigEngine(import('shiki/wasm'))
    });
})();
