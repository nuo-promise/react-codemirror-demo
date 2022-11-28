import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { ViewPlugin, EditorView } from "@codemirror/view";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import "./editor.scss";
import { createTheme, CreateThemeOptions } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";
import "github-markdown-css/github-markdown.css";
import { tags } from "@lezer/highlight";
import {
  syntaxHighlighting,
  HighlightStyle,
  defaultHighlightStyle
} from "@codemirror/language";
import Preview from "./Preview";

export const transparentTheme = EditorView.theme({
  "&": {
    backgroundColor: "transparent !important",
    height: "100%"
  }
});

const myHighlightStyle = HighlightStyle.define([
  { tag: tags.keyword, color: "#FC6" },
  { tag: tags.comment, color: "#16A004", fontStyle: "italic" },
  { tag: tags.strong, color: "#66D9EF", fontStyle: "bold" },
  {
    tag: tags.heading1,
    fontSize: "1.6em",
    fontWeight: "bold"
  },
  {
    tag: tags.heading2,
    fontSize: "1.4em",
    fontWeight: "bold"
  },
  {
    tag: tags.heading3,
    fontSize: "1.2em",
    fontWeight: "bold"
  }
]);

const cStyle = createTheme({
  theme: "dark",
  settings: {
    background: "#1e1e1e",
    foreground: "#9cdcfe",
    caret: "#c6c6c6",
    selection: "#6199ff2f",
    selectionMatch: "#72a1ff59",
    lineHighlight: "#ffffff0f",
    gutterBackground: "#1e1e1e",
    gutterForeground: "#838383",
    gutterActiveForeground: "#fff",
    fontFamily:
      'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace'
  },
  styles: [
    {
      tag: tags.heading1,
      fontSize: "1.6em",
      fontWeight: "bold"
    },
    {
      tag: tags.heading2,
      fontSize: "2.4em",
      fontWeight: "bold"
    }
  ]
});

const Editor: React.FC = () => {
  const [code, setCode] = useState<string>("## Title");

  // 自定滚动最顶层.
  const scrollBottom = ViewPlugin.fromClass(
    class {
      update(update) {
        if (update.docChanged) {
          update.view.scrollDOM.scrollTop = update.view.scrollDOM.scrollHeight;
        }
      }
    }
  );
  // 文档内容变动触发事件.
  const onChange = React.useCallback((value, viewUpdate) => {
    setCode(value);
  }, []);

  return (
    <div className="editor-content">
      <div className="editor-header-top-spacer" />
      <div className="editor">
        <div className="editor-warpper">
          <CodeMirror
            value={code}
            height="100%"
            theme={cStyle}
            autoFocus={true}
            placeholder={"Input @ to more type"}
            extensions={[
              // syntaxHighlighting(defaultHighlightStyle),
              // syntaxHighlighting(myHighlightStyle),
              transparentTheme,
              scrollBottom,
              markdown({
                base: markdownLanguage,
                codeLanguages: languages,
                addKeymap: true
              }),
              EditorView.lineWrapping
            ]}
            onChange={onChange}
          />
        </div>
        <div className="preview markdown-body">
          <Preview doc={code} theme="light" />
        </div>
      </div>
    </div>
  );
};

export default Editor;
