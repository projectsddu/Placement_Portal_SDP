import { dashboard } from './dashboard';
import { dashboard1 } from './home';
import { dashboard2 } from './rikin';
import { utilities } from './utilities';
import { other } from './other';
import { StudentMenu } from './StudentMenu';
import { CompanyMenu } from './CompanyMenu';
import { AnnouncementMenu } from './AnnouncementMenu';
import { TempMenu } from './Student/TempMenu';
import { AnnouncementStudentMenu } from './Student/AnnouncementStudentMenu';
import { PlacementMenu } from './PlacementMenu';
import { InternshipMenu } from './InternshipMenu';
import { useLocation } from 'react-router';

//-----------------------|| MENU ITEMS ||-----------------------//

const current_location = window.location.href.split("/")
let menuItems
if (current_location[3] == "_student") {
    console.log("Here in student")
    menuItems = {
        items: [TempMenu, AnnouncementStudentMenu]
    }
}
else {
    menuItems = {
        items: [StudentMenu, PlacementMenu, InternshipMenu, AnnouncementMenu, CompanyMenu]
    };
}


export default menuItems;
