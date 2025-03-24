import React, { useEffect, useState } from 'react';
import {
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
  IonItemGroup,
  IonItemDivider,
  IonNote
} from '@ionic/react';
import { layersOutline, leafOutline } from 'ionicons/icons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchPlacasMonitored } from '../store/slices/placasMonitoringSlice';
import { CURRENT_WEEK_NUMBER } from '../helpers/regularHelper';
import { PlacaMonitored, BloqueMonPlaca } from '../interfaces/PlacaMonitoring';
import { setActiveViewSegment, setSelectedBloque, setSelectedPlaca } from '../store/slices/viewPlacasSlice';

const ViewMonitoredPlacas = () => {
  const dispatch = useAppDispatch();
  const activeViewSegment = useAppSelector(state => state.viewPlacas.activeViewSegment);
  const selectedBloque = useAppSelector(state => state.viewPlacas.selectedBloque);
  const selectedPlaca = useAppSelector(state => state.viewPlacas.selectedPlaca);
  const placasMonitored = useAppSelector(state => state.placasMonitoring.placasMonitored);
  const user = useAppSelector((state) => state.userLogged.user);

  useEffect(() => {
    dispatch(fetchPlacasMonitored());
  }, [dispatch]);

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

  const filteredBloquesByPremium = user?.premium
    ? placasMonitored
    : placasMonitored.filter(bloque => {
      const weekDifference = CURRENT_WEEK_NUMBER - bloque.weekNumber;
      return weekDifference <= 4;
    });

  // Group bloques by week
  const groupedByWeek = Object.entries(
    filteredBloquesByPremium.reduce((acc, bloque) => {
      const week = bloque.weekNumber;
      if (!acc[week]) {
        acc[week] = [];
      }
      acc[week].push(bloque);
      return acc;
    }, {} as { [key: number]: BloqueMonPlaca[] })
  ).sort(([weekA], [weekB]) => Number(weekB) - Number(weekA));

  // Render bloques list
  const renderBloquesList = () => (
    <>
      {placasMonitored.length === 0 ? (
        <div className="ion-padding ion-text-center">
          <IonText color="medium">
            <h5>No hay registros de monitoreo de placas</h5>
            <p>No se encontraron registros de monitoreo de placas.</p>
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
                      dispatch(setActiveViewSegment('placas'));
                    }}
                  >
                    <IonLabel>
                      <h2>{bloque.name}</h2>
                      <IonNote>{formatDate(bloque.dateMonitoring)}</IonNote>
                    </IonLabel>
                    <IonChip color="secondary" slot="end">
                      <IonIcon icon={layersOutline} />
                      <IonLabel>{bloque.placas.length}</IonLabel>
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

  // Render placas list
  const renderPlacasList = () => {
    if (!selectedBloque) return null;

    return (
      <IonList>
        {selectedBloque.placas.map((placa: PlacaMonitored) => (
          <IonItem
            key={`${placa.id}-${placa.type}`}
            button
            onClick={() => {
              dispatch(setSelectedPlaca(placa));
              dispatch(setActiveViewSegment('details'));
            }}
          >
            <IonLabel>
              <h2>Placa {placa.type === 'interno' ? 'Interna' : 'Externa'} #{placa.id}</h2>
              <p>{placa.diseases.length} enfermedades detectadas</p>
            </IonLabel>
            <IonBadge color="secondary" slot="end">
              {placa.diseases.reduce((total, disease) => total + disease.countDisease, 0)} plagas
            </IonBadge>
          </IonItem>
        ))}
      </IonList>
    );
  };

  // Render placa details
  const renderPlacaDetails = () => {
    if (!selectedPlaca) return null;

    return (
      <div className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={leafOutline} /> Enfermedades Detectadas
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {selectedPlaca.diseases.length === 0 ? (
              <IonText color="success">
                <p>No se detectaron enfermedades en esta placa.</p>
              </IonText>
            ) : (
              <IonList>
                {selectedPlaca.diseases.map(disease => (
                  <IonItem key={disease.id}>
                    <IonLabel>
                      <h2>{disease.name}</h2>
                    </IonLabel>
                    <IonBadge color="secondary" slot="end">
                      {disease.countDisease} encontrados
                    </IonBadge>
                  </IonItem>
                ))}
              </IonList>
            )}
          </IonCardContent>
        </IonCard>

        {selectedPlaca.notes && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Notas</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {selectedPlaca.notes}
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
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {selectedBloque && (
              <>
                <IonChip
                  color="secondary"
                  onClick={() => {
                    dispatch(setActiveViewSegment('bloques'));
                    dispatch(setSelectedBloque(null));
                    dispatch(setSelectedPlaca(null));
                  }}
                >
                  <IonLabel>{`Semana ${selectedBloque.weekNumber}`}</IonLabel>
                </IonChip>

                <IonChip
                  color="secondary"
                  onClick={() => {
                    dispatch(setActiveViewSegment('placas'));
                    dispatch(setSelectedPlaca(null));
                  }}
                >
                  <IonLabel>{selectedBloque.name}</IonLabel>
                </IonChip>
              </>
            )}

            {selectedPlaca && (
              <IonChip color="secondary">
                <IonLabel>
                  Placa {selectedPlaca.type === 'interno' ? 'Interna' : 'Externa'} #{selectedPlaca.id}
                </IonLabel>
              </IonChip>
            )}
          </div>
        </IonCardContent>
      </IonCard>

      <div className="ion-padding">
        {activeViewSegment === 'bloques' && renderBloquesList()}
        {activeViewSegment === 'placas' && renderPlacasList()}
        {activeViewSegment === 'details' && renderPlacaDetails()}
      </div>
    </>
  );
};

export default ViewMonitoredPlacas;