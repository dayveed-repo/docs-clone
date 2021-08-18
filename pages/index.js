import Head from 'next/head'
import { useState } from 'react'
import Created_doc_section from '../components/Created_doc_section'
import Header from '../components/Header'
import { useSession, getSession } from 'next-auth/client'
import Login from '../components/Login'
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import db from '../firebase'
import firebase from 'firebase'
import NewLogo from '../public/new_logo.svg'

export default function Home() {
  
  const [session] = useSession();
  
  if (!session) return <Login />
  
  const [showModal, setshowModal] = useState(false)
  const [input, setinput] = useState("")

  const createDoc = () => {
    if(!input) return alert("must enter name of file");

    db.collection('userDocs').doc(session.user.email).collection("documents").add({
      fileName: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setinput("")
    setshowModal(false)
  }

  const modal = (
    <Modal size="regular" active={showModal} toggler={() => setshowModal(false)}>
      <ModalHeader toggler={() => setshowModal(false)}>
        create new file
      </ModalHeader>
      
      <ModalBody>
        <input 
          type="text" 
          placeholder="Enter the name of the file" 
          value={input} 
          className="w-full outline-none"
          onChange={(e) => setinput(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && createDoc}
          />
      </ModalBody>
      
      <ModalFooter>
          <Button 
              color="red"
              buttonType="link"
              onClick={(e) => setshowModal(false)}
              ripple="dark"
          >
            Close
          </Button>

          <Button
            color="blue"
            onClick={createDoc}
            ripple="light"
          >
            Save File Name
          </Button>
      </ModalFooter>
    </Modal>
  )
  
  return (
    <div className="">
      <Head>
        <title>docs clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      {modal}
      <section className="w-full bg-gray-100 px-8 pb-5 md:px-0">
        <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center py-5">
                <h3 className="text-gray-700 text-sm text-bold">Start new document</h3>
                <Button
                    color="gray"
                    buttonType="outline"
                    rounded={false}
                    iconOnly={true}
                    ripple="dark"
                    className="border-0 h-14"
                >
                    <Icon name="more_vert" size="3xl" />
                </Button>
            </div>

            <div className="flex items-center">
              <div className="flex-grow">
                <img onClick={() => setshowModal(true)} src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png" loading="lazy" className="h-52 w-48 sm:w-auto  cursor-pointer border-2 hover:border-blue-500" />
                <p className="text-gray-700 font-semibold text-sm mt-2">Blank</p>
              </div>

              <NewLogo/>
            </div>
          </div>
        </section>
      
      <Created_doc_section />
    </div>
  )
}

export async function getServerSideProps (context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    }
  }
} 