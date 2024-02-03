import "./style/QRCode.css"
import {Button, Modal} from "react-bootstrap";
import {useState} from "react";
import {QrReader} from "react-qr-reader";


const QRCode=()=>{
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    const handleError=(e)=>{
        console.log(e)
    }
    const handleResult=(data)=>{
        try {
            if(data){
                handleClose()
            }
        }catch (e){
            console.log(e)
        }
    }


    return(
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <QrReader
                        delay={300}
                        onError={handleError}
                        onResult={handleResult}
                        legacyMode
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default QRCode