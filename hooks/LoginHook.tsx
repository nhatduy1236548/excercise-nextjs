import {GoogleLogin} from 'react-google-login'

export function LoginGoogleButton() {
    const onSucess = (res: any) => {
        console.log('[Login Sucess] currentUser:', res.profileObj);
    }

    const onFailure = (res: any) => {
        console.log('[Login failed] res', res);
    };

    return (
        <div>
            <GoogleLogin 
            clientId={process.env.GOOGLE_CLIENT_ID as string}
            buttonText="Login"
            onSuccess={onSucess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            style={{marginTop:'100px'}}
            isSignedIn={true}
        />
        </div>
        
    );
}