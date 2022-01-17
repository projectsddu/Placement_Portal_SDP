// assets
import { IconDashboard, IconDeviceAnalytics, IconUsers, IconEye, IconCirclePlus } from '@tabler/icons';

// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    IconEye,
    IconCirclePlus,
    IconUsers
};

//-----------------------|| Student Dashboard Items ||-----------------------//

export const StudentMenu = {
    id: 'StudentMenu',
    title: 'Student',
    type: 'group',
    children: [
        {
            id: 'AddStudent',
            title: 'Add Student',
            type: 'item',
            url: '/student/add_student',
            icon: icons['IconCirclePlus'],
            breadcrumbs: false
        },
        {
            id: 'StudentDetails',
            title: 'Student Details',
            type: 'item',
            url: '/icons/form_elements',
            icon: icons['IconUsers'],
            breadcrumbs: false
        },
        {
            id: 'ViewStudent',
            title: 'View Student',
            type: 'item',
            url: '/student/view_student',
            icon: icons['IconEye'],
            breadcrumbs: false
        }
    ]
};
