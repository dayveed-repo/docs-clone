import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { useCollection } from 'react-firebase-hooks/firestore'
import { signOut, useSession } from 'next-auth/client'
import { useEffect, useState } from "react";
import Fuse from 'fuse.js'
import db from '../firebase'
import { useRouter } from 'next/dist/client/router'

function header() {

    const [session] = useSession();

    //implementing search with fuse js
    const [jsonDocs, setjsonDocs] = useState(null)
    const [searchResults, setsearchResults] = useState([])
    const [input, setinput] = useState("")

    const router = useRouter()

    const [snapshot] = useCollection(
        db.collection('userDocs')
        .doc(session.user.email)
        .collection('documents')
        .orderBy('timestamp', 'desc')
    )

    useEffect(() => {
        if(snapshot?.docs){
            setjsonDocs(snapshot?.docs.map(doc => 
                ({ 
                    id: doc.id, 
                    ...doc.data()
                }) ))
        }
     }, [snapshot])

    const options = {
        includeScore: true,
        // Search in 'fileName'
        keys: ['fileName']
    }
 
    const handleChange = (e) =>{
        setinput(e.target.value)

        if(e.target.value){
            const fuse = new Fuse(jsonDocs, options)
            setsearchResults(fuse.search(`'${e.target.value}`))
        
            console.log(searchResults)
        }
       
    }

    return (
        <header className="flex items-center sticky top-0 z-50 bg-[white] shadow-md px-4 py-2">
            <Icon name="description" size="4xl" color="blue"  />
            <h3 className="hidden md:inline-flex ml-2 text-gray-700 text-xl">Docs</h3>

            <div className={`relative mx-3 md:mx-10 flex flex-grow items-center py-2 px-4 bg-gray-100 ${!input && "rounded-md"} focus-within:rounded-t-md focus-within:shadow-md`}>
                <Icon name="search" size="2xl" color="gray" />
                <input type="text" className="px-4 bg-transparent flex-grow outline-none text-gray-700" placeholder="Search for file..." onChange={handleChange} />

                {input && searchResults.length > 0 ?
                    <div className="absolute top-11 shadow-md w-full ml-[-16px] bg-gray-100 max-h-52 overflow-y-scroll pb-4 rounded-b-md">
                        {searchResults.map(doc => <p onClick={() => router.push(`/doc/${doc.item.id}`)} key={doc.item.id} className="py-2 px-5 hover:bg-gray-300 cursor-pointer">{doc.item.fileName}</p>)} 
                    </div>
                    : ""
                }
            </div>

            <Button
                color="gray"
                buttonType="outline"
                rounded={true}
                iconOnly={true}
                ripple="dark"
                className="border-0 h-14"
            >
                <Icon name="apps" size="2xl" color="gray" />   
            </Button>

            <img src={session?.user?.image} onClick={signOut} alt="" loading="lazy" className="h-7 w-7 ml-2 object-cover rounded-full" />
        </header>
    )
}

export default header
