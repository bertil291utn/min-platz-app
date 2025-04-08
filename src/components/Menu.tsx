import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel } from '@ionic/react';
import { documentTextOutline, cubeOutline, analyticsOutline, receiptOutline } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router';

const Menu: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    { title: 'Facturación', icon: documentTextOutline, path: '/tabs/facturacion' },
    { title: 'Notas de Envío', icon: cubeOutline, path: '/tabs/notas-envio' },
    { title: 'Monitoreo', icon: analyticsOutline, path: '/tabs/monitoreo' },
    { title: 'Factura Compra', icon: receiptOutline, path: '/tabs/factura-compra' }
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
          {menuItems.map((item, index) => (
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
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu; 