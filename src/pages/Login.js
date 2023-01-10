import Base from "../components/Base";
import { Button, Card, CardBody, CardHeader, Col, Container,Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { myAxios } from "../services/helper";
import { loginUser } from "../services/user-service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";

const Login =()=>{

    const navigate=useNavigate()

    const [loginDetail, setLoginDetail]= useState({
        username:'',
        password:''
    })

    const handleChange=(event,field)=>{
        let actualValue = event.target.value
        setLoginDetail({
            ...loginDetail,
            [field]:actualValue
        })
    }
    const handleFormSubmit=(event)=>{
        event.preventDefault();
        console.log(loginDetail);
        //validation
        if(loginDetail.username.trim()=='' || loginDetail.password.trim()==''){
            toast.error("Username or Password Required !!")
            return;
        }

        //submit the data to server to generate token
        loginUser(loginDetail).then((data)=>{
            console.log("User Login :");
            console.log(data);

            //save the data to localstorage
            doLogin(data,()=>{
                console.log("Login detail is saved to localstorage")
                //redirect to user dashboard page
                navigate("/user/dashboard")

            })
            toast.success("Login Success")
        }).catch(error=>{
            console.log(error)
            if(error.response.status==400){
                toast.error("Something went wrong on server !!")
            }else{
                toast.error("Something went wrong on server !!")
            }
           
        })
    };

    

    const handleReset=()=>{
        setLoginDetail({
            username:'',
            password:''
        });
    };
    return (

        <Base>
          

         <Container>
            <Row className="mt-4">
                <Col sm={{size:6,offset:3}}>
                   <Card color="dark" inverse>
                        <CardHeader>
                         Login to Get Started...
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={handleFormSubmit}>
                                <FormGroup>
                                     <Label for="Email">Enter Your Email Address</Label>
                                     <Input type="email" placeholder="Enter Your Email Address Here" id="email"
                                     value={loginDetail.username}
                                     onChange={(e)=> handleChange(e,'username')}
                                     />
                                </FormGroup>
                                <FormGroup>
                                     <Label for="Password">Enter Your Password</Label>
                                    <Input type="password" placeholder="Enter Password Here" id="password"
                                    value={loginDetail.password}
                                    onChange={(e)=> handleChange(e,'password')}
                                    />
                                </FormGroup>
            
                                <Container className="text-center">

                                     <Button color="success">Login</Button>
                                     <Button onClick={handleReset} color="secondary" type="reset" className="ms-4">Reset</Button>
                                </Container>
                            </Form>
                        </CardBody>
                    </Card>

                 </Col>
            </Row>
        </Container>


</Base> 
        
        
        
    )
}

export default Login;