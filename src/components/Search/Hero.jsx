import { Button, Collapse, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "../../style";
import Collapsible from "./Collapsible";
import SearchBar from "./SearchBar";
import Slider from "./Slider";
import ResultsTable from "./ResultsTable";
import CallService from "../../service/CallService";

const columns = [
  { field: "name", label: "Name" },
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
  const [rows, setRows] = React.useState([]);

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
      // full_name,
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
    // rower = rower.sort((a, b) => (a.name < b.name ? -1 : 1)); DONT USE IT BREAKS PAGINATION

    setRows(rower);
    // console.log("rows");
    // console.log(rows);
  };

  const fetchData = () => {
    CallService.getCalls()
      .then((response) => response.data)
      .then((data) => {
        // console.log("hello");
        // createRows(data);
        createRows(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectedDocument = localStorage.getItem("selectedDocument"); //Data from GetStarted Page about the document
  let max_text_display = 25;

  const [searched, setSearched] = useState(true);
  const [text, setText] = useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearched(event.target.value);
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
        </div>
        <p className={`${styles.paragraph} max-w-[550px] mb-10`}>
          {searched
            ? "What is your Search Query?"
            : "Filter thought Atributes "}{" "}
        </p>

        <div className={`flex-1 w-full sm:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto `}>
          <SearchBar
            text={text}
            handleTextChange={handleTextChange}
            handleSearchSubmit={handleSearchSubmit}
          />
        </div>
        <div className={`flex-1 mt-5`} hidden={searched ? true : false}>
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
        <div className="mb-52" hidden={searched ? false : true}></div>
      </div>
    </section>
  );
};

export default Hero;
