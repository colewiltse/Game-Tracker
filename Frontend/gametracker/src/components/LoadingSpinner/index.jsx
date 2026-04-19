export default function LoadingSpinner ({ loading }) {

    if(loading){
        return(
            <div className="text-start mt-3">
                <span class="spinner-border text-primary me-3"></span>
                <span role="status">Loading...</span>
            </div>
        );
    } else {
        return <></>
    }
}