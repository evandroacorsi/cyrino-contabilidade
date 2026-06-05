export type ClientTool = {
  id: string;
  category: string;
  title: string;
  image: string;
  url: string;
  external: boolean;
  order: number;
  active: boolean;
};

export type ClientToolInput = Omit<ClientTool, "id"> & {
  id?: string;
};

const CLIENT_TOOLS_PATH = "/client-tools/index.json";

export const emptyClientTool: ClientToolInput = {
  category: "",
  title: "",
  image: "",
  url: "",
  external: true,
  order: 1,
  active: true,
};

export const sortClientTools = <T extends Pick<ClientTool, "order" | "title">>(tools: T[]) =>
  [...tools].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

export const fetchPublicClientTools = async (): Promise<ClientTool[]> => {
  const response = await fetch(`${CLIENT_TOOLS_PATH}?v=${Date.now()}`);
  if (!response.ok) return [];

  const data = await response.json();
  return Array.isArray(data) ? sortClientTools(data.filter((tool) => tool?.active !== false)) : [];
};
