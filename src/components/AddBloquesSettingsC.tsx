import { InputCustomEvent, InputInputEventDetail, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonTextarea, IonTitle, IonToolbar, TextareaCustomEvent } from '@ionic/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Bloque } from '../contexts/BloqueInfoContext';
import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import { TextareaInputEventDetail } from '@ionic/core';
import { NUMERO_CUADROS_PER_CAMAS_MIN } from '../bloquesConstant';

interface AddBloquesSettingsModalCProps {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  bloqueForm: Bloque;
  setBloqueForm: React.Dispatch<React.SetStateAction<Bloque>>;
  handleConfirm: () => void;
  type: 'edit' | 'new';
}

const AddBloquesSettingsModalC = (
  {
    isOpenModal,
    setIsOpenModal,
    bloqueForm,
    setBloqueForm,
    handleConfirm,
    type
  }: AddBloquesSettingsModalCProps
) => {

  useEffect(() => {
    setBloqueForm(prev => ({
      ...prev,
      numCuadrosPerCama: bloqueForm.numCuadrosPerCama || NUMERO_CUADROS_PER_CAMAS_MIN,
      numCuadrantes: bloqueForm.numCuadrantes || 1
    }));
  }, [isOpenModal])




  const handleIncrement = (nameElem: string) => () => {
    setBloqueForm(prev => ({
      ...prev,
      [nameElem as keyof Bloque]: (prev[nameElem as keyof Bloque] as number) + 1,
    }));
  };

  const handleDecrement = (nameElem: string) => () => {
    setBloqueForm(prev => ({
      ...prev,
      [nameElem as keyof Bloque]: (prev[nameElem as keyof Bloque] as number) - 1,

    }));
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
      <IonContent>
        <div className="ion-padding">
          <IonLabel><b>{type == 'new' ? 'Anadir nuevo' : 'Editar'} bloque</b></IonLabel>
          <br />
          <br />
          <form onSubmit={(e) => e.preventDefault()}>
            {/* name */}
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

            {/* numero camas */}
            <IonInput
              labelPlacement='floating'
              fill='outline'
              label='Numero de camas total'
              type="number"
              name="numCamas"
              value={bloqueForm.numCamas}
              onIonInput={(e) => handleChange(e)}
              required
            />
            <br />

            {/* description */}
            <IonTextarea fill='outline' label="Descripcion"
              labelPlacement="floating"
              name="description"
              value={bloqueForm.description}
              onIonInput={(e) => handleChange(e)}
            ></IonTextarea>

            <br />
            {/* cuadros por cama */}
            <IonItem>
              <IonLabel>Numero de cuadros por cama</IonLabel>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <IonButton fill="clear" onClick={handleDecrement('numCuadrosPerCama')} size='large'>
                  <IonIcon slot="icon-only" ios={removeCircleOutline} md={removeCircleOutline}></IonIcon>
                </IonButton>
                <IonLabel>{bloqueForm.numCuadrosPerCama}</IonLabel>
                <IonButton size='large' fill="clear" onClick={handleIncrement('numCuadrosPerCama')}>
                  <IonIcon slot="icon-only" ios={addCircleOutline} md={addCircleOutline}></IonIcon>
                </IonButton>
              </div>
            </IonItem>

            {/* numero cuadrantes */}
            <IonItem>
              <IonLabel>Numero de cuadrantes</IonLabel>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <IonButton fill="clear" onClick={handleDecrement('numCuadrantes')} size='large'>
                  <IonIcon slot="icon-only" ios={removeCircleOutline} md={removeCircleOutline}></IonIcon>
                </IonButton>
                <IonLabel>{bloqueForm.numCuadrantes}</IonLabel>
                <IonButton size='large' fill="clear" onClick={handleIncrement('numCuadrantes')}>
                  <IonIcon slot="icon-only" ios={addCircleOutline} md={addCircleOutline}></IonIcon>
                </IonButton>
              </div>
            </IonItem>

            <br />
            <IonButton onClick={handleConfirm} expand="block">
              guardar
            </IonButton>
            <IonButton onClick={() => setIsOpenModal(false)} expand="block" fill='clear'>
              salir
            </IonButton>

          </form>
        </div>
      </IonContent>
    </IonModal>

  );
}

export default AddBloquesSettingsModalC;