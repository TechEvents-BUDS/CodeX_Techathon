import { STATIC_NODES } from "@/data";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRobot } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

export default function Home() {
  const [activeNodes, setActiveNodes] = useState<AppNode[]>([]);
  const [viewNodes, setViewNodes] = useState<AppNode[]>([]);

  const setNode = (node: AppNode) => {
    setActiveNodes((prev) => [...prev, node]);
    const nextNodes = STATIC_NODES.filter((item) => node.nextNodeIds.includes(item.id));
    setViewNodes(nextNodes);
  };

  useEffect(() => {
    setNode(STATIC_NODES[0]);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="items-center justify-between flex w-full bg-sidebar p-2 py-6">
        <div className="flex h-fit gap-2 items-center">
          <FaRobot className="text-3xl text-white" />
          <h1 className="text-white text-2xl font-bold">Jarvis CC</h1>
        </div>

        <div className="">
          <Link href={"/jarvis-chat"}>
            <div className="p-2 rounded-md cursor-pointer flex items-center gap-2 bg-white text-gray-600 duration-200 hover:scale-105 ">
              <FaRobot className="text-xl" /> Talk to Jarvis
            </div>
          </Link>
        </div>
      </div>
      <div className="px-2 gap-1 md:px-4 mt-4 flex flex-wrap">
        {activeNodes.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setActiveNodes((prev) => prev.slice(0, index));
              setNode(item);
            }}
            className="flex items-center gap-2 cursor-pointer hover:text-primary duration-200 font-medium text-gray-800 rounded-md"
          >
            {index !== 0 && <IoIosArrowForward />}
            {item.name}
          </div>
        ))}
      </div>
      <div
        className={`p-2 md:p-4 w-full gap-2 md:gap-4  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5   items-center justify-center `}
      >
        {viewNodes.map((item, index) => (
          <div
            onClick={() => {
              if (item.nextNodeIds.length > 0) {
                setNode(item);
              }
              if (item.link && item.link?.length > 0) {
                window.open(item.link[0], "_blank");
              }
            }}
            key={index}
            className="w-full h-full p-3 rounded-md bg-white hover:shadow-xl duration-200 cursor-pointer"
          >
            <h1 className="font-bold">{item.name}</h1>
            <p className="text-slate-500 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
