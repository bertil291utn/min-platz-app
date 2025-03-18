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
  IonItemGroup,
  IonItemDivider,
  IonNote,
} from '@ionic/react';
import {
  leafOutline,
  homeOutline,
  scanOutline,
  squareOutline,
} from 'ionicons/icons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchMonitoredBloques } from '../store/slices/monitoringBloqueSlice';
import {
  setActiveViewSegment,
  setSelectedBloque,
  setSelectedCama,
  setSelectedCuadro
} from '../store/slices/viewMonitoredSlice';
import { SegmentViewBloque } from '../interfaces/Bloque';

const ViewMonitoredC: React.FC = () => {
  const dispatch = useAppDispatch();

  const activeViewSegment = useAppSelector(state => state.viewMonitored.activeViewSegment);
  const selectedBloque = useAppSelector(state => state.viewMonitored.selectedBloque);
  const selectedCama = useAppSelector(state => state.viewMonitored.selectedCama);
  const selectedCuadro = useAppSelector(state => state.viewMonitored.selectedCuadro);
  const bloquesMonitored = useAppSelector(state => state.monitoringBloque.bloquesMonitored);

  const [searchText, setSearchText] = useState('');
  const [dateFilter, setDateFilter] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchMonitoredBloques());
  }, [dispatch]);

  const handleSegmentChange = (value: string) => {
    dispatch(setActiveViewSegment(value as SegmentViewBloque));
  };

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

  const groupedByWeek = Object.entries(
    bloquesMonitored.reduce((acc, bloque) => {
      const week = bloque.weekNumber || 0;
      if (!acc[week]) {
        acc[week] = [];
      }
      acc[week].push(bloque);
      return acc;
    }, {} as { [key: number]: typeof bloquesMonitored })
  ).sort(([weekA], [weekB]) => Number(weekB) - Number(weekA));

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
          {groupedByWeek.map(([week, bloques]) => (
            <React.Fragment key={week}>
              <IonItemGroup>
                <IonItemDivider sticky color="light">
                  <IonLabel>
                    <h2>Semana {week}</h2>
                    <IonNote slot="end">
                      {bloques.length} {bloques.length === 1 ? 'bloque' : 'bloques'}
                    </IonNote>
                  </IonLabel>
                </IonItemDivider>

                {bloques.map(bloque => (
                  <IonItem
                    key={`${bloque.id}-${bloque.dateMonitoring}`}
                    button
                    detail
                    onClick={() => {
                      dispatch(setSelectedBloque(bloque));
                      dispatch(setActiveViewSegment('camas'));
                    }}
                  >
                    <IonLabel>
                      <h2>{bloque.name}</h2>
                      <IonNote>{formatDate(bloque.dateMonitoring)}</IonNote>
                    </IonLabel>
                    <IonChip color="secondary" slot="end">
                      <IonIcon icon={scanOutline} />
                      <IonLabel>{bloque.camas.length}</IonLabel>
                    </IonChip>
                  </IonItem>
                ))}
              </IonItemGroup>
            </React.Fragment>
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
          {selectedBloque.camas.map(cama => (
            <IonItem
              key={cama.id}
              button
              onClick={() => {
                dispatch(setSelectedCama(cama));
                dispatch(setActiveViewSegment('cuadros'));
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

          {selectedCama.cuadros.map(cuadro => (
            <IonItem
              key={cuadro.id}
              button
              onClick={() => {
                dispatch(setSelectedCuadro(cuadro));
                dispatch(setActiveViewSegment('details'));
              }}
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
      <div className="ion-padding">
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
                    </IonLabel>
                    {(disease.tercio !== undefined && disease.tercio !== 0) && (
                      <IonBadge
                        color={'secondary'}
                        slot="end"
                      >
                        Tercio {disease.tercio}
                      </IonBadge>
                    )}
                  </IonItem>
                ))}
              </IonList>
            )}
          </IonCardContent>
        </IonCard>

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
      </div>
    );
  };

  return (
    <>
      <IonCard>
        <IonCardContent>
          <div>
            <IonChip
            
              color="secondary"
              onClick={() => {
                dispatch(setActiveViewSegment('bloques'));
                dispatch(setSelectedBloque(null));
                dispatch(setSelectedCama(null));
                dispatch(setSelectedCuadro(null));
              }}
            >
              <IonIcon icon={homeOutline} />
              <IonLabel></IonLabel>
            </IonChip>

            {selectedBloque && (
              <>
                <IonIcon icon="chevron-forward-outline" />
                <IonChip
                  color="secondary"
                  onClick={() => {
                    dispatch(setActiveViewSegment('camas'));
                    dispatch(setSelectedCama(null));
                    dispatch(setSelectedCuadro(null));
                    }}
                  >
                  <IonLabel>{selectedBloque.name}</IonLabel>
                </IonChip>
              </>
            )}

            {selectedCama && (
              <>
                <IonIcon icon="chevron-forward-outline" />
                <IonChip
                  color="secondary"
                  onClick={() => {
                    dispatch(setActiveViewSegment('cuadros'));
                    dispatch(setSelectedCuadro(null));
                  }}
                >
                  <IonLabel>{selectedCama.name}</IonLabel>
                </IonChip>
              </>
            )}

            {selectedCuadro && (
              <>
                <IonIcon icon="chevron-forward-outline" />
                <IonChip color="secondary">
                  <IonLabel>{selectedCuadro.name}</IonLabel>
                </IonChip>
              </>
            )}
          </div>
        </IonCardContent>
      </IonCard>

      <div className="ion-padding">
        {activeViewSegment === 'bloques' && renderBloquesList()}
        {activeViewSegment === 'camas' && renderCamas()}
        {activeViewSegment === 'cuadros' && renderCuadroDetails()}
        {activeViewSegment === 'details' && renderDetails()}
      </div>
    </>
  );
};

export default ViewMonitoredC;
