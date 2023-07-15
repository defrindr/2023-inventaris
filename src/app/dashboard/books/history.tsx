import bookHistory from "@/data/bookhistory";
import { Card, Divider, Text, Title } from "@tremor/react";

export default function HistoryBook() {
  return (
    <>
      <Title>Books Loan History</Title>
      <Text>
        The book loan history page shows the history of the book loans by the
        user.
      </Text>

      <div className="flex flex-col gap-6 mt-6">
        {bookHistory.map((book) => (
          <Card key={book.id}>
            <div className="grid grid-cols-6 gap-4">
              <img
                className="object-cover w-full h-full col-span-6 rounded-lg md:max-h-[280px] lg:max-h-60 md:col-span-2 md:row-start-1 lg:col-span-1"
                src={book.image}
                alt={book.title}
              />
              <div className="flex flex-col items-center justify-center w-full col-span-6 row-start-2 md:col-span-4 md:row-start-1 md:items-start lg:col-span-5">
                <div className="flex flex-col gap-1 md:gap-2">
                  <h2 className="text-3xl font-bold tracking-tight text-center md:text-left line-clamp-none lg:line-clamp-1">
                    {book.title}
                  </h2>
                  <p className="mt-2 text-sm text-center text-slate-500 md:text-left md:mt-0">
                    {book.author}
                  </p>
                  <p className="mt-2 text-sm text-center text-slate-500 md:text-left md:mt-0">
                    {book.year}
                  </p>
                </div>
                <Divider className="my-4" />
                <div className="flex flex-col gap-2">
                  <div className="flex justify-center gap-2 md:justify-start">
                    <Text className="font-semibold text-gray-500">
                      Dipinjam
                    </Text>
                    <Text className="font-semibold">{":"}</Text>
                    <Text className="font-semibold">{book.dipinjamkan}</Text>
                  </div>
                  <div className="flex justify-center gap-2 md:justify-start">
                    <Text className="font-semibold text-gray-500">
                      Dikembalikan
                    </Text>
                    <Text className="font-semibold">{":"}</Text>
                    <Text className="font-semibold">{book.dikembalikan}</Text>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
