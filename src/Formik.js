import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object({
  firstName: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password is too short")
    .max(10, "Password is too long"),
  cfPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  )
});

export const ValidationSchemaExample = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCfPassword, setCfShowPassword] = useState(false);

  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          cfPassword: ""
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // Same shape as initial values
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <label>First Name:</label>
            <Field name="firstName" />
            {errors.firstName && touched.firstName ? (
              <div>{errors.firstName}</div>
            ) : null}
            <br />
            <label>Last Name:</label>
            <Field name="lastName" />
            {errors.lastName && touched.lastName ? (
              <div>{errors.lastName}</div>
            ) : null}
            <br />
            <label>Email:</label>
            <Field name="email" type="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <br />
            <label>Password:</label>
            <Field name="password" type={showPassword ? "text" : "password"} />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <br />
            <label>Confirm Password:</label>
            <Field
              type={showCfPassword ? "text" : "password"}
              name="cfPassword"
            />
            <button
              type="button"
              onClick={() => setCfShowPassword(!showCfPassword)}
            >
              {showCfPassword ? "Hide" : "Show"}
            </button>
            {errors.cfPassword && touched.cfPassword ? (
              <p>Passwords must match</p>
            ) : null}
            <br />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
