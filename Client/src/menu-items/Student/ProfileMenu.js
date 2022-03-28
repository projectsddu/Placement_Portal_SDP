// assets
import { IconDashboard, IconDeviceAnalytics, IconSpeakerphone, IconLayoutGridAdd, IconUser, IconCirclePlus, IconEye, IconMan, IconBrandGravatar, IconEdit, IconUserX, IconUserCheck, IconUserExclamation, IconUserOff } from '@tabler/icons';

// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    IconEye,
    IconSpeakerphone,
    IconLayoutGridAdd,
    IconCirclePlus, 
    IconMan, 
    IconBrandGravatar, 
    IconUser,
    IconEdit,
    IconUserX,
    IconUserCheck,
    IconUserExclamation,
    IconUserOff
};

//-----------------------|| ANNOUNCEMENT DASHBOARD MENU ITEMS ||-----------------------//

export const ProfileMenu = {
    id: 'Temp',
    title: '',
    type: 'group',
    children: [
        {
            id: 'dashboard',
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
        {
            id: 'edit_profile',
            title: 'Edit Profile',
            type: 'item',
            url: '/_student/Dashboard/edit_profile',
            icon: icons['IconEdit'],
            breadcrumbs: false
        },

    ]
};
