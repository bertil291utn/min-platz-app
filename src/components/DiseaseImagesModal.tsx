import { IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle } from '@ionic/react';
import { Disease } from '../interfaces/Diseases';



interface Props {
  isOpen: boolean;
  onDismiss: () => void;
  disease: Disease;
}

const IMAGES_DISEASE_PATH= '/assets/rosas-diseases';

const DiseaseImagesModal: React.FC<Props> = ({ isOpen, onDismiss, disease }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{disease.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismiss}>salir</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
          {disease.images.map((image, index) => (
              <img src={`${IMAGES_DISEASE_PATH}/${disease.folderName}/${image.src}`} alt={`${disease.name} ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
          ))}
      </IonContent>
    </IonModal>
  );
};

export default DiseaseImagesModal;
