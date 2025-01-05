import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import Disocver from "../Discover/Discover";
import MyBooks from "../MyBooks/MyBooks";
import JoinClub from "../JoinClub/JoinClub";
import ContactUs from "../ContactUs/ContactUs";

export default function Dashboard() {
  const location = useLocation();
  const renderContent = () => {
    switch (location.pathname) {
      case "/discover":
        return <Disocver />;
      case "/my-books":
        return <MyBooks />;
      case "/bookclub":
        return <JoinClub />;
      case "/contact-us":
        return <ContactUs />;
    }
  };
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="w-full border-b pb-2 flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb className="w-full">
              <BreadcrumbList className="w-full">
                <BreadcrumbItem className="flex justify-end w-full">
                  <Link
                    to="/"
                    className="ml-auto text-right text-black font-semibold text-2xl"
                  >
                    ReviewBlog<span className="text-primary">.</span>
                  </Link>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {renderContent()}
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
