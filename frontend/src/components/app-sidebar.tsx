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
import { Compass, LogOut, Settings } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function AppSidebar() {
  const { logout, user }: any = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const projects = [
    {
      name: "Discover",
      url: "/discover",
      icon: <Compass />,
    },
    {
      name: "Settings",
      url: "/settings",
      icon: <Settings />,
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
            <Link
              to="/settings"
              className="p-2 flex justify-start items-center gap-x-3 w-full shadow py-4 mt-2 rounded-xl"
            >
              <img
                className="w-10 h-10 rounded-full bg-gray-700"
                src={
                  user?.profileImage ? user?.profileImage : "/no-profile.webp"
                }
                alt="profile"
              />
              <div>
                <h3 className="text-white text-base">
                  {user?.fullName ? user?.fullName : "anonymous"}
                </h3>
                <p className="text-black/40">User</p>
              </div>
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent className="w-[95%] ms-2 mt-4">
            <SidebarMenu>
              {projects.map((project) => {
                const isActive = location.pathname === project.url;
                return (
                  <SidebarMenuItem key={project.name}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={project.url}
                        className={`hover:rounded flex items-center space-x-2 ${
                          isActive ? "bg-primary/95 " : "bg-[#994D1C]"
                        }`}
                      >
                        {project.icon}
                        <span className="text-base">{project.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
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
