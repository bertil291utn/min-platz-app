import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonListHeader,
  IonFooter,
  IonButton,
  IonItemDivider,
  IonAccordion,
  IonAccordionGroup,
} from '@ionic/react';
import {
  documentTextOutline,
  cubeOutline,
  analyticsOutline,
  receiptOutline,
  settingsOutline,
  cloudyOutline,
  flaskOutline,
  leafOutline,
  home,
  scanOutline,
  eyeOutline,
  chevronDown,
} from 'ionicons/icons';
import React from 'react';
import { useHistory, useLocation } from 'react-router';
import './Menu.css';

const Menu: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const activeMenuItems = [
    { title: 'Principal', icon: home, path: '/home' },
    {
      title: 'Manejo de plagas',
      icon: analyticsOutline,
      path: '/monitoreo',
      subItems: [
        { title: 'Monitoreo', icon: scanOutline, path: '/monitoreo/nuevo' },
        { title: 'Ver Monitoreo', icon: eyeOutline, path: '/monitoreo/ver' },
      ],
    },
  ];

  const upcomingMenuItems = [
    { title: 'Facturación', icon: documentTextOutline, path: '/facturacion' },
    { title: 'Notas de Envío', icon: cubeOutline, path: '/notas-envio' },
    { title: 'Factura Compra', icon: receiptOutline, path: '/factura-compra' },
    { title: 'Pronósticos Climáticos', icon: cloudyOutline, path: '/pronosticos' },
    { title: 'Fumigación y fertilización', icon: flaskOutline, path: '/fumigacion' },
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
          <IonTitle>Florvis</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {/* Active Menu Items */}
          {activeMenuItems.map((item, index) => (
            <React.Fragment key={index}>
              {!item.subItems ? (
                <IonItem
                  button
                  onClick={() => handleMenuClick(item.path)}
                  color={location.pathname === item.path ? 'primary' : undefined}
                  className={location.pathname === item.path ? 'selected-menu-item' : ''}
                >
                  <IonIcon slot="start" icon={item.icon} />
                  <IonLabel>{item.title}</IonLabel>
                </IonItem>
              ) : (
                <IonAccordionGroup>
                  <IonAccordion value={item.title}>
                    <IonItem slot="header">
                      <IonIcon slot="start" icon={item.icon} />
                      <IonLabel>{item.title}</IonLabel>
                    </IonItem>
                    <div slot="content" 
                    >
                      {item.subItems.map((subItem, subIndex) => (
                        <IonItem
                          key={`${index}-${subIndex}`}
                          button
                          onClick={() => handleMenuClick(subItem.path)}
                          color={location.pathname === subItem.path ? 'primary' : undefined}
                          className={`submenu-item ${
                            location.pathname === subItem.path ? 'selected-menu-item' : ''
                          }`}
                          lines="none"
                        >
                          <IonIcon slot="start" icon={subItem.icon} />
                          <IonLabel>{subItem.title}</IonLabel>
                        </IonItem>
                      ))}
                    </div>
                  </IonAccordion>
                </IonAccordionGroup>
              )}
            </React.Fragment>
          ))}

          <IonItemDivider />

          {/* Upcoming Menu Items */}
          <IonListHeader>
            <IonLabel style={{ color: 'gray' }}>Próximamente</IonLabel>
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
              <IonLabel style={{ color: 'gray' }}>{item.title}</IonLabel>
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