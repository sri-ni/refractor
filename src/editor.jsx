import React, { useRef, useEffect, useState } from 'react';

import { EditorState, basicSetup } from '@codemirror/basic-setup';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';

export const Editor = ({setEditorState}) => {
  const editor = useRef();
  const [srcDoc, setSrcDoc] = useState('');
  const [code, setCode] = useState(() => {
    const saved = localStorage.getItem("code");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  const onUpdate = EditorView.updateListener.of((v) => {
    setCode(v.state.doc.toString());
    console.log(v.state.doc.toString());
  });

  useEffect(() => {
    const state = EditorState.create({
      doc: code,
      extensions: [
        basicSetup,
        keymap.of([defaultKeymap, indentWithTab]),
        oneDark,
        html(),
        onUpdate,
      ],
    });
    const view = new EditorView({ state, parent: editor.current });

    return () => {
      view.destroy();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("code", JSON.stringify(code));
    setSrcDoc(`
      <html>
        <body>${code}</body>
      </html>
    `)

  }, [code]);

  return <>
      <div ref={editor}></div>
      <iframe
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts"
        frameBorder="0"
        width="100%"
        height="500px"
        />
    </>
    ;
};
