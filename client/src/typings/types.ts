//used to accept dynamic attributes
export type DynamicAttributes = {
  [key: string]: string | number | boolean;
};

export type Todo = {
  id: string;
  checked: boolean;
  value: string;
};
