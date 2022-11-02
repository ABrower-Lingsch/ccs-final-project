import NavBar from "../NavBar/Nav";
import { Outlet } from "react-router-dom";

function Format({ userState, logoutUser }) {
    return(
        <>
            <NavBar userState={userState} logoutUser={logoutUser}></NavBar>
            <Outlet></Outlet>
        </>
    )
}

export default Format;