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
  id: string;
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
  const [internoCount, setInternoCount] = useState(1);
  const [externoCount, setExternoCount] = useState(1);

  useEffect(() => {
    setBloqueForm(prev => ({
      ...prev,
      numCuadrosPerCama: bloqueForm.numCuadrosPerCama || NUMERO_CUADROS_PER_CAMAS_MIN,
      numCuadrantes: bloqueForm.numCuadrantes || 1
    }));
    
    // Initialize placasDetails from bloqueForm
    if ((bloqueForm.placasDetails ?? []).length > 0) {
      setPlacasDetails(bloqueForm.placasDetails!);
      
      // Set counters based on existing placas
      const internos = (bloqueForm.placasDetails ?? []).filter(p => p.type === 'interno');
      const externos = (bloqueForm.placasDetails ?? []).filter(p => p.type === 'externo');
      
      setInternoCount(internos.length + 1);
      setExternoCount(externos.length + 1);
    } else {
      setPlacasDetails([]);
      setInternoCount(1);
      setExternoCount(1);
    }
  }, [isOpenModal, bloqueForm.placasDetails]);

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
    const count = type === 'interno' ? internoCount : externoCount;
    
    const newPlaca: PlacaDetails = {
      id: `${type}-${count}`,
      description: '',
      type
    };
  
    if (type === 'interno') {
      setInternoCount(prev => prev + 1);
    } else {
      setExternoCount(prev => prev + 1);
    }
  
    const updatedPlacas = [...placasDetails, newPlaca];
    setPlacasDetails(updatedPlacas);
    
    // Update bloqueForm with new placas
    setBloqueForm(prev => ({
      ...prev,
      placasDetails: updatedPlacas
    }));
  };

  const handleUpdatePlacaDescription = (id: string, description: string) => {
    const updatedPlacas = placasDetails.map(placa =>
      placa.id === id ? { ...placa, description } : placa
    );
    
    setPlacasDetails(updatedPlacas);
    setBloqueForm(prev => ({
      ...prev,
      placasDetails: updatedPlacas
    }));
  };

  const handleRemovePlaca = (id: string, type: 'interno' | 'externo') => {
    const updatedPlacas = placasDetails.filter(placa => !(placa.id === id && placa.type === type));
    
    setPlacasDetails(updatedPlacas);
    setBloqueForm(prev => ({
      ...prev,
      placasDetails: updatedPlacas
    }));
  
    // Reset counters when all placas of a type are removed
    const remainingPlacas = updatedPlacas.filter(placa => placa.type === type);
    if (remainingPlacas.length === 0) {
      if (type === 'interno') {
        setInternoCount(1);
      } else {
        setExternoCount(1);
      }
    }
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
      <div style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1000, padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
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
              Placa {placa.id}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonTextarea
              fill='outline'
              label="Localización de la placa"
              labelPlacement="floating"
              value={placa.description}
              onIonChange={(e) => handleUpdatePlacaDescription(placa.id, e.detail.value!)}
            />
            <IonButton
              fill="clear"
              color="danger"
              onClick={() => handleRemovePlaca(placa.id, placa.type)}
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