import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import { Dispatch, SetStateAction } from 'react';
import { Bloque } from '../contexts/BloqueInfoContext';

interface AddBloquesSettingsModalCProps {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  bloqueForm: Bloque;
  setBloqueForm: React.Dispatch<React.SetStateAction<Bloque>>;
  handleConfirm: () => void;
}

const AddBloquesSettingsModalC = (
  {
    isOpenModal,
    setIsOpenModal,
    bloqueForm,
    setBloqueForm,
    handleConfirm
  }: AddBloquesSettingsModalCProps
) => {
  return (
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

  );
}

export default AddBloquesSettingsModalC;