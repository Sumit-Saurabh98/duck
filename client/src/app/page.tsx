import FeedCard from "@/components/FeedCard";
import React from "react";
import { BiHash, BiHomeCircle, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope } from "react-icons/bs";
import { GiDuck } from "react-icons/gi";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface DuctSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const sidebarMenuItems: DuctSidebarButton[] = [
  {
    title: "Home",
    icon: <BiHomeCircle />,
  },
  {
    title: "Explore",
    icon: <BiHash />,
  },
  {
    title: "Notifications",
    icon: <BsBell />,
  },
  {
    title: "Messages",
    icon: <BsEnvelope />,
  },
  {
    title: "Bookmarks",
    icon: <BsBookmark />,
  },
  {
    title: "Profile",
    icon: <BiUser />,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 lg:px-8 xl:px-16 flex flex-col lg:flex-row">
        <aside className="w-16 sm:w-64 pt-6 pr-2 hidden lg:block sticky top-0 h-screen">
          <div className="text-3xl sm:text-4xl p-2 h-12 w-12 flex items-center justify-center hover:bg-gray-700 rounded-full cursor-pointer transition-colors duration-200">
            <GiDuck />
          </div>
          <nav className="mt-8">
            <ul className="space-y-2">
              {sidebarMenuItems.map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="flex items-center gap-4 px-3 py-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
                  >
                    <span className="text-xl sm:text-2xl">{item.icon}</span>
                    <span className="hidden sm:inline text-lg font-medium">
                      {item.title}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <button className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200">
              Duck
            </button>
          </nav>
        </aside>
        <main className="border-t flex-grow border-x gap-1 border-gray-700 rounded-lg min-h-screen">
          <div className="bg-black sticky top-0 z-10 w-full flex justify-evenly items-center text-center text-xl">
            <div className="w-[50%] h-10 sm:h-8 hover:bg-gray-600 cursor-pointer">
              <button>For You</button>
            </div>
            <Separator className="h-10 sm:h-8" orientation="vertical" />
            <div className="w-[50%] h-10 sm:h-8 hover:bg-gray-600 cursor-pointer">
              <button>Following</button>
            </div>
          </div>
          {/* Your FeedCard components here */}
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </main>
        <aside className="w-64 pl-4 hidden lg:block sticky top-0 h-screen">
          <div className="my-16 border-2 flex flex-col gap-4 py-4 rounded-2xl border-gray-700">
            <h2 className="pl-4 text-xl font-bold">You Might know</h2>
            <div className="flex justify-evenly items-center">
              <Image
                src="https://img.icons8.com/?size=100&id=YABoRANFP0sq&format=png&color=000000"
                alt="profile"
                width={50}
                height={50}
                className="rounded-full border-red-600 w-10 h-10 bg-slate-50"
              />
              <div>
                <h3>username</h3>
                <p className="text-gray-600 text-sm font-thin">@username</p>
              </div>
              <Button className="bg-white text-black py-2 px-4 font-semibold rounded-full hover:bg-slate-300">
                Follow
              </Button>
            </div>
          </div>
        </aside>
      </div>
      <nav className="lg:hidden fixed bottom-0 w-full bg-gray-800 flex justify-around items-center py-2">
        {sidebarMenuItems.map((item, idx) => (
          <a
            key={idx}
            href="#"
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-sm font-medium">{item.title}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
