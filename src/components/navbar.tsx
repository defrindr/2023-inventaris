import MobileMenu from "@/components/mobile-menu";
import ProfileMenu from "@/components/profile-menu";
import sidebarItems from "@/data/sidebar";
import { environment } from "@/environments/environments";
import { IconButton, MenuDivider, MenuGroup, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react";
import { useViewportSize } from "@mantine/hooks";
import { BellIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { width } = useViewportSize();
  const [user, setUser] = useState({});

  useEffect(() => {
    const loadUser = async () => {
      let accountLoggedIn = localStorage.getItem('user');
      // check if user data is exist
      if (accountLoggedIn) {
        // decode user data
        accountLoggedIn = JSON.parse(accountLoggedIn);
        // inject to reactive variable
        setUser(() => accountLoggedIn);
      }
    }

    loadUser();
  }, [])

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  useEffect(() => {
    if (width >= 1024) {
      onClose();
    }
  }, [onClose, width]);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 flex items-center h-20 border-b backdrop-blur-sm bg-white/75 border-slate-300">
      <div className="container flex items-center justify-between w-full mx-auto max-w-7xl">
        {/* Mobile Menu Left */}
        <MobileMenu isOpen={isOpen} onOpen={onOpen} onClose={onClose} to="/dashboard" title="Teknologi Rekayasa Komputer 💻" items={sidebarItems} />

        {/* Desktop Menu Left */}
        <div className="items-center justify-center hidden gap-2 lg:flex">
          <Link to="/dashboard">
            <h1 className="font-semibold leading-7 text-slate-900">Teknologi Rekayasa Komputer 💻</h1>
          </Link>
        </div>

        {/* Desktop Menu Right */}
        <div className="flex items-center justify-center gap-4">
          <IconButton icon={<BellIcon />} variant="ghost" aria-label="Notifications" />

          <ProfileMenu imageUrl={`${environment.fileUrl}/${user?.foto}`} name={user?.nama ?? 'Unknown User'} nim={user?.no_identitas ?? '-'}>
            <MenuList>
              <MenuGroup title="Profile">
                <MenuItem>My Account</MenuItem>
                <MenuItem>Payments </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuItem color="red.500" onClick={() => logout()}>
                Logout
              </MenuItem>
            </MenuList>
          </ProfileMenu>
        </div>
      </div>
    </header>
  );
}
