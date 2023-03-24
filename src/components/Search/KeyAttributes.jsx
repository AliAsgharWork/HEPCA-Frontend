import Collapsible from "./Collapsible";
import Slider from "./Slider";
import DateCalender from "./DateCalender";
import { TextField } from "@mui/material";

const KeyAttributes = (props) => {
  //   const [active, setActive] = useState("Home");
  //   const [toggle, setToggle] = useState(false);

  return (
    <Collapsible title={"Key Atributes"}>
      <div
        className={`flex flex-col space-x-0 space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0`}

        // className={`flex flex-row space-x-4 sm: flex-col sm: space-x-0`}
      >
        {/* <div>
          <TextField
            style={{ backgroundColor: "white" }} //, borderRadius: 18
            id="filled-basic"
            label="Budget"
            variant="filled"
          ></TextField>
        </div> */}

        <div>
          <Slider
            label="Overall Budget (Millions)"
            limit={[0, props.upper_overall_budget_limit + 1]}
            handleValue={props.handleOverallBudgetValue}
            save_key="overall_budget"
          ></Slider>
        </div>
        <div>
          <Slider
            label="Budget (Millions)"
            limit={[0, props.upper_budget_limit + 1]}
            handleValue={props.handleBudgetValue}
            save_key="budget"
          ></Slider>
        </div>
        <div>
          <Slider
            label="Number of Projects"
            limit={[0, props.upper_NOP_limit + 1]}
            handleValue={props.handleNOPValue}
            save_key="nop"
          ></Slider>
        </div>
        <div>
          <Slider
            label="TRL"
            limit={[0, 9]}
            handleValue={props.handleTRLValue}
            save_key="trl"
          />
        </div>
        <div>
          <DateCalender
            id="Deadline"
            label="Deadline"
            variant="filled"
            handleDateChange={props.handleDeadlineValue}
            save_key="deadline"
          />
        </div>
        <div>
          <DateCalender
            id="Start date"
            label="Start date"
            handleDateChange={props.handleStartDateValue}
            save_key="startdate"
          />
        </div>
        {/* <div>
          <TextField
          style={{ backgroundColor: "white" }} //, borderRadius: 18
          id="filled-basic"
          label="NOP"
          variant="filled"
          ></TextField>
        </div> */}
        {/* <div>
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
        </div> */}
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
