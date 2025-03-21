import {
  IonSegment,
  IonSegmentButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTextarea,
  IonTitle,
  IonToolbar,
  TextareaCustomEvent
} from '@ionic/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { addCircle, arrowForward, removeCircle } from 'ionicons/icons';
import { InputCustomEvent, InputInputEventDetail, TextareaInputEventDetail } from '@ionic/core';
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

type SettingsSegment = 'bloque' | 'placas';

interface PlacaDetails {
  id: number;
  description: string;
  type: 'interno' | 'externo';
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
  const [activeSegment, setActiveSegment] = useState<SettingsSegment>('bloque');
  const [placasDetails, setPlacasDetails] = useState<PlacaDetails[]>([]);

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

  const handleSegmentChange = (value: string) => {
    setActiveSegment(value as SettingsSegment);
  };

  const handleAddPlaca = (type: 'interno' | 'externo') => {
    const newPlaca: PlacaDetails = {
      id: placasDetails.length + 1,
      description: '',
      type
    };
    setPlacasDetails([...placasDetails, newPlaca]);
  };

  const handleUpdatePlacaDescription = (id: number, description: string) => {
    setPlacasDetails(prev =>
      prev.map(placa =>
        placa.id === id ? { ...placa, description } : placa
      )
    );
  };

  const handleRemovePlaca = (id: number) => {
    setPlacasDetails(prev => prev.filter(placa => placa.id !== id));
  };

  const renderBloqueSettings = () => (
    <>
      <IonInput
        labelPlacement='floating'
        fill='outline'
        label='Nombre'
        type="text"
        name="name"
        value={bloqueForm.name}
        onIonInput={handleChange}
        required
      />
      <br />

      <IonInput
        labelPlacement='floating'
        fill='outline'
        label='Numero de camas total'
        type="number"
        name="numCamas"
        value={bloqueForm.numCamas}
        onIonInput={handleChange}
        required
      />
      <br />

      <IonItem>
        <IonLabel>Numero de cuadros por cama</IonLabel>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <IonButton fill="clear" onClick={handleDecrement('numCuadrosPerCama')} size='large'>
            <IonIcon icon={removeCircle} />
          </IonButton>
          <IonLabel>{bloqueForm.numCuadrosPerCama}</IonLabel>
          <IonButton fill="clear" onClick={handleIncrement('numCuadrosPerCama')} size='large'>
            <IonIcon icon={addCircle} />
          </IonButton>
        </div>
      </IonItem>

      <IonTextarea
        style={{ marginTop: '2rem' }}
        fill='outline'
        label="Descripcion de bloque"
        labelPlacement="floating"
        name="description"
        value={bloqueForm.description}
        onIonInput={handleChange}
        rows={3}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '2rem 0' }}>
        <IonButton fill="clear" onClick={() => {
          setActiveSegment('placas')
        }}>
          <IonIcon slot="end" icon={arrowForward}></IonIcon>
          avanzar
        </IonButton>
      </div>
    </>
  );

  const renderPlacasSettings = () => (
    <>
      <div>
        <IonButton
          fill='outline'
          expand="block"
          onClick={() => handleAddPlaca('interno')}
        >
          Añadir Placa Interna
        </IonButton>
        <IonButton
          fill='outline'
          expand="block"
          onClick={() => handleAddPlaca('externo')}
        >
          Añadir Placa Externa
        </IonButton>
      </div>

      {placasDetails.map((placa) => (
        <IonCard key={placa.id}>
          <IonCardHeader>
            <IonCardTitle>
              Placa {placa.type === 'interno' ? 'Interna' : 'Externa'} #{placa.id}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonTextarea
              fill='outline'
              label="Descripción de la placa"
              labelPlacement="floating"
              value={placa.description}
              onIonChange={(e) => handleUpdatePlacaDescription(placa.id, e.detail.value!)}
            />
            <IonButton
              fill="clear"
              color="danger"
              onClick={() => handleRemovePlaca(placa.id)}
            >
              <IonIcon slot="icon-only" icon={removeCircle} />
              Eliminar
            </IonButton>
          </IonCardContent>
        </IonCard>
      ))}

      <div style={{ marginTop: '2rem' }}>
        <IonButton onClick={() => {
          handleConfirm();
          setPlacasDetails([]);
        }} expand="block">
          {placasDetails.length == 0 ? 'guardar sin placas' : 'guardar'}
        </IonButton>
      </div>
    </>
  );

  const renderBreadcrumbs = () => (
    <IonCard>
      <IonCardContent>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <IonChip
            color="secondary"
            onClick={() => setActiveSegment('bloque')}
          >
            <IonLabel>Bloque</IonLabel>
          </IonChip>

          <IonChip
            color="secondary"
            onClick={() => setActiveSegment('placas')}
          >
            <IonLabel>Placas</IonLabel>
          </IonChip>
        </div>
      </IonCardContent>
    </IonCard>
  );

  return (
    <IonModal
      initialBreakpoint={1}
      breakpoints={[0, 1]}
      isOpen={isOpenModal}
      onDidDismiss={() => setIsOpenModal(false)}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>{type === 'new' ? 'Añadir nuevo' : 'Editar'} bloque</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsOpenModal(false)}>
              salir
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          {/* Replace segment with breadcrumbs */}
          {renderBreadcrumbs()}

          <div style={{ marginTop: '2rem' }}>
            {activeSegment === 'bloque' ? renderBloqueSettings() : renderPlacasSettings()}
          </div>


        </div>
      </IonContent>
    </IonModal>
  );
};

export default AddBloquesSettingsModalC;