"use client";
import FeedCard from "@/components/FeedCard";
import React, { useCallback } from "react";
import { BiHash, BiHomeCircle, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope, BsThreeDots } from "react-icons/bs";
import { GiDuck } from "react-icons/gi";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphqlClient } from "../../clients/api";
import { verifyUserGoogleTokenQuery } from "../../graphql/query/user";
import { useCurrentUser } from "../../hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { CiImageOn } from "react-icons/ci";

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
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

  console.log(user);

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;

      if (!googleToken) {
        toast.error(`Google token not found`);
        return;
      }

      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );

      toast.success("Verified Success");
      console.log(verifyGoogleToken);

      if (verifyGoogleToken) {
        window.localStorage.setItem("__duck_Auth_Token", verifyGoogleToken);

        await queryClient.invalidateQueries({ queryKey: ["current-user"] });
      }
    },
    [queryClient]
  );

  const handleFileSelect = useCallback(()=>{
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
  }, [])

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
          {user && user.profileImageURL && (
            <div className="absolute bottom-2 right-4 flex justify-center items-center gap-3 bg-gray-700 rounded-full px-4 py-2">
              {user && user.profileImageURL && (
                <Image
                  className="rounded-full"
                  src={user.profileImageURL}
                  alt={user.firstName || "Profile picture"}
                  width={40}
                  height={40}
                />
              )}
              <p className="text-md font-bold">{user.firstName}</p>
              <BsThreeDots className="text-xl" />
            </div>
          )}
        </aside>

        <main className="border-t flex-grow border-x gap-1 border-gray-700 rounded-lg min-h-screen">
          <div className="bg-transparent sticky top-0 z-10 w-full flex justify-evenly items-center text-center text-xl">
            <div className="w-[50%] h-10 sm:h-8 hover:bg-gray-600 cursor-pointer">
              <button>For You</button>
            </div>
            <Separator className="h-10 sm:h-8" orientation="vertical" />
            <div className="w-[50%] h-10 sm:h-8 hover:bg-gray-600 cursor-pointer">
              <button>Following</button>
            </div>
          </div>
          <div className="px-20 py-4 gap-0 items-baseline relative">
            {user && user.profileImageURL && (
              <Image
                className="rounded-full absolute top-8 left-10"
                src={user.profileImageURL}
                alt={user.firstName || "Profile picture"}
                width={40}
                height={40}
              />
            )}
            <textarea
              className="w-full border-b-2 px-2 py-6 mb-4 bg-transparent placeholder:font-bold text-xl"
              placeholder="What's happening?!"
            ></textarea>
            <div className="flex justify-between items-center">
              <CiImageOn className="text-4xl hover:cursor-pointer" onClick={handleFileSelect} />
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200">
                Duck
              </button>
            </div>
          </div>
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
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
          {!user && (
            <div className="border-2 flex justify-center items-center border-gray-700 rounded-2xl">
              <GoogleLogin
                onSuccess={handleLoginWithGoogle}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
          )}
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
          </a>
        ))}
        {!user ? (
          <div className="">
            <GoogleLogin
              type="icon"
              onSuccess={handleLoginWithGoogle}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        ) : (
          user &&
          user.profileImageURL && (
            <div className="flex justify-center items-center rounded-full">
              <Image
                className="rounded-full"
                src={user.profileImageURL}
                alt={user.firstName || "Profile picture"}
                width={40}
                height={40}
              />
            </div>
          )
        )}
      </nav>
    </div>
  );
}
