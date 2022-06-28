import { IconDashboard, IconDeviceAnalytics, IconSpeakerphone, IconLayoutGridAdd, IconCirclePlus, IconEye, IconArtboard, IconFileUpload, IconNotification, IconBellRinging } from '@tabler/icons';
import NotificationAddRoundedIcon from '@mui/icons-material/NotificationAddRounded';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';

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
    IconBellRinging,
    NotificationAddRoundedIcon,
    NotificationAddOutlinedIcon
};

export const NotificationMenu = {
    id: 'NotificationMenu',
    title: '',
    type: 'group',
    children: [
        {
            id: 'Notification Menu',
            title: 'Send Notification',
            type: 'collapse',
            icon: icons['NotificationAddOutlinedIcon'],
            children: [{
                id: 'Batch Notification',
                title: 'Send Batch Notification',
                type: 'item',
                url: '/notification/send_batch_notificataion',
                icon: icons['IconBellRinging'],
                breadcrumbs: false
            },

            ]
        }
    ]
};