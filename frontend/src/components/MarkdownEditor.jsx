import MDEditor from '@uiw/react-md-editor/nohighlight';
import rehypeSanitize from "rehype-sanitize";

const MarkdownEditor = ({value, setValue, colorMode="dark"}) => {
    return (
        <div className="md-editor-container" data-color-mode={colorMode}>
            <MDEditor
                value={value}
                onChange={setValue}
                previewOptions={{
                    rehypePlugins: [[rehypeSanitize]]
                }}
            />
        </div>
    );
};

export default MarkdownEditor;