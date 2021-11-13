import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth'

import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiHome } from 'react-icons/fi';

export default function Dashboard(){

    const { signOut } = useContext(AuthContext);

    const logout = () => {
        signOut();
    }

    return(
        <div>
            <Header />
            <div className="content">
                <Title name="Dashboard">
                    <FiHome size={25} color="#000" />
                </Title>
                <div className="container">
                    

                </div>
            </div>
            
            
            
            <button onClick={()=>logout()}>Sair</button>
        </div>
    );
}