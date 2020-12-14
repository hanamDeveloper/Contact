import React from "react";
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
      no: users[0].no + 1,
      name: input.Name,
      tel: input.tel,
      address: input.address,
    };

    await axios.post("http://sample.bmaster.kro.kr/contacts", user);

    dispatch({
      type: "ADD_USER",
      user,
    });
    const response = await axios.get("http://sample.bmaster.kro.kr/contacts");
    dispatch({
      type: "LOAD_USER",
      response,
    });
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    dispatch({
      type: "CHANGE_INPUT",
      name,
      value,
    });
  };

  return (
    <div className="content-container">
      <iframe name="iframe1" style={{ display: "none" }}></iframe>
      <div className="content-container__information">
        <form target="iframe1">
          <img></img>
          <input
            onChange={onChange}
            name="Name"
            value={input.Name}
            placeholder="이름을 입력해주세요"
          />

          <input
            onChange={onChange}
            name="tel"
            value={input.tel}
            placeholder="전화번호를 입력해주세요"
          />

          <input
            onChange={onChange}
            name="address"
            value={input.address}
            placeholder="주소를 입력해주세요"
          />
          <input type="submit" onClick={onClickAdd} value="추가" />
        </form>
      </div>
    </div>
  );
}

export default Content;
