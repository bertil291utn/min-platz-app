import { InputCustomEvent, InputInputEventDetail, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonTextarea, IonTitle, IonToolbar, TextareaCustomEvent } from '@ionic/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { Bloque } from '../contexts/BloqueInfoContext';
import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import { TextareaInputEventDetail } from '@ionic/core';

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

  const [count, setCount] = useState(1);

  const handleIncrement = () => {
    if (count < 100) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleChange = (e: InputCustomEvent<InputInputEventDetail> | TextareaCustomEvent<TextareaInputEventDetail>) => {
    const { value } = e.detail;
    const { name } = e.target as HTMLIonInputElement;

    setBloqueForm(prev => ({
      ...prev,
      [name]: value || ''
    }));
  };

  return (
    <IonModal isOpen={isOpenModal} onDidDismiss={() => setIsOpenModal(false)}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => setIsOpenModal(false)}>salir</IonButton>
          </IonButtons>
          {/* <IonButtons slot="end">
            <IonButton strong={true} onClick={handleConfirm}>
              guardar
            </IonButton>
          </IonButtons> */}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <IonItem>
            <IonTitle>Anadir nuevo bloque</IonTitle>
          </IonItem>
          <form onSubmit={(e) => e.preventDefault()}>
            <IonInput
              labelPlacement='floating'
              fill='outline'
              label='Nombre'
              type="text"
              name="name"
              value={bloqueForm.name}
              onIonInput={(e) => handleChange(e)}
              required
            />
            <br />

            <IonItem>
              <IonLabel>Numero de camas</IonLabel>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <IonButton fill="clear" onClick={handleDecrement} size='large'>
                  <IonIcon slot="icon-only" ios={removeCircleOutline} md={removeCircleOutline}></IonIcon>
                </IonButton>
                <IonLabel>{count}</IonLabel>
                <IonButton size='large' fill="clear" onClick={handleIncrement}>
                  <IonIcon slot="icon-only" ios={addCircleOutline} md={addCircleOutline}></IonIcon>
                </IonButton>
              </div>
            </IonItem>

            <IonItem>
              <IonLabel>Numero de cuadros por cama</IonLabel>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <IonButton fill="clear" onClick={handleDecrement} size='large'>
                  <IonIcon slot="icon-only" ios={removeCircleOutline} md={removeCircleOutline}></IonIcon>
                </IonButton>
                <IonLabel>{count}</IonLabel>
                <IonButton size='large' fill="clear" onClick={handleIncrement}>
                  <IonIcon slot="icon-only" ios={addCircleOutline} md={addCircleOutline}></IonIcon>
                </IonButton>
              </div>
            </IonItem>

            <IonItem>
              <IonLabel>Numero de cuadrantes</IonLabel>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <IonButton fill="clear" onClick={handleDecrement} size='large'>
                  <IonIcon slot="icon-only" ios={removeCircleOutline} md={removeCircleOutline}></IonIcon>
                </IonButton>
                <IonLabel>{count}</IonLabel>
                <IonButton size='large' fill="clear" onClick={handleIncrement}>
                  <IonIcon slot="icon-only" ios={addCircleOutline} md={addCircleOutline}></IonIcon>
                </IonButton>
              </div>
            </IonItem>


            <IonTextarea fill='outline' label="Descripcion"
              labelPlacement="floating"
              name="description"
              value={bloqueForm.description}
              onIonInput={(e) => handleChange(e)}
            ></IonTextarea>

            <br />
            <IonButton onClick={handleConfirm} expand="block">
              guardar
            </IonButton>

            {/* <IonItem>
              <IonLabel position="stacked">Descripción</IonLabel>
              <textarea
                value={bloqueForm.description}
                onChange={(e) => setBloqueForm({ ...bloqueForm, description: e.target.value })}
                className="ion-padding"
                style={{ width: '100%', marginTop: '8px' }}
              />
            </IonItem> */}
          </form>
        </div>
      </IonContent>
    </IonModal>

  );
}

export default AddBloquesSettingsModalC;