import NavBar from "../NavBar/Nav";
import { Outlet } from "react-router-dom";

function Format({ superState, logoutUser }) {
    return(
        <>
            <NavBar superState={superState} logoutUser={logoutUser}></NavBar>
            <Outlet></Outlet>
        </>
    )
}

export default Format;