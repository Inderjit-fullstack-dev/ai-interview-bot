import React, { useState } from "react";
import "./jobtype.css";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button"; 

export default function JobTypes() {
  const [selectedJobType, setSelectedJobType] = useState(null);
  const jobTypes = [
    { name: "Frontend Developer", code: "NY" },
    { name: "Backend Developer", code: "RM" },
    { name: "Full Stack Developer", ode: "LDN" },
    { name: "Android Developer", code: "IST" },
    { name: "IOS Developer", code: "PRS" },
  ];
  return (
    <div className="job-type-container ">
      <div className="job-type-details">
        <h1 className="header">Select a Job Type</h1>
        <Dropdown
          value={selectedJobType}
          onChange={(e) => setSelectedJobType(e.value)}
          options={jobTypes}
          optionLabel="name"
          placeholder="Select a Job Type"
          className="w-full md:w-14rem"
          showClear={true}
        />
      </div>
      <div className="continue-button">
        <div className="max-width-42">
          <Button label="Continue" severity="secondary" />
        </div>
      </div>
    </div>
  );
}
