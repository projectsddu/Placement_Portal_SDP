// assets
import { IconDashboard, IconDeviceAnalytics, IconBuildingCottage, IconCirclePlus } from '@tabler/icons';

// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    IconBuildingCottage,
    IconCirclePlus
};

//-----------------------|| COMPANY DASHBOARD MENU ITEMS ||-----------------------//

export const CompanyMenu = {
    id: 'CompanyMenu',
    title: 'Company',
    type: 'group',
    children: [
        {
            id: 'CompanyDetails',
            title: 'Company Details',
            type: 'item',
            url: '/icons/form_elements',
            icon: icons['IconBuildingCottage'],
            breadcrumbs: false
        },
        {
            id: 'CompanyAdd',
            title: 'Add Company',
            type: 'item',
            url: '/icons/form_elements',
            icon: icons['IconCirclePlus'],
            breadcrumbs: false
        }
    ]
};
