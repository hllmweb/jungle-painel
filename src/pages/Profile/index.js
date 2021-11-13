import { useState, useContext } from 'react';
import './profile.css';
import Header from '../../components/Header';
import Title from '../../components/Title';

import { AuthContext  } from '../../contexts/auth';
import api from '../../services/api';

import { FiSettings } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function Profile(){
    const { user, signOut, setUser, storageUser } = useContext(AuthContext);
    
    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);
    const [loadingAuth, setLoadingAuth] = useState(false);


    async function handleSave(e){
        e.preventDefault();
        if(name !== ''){
           setLoadingAuth(true);
           await api.post('/user/edit',{
                p_id: user.id,
                p_name: name,
                p_email: email  
           })
           .then( async (response) =>{
                console.log(response.data);
                setLoadingAuth(false);
                toast.success(response.data.mensagem);
                
                let data ={
                    ...user,
                    name: name,
                    email: email
                }

                setUser(data);
                storageUser(data);
           })
           .catch((error) => {
                console.log(error);
                toast.error('Ops, algo deu errado!');
                setLoadingAuth(false);
           })
        }
    }

    return(
        <div>
            <Header />

            <div className="content">
                <Title name="Minhas Configurações">
                    <FiSettings size={25} color="#000" />
                </Title>


                <div className="container">
                    <form className="form-profile" onSubmit={handleSave}>

                        <label>Nome</label>
                        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                   
                        <label>Email</label>
                        <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                       
                        <button type="submit">{loadingAuth ? 'Carregando...' : 'Atualizar'}</button>
                    </form>
                </div>

                <div className="container-bottom">
                    <button className="logout-btn" onClick={() => signOut()}>Sair</button>
                </div>



            </div>
        </div>
    );
}