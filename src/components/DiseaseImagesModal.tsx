import { IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Disease } from '../interfaces/Diseases';

import acaros01 from '../assets/rosas-diseases/acaros/acaros01.png';
import acaros02 from '../assets/rosas-diseases/acaros/acaros02.jpg';

import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';


interface Props {
  isOpen: boolean;
  onDismiss: () => void;
  disease: Disease;
}

const IMAGES_DISEASE_PATH= '../assets/rosas-diseases';

const DiseaseImagesModal: React.FC<Props> = ({ isOpen, onDismiss, disease }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{disease.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Swiper>
          <SwiperSlide>
            <img src={acaros01} alt={`${disease.name} 1`} style={{ width: '100%', height: 'auto' }} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={acaros02} alt={`${disease.name} 1`} style={{ width: '100%', height: 'auto' }} />
          </SwiperSlide>
          {/* {disease.images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={`${IMAGES_DISEASE_PATH}/${disease.name}/${image.src}`} alt={`${disease.name} ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
            </SwiperSlide>
          ))} */}
        </Swiper>
      </IonContent>
    </IonModal>
  );
};

export default DiseaseImagesModal;
