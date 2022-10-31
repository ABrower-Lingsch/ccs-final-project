import ClientRegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

function UserLogin(props) {
    return (
      <div className="user-login">
        <LoginForm setAuth={props.setAuth} setUser={props.setUser} />
        <ClientRegisterForm setAuth={props.setAuth} />
      </div>
    );
  }
  
  export default UserLogin;