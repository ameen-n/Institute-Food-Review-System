import {Redirect} from "react-router-dom";
import { useCookies } from 'react-cookie';

export default function Logout(){

    const [cookies, setCookie , removeCookie] = useCookies(['user']);
    return (
        <>
            {sessionStorage.clear()}
            {removeCookie('jwttoken')}
            {removeCookie('ADMIN')}
            <Redirect to="/" />

        </>
    
    )
}