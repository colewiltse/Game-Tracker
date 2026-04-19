import Spinner from "react-bootstrap/esm/Spinner";

export default function LoadingSpinner ({ loading }) {

    if(loading){
        return(
            <div className="text-start mt-3">
                <Spinner animation="border" className="text-primary me-3"/>
                <span role="status">Loading...</span>
            </div>
        );
    } else {
        return <></>
    }
}