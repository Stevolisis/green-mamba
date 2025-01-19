import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

interface CustomTextEditorProps {
    value: string;
    onEDTChange: (content: string) => void;
    placeholder: string;
}

const CustomTextEditor: React.FC<CustomTextEditorProps> = ({
    value,
    onEDTChange,
    placeholder
}) => {
    return (
        <div className='my-5'>
            <p className=' mb-1 text-sm text-white dark:text-white'>Content</p>
            <SunEditor 
                placeholder={ placeholder }
                onChange={onEDTChange}
                setContents={value}
                height={'500px'}
                setOptions={{
                    buttonList:[        ['undo', 'redo'],
                    ['font', 'fontSize', 'formatBlock'],
                    ['paragraphStyle', 'blockquote'],
                    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                    ['fontColor', 'hiliteColor', 'textStyle'],
                    ['removeFormat'],
                    '/',
                    ['outdent', 'indent'],
                    ['align','list', 'lineHeight'],
                    ['table', 'link', 'image', 'video', 'audio' 
                    /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
                    /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
                    ['fullScreen'],
                ]
                }}
                // imageAccept='.jpg'
            />
        </div>
    );
};


export default CustomTextEditor;
