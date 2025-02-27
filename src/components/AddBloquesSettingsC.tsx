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

  const [camas, setCamas] = useState(1);
  const [cuadroPerCama, setCuadroPerCama] = useState(1);
  const [cuadrante, setCuadrante] = useState(1);

  const handleIncrement = (count: number, setCount: Dispatch<SetStateAction<number>>) => () => {
    if (count < 100) {
      setCount((prev) => prev + 1);
    }
  };

  const handleDecrement = (count: number, setCount: Dispatch<SetStateAction<number>>) => () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
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
                <IonButton fill="clear" onClick={handleDecrement(camas, setCamas)} size='large'>
                  <IonIcon slot="icon-only" ios={removeCircleOutline} md={removeCircleOutline}></IonIcon>
                </IonButton>
                <IonLabel>{camas}</IonLabel>
                <IonButton size='large' fill="clear" onClick={handleIncrement(camas, setCamas)}>
                  <IonIcon slot="icon-only" ios={addCircleOutline} md={addCircleOutline}></IonIcon>
                </IonButton>
              </div>
            </IonItem>

            <IonItem>
              <IonLabel>Numero de cuadros por cama</IonLabel>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <IonButton fill="clear" onClick={handleDecrement(cuadroPerCama, setCuadroPerCama)} size='large'>
                  <IonIcon slot="icon-only" ios={removeCircleOutline} md={removeCircleOutline}></IonIcon>
                </IonButton>
                <IonLabel>{cuadroPerCama}</IonLabel>
                <IonButton size='large' fill="clear" onClick={handleIncrement(cuadroPerCama, setCuadroPerCama)}>
                  <IonIcon slot="icon-only" ios={addCircleOutline} md={addCircleOutline}></IonIcon>
                </IonButton>
              </div>
            </IonItem>

            <IonItem>
              <IonLabel>Numero de cuadrantes</IonLabel>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <IonButton fill="clear" onClick={handleDecrement(cuadrante, setCuadrante)} size='large'>
                  <IonIcon slot="icon-only" ios={removeCircleOutline} md={removeCircleOutline}></IonIcon>
                </IonButton>
                <IonLabel>{cuadrante}</IonLabel>
                <IonButton size='large' fill="clear" onClick={handleIncrement(cuadrante, setCuadrante)}>
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

          </form>
        </div>
      </IonContent>
    </IonModal>

  );
}

export default AddBloquesSettingsModalC;