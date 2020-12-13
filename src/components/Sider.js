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

  const onClickSerch = async () => {
    const searchUser = await axios.get(
      `http://sample.bmaster.kro.kr/contacts/search/${input.name}`
    );
    dispatch({
      type: "SEARCH_USER",
      searchUser,
    });
  };

  const onClickRemove = async (no) => {
    await axios.delete(`http://sample.bmaster.kro.kr/contacts/${no}`);
    const response = await axios.get("http://sample.bmaster.kro.kr/contacts");
    dispatch({
      type: "LOAD_USER",
      response,
    });
  };

  const onClickSelectedUser = async (no) => {
    const selectedUser = await axios.get(
      `http://sample.bmaster.kro.kr/contacts/${no}`
    );
    dispatch({
      type: "SELECTE_USER",
      selectedUser,
    });
  };

  const onClickAll = async () => {
    const response = await axios.get("http://sample.bmaster.kro.kr/contacts");
    dispatch({
      type: "LOAD_USER",
      response,
    });
  };

  return (
    <>
      <div className="sider">
        <div className="input-box">
          <input
            name="name"
            onChange={onChange}
            value={input.name}
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
              <li key={user.no} onClick={() => onClickSelectedUser(user.no)}>
                <Link className="Link" to={`/user/View/${user.no}`}>
                  {user.name}
                </Link>
                <div className="sider__ul__li__button">
                  <button type="button" onClick={() => onClickRemove(user.no)}>
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
