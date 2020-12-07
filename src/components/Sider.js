import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function Sider() {
  const dispatch = useDispatch();

  const { users, input } = useSelector((state) => ({
    input: state.input,
    users: state.users,
  }));

  const onChange = (e) => {
    const { name, value } = e.target;

    dispatch({
      type: "CHANGE_INPUT",
      name,
      value,
    });
  };

  const onClickSerch = () => {
    const serch = input.serch;
    dispatch({
      type: "SERCH_USER",
      serch,
    });
  };

  const onClickRemove = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    dispatch({
      type: "REMOVE_USER",
      id,
    });
  };

  const onClickSelectedUser = async (id) => {
    dispatch({
      type: "SELECTED_USER",
      id,
    });
  };

  const onClickAll = () => {
    dispatch({
      type: "CLICK_ALL",
    });
  };

  return (
    <>
      <div className="sider">
        <div className="input-box">
          <input
            name="serch"
            onChange={onChange}
            value={input.serch}
            placeholder="이름을 입력해주세요"
          />
        </div>
        <div className="sider-button-box">
          <button type="button" onClick={onClickSerch}>
            검색
          </button>
          <button type="button" onClick={onClickAll}>
            전체보기
          </button>

          <Link to={"/user/addUser"}>
            <button type="button">추가</button>
          </Link>
        </div>
        <div className="sider__ul-box">
          <ul>
            {users.map((user) => (
              <li key={user.id} onClick={() => onClickSelectedUser(user.id)}>
                <Link to={`/user/View/${user.id}`}>{user.name}</Link>
                <div className="sider__ul__li__button">
                  <button type="button" onClick={() => onClickRemove(user.id)}>
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sider;
