import MDEditor from '@uiw/react-md-editor/nohighlight';
import rehypeSanitize from "rehype-sanitize";

const MarkdownEditor = ({value, setValue, placeholder="", colorMode="dark"}) => {
    return (
        <div className="md-editor-container" data-color-mode={colorMode}>
            <MDEditor
                value={value}
                onChange={setValue}
                highlightEnable={false}
                textareaProps={{
                    placeholder: placeholder,
                }}
                previewOptions={{
                    rehypePlugins: [[rehypeSanitize]]
                }}
            />
        </div>
    );
};

export default MarkdownEditor;