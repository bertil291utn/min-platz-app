import React from 'react';
import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { sparkles } from 'ionicons/icons';
import { useHistory } from 'react-router';

export const HelpFab: React.FC = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/planes');
  };

  return (
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton 
        onClick={handleClick}
        color="warning"
        style={{
          '--box-shadow': '0 4px 12px rgba(255, 196, 9, 0.4)',
          animation: 'pulse 2s infinite'
        }}
      >
        <IonIcon 
          icon={sparkles} 
          style={{
            fontSize: '24px',
          }}
        />
      </IonFabButton>
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
              box-shadow: 0 4px 12px rgba(255, 196, 9, 0.4);
            }
            50% {
              transform: scale(1.05);
              box-shadow: 0 4px 16px rgba(255, 196, 9, 0.6);
            }
            100% {
              transform: scale(1);
              box-shadow: 0 4px 12px rgba(255, 196, 9, 0.4);
            }
          }
        `}
      </style>
    </IonFab>
  );
};

export default HelpFab; 