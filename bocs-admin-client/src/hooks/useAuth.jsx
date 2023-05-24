import { useContext } from 'react';
import { UserContext } from '../App';

const useAuth = () => {
    return useContext(UserContext);
}

export default useAuth;