import { InputCustomEvent, InputInputEventDetail, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonTextarea, IonTitle, IonToolbar, TextareaCustomEvent } from '@ionic/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { addCircle, addCircleOutline, remove, removeCircle, removeCircleOutline } from 'ionicons/icons';
import { TextareaInputEventDetail } from '@ionic/core';
import { NUMERO_CUADROS_PER_CAMAS_MIN } from '../helpers/bloquesConstant';
import { Bloque } from '../interfaces/Bloque';

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
    <IonModal
      initialBreakpoint={1}
      breakpoints={[0, 1]}
      isOpen={isOpenModal}
      onDidDismiss={() => setIsOpenModal(false)}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>{type == 'new' ? 'Anadir nuevo' : 'Editar'} bloque</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <br />
          <br />
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
            {/* cuadros por cama */}
            <IonItem>
              <IonLabel>Numero de cuadros por cama</IonLabel>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <IonButton fill="clear" onClick={handleDecrement('numCuadrosPerCama')} size='large'>
                  <IonIcon slot="icon-only" ios={removeCircle} md={removeCircle}></IonIcon>
                </IonButton>
                <IonLabel>{bloqueForm.numCuadrosPerCama}</IonLabel>
                <IonButton size='large' fill="clear" onClick={handleIncrement('numCuadrosPerCama')}>
                  <IonIcon slot="icon-only" ios={addCircle} md={addCircle}></IonIcon>
                </IonButton>
              </div>
            </IonItem>

            {/* numero cuadrantes */}
            {/* <IonItem>
              <IonLabel>Numero de cuadrantes</IonLabel>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <IonButton fill="clear" onClick={handleDecrement('numCuadrantes')} size='large'>
                  <IonIcon slot="icon-only" ios={removeCircle} md={removeCircle}></IonIcon>
                </IonButton>
                <IonLabel>{bloqueForm.numCuadrantes}</IonLabel>
                <IonButton size='large' fill="clear" onClick={handleIncrement('numCuadrantes')}>
                  <IonIcon slot="icon-only" ios={addCircle} md={addCircle}></IonIcon>
                </IonButton>
              </div>
            </IonItem> */}

            <h4 style={{ marginTop: '2rem' }}>Para monitoreo</h4>
            {/* monitoreo */}
            {/* no placas internas */}
            <IonItem>
              <IonLabel>Numero de placas internas</IonLabel>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <IonButton fill="clear" onClick={handleDecrement('numPlacasInternas')} size='large'>
                  <IonIcon slot="icon-only" ios={removeCircle} md={removeCircle}></IonIcon>
                </IonButton>
                <IonLabel>{bloqueForm.numPlacasInternas}</IonLabel>
                <IonButton size='large' fill="clear" onClick={handleIncrement('numPlacasInternas')}>
                  <IonIcon slot="icon-only" ios={addCircle} md={addCircle}></IonIcon>
                </IonButton>
              </div>
            </IonItem>

            {/* no placas externas */}
            <IonItem>
              <IonLabel>Numero de placas externas</IonLabel>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <IonButton fill="clear" onClick={handleDecrement('numPlacasExternas')} size='large'>
                  <IonIcon slot="icon-only" ios={removeCircle} md={removeCircle}></IonIcon>
                </IonButton>
                <IonLabel>{bloqueForm.numPlacasExternas}</IonLabel>
                <IonButton size='large' fill="clear" onClick={handleIncrement('numPlacasExternas')}>
                  <IonIcon slot="icon-only" ios={addCircle} md={addCircle}></IonIcon>
                </IonButton>
              </div>
            </IonItem>

            {/* description */}
            <IonTextarea
              style={{ marginTop: '2rem' }}
              fill='outline' label="Descripcion de bloque"
              labelPlacement="floating"
              name="description"
              value={bloqueForm.description}
              onIonInput={(e) => handleChange(e)}
              rows={3}
            ></IonTextarea>

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