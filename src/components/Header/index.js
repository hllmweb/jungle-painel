//import { useContext } from 'react';
import './header.css';
//import { AuthContext } from '../../contexts/auth';

import { Link } from 'react-router-dom';
import { FiHome,  FiAnchor, FiSettings } from "react-icons/fi";


export default function Header(){
    //const { user } = useContext(AuthContext);
    
    return(
        <div className="sidebar">
            <Link to="/dashboard">
                <FiHome color="#FFF" size={25} />
                Inicio
            </Link>
            
            <Link to="/customers">
                <FiAnchor color="#FFF" size={25} />
                Embarcação
            </Link>
            
            <Link to="/profile">
                <FiSettings color="#FFF" size={25} />
                Configurações
            </Link>

        </div>
    );
}