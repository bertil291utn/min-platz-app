import React from 'react';
import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { helpCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';

export const HelpFab: React.FC = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/planes');
  };

  return (
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton onClick={handleClick}>
        <IonIcon icon={helpCircleOutline} />
      </IonFabButton>
    </IonFab>
  );
};

export default HelpFab; 