import React, { Component } from "react";
import { Scatter } from "react-chartjs-2";

export default function ScatterPlot({ Data, options }) {
  return <Scatter data={Data} options={options} width={400} height={250} />;
}
