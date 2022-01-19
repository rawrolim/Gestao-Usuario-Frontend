import {  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton, withIonLifeCycle, useIonViewDidEnter, useIonViewDidLeave, IonNavLink, IonRouterLink } from '@ionic/react';
import { useEffect, useState } from 'react';
import ExploreContainer from '../../components/ExploreContainer';
import './Formulario.css';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import axios from 'axios';

class usuarioModel {
    nome: string | undefined;
    id: number | undefined;
    login: string | undefined;
    status: boolean | undefined;
    senha: string | undefined;
}

const Formulario: React.FC = () => {
    let [login,setLogin] = useState<string>();
    let [id,setId] = useState<number>();
    let [nome, setNome] = useState<string>();
    let [senha, setSenha] = useState<string>();
    let [senhaRepete, setSenhaRepete] = useState<string>();
    let [usuario,setUsuario] = useState<usuarioModel>();
    let params = {
        usuarioId: ""
    }
    params = useParams();
    
    function limparCampos(){
        setLogin('');
        setId(0);
        setNome('');
        setSenha('');
        setSenhaRepete('');
    }

    useIonViewDidEnter(()=>{
        getEdit();
    })

    function getEdit(){
        if(params.usuarioId != undefined){
            axios.get('http://localhost:8000/api/usuario/'+params.usuarioId)
                .then(response => {
                    setId(response.data?.id);
                    setNome(response.data?.nome);
                    setLogin(response.data?.login);
                    setSenha(response.data?.senha);
                    setSenhaRepete(response.data?.senha);
                }); 
        }
    }

    function salvar(){
        var obj = {
            "login":login,
            "nome":nome,
            "senha":senha,
            "senha_repete":senhaRepete,
            "id":id,
            "status":true
        }
        if(params.usuarioId == undefined){
            axios.post('http://localhost:8000/api/usuario',obj)
            .then(response => response.data)
            .then(data => {
                if(data.erro == ''){
                    alert('usuário criado com sucesso.');
                    window.location.href="/listagem"
                }else{
                    alert(data.erro)
                }
            });
            limparCampos();
        }else{
            axios.put('http://localhost:8000/api/usuario/'+obj.id,obj)
            .then(response => response.data)
            .then(data => {
                if(data.erro == ''){
                    alert('usuário editado com sucesso.');
                    window.location.href="/listagem"
                }else{
                    alert(data.erro)
                }
            });
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Formulario
                    </IonTitle>
                    
                    <IonRouterLink href="/Listagem">Voltar</IonRouterLink>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Formulario</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonList>
                    <IonItem>
                        <IonInput value={nome} placeholder="Insira o nome" onIonChange={e => setNome(e.detail.value!)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonInput value={login} placeholder="Insira o login" onIonChange={e => setLogin(e.detail.value!)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonInput type='password' value={senha} placeholder="Insira a senha" onIonChange={e => setSenha(e.detail.value!)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonInput type='password' value={senhaRepete} placeholder="Repita a senha" onIonChange={e => setSenhaRepete(e.detail.value!)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonButton onClick={salvar}>Salvar</IonButton>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
}

export default Formulario;