// assets
import { IconDashboard, IconDeviceAnalytics, IconSpeakerphone, IconLayoutGridAdd, IconCirclePlus, IconEye, IconMan, IconUserPlus, IconBriefcase } from '@tabler/icons';

// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    IconEye,
    IconSpeakerphone,
    IconLayoutGridAdd,
    IconEye,
    IconCirclePlus,
    IconMan,
    IconUserPlus,
    IconBriefcase
};

export const PlacementMenu = {
    id: 'PlacementMenu',
    title: '',
    type: 'group',
    children: [
        {
            id: 'icons',
            title: 'Placement',
            type: 'collapse',
            icon: icons['IconBriefcase'],
            children: [{
                id: 'AddPlacement',
                title: 'Add Placement',
                type: 'item',
                url: '/placement/add_placement',
                icon: icons['IconCirclePlus'],
                breadcrumbs: false
            }
            ]
        }
    ]
};