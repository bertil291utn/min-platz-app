import React from 'react';
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
import { leafOutline, flowerOutline } from 'ionicons/icons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchMallasMonitored } from '../store/slices/mallasMonitoringSlice';
import { CURRENT_WEEK_NUMBER } from '../helpers/regularHelper';
import { BloqueMallaMonitored, MallaMonitored } from '../interfaces/MallasMonitoring';
import { setActiveViewSegment, setSelectedBloque, setSelectedMalla } from '../store/slices/viewMallasSlice';
import { useEffect } from 'react';
import { ROSE_VARIETIES } from '../interfaces/RoseVariety';
import { formatDate } from '../helpers/viewHelper';

const ViewMonitoredMallas = () => {
  const dispatch = useAppDispatch();
  const activeViewSegment = useAppSelector(state => state.viewMallas.activeViewSegment);
  const selectedBloque = useAppSelector(state => state.viewMallas.selectedBloque);
  const selectedMalla = useAppSelector(state => state.viewMallas.selectedMalla);
  const mallasMonitored = useAppSelector(state => state.mallasMonitoring.mallasMonitored);
  const user = useAppSelector((state) => state.userLogged.user);

  useEffect(() => {
    dispatch(fetchMallasMonitored());
  }, [dispatch]);

  

  const filteredBloquesByPremium = user?.premium
    ? mallasMonitored
    : mallasMonitored.filter(bloque => {
      const weekDifference = CURRENT_WEEK_NUMBER - bloque.weekNumber;
      return weekDifference <= 4;
    });

  const groupedByWeek = Object.entries(
    filteredBloquesByPremium.reduce((acc, bloque) => {
      const week = bloque.weekNumber;
      if (!acc[week]) {
        acc[week] = [];
      }
      acc[week].push(bloque);
      return acc;
    }, {} as { [key: number]: BloqueMallaMonitored[] })
  ).sort(([weekA], [weekB]) => Number(weekB) - Number(weekA));

  const renderBloquesList = () => (
    <>
      {mallasMonitored.length === 0 ? (
        <div className="ion-padding ion-text-center">
          <IonText color="medium">
            <h5>No hay registros de monitoreo de mallas</h5>
            <p>No se encontraron registros de monitoreo de mallas.</p>
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
                      dispatch(setActiveViewSegment('mallas'));
                    }}
                  >
                    <IonLabel>
                      <h2>{bloque.name}</h2>
                      <IonNote>{formatDate(bloque.dateMonitoring)}</IonNote>
                    </IonLabel>
                    <IonChip color="secondary" slot="end">
                      <IonIcon icon={flowerOutline} />
                      <IonLabel>{bloque.mallas.length}</IonLabel>
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

  const renderMallasList = () => {
    if (!selectedBloque) return null;

    return (
      <IonList>
        {selectedBloque.mallas.map((malla: MallaMonitored) => (
          <IonItem
            key={malla.id}
            button
            onClick={() => {
              dispatch(setSelectedMalla(malla));
              dispatch(setActiveViewSegment('details'));
            }}
          >
            <IonLabel>
              <h2>{ROSE_VARIETIES.find(v => v.id === malla.variety)?.name}</h2>
              <p>{malla.diseases.length} enfermedades detectadas</p>
            </IonLabel>
            <IonBadge color="secondary" slot="end">
              {malla.diseases.reduce((total, disease) => total + disease.count, 0)} plagas
            </IonBadge>
          </IonItem>
        ))}
      </IonList>
    );
  };

  const renderMallaDetails = () => {
    if (!selectedMalla) return null;

    return (
      <div className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={leafOutline} /> Enfermedades Detectadas
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {selectedMalla.diseases.length === 0 ? (
              <IonText color="success">
                <p>No se detectaron enfermedades en esta malla.</p>
              </IonText>
            ) : (
              <IonList>
                {selectedMalla.diseases.map(disease => (
                  <IonItem key={disease.id}>
                    <IonLabel>
                      <h2>{disease.name}</h2>
                      <p>Estado: {disease.status}</p>
                    </IonLabel>
                    <IonBadge color="secondary" slot="end">
                      {disease.count} encontrados
                    </IonBadge>
                  </IonItem>
                ))}
              </IonList>
            )}
          </IonCardContent>
        </IonCard>

        {selectedMalla.observations && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Observaciones</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {selectedMalla.observations}
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
                    dispatch(setSelectedMalla(null));
                  }}
                >
                  <IonLabel>{`Semana ${selectedBloque.weekNumber}`}</IonLabel>
                </IonChip>

                <IonChip
                  color="secondary"
                  onClick={() => {
                    dispatch(setActiveViewSegment('mallas'));
                    dispatch(setSelectedMalla(null));
                  }}
                >
                  <IonLabel>{selectedBloque.name}</IonLabel>
                </IonChip>
              </>
            )}

            {selectedMalla && (
              <IonChip color="secondary">
                <IonLabel>
                  {ROSE_VARIETIES.find(v => v.id === selectedMalla.variety)?.name}
                </IonLabel>
              </IonChip>
            )}
          </div>
        </IonCardContent>
      </IonCard>

      <div className="ion-padding">
        {activeViewSegment === 'bloques' && renderBloquesList()}
        {activeViewSegment === 'mallas' && renderMallasList()}
        {activeViewSegment === 'details' && renderMallaDetails()}
      </div>
    </>
  );
};

export default ViewMonitoredMallas;