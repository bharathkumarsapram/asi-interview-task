import React from "react";


const HigherOrderComponent = ({ Component }) => {

    return (<div>
        {<Component isVisable={true} />}
    </div>)

}

export default HigherOrderComponent;