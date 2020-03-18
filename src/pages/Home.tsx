import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, useIonViewDidEnter, IonToggle } from '@ionic/react';
import { add } from 'ionicons/icons';
import React, { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';


interface Task {
  id: number,
  name: string;
  description: string;
  date: string;
}

const Home: React.FC<RouteComponentProps> = (props ) => {

  const [task, setTask] = useState<Task[]>([]);


  
  useIonViewDidEnter( () => {
    GetData()
  })

  const GetData = async () => {

    const result = await axios('http://localhost/api.task/tasks');

    setTask(result.data)

  }
  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar>
          <IonTitle>Tareas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList mode="ios">
          {
            task.map( ( item ) => {
              return(
                <IonItem key={item.id}>
                  <IonLabel>
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                  </IonLabel>
                  <IonToggle color="danger" mode="ios" slot="start" onIonChange={ (e) => console.log(e.detail.value!) }/>
                </IonItem>    
              )
            })
          }
          

        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">

          <IonFabButton onClick={ () => props.history.push('/new')}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        
      </IonContent>
    </IonPage>
  );
};

export default Home;
