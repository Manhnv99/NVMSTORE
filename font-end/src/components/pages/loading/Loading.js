
import "./Loading.css"
import {memo} from "react";

const Loading=()=>{

    return(
        <>
            <div className={"loading-container"}>
                <div className={"loading-content"}>
                    <img src="/logo.png"/>
                </div>
            </div>
        </>
    )
}

export default memo(Loading)