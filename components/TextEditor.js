import dynamic from 'next/dynamic';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/client'
import db from '../firebase'
import { useRouter } from 'next/dist/client/router';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';

const Editor = dynamic(() => import('react-draft-wysiwyg').then(module => module.Editor), { ssr: false })

function TextEditor() {
    const [editorState, seteditorState] = useState(EditorState.createEmpty())
    const [session] = useSession()

    const router = useRouter()
    const { id } = router.query

    const [snapshot] = useDocumentOnce(db.collection('userDocs').doc(session.user.email).collection('documents').doc(id))

    useEffect(() => {
       if(snapshot?.data()?.editorState){
          seteditorState(EditorState.createWithContent(
            convertFromRaw(snapshot?.data()?.editorState)
        ))
       }
    }, [snapshot])

    const editorStateChange = (e) => {
        seteditorState(e)

        db.collection('userDocs').doc(session?.user.email).collection('documents').doc(id).set({
            editorState: convertToRaw(editorState.getCurrentContent())
        }, { merge: true })
    }

    return (
        <div className="bg-gray-100 min-h-screen pb-14">
            <Editor 
                editorState={editorState}
                toolbarClassName="flex sticky top-0 z-50 !justify-center" 
                editorClassName="bg-white mt-5 p-8 max-w-5xl mx-auto shadow-lg"
                onEditorStateChange={editorStateChange}
            />
        </div>
    )
}

export default TextEditor
