import React from "react";
import TodoStore from "./TodoStore";

const stores = {
  todos: TodoStore(),
}

export const StoreContext = React.createContext(stores);

export const useStores = () => React.useContext(StoreContext);

export default stores;