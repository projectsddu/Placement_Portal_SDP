// assets
import { IconDashboard, IconDeviceAnalytics, IconSpeakerphone, IconLayoutGridAdd, IconUser, IconCirclePlus, IconEye, IconMan, IconBrandGravatar } from '@tabler/icons';

// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    IconEye,
    IconSpeakerphone,
    IconLayoutGridAdd,
    IconCirclePlus, IconMan, IconBrandGravatar, IconUser

};

//-----------------------|| ANNOUNCEMENT DASHBOARD MENU ITEMS ||-----------------------//

export const TempMenu = {
    id: 'Temp',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'Temp1',
            title: 'Dashboard',
            type: 'item',
            url: '/_student/Dashboard/',
            icon: icons['IconDashboard'],
            breadcrumbs: false
        },
        {
            id: 'profile',
            title: 'Profile',
            type: 'item',
            url: '/_student/Dashboard/profile',
            icon: icons['IconUser'],
            breadcrumbs: false
        },

    ]
};
