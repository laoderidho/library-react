    import {useState, useEffect} from 'react'
    import {Form, Button, FloatingLabel} from 'react-bootstrap'
    import {Link} from 'react-router-dom'
    import axios from 'axios'
    import { api } from '../../config/api'

    const Login = () => {
        
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPass, setShowPass] = useState(false)
    const [typePass, setTypePass] = useState("password")


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
            console.log(data)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}> 
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
                className="mt-3"
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