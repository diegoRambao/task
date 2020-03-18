import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, IonButtons, IonBackButton, IonInput, IonDatetime, IonButton, IonToast } from '@ionic/react';
import React, { useState } from 'react';
import axios from 'axios'
import { RouteComponentProps } from 'react-router';
import { checkmark } from 'ionicons/icons'

interface Task {
    name: string;
    description: string;
    date: string;
}

const NewTask: React.FC<RouteComponentProps> = (props) => {

    const [task, setTask] = useState<Task>({
        name : '',
        description: '',
        date: ''
    });

    const [showToast, setShowToast] = useState(false);

    const apiUrl = "http://localhost/api.task/tasksadd";

    const insertTask = () => {

        const formData = new FormData();
        formData.append("name", task.name);
        formData.append("description", task.description);
        formData.append("date", task.date);

        console.log(formData);
        axios.post(apiUrl, formData)
            .then( (result) => {
                setShowToast(true);
                props.history.push('/home')
            })
    }


    const handleChangeIn = (e : any) => {
        setTask({...task, [e.target.name] : e.target.value})
    }

  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar>
            <IonButtons slot="start">
                <IonBackButton defaultHref="/home"/>
            </IonButtons>
            
            
          <IonTitle>Tareas</IonTitle>
          <IonButton fill="clear" slot="end" onClick={insertTask}>
                <IonIcon icon={checkmark}/>
            </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
          <IonList>
              <IonItem>
                <IonLabel position="stacked">¿Qué deseas Hacer?</IonLabel>
                <IonInput 
                name="name" 
                id="name" 
                type="text" 
                inputmode="text"
                autofocus={true}
                onIonChange={ handleChangeIn }
                />
              </IonItem>
              <IonItem>
                  <IonLabel position="stacked">Descripcción</IonLabel>
                <IonInput 
                    name="description" 
                    id="description" 
                    type="text" 
                    inputmode="text"
                    autofocus={true}
                    onIonChange={ handleChangeIn}
                />
                </IonItem>
                <IonItem>
                <IonLabel position="stacked">Fecha</IonLabel>
                    <IonDatetime displayFormat="YYYY-MM-DD"  id="date" name="date" onIonChange={ handleChangeIn} mode="ios">
                        
                    </IonDatetime>
                </IonItem>
          </IonList>
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message="Tu Tarea a sido guardada."
            duration={2000}
            mode="ios"
        />
      </IonContent>
    </IonPage>
  );
};

export default NewTask;
