import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useContext } from 'react';
import Title from '../../components/Title';
import { FiAnchor } from 'react-icons/fi';
import { useParams } from "react-router-dom";
import Webcam from "react-webcam";
// import Homecam from '../../components/WebcamCapture';
import api from '../../services/api';
import { toast } from "react-toastify";
import { AuthContext } from '../../contexts/auth';
//useLocation

export default function Details(){
    const { id } = useParams();
    const webcamRef = React.useRef(null);
    const { user } = useContext(AuthContext);
    console.log(user.type_user);
    //const title = props.location.detalhes.title;
    // const type_service = props.location.detalhes.type_service;

    // const [title, setTitle]                         = useState(props.location.detalhes.title)
    // const [type_service, setType_Service]           = useState(props.location.detalhes.type_service)
    // const [obs, setObs]                             = useState(props.location.detalhes.obs)
    // const [image_viewfinder, setImage_ViewFinder]   = useState(props.location.detalhes.image_viewfinder);


  
    // const [image_viewfinder, setImage_ViewFinder]   = useState(data.image_viewfinder);


    const [data, setData] = useState([]);
    
    // const status = props.location.detalhes.status;
    // const [status_item, setStatus_Item] = useState();
    // const location = useLocation();
    // const {title} = location.state.title;
    // const history = useHistory();

   console.log(data)
      
    useEffect(() => {
        async function handleList(){
            await api.post('/customers/list_id',{
                p_id: id
            }).then((response) => {
                setData(response.data);
                setTitle(response.data.title);
                setType_Service(response.data.type_service);
                setObs(response.data.obs);
                setImage_ViewFinder(response.data.image_viewfinder);
                setStatus(response.data.status);
                

            }).catch((error) => {
                console.log(error);
            })
        }

        handleList();

        return () => {
            
        }

    },[id])

    const [title, setTitle]                         = useState()
    const [type_service, setType_Service]           = useState()
    const [obs, setObs]                             = useState()
    const [image_viewfinder, setImage_ViewFinder]   = useState()
    const [status, setStatus]                       = useState()
   
    // console.log(image_viewfinder)
    // console.log("okoko"+title);
    // console.log("teste"+data.title);
  
    async function handleSave(e){
        e.preventDefault();


        await api.post('/customers/edit/',{
            p_id: id,
            p_id_users: 1,
            p_title: title,
            p_type_service: type_service,
            p_status: status,
            p_image_viewfinder: image_viewfinder,
            p_obs: obs
        }).then((response) => {
            toast.success(response.data.msg);
            // alert(response.data.msg);
        }).catch((error) =>{
            console.log(error);
        })

    }


    const videoConstraints = {
        width: "100%",
        height: "100%",
        facingMode: "environment"
    };

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
    
        setImage_ViewFinder(imageSrc)
    },[webcamRef]);

    //console.log("okok"+image_viewfinder)
    return(
        <div>
            <Header />
            <div className="content">
                <Title name="Editar Embarcação">
                    <FiAnchor size={25} color="#000"/>
                </Title>

                <div className="container">
                    <form className="form-customers" onSubmit={handleSave}>
                        <label>Titulo</label>
                        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} disabled/>

                        <label>Tipo de Serviço</label>
                        <input type="text" name="type_service" value={type_service} onChange={(e) => setType_Service(e.target.value)} disabled/>
                        {image_viewfinder===null && user.type_user !== 'administrador' && <button onClick={(e)=>{e.preventDefault();capture();}} className="btn-capture">Capturar Visor</button>}

                        {image_viewfinder===null && user.type_user !== 'administrador' &&
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width="100%"
                            height="100%"
                            videoConstraints={videoConstraints}
                        />}
                        
                       {image_viewfinder !== null ?
                       <img src={image_viewfinder} alt="imagem capturada" width="100%"
                       height="100%" className="form-photo"/> 
                       : <div className="phono-none">Foto Não Anexada</div>
                       }

                        
                        

                        <input type="hidden" name="image_viewfinder" value={image_viewfinder} onChange={(e) => setImage_ViewFinder(e.target.value)}/>
                        
                        
                        {user.type_user === 'administrador' && <div>
                        <label>Status</label>
                        <select name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                            {status === 0 && <option value="0">Pendente</option>}
                            {status === 1 && <option value="1">Autorizar</option>}
                            <option value="0">Pendente</option>
                            <option value="1">Autorizar</option>
                        </select></div>}

                        {/* {image_viewfinder !== '' ? <img src={image_viewfinder} alt={title} width="250" className="form-photo"/>: <Homecam />} */}
                        {/* <Homecam data_imagem={image_viewfinder}/> */}

                        <label>Observação</label>
                        <input type="text" name="obs" value={obs} onChange={(e) => setObs(e.target.value)}/>
                        {/* <select defaultValue={type_service}>
                            <option selected="selected">{type_service}</option>
                            <option>Gasolina</option>
                            <option>Manutenção</option>
                        </select> */}

                        {/* <label>Status</label>
                        <select>
                            <option selected="selected">---</option>
                            <option value="1">Autorizado</option>
                            <option value="0">Não Autorizado</option>
                        </select> */}


                        <button type="submit">Atualizar</button>
                    </form>

                </div>
            </div>
            
        </div>
    )
}