import produce from "immer";

export const initialState = {
  users: [],
  selectedUser: {},
  searchUser: [],
  input: {
    Name: "",
    name: "",
    tel: "",
    address: "",
  },
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOAD_USER":
      return produce(state, (draft) => {
        draft.users = action.response.data.contacts;
      });

    case "CHANGE_INPUT":
      return produce(state, (draft) => {
        draft.input[action.name] = action.value;
      });

    case "CHANGE_VALUE":
      return produce(state, (draft) => {
        draft.input.Name = "";
        draft.input.tel = "";
        draft.input.address = "";
      });

    case "SEARCH_USER":
      return produce(state, (draft) => {
        draft.users = action.searchUser.data;
        draft.input.name = "";
      });

    case "ADD_USER":
      console.log("ADDUSER", state.users);
      return produce(state, (draft) => {
        draft.users.push(action.user);
        draft.input.Name = "";
        draft.input.tel = "";
        draft.input.address = "";
      });

    case "SELECTE_USER":
      return produce(state, (draft) => {
        draft.selectedUser = action.selectedUser.data;
      });

    default:
      return state;
  }
}
