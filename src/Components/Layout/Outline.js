import { Fragment } from "react";
import PageHeader from "./Header/PageHeader";

const Outline = (props) => {
    return (
        <Fragment>
            <PageHeader />
            {props.children}
        </Fragment>
    );
}

export default Outline;