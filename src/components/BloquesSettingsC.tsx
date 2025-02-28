import { IonActionSheet, IonAlert, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonLabel, IonToast } from '@ionic/react';
import { Bloque, useBloqueInfo } from '../contexts/BloqueInfoContext';
import { useState } from 'react';
import AddBloquesSettingsModalC from './AddBloquesSettingsC';
import { INITIAL_BLOQUE } from '../contexts/BloqueInfoContext';

const BloquesSettingsC = () => {
  const { bloques, editBloque, removeBloque } = useBloqueInfo();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBloque, setEditingBloque] = useState<Bloque>(INITIAL_BLOQUE);
  const [isASheetOpen, setIsASheetOpen] = useState(false);
  const [isDeleteToastOpen, setIsDeleteToastOpen] = useState(false);

  const handleActions = (bloque: Bloque) => () => {
    setEditingBloque(bloque);
    setIsASheetOpen(true)
  };

  // coming from modal
  const handleEdit = () => {
    if (editingBloque.id) {
      editBloque(editingBloque.id, editingBloque);
    }
    setIsEditModalOpen(false);
  };

  const handleDelete = (bloqueId?: number) => {
    if (bloqueId) {
      removeBloque(bloqueId);
      setIsASheetOpen(false);
    }
  };

  return (
    <div>
      {bloques.map((bloque) =>
        <IonCard key={bloque.id} onClick={handleActions(bloque)}>
          <IonCardHeader>
            <IonCardTitle>{bloque.name}</IonCardTitle>
            <IonLabel>{bloque.numCamas} camas</IonLabel>
            <IonLabel>{bloque.numCuadrosPerCama} cuadros por cama</IonLabel>
            <IonLabel>{bloque.numCamas * bloque.numCuadrosPerCama} total de cuadros</IonLabel>
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
        handleConfirm={handleEdit}
        type='edit'
      />

      <IonActionSheet
        isOpen={isASheetOpen}
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
              setIsDeleteToastOpen(true);
            }
          },

        ]}
        onDidDismiss={() => setIsASheetOpen(false)}
      ></IonActionSheet>

      <IonAlert
        subHeader='Esta seguro de eliminar este bloque?'
        isOpen={isDeleteToastOpen}
        buttons={[
          {
            text: 'Eliminar',
            role: 'confirm',
            handler: () => {
              handleDelete(editingBloque.id);
            },
          },
        ]}
        onDidDismiss={() => setIsDeleteToastOpen(false)}
      ></IonAlert>
    </div>
  );
}

export default BloquesSettingsC;