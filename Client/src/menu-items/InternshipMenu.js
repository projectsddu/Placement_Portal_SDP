// assets
import { IconDashboard, IconDeviceAnalytics, IconSpeakerphone, IconLayoutGridAdd, IconCirclePlus, IconEye, IconArtboard } from '@tabler/icons';

// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    IconEye,
    IconSpeakerphone,
    IconLayoutGridAdd,
    IconEye,
    IconCirclePlus,
    IconArtboard
};

export const InternshipMenu = {
    id: 'InternshipMenu',
    title: '',
    type: 'group',
    children: [
        {
            id: 'icons',
            title: 'Internship',
            type: 'collapse',
            icon: icons['IconArtboard'],
            children: [{
                id: 'AddInternship',
                title: 'View / Add Internship',
                type: 'item',
                url: '/internship/add_internship',
                icon: icons['IconCirclePlus'],
                breadcrumbs: false
            }]
        }
    ]
};