import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonButton, IonContent, IonModal, IonHeader, IonToolbar, IonButtons, IonTitle } from '@ionic/react';
import {
  INITIAL_BLOQUE, useBloqueInfo
} from '../contexts/BloqueInfoContext';
import BloquesSettingsC from './BloquesSettingsC';
import { useState } from 'react';

const SettingsC = () => {
  const { bloques, addBloque } = useBloqueInfo();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [bloqueForm, setBloqueForm] = useState(INITIAL_BLOQUE);

  const handleConfirm = () => {
    addBloque(bloqueForm);
    setIsOpenModal(false);
    setBloqueForm(INITIAL_BLOQUE);
  };

  const isObjEqual = (obj1: any, obj2: any): boolean => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  };

  const IsNoBloques = bloques?.length === 0;

  return (
    <div>

      <IonAccordionGroup>
        <IonAccordion value="first">
          <IonItem slot="header" color="light">
            <IonLabel>Bloques</IonLabel>
          </IonItem>
          <div className="ion-padding" slot="content">
            {IsNoBloques ? (
              <div className="ion-text-center">
                <p>No hay bloques</p>
                <IonButton onClick={() => setIsOpenModal(true)}>
                  Añadir bloques
                </IonButton>
              </div>
            ) : (
              <BloquesSettingsC />
            )}
          </div>
        </IonAccordion>
      </IonAccordionGroup>

      {/* modal add bloques */}
      <IonModal isOpen={isOpenModal} onDidDismiss={() => setIsOpenModal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => setIsOpenModal(false)}>Cancel</IonButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton strong={true} onClick={handleConfirm}>
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="ion-padding">
            <IonTitle>Bloques</IonTitle>
            <form onSubmit={(e) => e.preventDefault()}>
              <IonItem>
                <IonLabel position="stacked">Nombre del Bloque</IonLabel>
                <input
                  type="text"
                  value={bloqueForm.name}
                  onChange={(e) => setBloqueForm({ ...bloqueForm, name: e.target.value })}
                  className="ion-padding"
                  style={{ width: '100%', marginTop: '8px' }}
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Descripción</IonLabel>
                <textarea
                  value={bloqueForm.description}
                  onChange={(e) => setBloqueForm({ ...bloqueForm, description: e.target.value })}
                  className="ion-padding"
                  style={{ width: '100%', marginTop: '8px' }}
                />
              </IonItem>
            </form>
          </div>
        </IonContent>
      </IonModal>
    </div>
  );
}

export default SettingsC;