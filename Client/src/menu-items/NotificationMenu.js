

// assets
import { IconDashboard, IconDeviceAnalytics, IconSpeakerphone, IconLayoutGridAdd, IconCirclePlus, IconEye, IconArtboard, IconFileUpload, IconNotification, IconBellRinging } from '@tabler/icons';

// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    IconEye,
    IconSpeakerphone,
    IconLayoutGridAdd,
    IconEye,
    IconCirclePlus,
    IconArtboard,
    IconFileUpload,
    IconNotification,
    IconBellRinging
};

export const NotificationMenu = {
    id: 'NotificationMenu',
    title: '',
    type: 'group',
    children: [
        {
            id: 'icons',
            title: 'Notification',
            type: 'collapse',
            icon: icons['IconBellRinging'],
            children: [{
                id: 'Batch Notification',
                title: 'Notification to batch',
                type: 'item',
                url: '/notification/batchNotification',
                icon: icons['IconCirclePlus'],
                breadcrumbs: false
            },
            {
                id: 'AddInternshipViaCSV',
                title: 'Add Internship Via CSV',
                type: 'item',
                url: '/internship/add_internship_via_csv',
                icon: icons['IconFileUpload'],
                breadcrumbs: false
            }
            ]
        }
    ]
};