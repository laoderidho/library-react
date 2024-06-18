import {useState} from 'react'
import { Form, Button, FloatingLabel } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Register = () => {
    
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const handleRegisterSubmit = (e: any)=>{
    e.preventDefault()
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}> 
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