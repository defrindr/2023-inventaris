import { Button, Image } from "@chakra-ui/react";
import { Badge, Card, Col, Divider, Grid, Text, Title } from "@tremor/react";
import { ArrowLeftIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DetailBook() {
  const { id } = useParams();
  const [more, setMore] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <>
      <Title>Book Detail</Title>
      <Text>
        The detail book of <b>{id}</b> is shown here.
      </Text>

      <Button
        leftIcon={<ArrowLeftIcon />}
        variant="outline"
        colorScheme="red"
        className="mt-6"
        onClick={() => navigate("/dashboard/books")}
      >
        Kembali
      </Button>

      <Grid numCols={12} className="gap-4 mt-6">
        <Col numColSpanLg={3} className="hidden lg:block">
          <Card className="sticky flex flex-col gap-3 p-3 top-24">
            <Image
              src="https://th.bing.com/th/id/OIP.BTH_sgETrxF4drUOfurtxwHaLX?pid=ImgDet&rs=1"
              className="rounded-md"
            />
            <div className="flex flex-col gap-2">
              <Button variant={"outline"} className="w-full">
                Hari Pinjam
              </Button>
              <Button colorScheme="blue" className="w-full">
                Pinjam Buku
              </Button>
            </div>
          </Card>
        </Col>

        <Col numColSpan={12} numColSpanLg={9}>
          <Card className="p-6">
            <div className="flex items-center justify-center mb-4 lg:hidden">
              <Image
                src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1673265492i/60784572.jpg"
                className="rounded-md"
              />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-center scroll-m-20 md:text-left">
              How innovation works
            </h2>
            <Divider className="my-4" />
            <div className="flex gap-2">
              <Text className="font-semibold text-gray-500">Author</Text>
              <Text className="font-semibold">{":"}</Text>
              <Text className="font-semibold">Matt Ridley</Text>
            </div>
            <Divider className="my-4" />
            <div className="flex gap-2">
              <Text className="font-semibold text-gray-500">Tahun</Text>
              <Text className="font-semibold">{":"}</Text>
              <Text className="font-semibold">2020</Text>
            </div>
            <Divider className="my-4" />
            <div className="flex gap-2">
              <Text className="font-semibold text-gray-500">Penerbit</Text>
              <Text className="font-semibold">{":"}</Text>
              <Text className="font-semibold">Fourth Estate Ltd</Text>
            </div>
            <Divider className="my-4" />
            <div className="flex gap-2">
              <Text className="font-semibold text-gray-500">Lokasi</Text>
              <Text className="font-semibold">{":"}</Text>
              <Text className="font-semibold">Ruang Lab IOT</Text>
            </div>
            <Divider className="my-4" />
            <div className="flex gap-2">
              <Text className="font-semibold text-gray-500">Ketersediaan</Text>
              <Text className="font-semibold">{":"}</Text>
              <Badge color="emerald">Tersedia</Badge>
            </div>
            <Divider className="my-4" />
            <div className="flex flex-col gap-2 lg:hidden">
              <Button variant={"outline"} className="w-full">
                Hari Pinjam
              </Button>
              <Button colorScheme="blue" className="w-full">
                Pinjam Buku
              </Button>
            </div>
            <Divider className="my-4 blcok lg:hidden" />
            <h2 className="text-2xl font-bold tracking-tight text-center scroll-m-20 md:text-left">
              Sinopsis
            </h2>
            <Text
              className={`mt-2 text-justify transition-all ${
                more ? "line-clamp-none" : "line-clamp-5"
              }`}
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat
              eum autem maiores quisquam. Illum adipisci iste consectetur
              impedit! Ipsa, amet magnam sed corporis aperiam optio sit incidunt
              voluptate nemo autem quod minus eos molestias. Enim laboriosam, ea
              sit nobis ipsam perspiciatis doloribus quam ipsa nostrum? Quae,
              exercitationem mollitia! Quia a fugit voluptas architecto
              voluptatibus, numquam corrupti dolorem asperiores, aliquid porro
              aliquam ipsa doloribus ducimus fuga aperiam ex iusto voluptates?
              Eaque autem esse quas vel incidunt, cum minus, quia consectetur
              doloribus laboriosam adipisci ex quis dignissimos dicta eveniet
              quam ullam. Quos molestiae accusantium rerum iusto voluptatem
              fuga. Architecto dolore modi fugit voluptatum facere in
              voluptatibus dolor magnam, provident fuga pariatur corporis
              accusantium ab repellendus beatae ea amet. Ipsum unde libero
              magnam dicta architecto fuga illo autem error ut voluptatum modi
              optio similique, culpa dolore doloribus illum. Rerum culpa modi
              minima? Maxime quod neque laudantium quidem sit nulla eum illo
              quaerat debitis a, nisi repellat architecto beatae quibusdam hic
              ut ab repudiandae obcaecati magnam non eaque nobis iure est
              consequatur? Praesentium et commodi laborum. Molestias nulla
              laudantium tempore nostrum officiis sed fuga tenetur beatae
              voluptas optio! Hic doloremque obcaecati possimus suscipit
              praesentium accusantium, neque dolorum alias minima aperiam
              voluptatum totam nesciunt optio ipsam quam adipisci, unde pariatur
              nulla provident animi incidunt exercitationem nisi? Ea, soluta.
              Nulla sequi delectus dolorem, nostrum quaerat exercitationem
              consectetur incidunt maiores tenetur velit molestiae libero
              deserunt adipisci ea, sed similique doloremque quisquam rerum
              laborum voluptatibus aperiam sapiente provident nemo! Quaerat,
              perspiciatis? Explicabo omnis perspiciatis animi soluta vero!
              Perferendis consequatur neque consectetur? Dolores corrupti eos
              reiciendis placeat! Error nihil impedit iste consequuntur nam rem
              provident ut sunt amet, iure voluptas deserunt maxime at
              laudantium cupiditate accusantium? Culpa maiores, eaque,
              accusantium odio possimus illum excepturi veritatis sint
              distinctio suscipit accusamus neque, iure quos quisquam eveniet
              provident debitis perferendis eum laudantium?
            </Text>
            <div className="flex items-center justify-center lg:justify-start">
              <Button
                rightIcon={more ? <ChevronUpIcon /> : <ChevronDownIcon />}
                size="sm"
                variant="ghost"
                className="mt-4 transition-all "
                onClick={() => setMore(!more)}
              >
                {more ? "Tutup" : "Baca Selengkapnya"}
              </Button>
            </div>
          </Card>
        </Col>
      </Grid>
    </>
  );
}
