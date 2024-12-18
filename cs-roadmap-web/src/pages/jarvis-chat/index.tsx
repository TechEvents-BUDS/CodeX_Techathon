import React from "react";

const ChatIndexPage = () => {
  return null;
};

export default ChatIndexPage;

export const getServerSideProps = () => {
  const uuid = Math.random().toString(36).substring(7);

  return {
    redirect: {
      destination: `/jarvis-chat/${uuid}`,
      permanent: false,
    },
  };
};
