import Template from "../components/core/auth/Template";
import loginImg from "/Login_Page_Image.jpg"
console.log("login");

function Login() {
    console.log("login");
    
  return (
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={loginImg}
      formType="login"
    />
  )
}

export default Login