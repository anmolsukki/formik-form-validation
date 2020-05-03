import React from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Error from "./Error"

const ValidationSchema = Yup.object().shape({
    email: Yup.string().email("Must be an email address").max(255, "Too Long!").required("Required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").max(16, "Too Long!").required("Required")
})

class FormikForm extends React.Component {
    state = {
        email: "",
        password: ""
    };

    render() {
        return (
            <Formik initialValues={{ password: "", email: "" }} validationSchema={ValidationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    axios
                    .post("http://127.0.0.1:4000/api/v1/users/login", values)
                    .then(res => {
                        if (res.data.data.hasOwnProperty("token")) {
                            localStorage.setItem("token", res.data.data.token);
                            alert("Logged In Successfully!");
                            this.props.history.push("/home")
                        }
                    })
                    .catch(err => {
                        alert("Either email or password is wrong!");
                        console.log("Error=====>>>>", err)
                    });
                    // alert(JSON.stringify(values, null, 2));
                    resetForm();
                    setSubmitting(false);
                }} >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, dirty, isValid }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="input-row">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" placeholder="Enter Your Email"
                            onChange={handleChange} onBlur={handleBlur} value={values.email}
                            className={touched.email && errors.email ? "has-error" : null} />
                            <Error touched={touched.email} message={errors.email} />
                        </div>
                        <div className="input-row">
                            <label htmlFor="name">Password</label>
                            <input type="password" name="password" placeholder="Enter Your Password"
                            onChange={handleChange} onBlur={handleBlur} value={values.password}
                            className={touched.password && errors.password ? "has-error" : null} />
                            <Error touched={touched.password} message={errors.password} />
                        </div>
                        <div className="input-row">
                            <button type="submit" disabled={!dirty || !isValid} >Submit</button>
                        </div>
                    </form>
                )}
            </Formik>
        )
    }
}

export default FormikForm;
