import { Outlet } from "react-router-dom";
import SidebarDashboard from "./sideBar";
import DashboardNabar from "./navBar";
function DashboardLayout() {
return(
    <>
    <SidebarDashboard/>
    <DashboardNabar/>
    <Outlet/>
    </>
)
}
export default DashboardLayout;