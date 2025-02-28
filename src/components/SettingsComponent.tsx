import {
  IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/react';
import {
  Bloque,
  INITIAL_BLOQUE, useBloqueInfo
} from '../contexts/BloqueInfoContext';
import BloquesSettingsC from './BloquesSettingsC';
import { useEffect, useState } from 'react';
import AddBloquesSettingsModalC from './AddBloquesSettingsC';
import { NUMERO_CAMAS_MIN } from '../helpers/bloquesConstant';


const SettingsC = () => {
  const { bloques, addBloque, archivedBloques, nonArchivedBloques } = useBloqueInfo();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [bloqueForm, setBloqueForm] = useState<Bloque>(INITIAL_BLOQUE);

  useEffect(() => {
    setBloqueForm(prev => ({
      ...prev,
      name: `Bloque ${bloques.length + 1}`,
      numCamas: NUMERO_CAMAS_MIN
    }));
  }, [isOpenModal]);

  const handleConfirm = () => {
    addBloque(bloqueForm);
    setIsOpenModal(false);
    setBloqueForm(INITIAL_BLOQUE);
  };

  const IsThereArchivedBloques = archivedBloques.length > 0;
  const IsThereNonArchivedBloques = nonArchivedBloques.length > 0;

  return (
    <div>

      <IonAccordionGroup>
        <IonAccordion value="bloques">
          <IonItem slot="header" color="light">
            <IonLabel>Bloques</IonLabel>
          </IonItem>
          <div className="ion-padding" slot="content">
            {!IsThereNonArchivedBloques ? (
              <div className="ion-text-center">
                <p>No hay bloques activos</p>
                <IonButton onClick={() => setIsOpenModal(true)}>
                  Añadir bloques
                </IonButton>
              </div>
            ) : (
              <div>
                <IonButton onClick={() => setIsOpenModal(true)}>
                  Añadir mas bloques
                </IonButton>
                <BloquesSettingsC />
              </div>
            )}
          </div>
        </IonAccordion>

        {IsThereArchivedBloques ? <IonAccordion value="archived-bloques">
          <IonItem slot="header" color="light">
            <IonLabel>Bloques archivados</IonLabel>
          </IonItem>
          <div className="ion-padding" slot="content">
            {archivedBloques.map((bloque) =>
              <IonCard key={bloque.id} onClick={() => { }} style={{ opacity: '30%' }}>
                <IonCardHeader>
                  <IonCardTitle>{bloque.name}</IonCardTitle>
                  <IonLabel>{bloque.numCamas} camas</IonLabel>
                  <IonLabel>{bloque.numCuadrosPerCama} cuadros por cama</IonLabel>
                  <IonLabel>{bloque.numCamas * bloque.numCuadrosPerCama} total de cuadros</IonLabel>
                </IonCardHeader>

                <IonCardContent>{bloque.description}</IonCardContent>
              </IonCard>
            )}
          </div>
        </IonAccordion> : null}
      </IonAccordionGroup>

      {/* modal add bloques */}
      <AddBloquesSettingsModalC
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        bloqueForm={bloqueForm}
        setBloqueForm={setBloqueForm}
        handleConfirm={handleConfirm}
        type='new'
      />
    </div>
  );
}

export default SettingsC;