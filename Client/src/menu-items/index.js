import { dashboard } from './dashboard';
import { dashboard1 } from './home';
import { dashboard2 } from './rikin';
import { utilities } from './utilities';
import { other } from './other';
import { StudentMenu } from './StudentMenu';
import { CompanyMenu } from './CompanyMenu';
import { AnnouncementMenu } from './AnnouncementMenu';

//-----------------------|| MENU ITEMS ||-----------------------//

const menuItems = {
    items: [StudentMenu, AnnouncementMenu, CompanyMenu]
};

export default menuItems;
