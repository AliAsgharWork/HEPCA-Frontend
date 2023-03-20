import Collapsible from "./Collapsible";
import Slider from "./Slider";
import { TextField } from "@mui/material";

const KeyAttributes = () => {
  //   const [active, setActive] = useState("Home");
  //   const [toggle, setToggle] = useState(false);

  return (
    <Collapsible title={"Key Atributes"}>
      <div
        className={`flex flex-col space-x-0 space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0`}

        // className={`flex flex-row space-x-4 sm: flex-col sm: space-x-0`}
      >
        <div>
          <TextField
            style={{ backgroundColor: "white" }} //, borderRadius: 18
            id="filled-basic"
            label="Budget"
            variant="filled"
          ></TextField>
        </div>
        <div>
          <TextField
            style={{ backgroundColor: "white" }} //, borderRadius: 18
            id="filled-basic"
            label="NOP"
            variant="filled"
          ></TextField>
        </div>
        <div>
          <TextField
            style={{ backgroundColor: "white" }} //, borderRadius: 18
            id="filled-basic"
            label="Start Date"
            variant="filled"
          ></TextField>
        </div>
        <div>
          <TextField
            style={{ backgroundColor: "white" }} //, borderRadius: 18
            id="filled-basic"
            label="Deadline Date"
            variant="filled"
          ></TextField>
        </div>
        <div>
          <Slider></Slider>
        </div>
        {/* <p className={`${styles.paragraph} max-w-[550px] mb-10`}>
                Componet 1
              </p> */}

        {/* <p className={`${styles.paragraph} max-w-[550px] mb-10`}>
                Componet 2
              </p> */}
      </div>
    </Collapsible>
  );
};

export default KeyAttributes;
