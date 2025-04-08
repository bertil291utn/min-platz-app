import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, IonListHeader, IonFooter, IonButton } from '@ionic/react';
import { documentTextOutline, cubeOutline, analyticsOutline, receiptOutline, settingsOutline } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router';

const Menu: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const activeMenuItems = [
    { title: 'Monitoreo', icon: analyticsOutline, path: '/monitoreo' }
  ];

  const upcomingMenuItems = [
    { title: 'Facturación', icon: documentTextOutline, path: '/facturacion' },
    { title: 'Notas de Envío', icon: cubeOutline, path: '/notas-envio' },
    { title: 'Factura Compra', icon: receiptOutline, path: '/factura-compra' }
  ];

  const handleMenuClick = (path: string) => {
    const menu = document.querySelector('ion-menu');
    if (menu) {
      menu.close();
    }
    history.push(path);
  };

  return (
    <IonMenu contentId="main">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menú Principal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {/* Active Menu Items */}
          {activeMenuItems.map((item, index) => (
            <IonItem 
              key={index} 
              button 
              onClick={() => handleMenuClick(item.path)}
              color={location.pathname === item.path ? 'primary' : undefined}
              className={location.pathname === item.path ? 'selected-menu-item' : ''}
            >
              <IonIcon slot="start" icon={item.icon} />
              <IonLabel>{item.title}</IonLabel>
            </IonItem>
          ))}

          <IonItem lines="full">
            <IonLabel></IonLabel>
          </IonItem>

          {/* Upcoming Menu Items */}
          <IonListHeader>
            <IonLabel style={{color:'gray'}}>Próximamente</IonLabel>
          </IonListHeader>
          
          {upcomingMenuItems.map((item, index) => (
            <IonItem 
              key={index} 
              button 
              onClick={() => handleMenuClick(item.path)}
              color={location.pathname === item.path ? 'primary' : undefined}
              className={location.pathname === item.path ? 'selected-menu-item' : ''}
            >
              <IonIcon slot="start" icon={item.icon} />
              <IonLabel style={{color:'gray'}}>{item.title}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
      <IonFooter>
        <div className="ion-text-end ion-padding">
          <IonButton 
            fill="clear" 
            size="small" 
            onClick={() => handleMenuClick('/settings')}
            color={location.pathname === '/settings' ? 'primary' : 'medium'}
          >
            <IonIcon slot="icon-only" icon={settingsOutline} />
          </IonButton>
        </div>
      </IonFooter>
    </IonMenu>
  );
};

export default Menu; 