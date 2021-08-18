import Icon from "@material-tailwind/react/Icon"
import { useRouter } from 'next/dist/client/router'

function DocItem({ id, file_name, created_at }) {

    const router = useRouter();

    return (
        <div onClick={() => router.push(`/doc/${id}`)} className="flex items-center p-4 hover:bg-gray-100 cursor-pointer rounded-md">
            <Icon name="article" color="blue" size="3xl" />
            <h5 className="ml-3 font-semibold sm:flex-[0.93] flex-[0.85]">{file_name}</h5>
            <p>{created_at?.toDate().toLocaleDateString()}</p>
        </div>
    )
}

export default DocItem
