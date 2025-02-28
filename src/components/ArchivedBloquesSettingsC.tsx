import { IonAccordion, IonActionSheet, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel } from '@ionic/react';
import { Bloque, INITIAL_BLOQUE, useBloqueInfo } from '../contexts/BloqueInfoContext';
import { useState } from 'react';

const ArchivedBloquesSettingsC = () => {
  const { archivedBloques, unarchiveBloque } = useBloqueInfo();
  const [editingBloque, setEditingBloque] = useState<Bloque>(INITIAL_BLOQUE);
  const [isASheetOpen, setIsASheetOpen] = useState(false);


  const handleActions = (bloque: Bloque) => () => {
    setEditingBloque(bloque);
    setIsASheetOpen(true)
  };

  const unArchiveBloque = (bloqueId?: number) => {
    if (bloqueId) {
      unarchiveBloque(bloqueId);
      setIsASheetOpen(false);
    }
  };

  const IsThereArchivedBloques = archivedBloques.length > 0;
  return (
    <>
      {IsThereArchivedBloques ?
        <IonAccordion value="archived-bloques">
          <IonItem slot="header" color="light">
            <IonLabel>Bloques archivados</IonLabel>
          </IonItem>
          <div className="ion-padding" slot="content">
            {archivedBloques.map((bloque) =>
              <IonCard key={bloque.id} onClick={handleActions(bloque)} style={{ opacity: '30%' }}>
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
        </IonAccordion> : null
      }

      <IonActionSheet
        isOpen={isASheetOpen}
        buttons={[
          {
            text: 'Traer de vuelta bloque',
            handler: () => {
              unArchiveBloque(editingBloque.id);
            }
          },


        ]}
        onDidDismiss={() => setIsASheetOpen(false)}
      ></IonActionSheet>
    </>
  )
}

export default ArchivedBloquesSettingsC;