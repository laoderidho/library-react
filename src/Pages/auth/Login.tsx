    import {useState, useEffect} from 'react'
    import {Form, Button, FloatingLabel} from 'react-bootstrap'
    import {Link, useNavigate} from 'react-router-dom'
    import axios from 'axios'
    import { api } from '../../config/api'
    import Notif from '../../Components/Notif'

    const Login = () => {
        
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPass, setShowPass] = useState(false)
    const [typePass, setTypePass] = useState("password")
    const [error, setError] = useState("")

    // notif state
    const [show, setShow] = useState(false)
    const [variant, setVariant] = useState("")
    const [message, setMessage] = useState("")
    const [header, setHeader] = useState("")

    const navigate = useNavigate()

    useEffect(()=>{
        if(showPass){
        setTypePass("text")
        }else{
        setTypePass("password")
        }
    },[showPass])

    const handleShowPassword = ()=> setShowPass(!showPass)

    const handleLoginSubmit = async (e: any) =>{
        e.preventDefault()

        try {
            const data = await axios.post(`${api}/auth/login`,{
                email,
                password
            })

            localStorage.setItem('token', data.data.access_token)
            setShow(true)
            setVariant("bg-success")
            setMessage("Login Berhasil")
            setHeader("Success")
            setTimeout(() => {
                navigate("/")
            }, 1000);


        } catch (error: any) {
            const messageError = error.response.data.message
            setError(messageError)
            setShow(true)
            setVariant("bg-danger")
            setMessage(messageError)
            setHeader("Error")
        }

    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}> 
        <Notif
        headerMessage={header}
        showToast={show}
        setShowToast={setShow}
        toastMessage={message}
        toastVariant={variant}
      />
            <Form className="shadow p-5 rounded form-login" onSubmit={handleLoginSubmit}>
            {/* form header */}
                <h1 className="text-center mb-5">Login</h1>
                <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3 W-100">
                    <Form.Control 
                    type="email" 
                    placeholder="name@example.com"
                    value={email}  
                    onChange={(e)=> setEmail(e.target.value)}
                    />
                {error && <Form.Text className="text-danger mt-1">{error}</Form.Text>}
                </FloatingLabel>
                <FloatingLabel
                controlId="floatingInput"
                label="Password"
                className="mb-3 W-100">
                    <Form.Control 
                    type={typePass} 
                    placeholder="password" 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                {error && <Form.Text className="text-danger mt-1">{error}</Form.Text>}
                </FloatingLabel>
                <Button 
                variant="primary" 
                className="w-100" 
                type="submit"
                disabled={!email || !password}
                >
                    Login
                </Button>
                <Form.Check
                type="checkbox"
                id="cek_sandi"
                label="tampilkan password"
                className="mt-3 pe-auto"
                onChange={handleShowPassword}
                />

                <div className="d-flex mt-3">
                    <p className="mx-2">Belum ada akun</p> 
                    <Link to="/register">Daftar</Link>
                </div>
            </Form>
        </div>
    )
    }

    export default Login