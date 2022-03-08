// assets
import { IconDashboard, IconDeviceAnalytics, IconBuildingCottage, IconCirclePlus, IconBuildingArch, IconFileReport, IconFiles, IconFileInfo, IconFileDownload } from '@tabler/icons';

// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    IconBuildingCottage,
    IconCirclePlus,
    IconBuildingArch,
    IconFileReport,
    IconFiles,
    IconFileInfo,
    IconFileDownload
};

//-----------------------|| COMPANY DASHBOARD MENU ITEMS ||-----------------------//

export const ReportMenu = {
    id: 'ReportMenu',
    title: '',
    type: 'group',
    children: [
        {
            id: 'Report Menu',
            title: 'Reports',
            type: 'collapse',
            icon: icons['IconFiles'],
            children: [
                {
                    id: 'MultiplePlacement',
                    title: 'Multiple Placement',
                    type: 'item',
                    url: '/reports/multiple_placement_report',
                    icon: icons['IconFileDownload'],
                    breadcrumbs: false
                },
                // {
                //     id: 'ViewCompany',
                //     title: 'View Company',
                //     type: 'item',
                //     url: '/company/view_company',
                //     icon: icons['IconBuildingCottage'],
                //     breadcrumbs: false
                // }
        ]
        
        }
    ]
};
