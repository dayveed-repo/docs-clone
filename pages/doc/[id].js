import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { useSession, getSession } from 'next-auth/client'
import Login from '../../components/Login'
import { useDocumentOnce } from 'react-firebase-hooks/firestore'
import db from '../../firebase'
import { useRouter } from 'next/dist/client/router'
import TextEditor from "../../components/TextEditor";

function Doc () {

    const [session] = useSession();

    if (!session) return <Login />  

    const router = useRouter()
    const { id } = router.query
    const [snapshot, loadingSnapshot] = useDocumentOnce(db.collection('userDocs').doc(session.user.email).collection('documents').doc(id))

    if(!loadingSnapshot && !snapshot?.data().fileName){
        router.replace('/')
    }

    return (
        <div>
            <header className="bg-white flex items-center px-3 pt-2">
                <span onClick={() => router.push('/')} className="cursor-pointer">
                    <Icon name="arrow_back" size="5xl" color="blue" />
                </span>

                <div className="flex-grow ml-4">
                    <h3 className="text-lg font-semibold">{snapshot?.data().fileName}<span className="font-light text-gray-600 text-xs"> (file auto saves so you can go back)</span></h3>
                    
                    <div className="flex items-center space-x-1 mt-1 text-gray-600">
                        <p className="option">file</p>
                        <p className="option">edit</p>
                        <p className="option">view</p>
                        <p className="option">import</p>
                        <p className="option">format</p>
                        <p className="option">tools</p>
                    </div>
                </div>

                <Button
                    color="blue"
                    buttonType="filled"
                    rounded={false}
                    iconOnly={false}
                    block={false}
                    ripple="light"
                    className="border-0 py-2 w-24 hidden md:inline-flex mr-4"
                >
                    <Icon name="people" color="white" size="xl" /> Share
                </Button>                

                <img src={session?.user.image} loading="lazy" alt="profile" className="w-10 h-10 cursor-pointer rounded-full" />
            </header>

            <TextEditor />
        </div>
    )
}

export default Doc

export async function getServerSideProps (context) {
    const session = await getSession(context)
  
    return {
      props: {
        session,
      }
    }
  } 