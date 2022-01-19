import {  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonButton, IonCard, IonCardContent, IonIcon, withIonLifeCycle, IonRow, IonCol  } from '@ionic/react';
import { useEffect, useState } from 'react';
import ExploreContainer from '../../components/ExploreContainer';
import './Listagem.css';
import { useCookies } from 'react-cookie';
import axios from 'axios';

class usuarioModel {
    nome: string | undefined;
    id: number | undefined;
    login: string | undefined;
    status: boolean | undefined;
}

const Listagem: React.FC = () => {
    let [busca,setBusca] = useState<string>();
    let [usuarios,setUsuarios] = useState<usuarioModel[]>();

    useEffect(()=>{
        getUsuarios()
    },[]);

    function getUsuarios(){
        axios.get('http://localhost:8000/api/usuario')
            .then(response => {
                setUsuarios(response.data)
            })
            .catch(err => {
                console.log(err);
            });
    }

    function alterarStatusUsuario(usuario:any){
        usuario.status? usuario.status = false : usuario.status = true;

        axios.put('http://localhost:8000/api/usuario/'+usuario.id,usuario)
            .then(getUsuarios);
    }

    function deletarUsuario(usuario: usuarioModel){
        axios.delete('http://localhost:8000/api/usuario/'+usuario.id)
            .then(getUsuarios);
    }

    function listaUsuarios(){
        let usuariosLista:usuarioModel[] = [];
            usuarios?.map((usuario:usuarioModel)=>{
                if(busca?.length){
                    if(usuario.nome?.toUpperCase().includes(busca.toUpperCase()) || usuario.login?.toUpperCase().includes(busca.toUpperCase())){
                        usuariosLista.push(usuario)
                    }
                }else{
                    usuariosLista.push(usuario)
                }
            });
        return(
            usuariosLista?.map((usuario:usuarioModel)=>{
                return( 
                    <IonItem key={usuario.id}>
                        <IonLabel>{usuario.nome}</IonLabel>
                        <IonLabel>{usuario.login}</IonLabel>
                        <IonLabel>{usuario.status? 'Ativo':'Inativo'}</IonLabel>
                        <IonButton href={'/formulario/'+usuario.id} fill="outline" slot="end">Editar</IonButton>
                        {usuario.status?
                            <IonButton color="danger" onClick={event => alterarStatusUsuario(usuario)} fill="outline" slot="end">Inativar</IonButton>
                        :
                            <><IonButton onClick={event => alterarStatusUsuario(usuario)} color="success" fill="outline" slot="end">Ativar</IonButton><IonButton color="danger" fill="outline" slot="end" onClick={event => deletarUsuario(usuario)}>Deletar</IonButton></>   
                        }
                    </IonItem>
                )
            })
        )
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Listagem</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Listagem</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonRow class="ion-align-items-end">
                    <IonCol>
                        <IonButton href="/formulario" >Cadastrar</IonButton>
                    </IonCol>
                </IonRow>
                <IonCard>
                    <IonInput onIonChange={e => setBusca(e.detail.value!)} value={busca} placeholder='Buscar' ></IonInput>
                </IonCard>
                <IonCard>
                    {listaUsuarios()}
                </IonCard>
            </IonContent>
        </IonPage>
    );
}

export default Listagem;