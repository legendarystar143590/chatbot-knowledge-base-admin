import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import { SideMenu } from '../utils/Type';
import { CircleStackIcon } from '@heroicons/react/24/outline';
import ServerStackIcon from '@heroicons/react/24/outline/ServerStackIcon';

const iconClasses = 'h-6 w-6';
// const submenuIconClasses = 'h-5 w-5';

const routes: SideMenu = [
  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses} />,
    name: 'Dashboard',
  },
  {
    path: '/app/assistants',
    icon: <ServerStackIcon className={iconClasses} />,
    name: 'Assistants',
  },
  {
    path: '/app/knowledge-base',
    icon: <CircleStackIcon className={iconClasses} />,
    name: 'Knowledge Base',
  },
];

export default routes;