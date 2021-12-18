// assets
import { IconDashboard, IconDeviceAnalytics, IconSpeakerphone } from '@tabler/icons';

// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    IconSpeakerphone
};

//-----------------------|| ANNOUNCEMENT DASHBOARD MENU ITEMS ||-----------------------//

export const AnnouncementMenu = {
    id: 'AnnouncementMenu',
    title: 'Announcement',
    type: 'group',
    children: [
        {
            id: 'AnnouncementDetails',
            title: 'All Announcements',
            type: 'item',
            url: '/announcement/index',
            icon: icons['IconSpeakerphone'],
            breadcrumbs: false
        },

    ]
};
