import { IonCard, IonCardHeader, IonCardTitle, IonLabel, IonAlert } from '@ionic/react';
import { useBloqueInfo } from '../contexts/BloqueInfoContext';
import { Bloque } from '../interfaces/Bloque';
import { useMonitoringBloque } from '../contexts/MonitoringBloqueContext';
import { getWeekNumber, CURRENT_DATE_UTC5 } from '../helpers/regularHelper';
import { useState } from 'react';

const SegmentMonitoreoBloques = () => {
  const {
    selectedBloque,
    setSelectedBloque,
    setActiveSegment,
    setSelectedDiseases,
    setSelectedCuadros,
    setSelectedCuadro,
    setSelectedCama,
    bloquesMonitored
  } = useMonitoringBloque();
  const { activeBloques } = useBloqueInfo();
  const [displayAlert, setDisplayAlert] = useState(false);
  const [selectedBloqueTemp, setSelectedBloqueTemp] = useState<Bloque>();

  const proceedToMonitoring = (bloque: Bloque) => {
    setSelectedDiseases([]);
    setSelectedCuadros([]);
    setSelectedCuadro(undefined);
    setSelectedCama(1)
    setSelectedBloque(bloque);
    setActiveSegment('camas');
  }

  const handleChangeSegment = (bloque: Bloque) => () => {
    const currentWeekNumber = getWeekNumber(CURRENT_DATE_UTC5);

    // Check if bloque is already monitored this week
    const isMonitoredThisWeek = bloquesMonitored.some(b =>
      b.id === bloque.id && b.weekNumber === currentWeekNumber
    );

    if (isMonitoredThisWeek) {
      setSelectedBloqueTemp(bloque);
      setDisplayAlert(true);
    } else {
      proceedToMonitoring(bloque);
    }
  }

  return (
    <>
      <p>{selectedBloque ? 'El bloque seleccionado es' : 'Seleccione un bloque'}</p>
      <h1>{selectedBloque ? `${selectedBloque.name}` : ''}</h1>
      <br />
      {activeBloques.map((bloque: Bloque) => (
        <IonCard key={bloque.id} onClick={handleChangeSegment(bloque)} color={selectedBloque?.id == bloque.id ? 'primary' : ''}>
          <IonCardHeader>
            <IonCardTitle>{bloque.name}</IonCardTitle>
            <IonLabel>{bloque.numCamas} camas</IonLabel>
          </IonCardHeader>
        </IonCard>
      ))}

      <IonAlert
        header={`El ${selectedBloqueTemp?.name} ya esta monitoreado esta semana`}
        subHeader='¿Monitorear otra vez?'
        isOpen={displayAlert}
        buttons={[
          {
            text: 'No',
            role: 'cancel'
          },
          {
            text: 'Si',
            role: 'confirm',
            handler: () => {
              if (selectedBloqueTemp) {
                proceedToMonitoring(selectedBloqueTemp);
              }
            },
          },
        ]}
        onDidDismiss={() => setDisplayAlert(false)}
      ></IonAlert>
    </>
  );
}

export default SegmentMonitoreoBloques;