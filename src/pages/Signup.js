
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container,Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { signUp } from "../services/user-service";
import { toast } from 'react-toastify';

const Signup =()=>{

    const [data,setData] = useState({
        
         firstName:'',
         middleName:'',
         lastName:'',
         email:'',
         password:'',
         profession:'',
         description:'',
    })

    useEffect(()=>{
        console.log(data);
    },[data])

    const [error, setError] = useState({
        errors:{},
        isError:false
    })

    //handle change
    const handleChange = (event,property) =>{
        //dynamic setting the value
        setData({...data,[property]:event.target.value})
    }
///reseting form
    const resetData =()=>{
        setData({
            firstName:'',
            middleName:'',
            lastName:'',
            email:'',
            password:'',
            profession:'',
            description:'',
        })
    }
    //submit from
    const submitForm =(event)=>{
        event.preventDefault()

        if(error.isError){
            toast.error("Form data is invalid, correct all details then submit")
            setError({...error, isError:false})
            return;
        }
        console.log(data);

        //data validate

        //call server api for sending data
        signUp(data).then((resp)=>{
            console.log(resp)
            console.log("success log");
            toast.success("user is registered successfully!!")
            setData({
                firstName:'',
                middleName:'',
               lastName:'',
               email:'',
               password:'',
               profession:'',
               description:'',
            })
        }).catch((error)=>{
            console.log(error)
            console.log("Error Log")
            //handle errors in proper way 
            setError({
                errors:error,
                isError:true
            })
        });
    }
    return (

        <Base>

            <Container>
                <Row className="mt-4">
                    <Col sm={{size:6,offset:3}}>
                    <Card color="dark" inverse>
                  <CardHeader>
                  Sign Up to Get Started...
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={submitForm}>
                        <FormGroup>
                            <Label for="First Name">Enter Your First Name</Label>
                            <Input type="text" placeholder="Enter Your First Name Here" id="firstName" 
                            onChange={(e)=>handleChange(e, 'firstName')}
                            value={data.firstName} 
                            invalid={error.errors?.response?.data?.firstName ? true:false}
                            />
                            <FormFeedback>
                                {error.errors?.response?.data?.firstName}
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="Middle Name">Enter Your Middle Name</Label>
                            <Input type="text" placeholder="Enter Your Middle Name Here" id="middleName"
                             onChange={(e)=>handleChange(e, 'middleName')}
                             value={data.middleName}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="Last Name">Enter Your Last Name</Label>
                            <Input type="text" placeholder="Enter Your Last Name Here" id="lastName" 
                            onChange={(e)=>handleChange(e, 'lastName')}
                            value={data.lastName}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="Email Address">Enter Your Email Address</Label>
                            <Input type="email" placeholder="Enter Your Email Address Here" id="email" 
                            onChange={(e)=>handleChange(e, 'email')}
                            value={data.email}
                            invalid={error.errors?.response?.data?.email ? true:false}
                            />
                            <FormFeedback>
                                {error.errors?.response?.data?.email}
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="Password">Enter Your Password</Label>
                            <Input type="password" placeholder="Enter Your Password Here" id="password" 
                            onChange={(e)=>handleChange(e, 'password')}
                            value={data.password}
                            invalid={error.errors?.response?.data?.password ? true:false}
                            />
                            <FormFeedback>
                                {error.errors?.response?.data?.password}
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="Profession">Enter Your Profession </Label>
                            <Input type="text" placeholder="Enter Your Profession Here" id="profession" 
                            onChange={(e)=>handleChange(e, 'profession')}
                            value={data.profession}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="Description Name">Something About Yourself</Label>
                            <Input type="textarea" placeholder="Little Description About Yourself" id="description" 
                            onChange={(e)=>handleChange(e, 'description')}
                            value={data.description}/>
                        </FormGroup>
                        <Container className="text-center">

                            <Button color="primary">Register</Button>
                            <Button onClick={resetData} color="secondary" type="reset" className="ms-4">Reset</Button>
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

export default Signup;