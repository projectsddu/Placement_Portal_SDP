// assets
import { IconDashboard, IconDeviceAnalytics, IconSpeakerphone, IconLayoutGridAdd, IconCirclePlus, IconEye } from '@tabler/icons';

// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    IconEye,
    IconSpeakerphone,
    IconLayoutGridAdd,
    IconEye,
    IconCirclePlus
};

export const InternshipMenu = {
    id: 'InternshipMenu',
    title: 'Internship',
    type: 'group',
    children: [
        {
            id: 'AddInternship',
            title: 'Add Internship',
            type: 'item',
            url: '/internship/add_internship',
            icon: icons['IconCirclePlus'],
            breadcrumbs: false
        },
    ]
};