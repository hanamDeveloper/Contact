import produce from "immer";

export const initialState = {
  users: [],
  selectedUser: {},
  serchUser: [],
  input: {
    serch: "",
    name: "",
    number: "",
    memo: "",
  },
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOAD_USER":
      return produce(state, (draft) => {
        draft.users = action.response.data;
        draft.serchUser = action.response.data;
      });

    case "CHANGE_INPUT":
      return produce(state, (draft) => {
        draft.input[action.name] = action.value;
      });

    case "CHANGE_VALUE":
      console.log(state.users);
      console.log(
        "id야 id 씨발 idk라고 존나 잘나오라고좀",
        state.selectedUser.id
      );
      return produce(state, (draft) => {
        draft.input.name = "";
        draft.input.number = "";
        draft.input.memo = "";
        draft.selectedUser.name = action.input.name;
        draft.selectedUser.number = action.input.number;
        draft.selectedUser.memo = action.input.memo;
        draft.users = state.users.filter(
          (user) => user.id !== state.selectedUser.id
        );
        draft.users.push(draft.selectedUser);
      });

    case "SERCH_USER":
      console.log("state.input", state.input);
      console.log("action.name", action.name);
      return produce(state, (draft) => {
        draft.input.serch = "";
        const i = draft.serchUser.filter((user) => user.name === action.serch);
        draft.users = i;
      });

    case "ADD_USER":
      return produce(state, (draft) => {
        draft.users.push(action.user);
        draft.input.name = "";
        draft.input.number = "";
        draft.input.memo = "";
      });

    case "REMOVE_USER":
      return produce(state, (draft) => {
        const remove = draft.users.filter((user) => user.id !== action.id);
        draft.users = remove;
      });

    case "SELECTED_USER":
      return produce(state, (draft) => {
        draft.selectedUser = draft.users.find((user) => user.id === action.id);
      });

    case "CLICK_ALL":
      return {
        ...state,
        users: state.serchUser,
      };

    default:
      return state;
  }
}
