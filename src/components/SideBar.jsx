import React, { useState } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import "bootstrap-icons/font/bootstrap-icons.css";

const Sidebar = ({ onInsertText }) => {
  const [openSections, setOpenSections] = useState({
    employeeBasicInfo: false,
    employeeContactInfo: false,
    employeeJobInfo: false,
    employeePersonalInfo: false,
    employeeSalaryInfo: false,
    documentFilterInfo: false,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const dummyData = {
    employeeBasicInfo: [
      { field: "EmployeeNumber" },
      { field: "FirstName" },
      { field: "MiddleName" },
      { field: "LastName" },
      { field: "DisplayName" },
      { field: "FullName" },
      { field: "ProfileTable" },
    ],
    employeeContactInfo: [
      { field: "PhoneNumber" },
      { field: "EmailAddress" },
      { field: "Address" },
    ],
    employeeJobInfo: [
      { field: "JobTitle" },
      { field: "Department" },
      { field: "JoiningDate" },
    ],
    employeePersonalInfo: [
      { field: "Gender" },
      { field: "DateOfBirth" },
      { field: "Nationality" },
    ],
    employeeSalaryInfo: [
      { field: "BasicSalary" },
      { field: "Allowances" },
      { field: "Deductions" },
    ],
    documentFilterInfo: [
      { field: "DocumentType" },
      { field: "IssuedDate" },
      { field: "ExpirationDate" },
    ],
  };
  const toPascalCase = (str) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (match, index) =>
        index === 0 ? match.toUpperCase() : match.toUpperCase()
      )
      .replace(/\s+/g, "");
  };

  const handleInsert = (field) => {
    let fieldData = Object.values(dummyData)
      .flat()
      .find((item) => item.field === field);

    if (fieldData) {
      const pascalCaseKey = toPascalCase(fieldData.field);
      onInsertText(pascalCaseKey);
    }
  };

  return (
    <div
      className="bg-white p-3 border-end"
      style={{
        overflowY: "auto",
        height: "calc(100vh - 160px)",
        width: "250px",
      }}
    >
      <div
        className="d-flex align-items-center justify-content-between mb-3"
        style={{ fontSize: "13px", fontWeight: "600" }}
      >
        <span className="text-black">Placeholder Fields</span>
        <i className="bi bi-info-circle text-secondary"></i>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text bg-white border-secondary">
          <FaSearch className="text-secondary" />
        </span>
        <input
          type="text"
          className="form-control border-secondary"
          placeholder="Search fields..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <button
        className="btn btn-light w-100 rounded-pill mb-4 fw-semibold text-dark d-flex align-items-center justify-content-center gap-2"
        style={{ fontSize: "13px" }}
      >
        <span>AUTO COMPLETE FIELDS</span>
        <i className="bi bi-info-circle text-secondary"></i>
      </button>

      {Object.entries(dummyData).map(([key, section]) => {
        const filteredFields = section.filter((item) =>
          item.field.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (searchTerm && filteredFields.length === 0) return null;

        return (
          <div key={key} className="mb-3">
            <div
              className="d-flex justify-content-between align-items-center fw-semibold text-black"
              role="button"
              onClick={() => toggleSection(key)}
            >
              {key.replace(/([A-Z])/g, " $1").replace(/^Employee/i, "Employee")}
              <FaChevronDown
                className={`transition-transform ${
                  openSections[key] || searchTerm ? "rotate-180" : ""
                }`}
                style={{
                  transition: "transform 0.3s ease",
                  transform:
                    openSections[key] || searchTerm
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                }}
              />
            </div>

            {(openSections[key] || searchTerm) && (
              <ul className="list-group list-group-flush mt-2">
                {filteredFields.map((item) => (
                  <li
                    key={item.field}
                    className="list-group-item border-0 text-secondary d-flex align-items-center p-2 mb-2"
                    style={{
                      fontSize: "13px",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                    onClick={() => handleInsert(item.field)}
                  >
                    <i className="bi bi-check-circle text-secondary me-2"></i>
                    <span>{item.field}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
