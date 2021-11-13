import { useState, createContext, useEffect } from "react";
import api from '../services/api';
import { toast } from "react-toastify";


export const AuthContext = createContext({});


function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        function loadStorage(){
            const storageUser = localStorage.getItem('SistemaUser');
            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
    
            setLoading(false);
        }

        loadStorage();

    },[])


    //Fazendo login do usuario
    async function signIn(login, password){
        setLoadingAuth(true);

        await api.post('/auth',{
            p_login: login,
            p_password: password
        })
        .then(async (response) => {
            console.log(response.data);
            // let dados = {
            //     id: response.data.id
            // }
            

            if(response.data !== false){
                setUser(response.data);
                storageUser(response.data);
                setLoadingAuth(false);
                toast.success('Bem vindo a plataforma!');
            }else{
                toast.error('Ops, algo deu errado!');
                setLoadingAuth(false);
            }


        })
        .catch((error)=>{
            console.log(error);
            toast.error('Ops, algo deu errado!');
            setLoadingAuth(false);
        })

    }


    function storageUser(data){
        localStorage.setItem('SistemaUser', JSON.stringify(data));
    }


    function signOut(){
        localStorage.removeItem('SistemaUser');
        setUser(null);
    }


    return(
        <AuthContext.Provider 
        value={{ signed: !!user, 
                user, 
                loading, 
                signIn, 
                signOut,
                loadingAuth,
                setUser,
                storageUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;