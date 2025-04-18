import {
  IonAccordion, IonItem, IonLabel, IonButton,
  IonIcon, IonList, IonNote, IonAvatar, IonChip,
  IonToggle,
} from '@ionic/react';
import { logOutOutline, personCircleOutline, mailOutline, callOutline, cardOutline, settingsOutline } from 'ionicons/icons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { cleanUser, updateUser } from '../store/slices/userSlice';
import { logout, setAuthenticated } from '../store/slices/authSlice';
import { useIonRouter } from '@ionic/react';
import './SettingsComponent.css';

const UserProfileC = () => {
  const user = useAppSelector(state => state.userLogged.user);
  const dispatch = useAppDispatch();
  const router = useIonRouter();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(cleanUser());
    dispatch(setAuthenticated(false));
    router.push('/login');
  };

  const handleToggleChange = (e: CustomEvent) => {
    const newValue = e.detail.checked;
    const name = (e.target as HTMLIonToggleElement)?.name;
    dispatch(updateUser({ [name]: newValue }));
  };

  const handleTogglePremium = () => {
    router.push('/planes')
  };

  if (!user) return null;

  return (
    <IonAccordion value="profile">
      <IonItem slot="header" color="light">
        <IonLabel>Perfil</IonLabel>
        <IonIcon slot="start" icon={personCircleOutline} />
      </IonItem>
      <div className="ion-padding" slot="content">
        <IonList>
          <IonItem>
            <IonAvatar slot="start">
              {user.avatar ? (
                <img src={user.avatar} alt="Avatar" />
              ) : (
                <IonIcon icon={personCircleOutline} size="large" />
              )}
            </IonAvatar>
            <IonLabel>
              <h2>{user.name} {user.lastName}</h2>
              <IonNote>CI: {user.ci}</IonNote>
            </IonLabel>
          </IonItem>
          {user.email && (
            <IonItem>
              <IonIcon slot="start" icon={mailOutline} />
              <IonLabel>{user.email}</IonLabel>
            </IonItem>
          )}
          {user.whatsapp && (
            <IonItem>
              <IonIcon slot="start" icon={callOutline} />
              <IonLabel>{user.whatsapp}</IonLabel>
            </IonItem>
          )}
          <IonItem>
            <IonIcon slot="start" icon={cardOutline} />
            <IonLabel>
              <div className="ion-text-wrap">
                <IonChip color={user.premium ? "primary" : "medium"}>
                  {user.premium ? "Premium" : "Básico"}
                </IonChip>
                {user.expert && (
                  <IonChip color="success" className="ion-margin-start">
                    Experto
                  </IonChip>
                )}
              </div>
            </IonLabel>
          </IonItem>
        </IonList>

        <div className="section-divider"></div>

        <div className="ion-padding-bottom">
          <h2 className="ion-text-start">
            <IonIcon icon={settingsOutline} className="ion-margin-end" />
            Configuración de Usuario
          </h2>
          <IonList>
            <IonItem>
              <IonLabel>{user.expert ? 'Desactivar de' : 'Activar a'} usuario experto</IonLabel>
              <IonToggle
                name='expert'
                checked={user.expert}
                onIonChange={handleToggleChange}
                slot="end"
              />
            </IonItem>
            {/* remove this component just for test, this value has to coming from database and set in userset */}

            <IonItem>
              <IonLabel>{user.premium ? 'Desactivar de' : 'Activar a'} usuario premium</IonLabel>
              <IonToggle
                name='premium'
                checked={user.premium}
                onIonChange={handleTogglePremium}
                slot="end"
              />
            </IonItem>
          </IonList>
        </div>

        <div className="section-divider"></div>

        <IonButton expand="block" color="danger" onClick={handleLogout}>
          <IonIcon slot="start" icon={logOutOutline} />
          Cerrar Sesión
        </IonButton>
      </div>
    </IonAccordion>
  );
}

export default UserProfileC; 