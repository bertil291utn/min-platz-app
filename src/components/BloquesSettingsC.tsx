import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { Bloque, useBloqueInfo } from '../contexts/BloqueInfoContext';
import { useState } from 'react';
import AddBloquesSettingsModalC from './AddBloquesSettingsC';
import { INITIAL_BLOQUE } from '../contexts/BloqueInfoContext';

const BloquesSettingsC = () => {
  const { bloques, editBloque } = useBloqueInfo();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBloque, setEditingBloque] = useState<Bloque>(INITIAL_BLOQUE);

  const handleEdit = (bloque: Bloque) => () => {
    setEditingBloque(bloque);
    setIsEditModalOpen(true);
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
    </div>
  );
}

export default BloquesSettingsC;