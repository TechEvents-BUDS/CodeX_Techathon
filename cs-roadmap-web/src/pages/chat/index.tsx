import React from "react";

const ChatIndexPage = () => {
  return null;
};

export default ChatIndexPage;

export const getServerSideProps = () => {
  const uuid = "123";

  return {
    redirect: {
      destination: `/chat/${uuid}`,
      permanent: true,
    },
  };
};
