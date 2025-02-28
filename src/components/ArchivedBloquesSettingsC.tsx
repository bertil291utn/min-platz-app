import { IonAccordion, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel } from '@ionic/react';
import { useBloqueInfo } from '../contexts/BloqueInfoContext';

const ArchivedBloquesSettingsC = () => {
  const { archivedBloques } = useBloqueInfo();

  const IsThereArchivedBloques = archivedBloques.length > 0;
  return IsThereArchivedBloques ?
    <IonAccordion value="archived-bloques">
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
    </IonAccordion> : null
}

export default ArchivedBloquesSettingsC;