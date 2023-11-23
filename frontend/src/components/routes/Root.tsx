import {Outlet} from "react-router-dom";

const Root = () => {
    return (
        <>
            {/* all the other elements */}
            <div id="detail">
                <Outlet />
            </div>
        </>    )
}

export default Root;