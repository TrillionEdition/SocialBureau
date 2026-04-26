import JoditEditor from "jodit-react";
import { useRef } from "react";

const editor = useRef(null);

<JoditEditor
    ref={editor}
    value={content}
    onChange={newContent => setContent(newContent)}
    config={{
      height: 500,
      uploader: { insertImageAsBase64URI: true },
      toolbarAdaptive: false,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      toolbarSticky: true,
      toolbar: true,
      buttons: [
        "bold", "italic", "underline", "|",
        "ul", "ol", "|",
        "fontsize", "paragraph", "|",
        "link", "image", "table", "|",
        "align", "undo", "redo", "|",
        "hr", "eraser", "copyformat"
      ]
    }}
/>

