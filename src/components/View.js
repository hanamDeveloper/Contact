import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function View() {
  const { selectedUser, input, users } = useSelector((state) => ({
    selectedUser: state.selectedUser,
    input: state.input,
    users: state.users,
  }));

  const dispatch = useDispatch();

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      dispatch({
        type: "CHANGE_INPUT",
        name,
        value,
      });
    },
    [dispatch]
  );

  const onClickChangeValue = async () => {
    const user = users.find((user) => user);
    await axios.put(`http://localhost:5000/users/${selectedUser.id}`, {
      ...user,
      name: input.name,
      number: input.number,
      memo: input.memo,
    });
    dispatch({
      type: "CHANGE_VALUE",
      input,
    });
  };

  return (
    <div className="content-container">
      <div className="content-container__information">
        <input
          type="text"
          name="name"
          placeholder={selectedUser.name}
          value={input.name}
          onChange={onChange}
        />
        <input
          name="number"
          placeholder={selectedUser.number}
          value={input.number}
          onChange={onChange}
        />
        <textarea
          name="memo"
          placeholder={selectedUser.memo}
          value={input.memo}
          onChange={onChange}
        ></textarea>
        <button onClick={onClickChangeValue} type="button">
          수정
        </button>
      </div>
    </div>
  );
}

export default View;
