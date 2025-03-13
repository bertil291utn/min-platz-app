import React, { useEffect, useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonBadge,
  IonIcon,
  IonChip,
  IonText,
  IonSegment,
  IonSegmentButton,
} from '@ionic/react';
import {
  leafOutline,
  homeOutline,
  scanOutline,
} from 'ionicons/icons';
import { useMonitoringBloque } from '../contexts/MonitoringBloqueContext';
import { useViewMonitored, ViewMonitoredProvider } from '../contexts/ViewMonitoredContext';
import { SegmentViewBloque } from '../interfaces/Bloque';

const ViewMonitoredContent: React.FC = () => {
  const {
    activeViewSegment,
    setActiveViewSegment,
    selectedBloque,
    setSelectedBloque,
    selectedCama,
    setSelectedCama,
    selectedCuadro,
    setSelectedCuadro
  } = useViewMonitored();

  const {
    bloquesMonitored,
    getMonitoredBloques,
  } = useMonitoringBloque();

  const [searchText, setSearchText] = useState('');
  const [dateFilter, setDateFilter] = useState<string | null>(null);

  useEffect(() => {
    getMonitoredBloques();
  }, []);

  // Filter bloques by search text and date
  const filteredBloques = bloquesMonitored.filter(bloque => {
    const matchesSearch = searchText === '' ||
      bloque.name.toLowerCase().includes(searchText.toLowerCase());

    const matchesDate = !dateFilter ||
      new Date(bloque.dateMonitoring).toDateString() === new Date(dateFilter).toDateString();

    return matchesSearch && matchesDate;
  });


  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Render the list of bloques
  const renderBloquesList = () => (
    <>

      {bloquesMonitored.length === 0 ? (
        <div className="ion-padding ion-text-center">
          <IonText color="medium">
            <h5>No hay registros de monitoreo</h5>
            <p>No se encontraron registros que coincidan con los criterios de búsqueda.</p>
          </IonText>
        </div>
      ) : (
        <IonList>
          {bloquesMonitored.map(bloque => (
            <IonItem
              key={`${bloque.id}-${bloque.dateMonitoring}`}
              button
              onClick={() => {
                setSelectedBloque(bloque);
                setActiveViewSegment('camas');
                setSelectedBloque(bloque);
              }}
            >
              <IonLabel>
                <h2>{bloque.name}</h2>
                <p>{formatDate(bloque.dateMonitoring)}</p>
              </IonLabel>
              <IonBadge color="secondary" slot="end">
                {bloque.camas.length} camas
              </IonBadge>
            </IonItem>
          ))}
        </IonList>
      )}
    </>
  );

  // Render the camas
  const renderCamas = () => {
    if (!selectedBloque) return null;

    return (
      <>

        <IonList>
          <IonCard>
            <IonCardContent>
              <div>
                <IonChip
                  color="secondary"
                  onClick={() => {
                    setActiveViewSegment('bloques');
                    setSelectedBloque(null);
                  }}
                >
                  <IonIcon icon={homeOutline} />
                  <IonLabel>{selectedBloque?.name}</IonLabel>
                </IonChip>

              </div>
            </IonCardContent>
          </IonCard>
          {selectedBloque.camas.map(cama => (
            <IonItem
              key={cama.id}
              button
              onClick={() => {
                setSelectedCama(cama);
                setActiveViewSegment('cuadros');
                setSelectedCama(cama)
              }}
            >
              <IonLabel>
                <h2>{cama.name}</h2>
                <p>{cama.cuadros.length} cuadros monitoreados</p>
              </IonLabel>
              <IonBadge color="secondary" slot="end">
                {cama.cuadros.reduce((total, cuadro) => total + cuadro.diseases.length, 0)} enfermedades
              </IonBadge>
            </IonItem>
          ))}
        </IonList>
      </>
    );
  };

  // Render the cuadros
  const renderCuadroDetails = () => {
    if (!selectedCama) return null;

    return (
      <>
        <IonList>
          <IonCard>
            <IonCardContent>
              <div>
                <IonChip
                  color="secondary"
                  onClick={() => {
                    setActiveViewSegment('bloques');
                    setSelectedBloque(null);
                    setSelectedCuadro(null);
                    setSelectedCama(null);
                  }}
                >
                  <IonIcon icon={homeOutline} />
                  <IonLabel>{selectedBloque?.name}</IonLabel>
                </IonChip>
                <IonChip color="secondary"
                  onClick={() => {
                    setActiveViewSegment('camas');
                    setSelectedCuadro(null);
                    setSelectedCama(null);
                  }}
                >
                  <IonIcon icon={scanOutline} />
                  <IonLabel>{selectedCama?.name}</IonLabel>
                </IonChip>
              </div>
            </IonCardContent>
          </IonCard>

          {selectedCama.cuadros.map(cuadro => (
            <IonItem
              key={cuadro.id}
              button
              onClick={() => { setSelectedCuadro(cuadro); setActiveViewSegment('details') }}
            >
              <IonLabel>
                <h2>{cuadro.name}</h2>
                {cuadro.notes && <p>{cuadro.notes}</p>}
              </IonLabel>
              <IonBadge color="secondary" slot="end">
                {cuadro.diseases.length} enfermedades
              </IonBadge>
            </IonItem>
          ))}
        </IonList>
      </>
    );
  };

  // Render the details 
  const renderDetails = () => {
    if (!selectedCuadro) return null;

    return (
      <>

        <IonCard>
          <IonCardContent>
            <div>
              <IonChip
                color="secondary"
                onClick={() => {
                  setActiveViewSegment('bloques');
                  setSelectedBloque(null);
                  setSelectedCuadro(null);
                  setSelectedCama(null);
                }}
              >
                <IonIcon icon={homeOutline} />
                <IonLabel>{selectedBloque?.name}</IonLabel>
              </IonChip>
              <IonIcon icon="chevron-forward-outline" />
              <IonChip
                color="secondary"
                onClick={() => {
                  setActiveViewSegment('camas');
                  setSelectedCuadro(null);
                  setSelectedCama(null);
                }}
              >
                <IonIcon icon={scanOutline} />
                <IonLabel>{selectedCama?.name}</IonLabel>
              </IonChip>
              <IonChip color="secondary"
                onClick={() => {
                  setActiveViewSegment('cuadros');
                  setSelectedCuadro(null);
                }}
              >
                <IonIcon icon={leafOutline} />
                <IonLabel>{selectedCuadro.name}</IonLabel>
              </IonChip>
            </div>
          </IonCardContent>
        </IonCard>

        <div className="ion-padding">
          {selectedCuadro.notes && (
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Notas</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                {selectedCuadro.notes}
              </IonCardContent>
            </IonCard>
          )}

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                <IonIcon icon={leafOutline} /> Enfermedades Detectadas
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {selectedCuadro.diseases.length === 0 ? (
                <IonText color="success">
                  <p>No se detectaron enfermedades en este cuadro.</p>
                </IonText>
              ) : (
                <IonList>
                  {selectedCuadro.diseases.map(disease => (
                    <IonItem key={disease.id}>
                      <IonLabel>
                        <h2>{disease.name}</h2>
                        <p>Carpeta: {disease.folderName}</p>
                      </IonLabel>
                      {disease.level !== undefined && (
                        <IonBadge
                          color={disease.level > 2 ? "danger" : disease.level > 1 ? "warning" : "success"}
                          slot="end"
                        >
                          Nivel {disease.level}
                        </IonBadge>
                      )}
                    </IonItem>
                  ))}
                </IonList>
              )}
            </IonCardContent>
          </IonCard>
        </div>

      </>
    );
  };

  return (
    <div>
      <IonHeader>
        <IonToolbar>
          <IonSegment
            value={activeViewSegment}
            onIonChange={e => setActiveViewSegment(e.detail.value as SegmentViewBloque)}
            scrollable
          >
            <IonSegmentButton value="bloques">
              <IonLabel>Bloques</IonLabel>
            </IonSegmentButton>
            {selectedBloque && <IonSegmentButton value="camas">
              <IonLabel>Camas</IonLabel>
            </IonSegmentButton>}
            {selectedCama && <IonSegmentButton value="cuadros">
              <IonLabel>Cuadros</IonLabel>
            </IonSegmentButton>}
            {selectedCuadro && <IonSegmentButton value="details">
              <IonLabel>Detalles</IonLabel>
            </IonSegmentButton>}
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <div className="ion-padding">
        {activeViewSegment === 'bloques' && renderBloquesList()}
        {activeViewSegment === 'camas' && renderCamas()}
        {activeViewSegment === 'cuadros' && renderCuadroDetails()}
        {activeViewSegment === 'details' && renderDetails()}
      </div>
    </div>
  );
};

const ViewMonitoredC: React.FC = () => {
  return (
    <ViewMonitoredProvider>
      <ViewMonitoredContent />
    </ViewMonitoredProvider>
  )
    ;
};

export default ViewMonitoredC;
