import { Avatar, Menu, MenuButton } from "@chakra-ui/react";
import { ChevronDownIcon } from "lucide-react";

interface ProfileMenuProps {
  imageUrl?: string;
  name: string;
  nim: string;
  children: React.ReactNode;
}

export default function ProfileMenu({
  imageUrl,
  name,
  nim,
  children,
}: ProfileMenuProps) {
  return (
    <Menu>
      <MenuButton>
        <div className="flex items-center gap-2">
          {imageUrl ? (
            <Avatar src={imageUrl} name={name} size="sm" />
          ) : (
            <Avatar name={name} size="sm" />
          )}
          <div className="flex-col items-start hidden lg:flex">
            <span className="text-sm font-bold text-slate-900">{name}</span>
            <span className="text-xs text-slate-500">{nim}</span>
          </div>
          <ChevronDownIcon />
        </div>
      </MenuButton>
      {children}
    </Menu>
  );
}
