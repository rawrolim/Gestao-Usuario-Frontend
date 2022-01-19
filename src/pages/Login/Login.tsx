import {  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton } from '@ionic/react';
import { useState } from 'react';
import ExploreContainer from '../../components/ExploreContainer';
import './Login.css';
import { useCookies } from 'react-cookie';

const Login: React.FC = () => {
    var [Login, setLogin] = useState<string>();
    var [senha, setSenha] = useState<string>();
    var [cookies, setCookie] = useCookies(['usuarioId']);

    function logar(){
        var obj = {
            "login":Login,
            "senha":senha
        }
        fetch('http://localhost:8000/api/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj) 
            }
        )
        .then(response => response.json())
        .then(data=>setCookie('usuarioId',data[0].id));
        setSenha('');
        setLogin('');
        window.location.href = "/formulario"
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">Login</IonTitle>
                </IonToolbar>
                </IonHeader>
                <IonList>
                <IonItem>
                    <IonInput value={Login} placeholder="Insira o login" onIonChange={e => setLogin(e.detail.value!)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonInput type="password" value={senha} placeholder="Insira a senha" onIonChange={e => setSenha(e.detail.value!)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonButton color="primary" onClick={logar}>Logar</IonButton>
                </IonItem>
                </IonList>

            </IonContent>
        </IonPage>
    );
};

export default Login;
