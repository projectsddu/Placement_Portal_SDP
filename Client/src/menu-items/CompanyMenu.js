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
            id: 'CompanyAdd',
            title: 'Add Company',
            type: 'item',
            url: '/company/add_company',
            icon: icons['IconCirclePlus'],
            breadcrumbs: false
        },
        {
            id: 'ViewCompany',
            title: 'View Company',
            type: 'item',
            url: '/company/view_company',
            icon: icons['IconBuildingCottage'],
            breadcrumbs: false
        },
        
    ]
};
