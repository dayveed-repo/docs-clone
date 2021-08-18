import Icon from "@material-tailwind/react/Icon";
import { useCollection } from 'react-firebase-hooks/firestore'
import { useSession } from 'next-auth/client'
import DocItem from "./DocItem";
import db from '../firebase';

function Created_doc_section() {

    const [session] = useSession()
    const [snapshot] = useCollection(
        db.collection('userDocs')
        .doc(session.user.email)
        .collection('documents')
        .orderBy('timestamp', 'desc')
    )
   
    return (
        <section className="px-8 md:px-0">
            <div className="py-8 mx-auto max-w-3xl pb-10">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="flex-grow text-md font-medium">My documents</h3>
                    <p className='text-sm text-gray-500 mr-10'>Date created</p>
                    <Icon name="folder" size="2xl" color="gray"  />
                </div>

                {snapshot?.docs.map(doc => <DocItem key={doc.id} id={doc.id} file_name={doc.data().fileName} created_at={doc.data().timestamp} />)}
            </div>
        </section>
    )
}

export default Created_doc_section
 
