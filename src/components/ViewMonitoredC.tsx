import React, { useState } from 'react';
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
  IonButton,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonSearchbar,
  IonChip,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonNote,
  IonTitle
} from '@ionic/react';
import { 
  calendarOutline, 
  filterOutline, 
  searchOutline, 
  arrowBackOutline,
  leafOutline
} from 'ionicons/icons';
import { useMonitoringBloque } from '../contexts/MonitoringBloqueContext';
import { BloqueMonitored, CamaMonitored, CuadroMonitored } from '../interfaces/Monitoring';

const ViewMonitoredC: React.FC = () => {
  const { bloquesMonitored } = useMonitoringBloque();
  const [selectedBloque, setSelectedBloque] = useState<BloqueMonitored | null>(null);
  const [selectedCama, setSelectedCama] = useState<CamaMonitored | null>(null);
  const [selectedCuadro, setSelectedCuadro] = useState<CuadroMonitored | null>(null);
  const [searchText, setSearchText] = useState('');
  const [dateFilter, setDateFilter] = useState<string | null>(null);

  // Filter bloques by search text and date
  const filteredBloques = bloquesMonitored.filter(bloque => {
    const matchesSearch = searchText === '' || 
      bloque.name.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesDate = !dateFilter || 
      new Date(bloque.dateMonitoring).toDateString() === new Date(dateFilter).toDateString();
    
    return matchesSearch && matchesDate;
  });

  // Handle navigation back from detail views
  const handleBack = () => {
    if (selectedCuadro) {
      setSelectedCuadro(null);
    } else if (selectedCama) {
      setSelectedCama(null);
    } else if (selectedBloque) {
      setSelectedBloque(null);
    }
  };

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
      <IonHeader>
        <IonToolbar>
          <IonSearchbar
            value={searchText}
            onIonChange={e => setSearchText(e.detail.value || '')}
            placeholder="Buscar bloque"
          />
        </IonToolbar>
      </IonHeader>

      <IonGrid>
        <IonRow>
          <IonCol size="12">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>
                  <IonIcon icon={calendarOutline} /> Filtrar por fecha
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonDatetime
                  presentation="date"
                  value={dateFilter || undefined}
                  onIonChange={e => setDateFilter(typeof e.detail.value === 'string' ? e.detail.value : null)}
                />
                {dateFilter && (
                  <IonButton 
                    fill="clear" 
                    onClick={() => setDateFilter(null)}
                  >
                    Limpiar filtro
                  </IonButton>
                )}
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>

      {filteredBloques.length === 0 ? (
        <div className="ion-padding ion-text-center">
          <IonText color="medium">
            <h5>No hay registros de monitoreo</h5>
            <p>No se encontraron registros que coincidan con los criterios de búsqueda.</p>
          </IonText>
        </div>
      ) : (
        <IonList>
          {filteredBloques.map(bloque => (
            <IonItem 
              key={`${bloque.id}-${bloque.dateMonitoring}`} 
              button 
              onClick={() => setSelectedBloque(bloque)}
            >
              <IonLabel>
                <h2>{bloque.name}</h2>
                <p>{formatDate(bloque.dateMonitoring)}</p>
              </IonLabel>
              <IonBadge color="primary" slot="end">
                {bloque.camas.length} camas
              </IonBadge>
            </IonItem>
          ))}
        </IonList>
      )}
    </>
  );

  // Render the details of a selected bloque
  const renderBloqueDetails = () => {
    if (!selectedBloque) return null;
    
    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonButton slot="start" fill="clear" onClick={handleBack}>
              <IonIcon icon={arrowBackOutline} />
            </IonButton>
            <IonTitle>{selectedBloque.name}</IonTitle>
            <IonNote slot="end">{formatDate(selectedBloque.dateMonitoring)}</IonNote>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {selectedBloque.camas.map(cama => (
            <IonItem 
              key={cama.id} 
              button 
              onClick={() => setSelectedCama(cama)}
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

  // Render the details of a selected cama
  const renderCamaDetails = () => {
    if (!selectedCama) return null;
    
    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonButton slot="start" fill="clear" onClick={handleBack}>
              <IonIcon icon={arrowBackOutline} />
            </IonButton>
            <IonTitle>{selectedCama.name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {selectedCama.cuadros.map(cuadro => (
            <IonItem 
              key={cuadro.id} 
              button 
              onClick={() => setSelectedCuadro(cuadro)}
            >
              <IonLabel>
                <h2>{cuadro.name}</h2>
                {cuadro.notes && <p>{cuadro.notes}</p>}
              </IonLabel>
              <IonBadge color="tertiary" slot="end">
                {cuadro.diseases.length} enfermedades
              </IonBadge>
            </IonItem>
          ))}
        </IonList>
      </>
    );
  };

  // Render the details of a selected cuadro
  const renderCuadroDetails = () => {
    if (!selectedCuadro) return null;
    
    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonButton slot="start" fill="clear" onClick={handleBack}>
              <IonIcon icon={arrowBackOutline} />
            </IonButton>
            <IonTitle>{selectedCuadro.name}</IonTitle>
          </IonToolbar>
        </IonHeader>

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

  // Determine which view to render based on selection state
  if (selectedCuadro) {
    return renderCuadroDetails();
  } else if (selectedCama) {
    return renderCamaDetails();
  } else if (selectedBloque) {
    return renderBloqueDetails();
  } else {
    return renderBloquesList();
  }
};

export default ViewMonitoredC;
