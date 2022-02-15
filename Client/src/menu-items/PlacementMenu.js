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

export const PlacementMenu = {
    id: 'PlacementMenu',
    title: 'Placement',
    type: 'group',
    children: [
        {
            id: 'AddPlacement',
            title: 'Add Placement',
            type: 'item',
            url: '/placement/add_placement',
            icon: icons['IconCirclePlus'],
            breadcrumbs: false
        },
    ]
};