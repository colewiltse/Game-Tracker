import Alert from "react-bootstrap/Alert";

export default function ErrorAlert({ error }) {
    if (!error) return null;

    return (
        <Alert variant="danger">
            {typeof error === "string"
                ? error
                : JSON.stringify(error)}
        </Alert>
    );
}