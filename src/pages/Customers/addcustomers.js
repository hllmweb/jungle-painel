import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiAnchor } from 'react-icons/fi';
import { useState } from 'react';
import api from '../../services/api';
import { toast } from "react-toastify";


export default function AddCustomers(){

    const [title, setTitle]                         = useState('')
    const [type_service, setType_Service]           = useState('')
    const [obs, setObs]                             = useState('')
    //const [image_viewfinder, setImage_ViewFinder]   = useState('');


    async function handleSave(e){
        e.preventDefault();
        
        await api.post('/customers/add/',{
            p_id_users: 1,
            p_title: title,
            p_type_service: type_service,
            p_obs: obs
        }).then((response) =>{
            toast.success(response.data.msg);
            // alert(response.data.msg);
            
        }).catch((error) =>{
            console.log("Deu algum erro: ", error);
        })


    }


    return(
        <div>
            <Header />
            <div className="content">
                <Title name="Adicionar Embarcação">
                    <FiAnchor size={25} color="#000"/>
                </Title>
                <div className="container">
                    <form className="form-customers" onSubmit={handleSave}>
                        <label>Titulo</label>
                        <select name="title" value={title} onChange={(e) => setTitle(e.target.value)}>
                            <option selected="selected">Selecione</option>
                            <option value="Iate A">Iate A</option>
                            <option value="Iate B">Iate B</option>
                        </select>
                        {/* <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/> */}

                        <label>Tipo de Serviço</label>
                        {/* <input type="text" name="type_service" value={type_service} onChange={(e) => setType_Service(e.target.value)}/> */}
                        <select name="type_service" value={type_service} onChange={(e) => setType_Service(e.target.value)}>
                            <option selected="selected">Selecione</option>
                            <option value="Abastecimento">Abastecimento</option>
                            <option value="Manuteção">Manutenção</option>
                        </select>


                        <label>Observação</label>
                        <input type="text" name="obs" value={obs} onChange={(e) => setObs(e.target.value)}/>


                        <button type="submit">Salvar</button>
                    </form>
                </div>



            </div>
        </div>
    );
}