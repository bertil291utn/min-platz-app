import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonHeader, IonIcon, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonRow, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonTitle, IonToolbar } from '@ionic/react';
import { addCircle, removeCircle } from 'ionicons/icons';
import { useState } from 'react';
import { NUMERO_MAX, NUMERO_MIN } from '../helpers/bloquesConstant';
import { Bloque, useBloqueInfo } from '../contexts/BloqueInfoContext';
import { getSpanishOrdinal } from '../helpers/viewHelper';

const MonitoreoC = () => {
  const [camaNumber, setCamaNumber] = useState(1);
  const [cuadroNumber, setCuadroNumber] = useState(1);
  const [selectedBloque, setSelectedBloque] = useState<Bloque>();
  const { activeBloques } = useBloqueInfo()

  const handleIncrement = () => () => {
    if (camaNumber < NUMERO_MAX) {
      setCamaNumber((prev) => prev + 1);
    }
  };

  const handleDecrement = () => () => {
    if (camaNumber > NUMERO_MIN) {
      setCamaNumber((prev) => prev - 1);
    }
  };

  return (
    <div>
      <IonHeader>
        <IonToolbar>
          <IonSegment value="bloques">
            <IonSegmentButton value="bloques" contentId="bloques">
              <IonLabel>Bloques</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="camas" contentId="camas">
              <IonLabel>Camas</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <div className="ion-padding">
        <IonSegmentView>
          <IonSegmentContent id="bloques">
            <p>Seleccione un bloque</p>
            {activeBloques.map((bloque: Bloque) => (
              <IonCol size="6" key={bloque.id}>
                <IonCard onClick={() => setSelectedBloque(bloque)}>
                  <IonCardHeader>
                    <IonCardTitle>{bloque.name}</IonCardTitle>
                    <IonLabel>{bloque.numCamas} camas</IonLabel>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            ))}
          </IonSegmentContent>
          <IonSegmentContent id="camas">
            {selectedBloque
              ?
              <div>
                <IonItem>
                  <IonLabel>Ingrese el numero de cama a monitorear</IonLabel>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <IonButton fill="clear" onClick={handleDecrement()} size='large'>
                      <IonIcon slot="icon-only" ios={removeCircle} md={removeCircle}></IonIcon>
                    </IonButton>
                    <IonLabel>{camaNumber}</IonLabel>
                    <IonButton size='large' fill="clear" onClick={handleIncrement()}>
                      <IonIcon slot="icon-only" ios={addCircle} md={addCircle}></IonIcon>
                    </IonButton>
                  </div>
                </IonItem>
                <br />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <h1>Cama #{camaNumber}</h1>
                    <h1>Cuadro #{cuadroNumber}</h1>
                  </div>
                  <br />

                  {[...Array(selectedBloque.numCuadrosPerCama)].map((_, index) => (
                    <IonButton
                      key={index}
                      expand='block'
                      fill='outline'
                      size='large'
                      onClick={() => setCuadroNumber(index + 1)}
                    >
                      <IonLabel>
                        {index + 1 <= Math.ceil(selectedBloque.numCuadrosPerCama / 2)
                          ? `${getSpanishOrdinal(index + 1)} cuadro desde entrada`
                          : index + 1 === selectedBloque.numCuadrosPerCama
                            ? 'Último cuadro desde salida'
                            : `${getSpanishOrdinal(selectedBloque.numCuadrosPerCama - index)} cuadro desde salida`}
                      </IonLabel>
                    </IonButton>
                  ))}

                </div>


              </div>
              :
              null}
          </IonSegmentContent>
          {/* <IonSegmentContent id="third">Third</IonSegmentContent> */}
        </IonSegmentView>




      </div>
    </div>
  );
}

export default MonitoreoC;