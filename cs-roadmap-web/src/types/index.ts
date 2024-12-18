interface Chat {
  message: string;
  user_id: string;
  by?: "user" | "bot";
}

interface AppNode {
  id: string;
  name: string;
  description: string;
  nextNodeIds: string[];
  link?: string[];
}
