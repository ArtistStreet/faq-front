import {
    Activity,
    Bell,
    Circle,
    Code,
    Figma,
    Folder,
    Gift,
    Home,
    Inbox,
    List,
    MapPin,
    PenTool,
    Settings,
    ShoppingCart,
    Truck,
    User,
    UserCheck,
    Users,
} from 'react-feather';

export const getIcon = (iconName: string | undefined): JSX.Element => {
    let element = <Circle size={14} />;
    switch (iconName) {
        case 'home':
            element = <Home size={14} />;
            break;
        case 'user-check':
            element = <UserCheck size={14} />;
            break;
        case 'users':
            element = <Users size={14} />;
            break;
        case 'user':
            element = <User size={14} />;
            break;
        case 'bell':
            element = <Bell size={14} />;
            break;
        case 'list':
            element = <List size={14} />;
            break;
        case 'activity':
            element = <Activity size={14} />;
            break;
        case 'settings':
            element = <Settings size={14} />;
            break;
        case 'folder':
            element = <Folder size={14} />;
            break;
        case 'shopping-cart':
            element = <ShoppingCart size={14} />;
            break;
        case 'map-pin':
            element = <MapPin size={14} />;
            break;
        case 'gift':
            element = <Gift size={14} />;
            break;
        case 'inbox':
            element = <Inbox size={14} />;
            break;
        case 'truck':
            element = <Truck size={14} />;
            break;
        case 'code':
            element = <Code size={14} />;
            break;
        case 'figma':
            element = <Figma size={14} />;
            break;
        case 'pen-tool':
            element = <PenTool size={14} />;
            break;
        default:
            break;
    }
    return element;
};
