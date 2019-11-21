import React from "react"
import './Loader.css'

const Loader = props => (
    <div className={'loader-wrap'}>
        <div className={"lds-ring"}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>

)

export default Loader