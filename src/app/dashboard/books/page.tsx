import bookItems from "@/data/books";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Text, TextInput, Title } from "@tremor/react";
import { SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Books() {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    navigate("/dashboard/books/how-inovation-works");
  };

  return (
    <>
      <Title>Books</Title>
      <Text>
        The book page displays a list of books that can be borrowed by the user.
      </Text>

      <div className="flex justify-end">
        <TextInput
          className="max-w-sm mt-6"
          icon={SearchIcon}
          placeholder="Search..."
        />
      </div>

      <Tabs
        variant="soft-rounded"
        colorScheme="blackAlpha"
        marginTop={"1.5rem"}
      >
        <TabList className="overflow-y-auto">
          {bookItems.map((item, index) => (
            <Tab key={index}>{item.group}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {bookItems.map((item, index) => (
            <TabPanel key={index} padding={0}>
              <div className="grid grid-cols-2 gap-8 mt-6 md:grid-cols-4 lg:grid-cols-5">
                {item?.items?.length &&
                  item.items.map((item, index) => (
                    <div key={index} className="flex flex-col gap-4">
                      <div
                        className="relative w-full h-full"
                        onClick={handleClick}
                      >
                        <div className="absolute flex items-center justify-center w-full h-full overflow-hidden transition-all rounded-lg opacity-0 cursor-pointer bg-slate-900/30 hover:opacity-100" />
                        <img
                          className="object-cover w-full rounded-lg max-h-60 md:max-h-48 lg:max-h-60"
                          src={
                            item.image
                              ? item.image
                              : "http://unsplash.it/1080/1920?random&gravity=center"
                          }
                          alt={item.title}
                        />
                      </div>
                      <div
                        className="flex flex-col items-start w-full cursor-pointer"
                        onClick={handleClick}
                      >
                        <h2 className="text-sm font-bold line-clamp-1">
                          {item.title}
                        </h2>
                        <p className="text-xs text-gray-500">{item.author}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
  );
}
