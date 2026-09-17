import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import type { Extension } from "@codemirror/state";

/**
 * Editor themes tuned to the app palette. Both keep syntax colours close to
 * VS Code so they feel familiar, while chrome (background, gutter, selection)
 * follows the surrounding card surface.
 */
export const editorDark = createTheme({
  theme: "dark",
  settings: {
    background: "hsl(240 6% 7%)",
    foreground: "#d4d4d8",
    caret: "#e4e4e7",
    selection: "rgba(129, 140, 248, 0.25)",
    selectionMatch: "rgba(129, 140, 248, 0.2)",
    lineHighlight: "rgba(255, 255, 255, 0.03)",
    gutterBackground: "hsl(240 6% 7%)",
    gutterForeground: "#52525b",
    gutterBorder: "transparent",
  },
  styles: [
    { tag: t.comment, color: "#6a9955" },
    { tag: t.variableName, color: "#9cdcfe" },
    { tag: [t.string, t.special(t.brace)], color: "#ce9178" },
    { tag: t.number, color: "#b5cea8" },
    { tag: t.bool, color: "#569cd6" },
    { tag: t.null, color: "#569cd6" },
    { tag: t.keyword, color: "#c586c0" },
    { tag: t.operator, color: "#d4d4d4" },
    { tag: t.className, color: "#4ec9b0" },
    { tag: t.definition(t.typeName), color: "#4ec9b0" },
    { tag: t.typeName, color: "#4ec9b0" },
    { tag: t.angleBracket, color: "#d4d4d4" },
    { tag: t.tagName, color: "#569cd6" },
    { tag: t.attributeName, color: "#9cdcfe" },
    { tag: t.function(t.variableName), color: "#dcdcaa" },
  ],
});

export const editorLight = createTheme({
  theme: "light",
  settings: {
    background: "#ffffff",
    foreground: "#27272a",
    caret: "#18181b",
    selection: "rgba(79, 70, 229, 0.15)",
    selectionMatch: "rgba(79, 70, 229, 0.12)",
    lineHighlight: "rgba(0, 0, 0, 0.025)",
    gutterBackground: "#ffffff",
    gutterForeground: "#a1a1aa",
    gutterBorder: "transparent",
  },
  styles: [
    { tag: t.comment, color: "#6b7280" },
    { tag: t.variableName, color: "#1e40af" },
    { tag: [t.string, t.special(t.brace)], color: "#b45309" },
    { tag: t.number, color: "#0f766e" },
    { tag: t.bool, color: "#1d4ed8" },
    { tag: t.null, color: "#1d4ed8" },
    { tag: t.keyword, color: "#7c3aed" },
    { tag: t.operator, color: "#3f3f46" },
    { tag: t.className, color: "#0e7490" },
    { tag: t.definition(t.typeName), color: "#0e7490" },
    { tag: t.typeName, color: "#0e7490" },
    { tag: t.angleBracket, color: "#3f3f46" },
    { tag: t.tagName, color: "#1d4ed8" },
    { tag: t.attributeName, color: "#1e40af" },
    { tag: t.function(t.variableName), color: "#92400e" },
  ],
});

export function languageExtension(lang: string): Extension {
  switch (lang) {
    case "javascript":
      return javascript({ jsx: true });
    case "python":
      return python();
    case "java":
      return java();
    case "c++":
    default:
      return cpp();
  }
}

export const languageLabels: Record<string, string> = {
  "c++": "C++",
  java: "Java",
  python: "Python",
  javascript: "JavaScript",
};
