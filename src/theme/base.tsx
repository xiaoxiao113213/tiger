import { DrawerClassNames, DrawerStyles } from 'antd/es/drawer/DrawerPanel';
import styles from '@/components/markdown/styles.ts';


const classNames: DrawerClassNames = {
  body: styles['my-drawer-body'],
  mask: styles['my-drawer-mask'],
  header: styles['my-drawer-header'],
  footer: styles['my-drawer-footer'],
  content: styles['my-drawer-content'],
};

const drawerStyles: DrawerStyles = {
  mask: {
    backdropFilter: 'blur(10px)',
  },
  content: {
    boxShadow: '-10px 0 10px #666',
  },

};