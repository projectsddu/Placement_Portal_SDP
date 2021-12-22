// assets
import { IconDashboard, IconDeviceAnalytics, IconSpeakerphone, IconLayoutGridAdd, IconCirclePlus } from '@tabler/icons';

// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    IconSpeakerphone, 
    IconLayoutGridAdd,
    IconCirclePlus
};

//-----------------------|| ANNOUNCEMENT DASHBOARD MENU ITEMS ||-----------------------//

export const AnnouncementMenu = {
    id: 'AnnouncementMenu',
    title: 'Announcement',
    type: 'group',
    children: [
        {
            id: 'AddAnnoucement',
            title: 'Add Annoucement',
            type: 'item',
            url: '/announcement/add_annoucement',
            icon: icons['IconCirclePlus'],
            breadcrumbs: false
        },
        {
            id: 'ViewAnnoucement',
            title: 'View Annoucements',
            type: 'item',
            url: '/announcement/view_annoucement',
            icon: icons['IconCirclePlus'],
            breadcrumbs: false
        },
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
