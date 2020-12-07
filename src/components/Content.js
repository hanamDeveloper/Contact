import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function Content() {
  const dispatch = useDispatch();

  const { input, users } = useSelector((state) => ({
    input: state.input,
    users: state.users,
  }));

  const onClickAdd = async () => {
    const user = {
      id: users.length + 1,
      name: input.name,
      number: input.number,
      memo: input.memo,
    };

    await axios.post("http://localhost:5000/users", user);

    dispatch({
      type: "ADD_USER",
      user,
    });
  };

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

  return (
    <div className="content-container">
      <div className="content-container__information">
        <input
          onChange={onChange}
          name="name"
          value={input.name}
          placeholder="이름을 입력해주세요"
        />

        <input
          onChange={onChange}
          name="number"
          value={input.number}
          placeholder="전화번호를 입력해주세요"
        />

        <textarea
          name="memo"
          onChange={onChange}
          value={input.memo}
          placeholder="메모를 입력해주세요"
        ></textarea>
        <button type="button" onClick={onClickAdd}>
          추가
        </button>
      </div>
    </div>
  );
}

export default Content;
