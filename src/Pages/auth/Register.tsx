import {useState} from 'react'
import { Form, Button, FloatingLabel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { api } from '../../config/api'
import Notif from '../../Components/Notif'
import { useNavigate } from 'react-router-dom'

interface ErrorState {
  type: string,
  message: string
}

const Register = () => {
    
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState<ErrorState | null>(null);

  // notif state
  const [show, setShow] = useState(false)
  const [variant, setVariant] = useState("")
  const [message, setMessage] = useState("")
  const [header, setHeader] = useState("")

  // navigation
  const navigate = useNavigate()

  const handleRegisterSubmit = async (e: any)=>{
    e.preventDefault()

    try {
      const res = await axios.post(`${api}/auth/register`,{
        name,
        email,
        password,
        role: "user"
      })

      if(res.status === 201){
        setShow(true)
        setVariant("bg-success")
        setMessage("Register Berhasil")
        setHeader("Success")
        setTimeout(() => {
          navigate("/login")
        }, 1000);
      }
    } catch (error: any) {
      const messageError = error.response.data.message
      console.log(messageError)
        if(messageError === "Email sudah terdaftar"){
          setError({
            type: "email",
            message: messageError
          })

          setShow(true)
          setVariant("bg-danger")
          setMessage(messageError)
          setHeader("Error")
        }
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
        <Form className="shadow p-5 rounded form-login" onSubmit={handleRegisterSubmit}>
          {/* form header */}
            <h1 className="text-center mb-5">Register</h1>
            <FloatingLabel
              controlId="floatingInput"
              label="Nama"
              className="mb-3 W-100">
                <Form.Control 
                  type="text" 
                  placeholder="Nama"  
                  value={name}  
                  onChange={(e)=> setName(e.target.value)}
                  />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Alamat Email"
              className="mb-3 W-100">
                <Form.Control 
                  type="email" 
                  placeholder="name@example.com"
                  value={email}  
                  onChange={(e)=> setEmail(e.target.value)}
                  />
               {error && error.type === "email" &&  <Form.Text className="text-danger mt-1">{error.message}</Form.Text>}
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Password"
              className="mb-3 W-100">
                <Form.Control 
                  type= "password" 
                  placeholder="password" 
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  />
            </FloatingLabel>
            <Button variant="primary" className="w-100" type="submit" disabled={!email || !password || !name } >
                Register
            </Button>

            <div className="d-flex mt-3">
                <p className="mx-2">sudah ada akun</p> 
                <Link to="/login">Login</Link>
            </div>
        </Form>
    </div>
  )
}

export default Register