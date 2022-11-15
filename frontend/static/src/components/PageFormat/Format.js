import NavBar from "../NavBar/Nav";
import { Outlet } from "react-router-dom";
import "../Styles/MainPage.css"

function Format({ userState, logoutUser }) {
    return(
        <div className="page-format">
            <NavBar userState={userState} logoutUser={logoutUser}></NavBar>
            <Outlet></Outlet>
        </div>
    )
}

export default Format;