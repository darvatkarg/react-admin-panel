import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap"

// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

//redux
import { useSelector, useDispatch } from "react-redux"
import { createSelector } from "reselect"
import withRouter from "components/Common/withRouter"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

import avatar from "../../assets/images/users/avatar-1.jpg"
// actions
import { editProfile, resetProfileFlag } from "../../store/actions"
import { get, put } from "helpers/api_helper"

const UserProfile = () => {
  //meta title
  document.title = "Profile | Skote - React Admin & Dashboard Template"

  const dispatch = useDispatch()

  const [user, setUser] = useState("")

  const ProfileProperties = createSelector(
    state => state.Profile,
    profile => ({
      error: profile.error,
      success: profile.success,
    })
  )

  const { error, success } = useSelector(ProfileProperties)

  const { id } = useParams()
  console.log(id)

  async function showUserById() {
    try {
      const res = await get(`/find/${id}`)
      console.log(res)
      setUser(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // if (localStorage.getItem("authUser")) {
    //   const obj = JSON.parse(localStorage.getItem("authUser"))
    //   if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
    //     setname(obj.displayName)
    //     setEmail(obj.email)
    //     setidx(obj.uid)
    //   } else if (
    //     process.env.REACT_APP_DEFAULTAUTH === "fake" ||
    //     process.env.REACT_APP_DEFAULTAUTH === "jwt"
    //   ) {
    //     setname(obj.first_name)
    //     setEmail(obj.email)
    //     setidx(obj.uid)
    //   }
    //   setTimeout(() => {
    //     dispatch(resetProfileFlag())
    //   }, 3000)
    // }
    showUserById()
  }, [])

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Please Enter Your First Name"),
      last_name: Yup.string().required("Please Enter Your Last Name"),
      email: Yup.string().required("Please Enter Your Email"),
    }),
    onSubmit: async(values, {resetForm}) => {
      // dispatch(editProfile(values))
      try {
        const res = await put(`/update/${id}`, values)
        console.log(res);
        resetForm()
        showUserById()
      } catch (err) {
        console.log(err);
      }
    },
  })

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Profile" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="ms-3 me-3">
                      <img
                        src={avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{user.first_name}</h5>
                        <p className="mb-1">{ user.email }</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Change User Name</h4>

          <Card>
            <CardBody>
              <Form
                className="form-horizontal"
                onSubmit={e => {
                  e.preventDefault()
                  validation.handleSubmit()
                  return false
                }}
              >
                <div className="form-group mb-4">
                  <Label className="form-label">First Name</Label>
                  <Input
                    name="first_name"
                    // value={name}
                    className="form-control"
                    placeholder="Enter User Name"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.first_name || ""}
                    invalid={
                      validation.touched.first_name &&
                      validation.errors.first_name
                        ? true
                        : false
                    }
                  />
                  {validation.touched.first_name &&
                  validation.errors.first_name ? (
                    <FormFeedback type="invalid">
                      {validation.errors.first_name}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="form-group mb-4">
                  <Label className="form-label">Last Name</Label>
                  <Input
                    name="last_name"
                    // value={name}
                    className="form-control"
                    placeholder="Enter Last Name"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.last_name || ""}
                    invalid={
                      validation.touched.last_name &&
                      validation.errors.last_name
                        ? true
                        : false
                    }
                  />
                  {validation.touched.last_name &&
                  validation.errors.last_name ? (
                    <FormFeedback type="invalid">
                      {validation.errors.last_name}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="form-group mb-4">
                  <Label className="form-label">Email</Label>
                  <Input
                    name="email"
                    // value={name}
                    className="form-control"
                    placeholder="Enter Email"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.email || ""}
                    invalid={
                      validation.touched.email && validation.errors.email
                        ? true
                        : false
                    }
                  />
                  {validation.touched.email && validation.errors.email ? (
                    <FormFeedback type="invalid">
                      {validation.errors.email}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="text-center mt-4">
                  <Button type="submit" color="danger">
                    Update User
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(UserProfile)
