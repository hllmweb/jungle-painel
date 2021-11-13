import React, { useState } from 'react';
import Webcam from "react-webcam";
import './webcam.css';
//const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "environment"
};
  
const WebcamCapture = (props) => {
  const webcamRef = React.useRef(null);
  const [image, setImage] = useState(props.data_imagem);
  console.log(image)

  const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();

      setImage(imageSrc)
    },[webcamRef]);


  return(
    <div>
      {/* <Webcam
        audio={false}
        height={200}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={220}
        videoConstraints={videoConstraints}
      /> */}
      {/* <label>Tirar Fotos</label> */}
      <button onClick={(e)=>{e.preventDefault();capture();}} className="btn">Capturar Visor</button>
    
      <div className="webcam-container">
        <div className="webcam-img">
          
          {image==null?<Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width="100%"
          height="100%"
          videoConstraints={videoConstraints}
          />:
          <img src={image} alt="imagem capturada" width="100%"
          height="100%"/>   
          }

          <input type="hidden" value={image}/>
        </div>
      </div>

    </div>
  );

}

export default WebcamCapture;