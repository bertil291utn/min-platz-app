import { IonActionSheet, IonAlert, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonLabel, IonToast } from '@ionic/react';
import { useState } from 'react';
import AddBloquesSettingsModalC from './AddBloquesSettingsC';
import { Bloque } from '../interfaces/Bloque';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { INITIAL_BLOQUE, editBloque, removeBloque, selectActiveBloques } from '../store/slices/bloqueInfoSlice';
import { NUMERO_CAMAS_MIN } from '../helpers/bloquesConstant';

const BloquesSettingsC = () => {
  const activeBloques = useAppSelector(selectActiveBloques);
  const dispatch = useAppDispatch();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBloque, setEditingBloque] = useState<Bloque>(INITIAL_BLOQUE);
  const [isASheetOpen, setIsASheetOpen] = useState(false);
  const [isDeleteToastOpen, setIsDeleteToastOpen] = useState(false);

  const handleActions = (bloque: Bloque) => () => {
    setEditingBloque(
      {
        ...bloque,
        numPlacasExternas: bloque.numPlacasExternas || NUMERO_CAMAS_MIN,
        numPlacasInternas: bloque.numPlacasInternas || NUMERO_CAMAS_MIN
      });
    setIsASheetOpen(true);
  };

  // coming from modal
  const handleEdit = () => {
    if (editingBloque.id) {
      dispatch(editBloque({ id: editingBloque.id, updatedBloque: editingBloque }));
    }
    setIsEditModalOpen(false);
  };

  const handleDelete = (bloqueId?: number) => {
    if (bloqueId) {
      dispatch(removeBloque(bloqueId));
      setIsASheetOpen(false);
    }
  };

  return (
    <div>
      {activeBloques.map((bloque) =>
        <IonCard key={bloque.id} onClick={handleActions(bloque)}>
          <IonCardHeader>
            <IonCardTitle>{bloque.name}</IonCardTitle>
            <IonLabel>{bloque.numCamas} camas</IonLabel>
            <IonLabel>{bloque.numCuadrosPerCama} cuadros por cama</IonLabel>
            <IonLabel>{bloque.numCamas * bloque.numCuadrosPerCama} total de cuadros</IonLabel>
            <IonLabel>{bloque.numPlacasExternas || 0} placas externas</IonLabel>
            <IonLabel>{bloque.numPlacasInternas || 0} placas internas</IonLabel>
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
};

export default BloquesSettingsC;
