// assets
import { IconDashboard, IconDeviceAnalytics, IconSpeakerphone, IconLayoutGridAdd, IconCirclePlus, IconEye } from '@tabler/icons';

// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    IconEye,
    IconSpeakerphone,
    IconLayoutGridAdd,
    IconCirclePlus
};

//-----------------------|| ANNOUNCEMENT DASHBOARD MENU ITEMS ||-----------------------//

export const TempMenu = {
    id: 'Temp',
    title: 'Temp',
    type: 'group',
    children: [
        {
            id: 'Temp1',
            title: 'Add Temp',
            type: 'item',
            url: '/_student/Dashboard/',
            icon: icons['IconCirclePlus'],
            breadcrumbs: false
        },


    ]
};
