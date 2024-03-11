import React from "react";
import "./Login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/slices/UserAdminSlice";
import { useDispatch } from "react-redux";
import { Cookies } from "react-cookie";

const Login = () => {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const token = cookies.get('token');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("email is Required"),
      password: Yup.string().required("password is Required"),
    }),
    onSubmit: async (values) => {
      dispatch(loginUser(values));
      if (token !== undefined) {
        navigate("/home");
      } else {
        navigate("/")
      }
    },
  });

  return (
    <div className="wrapper">
      <div className="login-box">
        <form onSubmit={formik.handleSubmit}>
          <h2>Login</h2>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="mail"></ion-icon>
            </span>
            <input
              type="email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Enter email"
            />
          </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}

          <div className="input-box">
            <span className="icon">
              <ion-icon name="lock-closed"></ion-icon>
            </span>
            <input
              type="password"
              name="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Enter password"
            />
          </div>
          {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}

          {/* Uncomment this section if you want to add Forgot Password */}
          {/* <div className="remember-forgot">
            <p>Forgot Password?</p>
          </div> */}

          <button type="submit" className="loggin_submit">Login</button>

          <div className="register-link">
            <p>
              Don't have an account?{" "}
              <a onClick={() => navigate("/signup")}>Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
