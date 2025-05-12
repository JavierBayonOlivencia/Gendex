import { useReducer } from "react";

export interface Action {
  type: `SET_${string}`;
  payload: boolean;
}

export interface InitialState {
  isSelected: boolean;
  isInfo: boolean;
  isArea: boolean;
  isForms: boolean;
  activeState: string;
}

const initialState: InitialState = {
  isSelected: false,
  isInfo: true,
  isArea: false,
  isForms: false,
  activeState: "Info",
};

function reducer(state: InitialState, action: Action): InitialState {
  switch (action.type) {
    case "SET_SELECTED":
      // console.log("Set Selectied")
      return { ...state, isSelected: action.payload };

    case "SET_INFO":
      // console.log("Set Info", { ...state, isInfo: action.payload,  isArea: false, activeState: "Info" })
      return {
        ...state,
        isInfo: action.payload,
        isArea: false,
        isForms: false,
        activeState: "Info",
      };

    case "SET_AREA":
      // console.log("Set Area", { ...state, isInfo: false, isArea: action.payload, activeState: "Area" })
      return {
        ...state,
        isInfo: false,
        isArea: action.payload,
        isForms: false,
        activeState: "Area",
      };

    case "SET_FORMS":
      // console.log("Set Forms", { ...state, isInfo: false, isArea: false, isForms: action.payload, activeState: "Forms" })
      return {
        ...state,
        isInfo: false,
        isArea: false,
        isForms: action.payload,
        activeState: "Forms",
      };

    default:
      return state;
  }
}

export function usePokeNav() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
}
