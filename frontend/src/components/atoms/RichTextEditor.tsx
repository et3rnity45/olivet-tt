/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import toolbarOptions from "@Utils/toolbarOptions";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

type RichTextEditorProps = {
  value: string;
  onChange: (...event: any[]) => void;
};

const RichTextEditor = ({
  value,
  onChange,
}: RichTextEditorProps): JSX.Element => {
  const [editorState, setEditorState] = useState(
    value
      ? EditorState.createWithContent(
          ContentState.createFromBlockArray(htmlToDraft(value).contentBlocks)
        )
      : EditorState.createEmpty()
  );

  const onEditorStateChange = (newState: EditorState) => {
    setEditorState(newState);
    return onChange(draftToHtml(convertToRaw(newState.getCurrentContent())));
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      editorClassName="px-3 prose prose-lg prose-red max-w-none"
      toolbar={toolbarOptions}
    />
  );
};

export default RichTextEditor;
