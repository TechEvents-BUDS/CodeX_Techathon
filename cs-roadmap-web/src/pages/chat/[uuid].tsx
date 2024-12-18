import Loader from "@/components/global/Loader";
import { cookies_keys } from "@/constants";
import api, { endPoints } from "@/utils/api";
import { clientCookieManager, serverCookieManager } from "@/utils/cookie-manager";
import notify from "@/utils/notify";
import classNames from "classnames";
import { NextPageContext } from "next";
import React, { useEffect, useState } from "react";
import { FaRobot, FaUser } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

interface Props {
  uuid: string;
}

const ChatPage = ({ uuid }: Props) => {
  useEffect(() => {
    clientCookieManager.set(cookies_keys.CHAT_UUID, uuid, 2);
    hitMessageApi("Hi").then((res) => {
      if (!res.success) {
        notify.error(res.error);
        return;
      }
      setChat((prev) => [
        {
          message: res.data.message,
          user_id: uuid,
          by: "bot",
        },
      ]);
    });
  }, []);

  const [chats, setChat] = useState<Chat[]>([]);

  const scrollToEnd = () => {
    const chatEnd = document.getElementById("chat-end");
    chatEnd?.scrollIntoView({ behavior: "smooth" });
  };

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const hitMessageApi = async (message: string) => {
    return api.post<Chat>(endPoints.CHAT_URL, {
      message,
      user_id: uuid,
    });
  };

  const handleSend = () => {
    if (!message) return;
    if (loading) return;

    setLoading(true);

    setChat((prev) => [
      ...prev,
      {
        message,
        user_id: uuid,
        by: "user",
      },
    ]);
    scrollToEnd();

    // hit the api

    hitMessageApi(message)
      .then((res) => {
        if (res?.success && res?.data?.message) {
          setChat((prev) => [
            ...prev,
            {
              message: res.data.message,
              user_id: uuid,
              by: "bot",
            },
          ]);
          setMessage("");
          scrollToEnd();
          return;
        }

        notify.error(res.error);
        setChat((prev) => prev.slice(0, prev.length - 1));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex w-screen h-screen">
      <div className="h-full hidden md:flex  md:w-56 lg:w-72 bg-sidebar"></div>
      <div className="flex flex-col w-full h-full bg-background">
        <div className="flex-1 p-2 overflow-scroll scrollbar-hide ">
          <div>
            {chats.map((item, index) =>
              item.by === "user" ? (
                <div className="ml-auto flex w-fit gap-2 mt-5" key={index}>
                  <div
                    key={index}
                    className="bg-primary text-white px-4 rounded-md p-3 w-fit md:min-w-56 shadow-md max-w-[90%] md:max-w-[70%]"
                  >
                    <p>{item.message}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white shadow-md  flex items-center justify-center text-xl text-slate-400 ">
                    <FaUser />
                  </div>
                </div>
              ) : (
                <div className="flex w-fit gap-2  mt-5" key={index}>
                  <div className="w-10 h-10 rounded-full bg-white shadow-md  flex items-center justify-center text-xl text-slate-400 ">
                    <FaRobot />
                  </div>
                  <div
                    key={index}
                    className="bg-white px-4 rounded-md p-3 w-fit md:min-w-56 shadow-md max-w-[90%] md:max-w-[70%]"
                  >
                    <p>{item.message}</p>
                  </div>
                </div>
              )
            )}
            <div id="chat-end"></div>
          </div>
        </div>
        <div className="p-2 w-full ">
          <div className="flex items-center bg-white rounded-md overflow-hidden px-2  ">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-inherit p-2 py-3 focus:outline-none"
              placeholder="Your Prompt here...."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
            />
            <button
              disabled={!message}
              onClick={handleSend}
              className={classNames("text-xl text-slate-400 p-2 rounded-md  cursor-pointer group ", {
                "cursor-not-allowed": !message,
              })}
            >
              {loading ? (
                <div>
                  <Loader />
                </div>
              ) : (
                <IoIosSend className="group-hover:scale-105 duration-110" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

export const getServerSideProps = (context: NextPageContext) => {
  const uuid = context.query.uuid as string;

  return {
    props: {
      uuid,
    },
  };
};
