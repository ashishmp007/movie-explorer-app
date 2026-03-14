import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Login() {
  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);

    console.log(decoded);

    const user = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    };

    localStorage.setItem("user", JSON.stringify(user));

    window.location.href = "/";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Login Failed")}
      />
    </div>
  );
}

export default Login;
