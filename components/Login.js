import Button from "@material-tailwind/react/Button";
import Logo from '../public/login_logo.svg'
import { signIn } from 'next-auth/client'

function Login() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Logo />
            
            <h3 className="text-2xl text-gray-700 mb-12">Sign in <span className="font-semibold">Google docs clone</span></h3>
            
            <Button
                color="blue"
                buttonType="filled"
                iconOnly={false}
                ripple="light"
                className="border-0 py-2 w-40"
                onClick={signIn}
            >
                Login
            </Button>
        </div>
    )
}

export default Login
