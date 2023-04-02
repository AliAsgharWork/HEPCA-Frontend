import { Button, Collapse, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "../../style";
import SearchBar from "./SearchBar";
import KeyAttributes from "./KeyAttributes";
import ResultsTable from "./ResultsTable";
import LSABERTSwitch from "./LSABERTSwitch";
import CallService from "../../service/CallService";
import BERTCheckService from "../../service/BERTCheckService";
import LSACheckService from "../../service/LSACheckService";
import ScatterPlot from "../Charts/ScatterPlot";
const dummy_data = {
  datasets: [
    {
      label: "Scatter Dataset",
      data: [
        { x: 1, y: 1 },
        { x: 2, y: 3 },
        { x: 3, y: 5 },
        { x: 4, y: 2 },
        { x: 5, y: 4 },
      ],
      backgroundColor: "rgba(255, 99, 132, 1)",
    },
  ],
};

const options = {
  scales: {
    x: {
      type: "linear",
      position: "bottom",
    },
  },
};

const columns = [
  { field: "full_name", label: "Name" },
  { field: "budget_year", label: "Budget Year" },
  { field: "overall_budget", label: "Overall Budget" },
  { field: "budget", label: "Budget" },
  { field: "eu_contribution", label: "EU Contribution" },
  { field: "Number_of_projects_funded", label: "NOP" },
  { field: "opening_date", label: "Opening" },
  { field: "deadline_date", label: "Deadline" },
  // { field: "full_name", label: "Email" },
  { field: "trl", label: "TRL" },
  { field: "Topic", label: "Topic" },
];

// const rows = [
//   {
//     id: 1,
//     name: "John Doe",
//     age: 25,
//     email: "johndoe@example.com",
//     extraInfo: "This is some extra info about John Doe",
//   },
//   {
//     id: 2,
//     name: "John Doe",
//     age: 25,
//     email: "johndoe@example.com",
//     extraInfo: "This is some extra info about John Doe",
//   },
// ]

const Hero = () => {
  //Results Data
  const [rows, setRows] = React.useState([]);

  //ISOMAP Plots Data
  const [plots, setPlots] = React.useState([]);

  //Max Values for these Fields
  const [max_budget, setMaxBudget] = React.useState([]);
  const [max_overall_budget, setMaxOverallBudget] = React.useState([]);
  const [max_nop, setNumberOfProjects] = React.useState([]);

  //Values for query
  const [budget_value, setBudgetValue] = React.useState([]);
  const [overallbudget_value, setOverallBudgetValue] = React.useState([]);
  const [trl_value, setTRLValue] = React.useState([]);
  const [nop_value, setNOPValue] = React.useState([]);
  const [deadline_value, setDeadlineValue] = React.useState();
  const [startdate_value, setStartDateValue] = React.useState();

  //Initializomg Some Variables
  const [searched, setSearched] = useState(true);
  const [plotishere, setPlotIsHere] = useState(false);
  const [text, setText] = useState("");

  function createData(
    name,
    budget_year,
    overall_budget,
    budget,
    eu_contribution,
    Number_of_projects_funded,
    opening_date,
    deadline_date,
    full_name,
    trl,
    word_corpus,
    Topic
  ) {
    return {
      name,
      budget_year,
      overall_budget,
      budget,
      eu_contribution,
      Number_of_projects_funded,
      opening_date,
      deadline_date,
      full_name,
      trl,
      word_corpus,
      Topic,
    };
  }

  const createRows = (data) => {
    let rower = [];
    data.forEach((element) => {
      rower.push(
        createData(
          element.name,
          element.budget_year,
          element.overall_budget,
          element.budget,
          element.eu_contribution,
          element.Number_of_projects_funded,
          element.opening_date,
          element.deadline_date,
          element.full_name,
          element.trl,
          element.word_corpus,
          element.Topic
        )
      );
    });

    // Sorting by Name (Maybe do not need it)
    // rower = rower.sort((a, b) => (a.score < b.score ? -1 : 1)); //DONT USE IT BREAKS PAGINATION

    setRows(rower);
    // console.log("rows");
    // console.log(rows);
  };

  function createScatterFormatData(point1, point2) {
    return {
      x: Math.round(point1),
      y: Math.round(point2),
    };
  }
  const createPlotData = (data) => {
    let plotter = [];
    let plotter_q = [];
    data.forEach((element) => {
      plotter.push(
        createScatterFormatData(
          eval(element.plot_values)[0],
          eval(element.plot_values)[1]
        )
      );
    });

    console.log("query_isomap : ", data[0].query_isomap);
    plotter_q.push({
      x: Math.round(eval(data[0].query_isomap)[0]),
      y: Math.round(eval(data[0].query_isomap)[1]),
      pointBackgroundColor: "red",
      pointBorderColor: "red",
    });

    let template = {};
    template = {
      datasets: [
        {
          label: "Query Point",
          data: plotter_q,
          backgroundColor: "rgba(255, 99, 132, 1)",
        },
        {
          label: "Result points",
          data: plotter,
          // backgroundColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(75,192,192,1)",
          // pointBorderColor: "rgba(75,192,192,1)",
        },
      ],
    };

    console.log(template);
    console.log(dummy_data);

    setPlots(template);
  };

  // function formated(overall_budget, budget) {
  //   return { overall_budget, budget };
  // }
  const calulateMaxBudgetValue = (data) => {
    let budget = [];
    let overall_budget = [];
    let nop = [];
    data.forEach((element) => {
      budget.push(element.overall_budget);
      overall_budget.push(element.budget);
      nop.push(element.Number_of_projects_funded);
    });

    // console.log("XXX", Math.max(...budget));
    setMaxBudget(Math.max(...budget));
    setMaxOverallBudget(Math.max(...overall_budget));
    setNumberOfProjects(Math.max(...nop));
  };

  //THIS FETCHED ALL THE DATE AT ONCE
  const fetchData = () => {
    CallService.getCalls()
      .then((response) => response.data)
      .then((data) => {
        console.log("hello", data);
        calulateMaxBudgetValue(data);
      });

    console.log(max_budget);
  };

  useEffect(() => {
    fetchData();
    // saveCurrentSearch("a", [0, 1], [0, 2], [0, 3], [0, 4]);
    // loadCurrentSearch();
  }, []);

  const [isChecked, setIsChecked] = useState(false);

  const fetchSearchedData = (
    text,
    trl_value,
    budget_value,
    overallbudget_value,
    nop_value,
    deadline_value,
    startdate_value
  ) => {
    {
      isChecked
        ? LSACheckService.getCalls(
            text,
            trl_value,
            budget_value,
            overallbudget_value,
            nop_value,
            deadline_value,
            startdate_value
          )
            .then((response) => response.data)
            .then((data) => {
              console.log("hello", data);
              // createRows(data);
              createRows(data);
              createPlotData(data);
              setPlotIsHere(true);
            })
        : BERTCheckService.getCalls(
            text,
            trl_value,
            budget_value,
            overallbudget_value,
            nop_value,
            deadline_value,
            startdate_value
          )
            .then((response) => response.data)
            .then((data) => {
              console.log("hello", data);
              // createRows(data);
              createRows(data);
              createPlotData(data);
              setPlotIsHere(true);
            });
    }
  };
  const selectedDocument = localStorage.getItem("selectedDocument"); //Data from GetStarted Page about the document
  let max_text_display = 25;

  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearched(false);
    console.log("budget print", budget_value);
    fetchSearchedData(
      text,
      trl_value,
      budget_value,
      overallbudget_value,
      nop_value,
      deadline_value,
      startdate_value
    );
  };

  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col ${styles.paddingY}`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
      >
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[22px] text-[15px] text-white ss:leading-[100.8px] leading-[75px]">
            {searched
              ? "Great! You have selected : " +
                (selectedDocument.length < max_text_display
                  ? selectedDocument
                  : selectedDocument.slice(0, max_text_display) + "...")
              : "Searching for : " +
                (text.length < max_text_display
                  ? text
                  : text.slice(0, max_text_display) + "...")}{" "}
          </h1>

          <div className={`pr-5`}>
            <p style={{ color: "white" }}>Choose Model:</p>
            <LSABERTSwitch handleModelBoolean={setIsChecked} />
          </div>

          <div
            className={`flex bg-white w-500 h-250`}
            hidden={searched ? true : false}
          >
            {plotishere && (
              <ScatterPlot Data={plots} options={options}></ScatterPlot>
            )}
          </div>
        </div>
        <p className={`${styles.paragraph} max-w-[550px] mb-10`}>
          {searched
            ? "What is your Search Query?"
            : "Filter through Attributes "}{" "}
          {/* ============================================ */}
          {trl_value}, {budget_value}, {overallbudget_value},{nop_value},
          {deadline_value},{startdate_value}
          {/* ============================================ */}
        </p>

        <div className={`flex-1 w-full sm:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto `}>
          <SearchBar
            text={text}
            handleTextChange={handleTextChange}
            handleSearchSubmit={handleSearchSubmit}
          />
        </div>
        <div className={`flex-1 mt-5`} hidden={searched ? true : false}>
          <KeyAttributes
            upper_budget_limit={max_budget}
            upper_overall_budget_limit={max_overall_budget}
            upper_NOP_limit={max_nop}
            handleTRLValue={setTRLValue}
            handleBudgetValue={setBudgetValue}
            handleOverallBudgetValue={setOverallBudgetValue}
            handleNOPValue={setNOPValue}
            handleDeadlineValue={setDeadlineValue}
            handleStartDateValue={setStartDateValue}
          />
        </div>
        <div className={`flex-1 mt-5`} hidden={searched ? true : false}>
          <ResultsTable
            rows={rows}
            columns={columns}
            rowsPerPageOptions={[5, 10, 25]}
            defaultRowsPerPage={5}
            collapsibleComponent={(row) => <p>{row.word_corpus}</p>}
          />
        </div>

        {/*/Filler*/}
        <div className="mb-60" hidden={searched ? false : true}></div>
      </div>
    </section>
  );
};

export default Hero;
