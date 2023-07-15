import SidebarNavItem from "@/components/sidebar-nav-item";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
} from "@chakra-ui/react";
import { PanelLeftOpen } from "lucide-react";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
  to: string;
  title: string;
  items: {
    title: string;
    items?: {
      title: string;
      href?: string;
      disabled?: boolean;
      external?: boolean;
      label?: string;
      end: boolean;
    }[];
  }[];
}

export default function MobileMenu({
  onOpen,
  onClose,
  isOpen,
  to,
  title,
  items,
}: MobileMenuProps) {
  return (
    <div className="block lg:hidden">
      <IconButton
        icon={<PanelLeftOpen />}
        variant="ghost"
        aria-label="Toggle Menu"
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size={"xs"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Link to={to}>
              <h1 className="font-semibold leading-7 text-slate-900">
                {title}
              </h1>
            </Link>
          </DrawerHeader>
          <DrawerBody paddingTop={"1rem"} id="mobile">
            {items.length && (
              <div className="w-full">
                {items.map((item, index) => (
                  <div key={index} className={cn("pb-6")}>
                    <h4 className="px-2 py-1 mb-1 text-sm font-semibold rounded-md">
                      {item.title}
                    </h4>
                    {item?.items?.length && (
                      <SidebarNavItem items={item.items} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
