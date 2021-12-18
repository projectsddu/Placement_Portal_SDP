// assets
import { IconDashboard, IconDeviceAnalytics, IconUsers } from '@tabler/icons';

// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    IconUsers
};

//-----------------------|| Student Dashboard Items ||-----------------------//

export const StudentMenu = {
    id: 'StudentMenu',
    title: 'Student',
    type: 'group',
    children: [
        {
            id: 'StudentDetails',
            title: 'Student Details',
            type: 'item',
            url: '/icons/form_elements',
            icon: icons['IconUsers'],
            breadcrumbs: false
        }
    ]
};
