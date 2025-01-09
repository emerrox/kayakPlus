import { useNavigate, useSearchParams } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import useIsLogged from '../contexts/useIsLogged';
import { useState } from 'react';
import 'ldrs/ring'
import { Loader } from '@mantine/core';

export default function Landing (){
    const { responseMessage, errorMessage } = useIsLogged();
    const [searchParams] = useSearchParams();
    const paramToken = searchParams.get('token') || '';
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    return (

        <div className="cont">
            {loading ?
                <Loader color="black" />: <GoogleLogin onSuccess={(response) => responseMessage(response, paramToken, navigate, setLoading)} onError={errorMessage} />}
            {/* <Link to={"/login"}>
                <button>ir a login</button>
            </Link> */}
        </div>
    );
}