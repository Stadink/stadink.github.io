import { Link } from "react-router-dom";

export const Dreams = () => {

    const randomKeyword = () => {
        return 'idk'
    }

  return (
    <div id="dreams">
        <br />
        <h1>Did you dream of _____ ? </h1>
      <button onClick={() => randomKeyword()}>Next</button>
    </div>
  );
};
