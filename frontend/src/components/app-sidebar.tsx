import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/authStore";
import { Compass, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export function AppSidebar() {
  const { logout }: any = useAuthStore();
  const navigate = useNavigate();
  const projects = [
    {
      name: "Discover",
      url: "/discover",
      icon: <Compass />,
    },
    // {
    //   name: "My Books",
    //   url: "/my-books",
    //   icon: <BookOpen />,
    // },
    // {
    //   name: "Join Club",
    //   url: "/bookclub",
    //   icon: <Users />,
    // },
    // {
    //   name: "Contact Us",
    //   url: "/contact-us",
    //   icon: <PhoneCall />,
    // },
  ];
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/");
  };
  return (
    <Sidebar className="h-screen flex flex-col">
      <SidebarContent className="flex flex-col flex-grow">
        <SidebarGroup>
          <SidebarGroupLabel className="cursor-pointer my-4">
            <div className="p-2 flex justify-start items-center gap-x-3 w-full shadow py-4 mt-2 rounded-xl">
              <img
                className="w-10 h-10 rounded-full bg-gray-700"
                src="/no-profile.webp"
                alt="profile"
              />
              <div>
                <h3 className="text-white text-base">@anyonmous</h3>
                <p className="text-black/40">User</p>
              </div>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="w-[95%] ms-2 mt-4">
            <SidebarMenu>
              {projects.map((project) => (
                <SidebarMenuItem key={project.name}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={project.url}
                      className="bg-primary/95 hover:rounded flex items-center space-x-2"
                    >
                      {project.icon}
                      <span className="text-base">{project.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* Log Out Button */}
      <div className="flex p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex justify-start gap-x-4 items-center text-white font-bold w-fit text-left"
        >
          Log Out
          <LogOut />
        </button>
      </div>
    </Sidebar>
  );
}
