// assets
import { IconDashboard, IconDeviceAnalytics, IconSpeakerphone, IconLayoutGridAdd, IconCirclePlus, IconEye, IconSportBillard, IconBellRinging } from '@tabler/icons';

// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    IconEye,
    IconSpeakerphone,
    IconLayoutGridAdd,
    IconCirclePlus,
    IconSportBillard, IconBellRinging

};

//-----------------------|| ANNOUNCEMENT DASHBOARD MENU ITEMS ||-----------------------//

export const AnnouncementStudentMenu = {
    id: 'AnnouncementStudentMenu',
    title: 'Announcements',
    type: 'group',
    children: [
        {
            id: 'view_announcements',
            title: 'View Announcements',
            type: 'item',
            url: '/_student/announcement/view_announcement',
            icon: icons['IconEye'],
            breadcrumbs: false
        },
        {
            id: 'subscribed_announcements',
            title: 'Subscribed Announcements',
            type: 'item',
            url: '/_student/announcement/view_subscribed_announcement',
            icon: icons['IconBellRinging'],
            breadcrumbs: false
        },

    ]
};
