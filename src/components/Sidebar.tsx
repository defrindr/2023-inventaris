import SidebarNavItem from "@/components/sidebar-nav-item";
import sidebarItems from "@/data/sidebar";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/ui/scoll-area";

export default function Sidebar() {
  return (
    <aside
      id="sidebar"
      className="fixed z-30 hidden h-[calc(100vh-5rem)] w-full overflow-y-auto bg-white border-r top-20 shrink-0 lg:sticky lg:block"
    >
      <ScrollArea className="py-6 pr-6 lg:pl-8 lg:py-8">
        {sidebarItems.length && (
          <div className="w-full">
            {sidebarItems.map((item, index) => (
              <div key={index} className={cn("pb-6")}>
                <h4 className="px-2 py-1 mb-1 text-sm font-semibold rounded-md">
                  {item.title}
                </h4>
                {item?.items?.length && <SidebarNavItem items={item.items} />}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </aside>
  );
}
