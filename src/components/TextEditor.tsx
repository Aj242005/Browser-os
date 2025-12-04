import { MacOSFolder } from "./MacOSFolder"
import { Editor } from '@tinymce/tinymce-react';
export const TextEditor = () => {

    return (
        <>
            <MacOSFolder>
                <Editorr />
            </MacOSFolder>
        </>
    )
}


const Editorr = () => {

    return (
        <>
            <Editor

                apiKey= {import.meta.env.VITE_TINYMCE_API}
                init={{
                    height : 625,
                    menubar : true,
                    plugins: [
                        'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                        'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'advtemplate', 'uploadcare', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf'
                    ],
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Author name',
                    mergetags_list: [
                        { value: 'First.Name', title: 'First Name' },
                        { value: 'Email', title: 'Email' },
                    ],
                }}
                initialValue="Welcome to Text Editor"
            />
        </>
    );
}