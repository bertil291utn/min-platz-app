import { useState, useEffect } from 'react';
import { IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle, IonLabel } from '@ionic/react';
import { Disease } from '../interfaces/Diseases';

interface Props {
  isOpen: boolean;
  onDismiss: () => void;
  disease: Disease;
}

const IMAGES_DISEASE_PATH = '/assets/rosas-diseases';

const DiseaseImagesModal: React.FC<Props> = ({ isOpen, onDismiss, disease }) => {
  const [infoText, setInfoText] = useState<string>('');

  useEffect(() => {
    const loadInfoText = async () => {
      try {
        const response = await fetch(`${IMAGES_DISEASE_PATH}/${disease.folderName}/info.txt`);
        const text = await response.text();
        setInfoText(text);
      } catch (error) {
        console.error('Error loading info text:', error);
        setInfoText('Information not available');
      }
    };

    if (isOpen) {
      loadInfoText();
    }
  }, [disease.folderName, isOpen]);

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{disease.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismiss}>regresar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p className='ion-padding'>
          {infoText}
        </p>
        {disease.images.map((image, index) => (
          <img
            key={index}
            src={`${IMAGES_DISEASE_PATH}/${disease.folderName}/${image.src}`} alt={`${disease.name} ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
        ))}
      </IonContent>
    </IonModal>
  );
};

export default DiseaseImagesModal;
