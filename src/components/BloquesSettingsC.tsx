import { IonActionSheet, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { Bloque, useBloqueInfo } from '../contexts/BloqueInfoContext';
import { useState } from 'react';
import AddBloquesSettingsModalC from './AddBloquesSettingsC';
import { INITIAL_BLOQUE } from '../contexts/BloqueInfoContext';

const BloquesSettingsC = () => {
  const { bloques, editBloque } = useBloqueInfo();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBloque, setEditingBloque] = useState<Bloque>(INITIAL_BLOQUE);
  const [isASheetOpen, setIsASheetOpen] = useState(false);

  const handleEdit = (bloque: Bloque) => () => {
    setEditingBloque(bloque);
    setIsASheetOpen(true)
  };

  const handleEditConfirm = () => {
    if (editingBloque.id) {
      editBloque(editingBloque.id, editingBloque);
    }
    setIsEditModalOpen(false);
  };

  return (
    <div>
      {bloques.map((bloque) =>
        <IonCard key={bloque.id} onClick={handleEdit(bloque)}>
          <IonCardHeader>
            <IonCardTitle>{bloque.name}</IonCardTitle>
            <IonCardSubtitle>{bloque.numCamas} camas - {bloque.numCuadrosPerCama} cuadros por cama</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>{bloque.description}</IonCardContent>
        </IonCard>
      )}
      {/* modal for edit */}
      <AddBloquesSettingsModalC
        isOpenModal={isEditModalOpen}
        setIsOpenModal={setIsEditModalOpen}
        bloqueForm={editingBloque}
        setBloqueForm={setEditingBloque}
        handleConfirm={handleEditConfirm}
      />

      <>
        <IonActionSheet
          isOpen={isASheetOpen}
          header="Acciones"
          buttons={[
            {
              text: 'Editar bloque',
              handler: () => {
                setIsEditModalOpen(true);
                setIsASheetOpen(false);
              }
            },
            {
              text: 'Eliminar bloque',
              role: 'destructive',
              handler: () => {
              }
            },

          ]}
          onDidDismiss={() => setIsASheetOpen(false)}
        ></IonActionSheet>
      </>
    </div>
  );
}

export default BloquesSettingsC;