import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function View({ match }) {
  const { selectedUser, input } = useSelector((state) => ({
    selectedUser: state.selectedUser,
    input: state.input,
  }));
  const dispatch = useDispatch();

  const onChange = (e) => {
    const { name, value } = e.target;

    dispatch({
      type: "CHANGE_INPUT",
      name,
      value,
    });
  };

  const onClickPut = async () => {
    await axios.put(
      `http://sample.bmaster.kro.kr/contacts/${match.params.no}`,
      {
        ...selectedUser,
        no: match.params.no,
        name: input.Name,
        tel: input.tel,
        address: input.address,
      }
    );
    dispatch({
      type: "CHANGE_VALUE",
    });
    const response = await axios.get("http://sample.bmaster.kro.kr/contacts");
    dispatch({
      type: "LOAD_USER",
      response,
    });
  };

  return (
    <div className="content-container">
      <iframe name="iframe1" style={{ display: "none" }}></iframe>
      <div className="content-container__information">
        <form
          method="post"
          enctype="multipart/form-data"
          action={`http://sample.bmaster.kro.kr/contacts/${match.params.no}/photo`}
          target="iframe1"
        >
          <img src={selectedUser.photo}></img>
          <input
            onChange={onChange}
            name="Name"
            value={input.Name}
            placeholder={selectedUser.name}
          />

          <input
            onChange={onChange}
            name="tel"
            value={input.tel}
            placeholder={selectedUser.tel}
          />

          <input
            onChange={onChange}
            name="address"
            value={input.address}
            placeholder={selectedUser.address}
          />

          <input type="file" name="photo" />
          <input type="submit" onClick={onClickPut} value="수정" />
        </form>
      </div>
    </div>
  );
}

export default View;
