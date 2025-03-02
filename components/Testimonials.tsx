import { cn } from "@/lib/utils";
import { Marquee } from "./magicui/marquee";

const reviews = [
  {
    name: "Bodi",
    username: "@bodi",
    body: "fisik penentu rasa suka harta penentu restu orang tua.",
    img: "/bodi.webp",
  },
  {
    name: "Zann",
    username: "@zann",
    body: "Sejatinya, manusia hanya saling memanfaatkan ~hafidz kiyotaka",
    img: "/zann.webp",
  },
  {
    name: "Murata",
    username: "@sempaknapoleon",
    body: "matahari akan terus terbit,Dan kita akan mencoba Lagi.",
    img: "/athar.webp",
  },
  {
    name: "Ganz",
    username: "@ganipreset",
    body: "WOI JANGAN LEWAT DULU SIRKEL LO MANA",
    img: "/gani.webp",
  },
  {
    name: "apis",
    username: "@justpysz",
    body: "Sedikit productivity lebih baik daripada toxic productivity.",
    img: "/apis.webp",
  },
  {
    name: "Bang Bilal",
    username: "@bilaltkj",
    body: "wih paham done.",
    img: "/bilal.webp",
  },
  {
    name: "Inisial R A",
    username: "@rahmataditya",
    body: "Hitamkan para karbit.",
    img: "/rahmataditya.webp",
  },
  {
    name: "Setelah Efek",
    username: "@drst",
    body: "Lapar. Paham!?",
    img: "/yasir.webp",
  },
  {
    name: "Fein",
    username: "@synzux",
    body: "pop mie pop mie pop mie",
    img: "/vino.webp",
  },
  {
    name: "Wesfi Representative",
    username: "@atha",
    body: "Ndak dapek deh.",
    img: "/atha.webp",
  },
  {
    name: "Hantulaut",
    username: "@Zcwan",
    body: "Ubur-ubur ikan lele mokel yok lek 🗿😂",
    img: "/juna.webp",
  },
  {
    name: "Firaun",
    username: "@ramsescorda",
    body: "hidup sekali mati sekali, berdamailah dengan kesalahan dan kegagalan, jangan terkekang oleh penyesalan, karena seribu satu penyesalan tidak dapat merubah masa lalu dan seribu satu ke khawatiran tidak menentukan masa depan",
    img: "/random.webp",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full aspect-square" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function Testimonial() {
  return (
    <div className="relative flex h-screen w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]" id="testimonials">
      <h1 className="text-4xl font-bold text-center z-50">What Our Students Say</h1>
      <div
        className="flex flex-row items-center gap-4"
        style={{
          transform:
            "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
        }}
      >
        <Marquee pauseOnHover vertical className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee pauseOnHover className="[--duration:20s]" vertical>
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>
 
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-background"></div>
    </div>
  );
}
