import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

export default function SidebarNavItem({
  items,
}: {
  items: {
    title: string;
    href?: string;
    disabled?: boolean;
    external?: boolean;
    label?: string;
    end: boolean;
  }[];
}) {
  return items.length ? (
    <div className="grid grid-flow-row text-sm auto-rows-max">
      {items.map((item, index) =>
        item.href ? (
          <NavLink
            key={index}
            to={item.href}
            className={cn(
              "group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:underline",
              item.disabled && "cursor-not-allowed opacity-60"
            )}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
            end={item.end}
          >
            {item.title}
            {item.label && (
              <span className="ml-2 rounded-md bg-teal-100 px-1.5 py-0.5 text-xs no-underline group-hover:no-underline dark:bg-teal-600">
                {item.label}
              </span>
            )}
          </NavLink>
        ) : (
          <span
            key={index}
            className="flex items-center w-full p-2 rounded-md cursor-not-allowed text-muted-foreground hover:underline"
          >
            {item.title}
          </span>
        )
      )}
    </div>
  ) : null;
}
