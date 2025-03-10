import jwtDecode from "jwt-decode";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import api from '../api';
import { IUser } from "src/types/types";
import { ListContext } from "./ListContext";
import { MediumContext } from "./MediumContext";
import Loading from "src/utilities/Loading";
import { Alert } from "src/utilities/popups";

export const UserContext = createContext({} as any);

interface IToken {
    id: number,
    name: string,
    iat: number,
    exp: number
}

export const UserStore = ({ children }: any) => {
    const [loading, setLoading] = useState(true);
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState({} as IUser);
    const [token, setToken] = useState(localStorage.getItem('token') as string);
    const [users, setUsers] = useState([] as Array<IUser>);
    const [userChangePassword, setUserChangePassword] = useState({} as IUser);
    const [errorMessage, setErrorMessage] = useState('');

    const { getData } = useContext(ListContext);
    const { loadMedium } = useContext(MediumContext);
    
    const getUser = useCallback(async (token: string) => {
        try {
            const { data } = await api.get('/user/get', {headers: {Authorization: token}})
            setUser(data.user);
            setLogin(true);
            setLoading(false);
        } catch (error) {
            console.error('Usuário não autenticado', error);
            setLogin(false);
        }
    }, []);

    const tokenValidation = (token: string) => {
        if(!token) {
            setLogin(false);
            return;
        }
        try {
            const decodedToken: IToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp > currentTime) {
                setLogin(true);
            } else {
                setLogin(false);
            }
        } catch(error) {
            setLogin(false);
            console.error('Erro na validação do token', error);
        }
    }
    
    const getInfo = useCallback(async () => {
        try {
            await getUser(token);
            await getData(token);
            await loadMedium(token);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao carregar dados do sistema', error);
        }
    }, [getUser, getData, loadMedium, token])

    useEffect(() => {
        tokenValidation(token);
    }, [token])

    useEffect(() => {
        getInfo();
    }, [getInfo]);

    const handleLogin = async (name: string, password: string) => {
        try {
            const { data } = await api.post('/user/login', {name, password})
            if(data.token) {
                setLogin(true);
                localStorage.setItem('token', data.token);
                setToken(data.token);
                await getUser(data.token);
            }
            setErrorMessage(data.message);
        } catch (error) {
            console.log('Não foi possível fazer o login', error)
            setErrorMessage('Não foi possível fazer o login. Tente novamente mais tarde.');
            Alert('Não foi possível fazer o login. Tente novamente mais tarde.', 'error')
        }
    }

    const logOut = () => {
        localStorage.removeItem('token');
        setLogin(false);
        setUser({} as IUser);
    }

    const loadUser = useCallback(async (token: string) => {
        try {
            const { data } = await api.get('/user/get-users', {headers:{Authorization: token}})
            const userList = data.user.map((item: IUser) => ({...item}))
            setUsers(userList)
        } catch (error) {
            console.log('Erro ao carregar a lista de usuários', error);
            Alert('Erro ao carregar a lista de usuários', 'error');
        }
    }, []);

    return (
        <UserContext.Provider value={{login, user, users, token, getUser, handleLogin, logOut, loadUser, errorMessage, setErrorMessage, userChangePassword, setUserChangePassword}} >
            {loading ? <Loading /> : children }
        </UserContext.Provider>
    )
}