import React, { useState, useEffect } from "react";
import "./Profile.css";
import Navbar from "../Navbar/Navbar";
var Femail = "";

const FileUpload = ({ label, accept, onChange, file, clearFile, progress }) => (
  <div className=" space-y-2">
    <label className="text-sm font-medium text-white">{label}</label>

    <div className="flex items-center justify-center gap-4">
      {/* Upload Button */}
      <button
        type="button"
        className={`upload-btn px-4 py-2 bg-slate-700 text-white rounded-lg ${
          file ? "hover:bg-slate-600" : "hover:bg-slate-800"
        }`}
        onClick={() => document.getElementById(label).click()}
      >
        {file ? file.name : "Choose a file"}
      </button>

      {/* Remove Button */}
      {file && (
        <button
          type="button"
          className="remove-file-btn bg-red-500 text-white rounded-full px-2 py-1 hover:bg-red-600"
          onClick={clearFile}
        >
          ✖
        </button>
      )}
    </div>

    {/* File Input */}
    <input
      type="file"
      id={label}
      accept={accept}
      onChange={onChange}
      style={{ display: "none" }}
    />

    {/* Progress Bar */}
    {progress > 0 && (
      <div className="w-full bg-gray-300 rounded-lg h-4 mt-2 overflow-hidden">
        <div
          className="bg-blue-600 h-full text-center text-white text-xs leading-4"
          style={{ width: `${progress}%` }}
        >
          {progress}%
        </div>
      </div>
    )}
  </div>
);

const BankDetails = ({
  formData,
  handleInputChange,
  pdfFiles,
  handlePdfUpload,
  clearPdfFile,
}) => (
  <>
    <div className="max-w-4xl mx-auto p-6 bg-blue-950 rounded-lg shadow-lg">
      <h3 className="text-white font-bold">Bank Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            label: "Savings Bank Account Number",
            name: "bankAccount",
            required: true,
          },
          { label: "IFSC Code", name: "ifscCode", required: true },
          { label: "Bank Name", name: "bankName", required: true },
          { label: "Bank Branch", name: "bankBranch", required: true },
        ].map(({ label, name, required }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              name={name}
              value={formData[name] || ""}
              onChange={handleInputChange}
              required={required}
              className="block w-full bg-blue-500/50 text-gray-300 border border-gray-700 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        ))}
        <FileUpload
          label="Upload Bank Passbook (PDF)"
          accept="application/pdf"
          onChange={(e) => handlePdfUpload(e, "bankPassbook")}
          file={pdfFiles.bankPassbook}
          clearFile={() => clearPdfFile("bankPassbook")}
        />
      </div>
    </div>
  </>
);

const CommunicationAddress = ({
  formData,
  handleInputChange,
  pdfFiles,
  handlePdfUpload,
  clearPdfFile,
}) => (
  <>
    <div className="max-w-4xl mx-auto p-6 bg-blue-950 rounded-lg shadow-lg">
      <h3 className="text-white font-semibold text-lg mb-6">
        Communication Address
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
        {[
          {
            label: "Village / Area / Locality",
            name: "village",
            required: true,
          },
          {
            label: "Block / Taluka / Sub-district / Town",
            name: "block",
            required: true,
          },
          { label: "State", name: "state", required: true },
          { label: "PIN", name: "pin", required: true },
        ].map(({ label, name, required }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-white mb-2">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              name={name}
              value={formData[name] || ""}
              onChange={handleInputChange}
              required={required}
              className="block w-full bg-blue-500/50 text-gray-300 border border-gray-700 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        ))}
      </div>

      <div>
        <FileUpload
          label="Upload Bank Aadhar (PDF)"
          accept="application/pdf"
          onChange={(e) => handlePdfUpload(e, "aadharcard")}
          file={pdfFiles.aadharcard}
          clearFile={() => clearPdfFile("aadharcard")}
          className="text-white"
        />
      </div>
    </div>
  </>
);

const PersonalDetails = ({ formData, handleInputChange }) => (
  <div className="max-w-4xl mx-auto p-6 bg-blue-950 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold text-white mb-6">Personal Details</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        { label: "First Name", name: "firstname", required: true },
        { label: "Middle Name", name: "middlename", required: true },
        { label: "Last Name", name: "lastname", required: true },
        { label: "Date of Birth", name: "dob", type: "date", required: true },
        {
          label: "Gender",
          name: "gender",
          type: "select",
          options: ["Male", "Female", "Other"],
          required: true,
        },
        { label: "Category", name: "category", required: true },
        { label: "Mobile Number", name: "mobileNumber", required: true },
        { label: "Parent's Full Name", name: "parentName" },
        { label: "Occupation", name: "occupation" },
        { label: "Parent's Mobile No", name: "parentMobile" },
        { label: "Income", name: "incomelimit" },
      ].map(({ label, name, type = "text", options, required, pattern }) => (
        <div key={name}>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          {type === "select" ? (
            <select
              name={name}
              value={formData[name] || ""}
              onChange={handleInputChange}
              required={required}
              className="block w-full bg-blue-500/50 text-gray-300 border border-gray-700 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select {label}</option>
              {options.map((option) => (
                <option key={option} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              name={name}
              value={formData[name] || ""}
              onChange={handleInputChange}
              required={required}
              pattern={pattern?.source}
              className="block w-full bg-blue-500/50 text-gray-300 border border-gray-700 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
            />
          )}
        </div>
      ))}
      {/* Email Field */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Email
        </label>
        <input
          type="text"
          value={formData.email || ""}
          readOnly
          className="block w-full bg-blue-500/50 text-gray-400 border border-gray-700 rounded-lg p-2.5 cursor-not-allowed"
        />
      </div>
   
    </div>
  </div>
);

const CurrentAcademicDetails = ({
  formData,
  handleInputChange,
  pdfFiles,
  handlePdfUpload,
  clearPdfFile,
}) => {
  const calculateTotalFees = () => {
    const tuitionFees = parseFloat(formData.tuitionFees) || 0;
    const nonTuitionFees = parseFloat(formData.nonTuitionFees) || 0;
    return tuitionFees + nonTuitionFees;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-blue-950 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-white mb-6">
        Current Academic Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Course Level <span className="text-red-500">*</span>
          </label>
          <select
            name="courseLevel"
            value={formData.courseLevel || ""}
            onChange={handleInputChange}
            required
            className="block w-full bg-blue-500/50 text-gray-300 border border-gray-700 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>
              Select Course Level
            </option>
            {["UG", "PG", "PhD", "Diploma"].map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Course Name <span className="text-red-500">*</span>
          </label>
          <select
            name="courseName"
            value={formData.courseName || ""}
            onChange={handleInputChange}
            required
            className="block w-full bg-blue-500/50 text-gray-300 border border-gray-700 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>
              Select Course Name
            </option>
            {[
              "ICT",
              "ICT with CS",
              "MNC",
              "EVD",
              "MSC IT",
              "Msc Data Science",
              "Mtech",
              "MSC in Agriculture",
              "PhD",
            ].map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        {[
          { label: "Tuition Fees", name: "tuitionFees", required: true },
          { label: "Non-Tuition Fees", name: "nonTuitionFees" },
        ].map(({ label, name, required }) => (
          <div key={name} className="text-white">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="number"
              name={name}
              value={formData[name] || ""}
              onChange={handleInputChange}
              required={required}
              className="block w-full bg-blue-500/50 text-gray-300 border border-gray-700 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        ))}

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Total Current Fees <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="totalCurrentFees"
            value={calculateTotalFees()}
            readOnly
            className="block w-full bg-blue-500/50 text-gray-400 border border-gray-700 rounded-lg p-2.5 cursor-not-allowed"
          />
        </div>

        <div className="md:col-span-2">
          <FileUpload
            label="Upload Tuition Fee Receipt/Fee Structure (PDF)"
            accept="application/pdf"
            onChange={(e) => handlePdfUpload(e, "tuitionFeeReceipt")}
            file={pdfFiles.tuitionFeeReceipt}
            clearFile={() => clearPdfFile("tuitionFeeReceipt")}
            className="text-white"
          />
        </div>

        <div className="md:col-span-2">
          <FileUpload
            label="Upload Non-Tuition Fee Receipt (PDF)"
            accept="application/pdf"
            onChange={(e) => handlePdfUpload(e, "nonTuitionFeeReceipt")}
            file={pdfFiles.nonTuitionFeeReceipt}
            clearFile={() => clearPdfFile("nonTuitionFeeReceipt")}
            className="text-white"
          />
        </div>
      </div>
    </div>
  );
};

const Class10Details = ({
  formData,
  handleInputChange,
  pdfFiles,
  handlePdfUpload,
  clearPdfFile,
}) => {
  // Function to calculate percentage
  const calculatePercentage = (marksObtained, totalMarks) => {
    if (marksObtained && totalMarks && totalMarks > 0) {
      return (
        (parseFloat(marksObtained) / parseFloat(totalMarks)) *
        100
      ).toFixed(2);
    }
    return ""; // Return empty if no valid data
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-blue-950 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-100 mb-6">
          Class 10 Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
          {[
            {
              label: "Name of Institute",
              name: "class10Institute",
              required: true,
            },
            {
              label: "Month Year of Passing",
              name: "class10PassingDate",
              type: "month",
              required: true,
            },
            {
              label: "Total Marks Obtained",
              name: "class10MarksObtained",
              type: "number",
              required: true,
            },
            {
              label: "Out of Total Marks",
              name: "class10TotalMarks",
              type: "number",
              required: true,
            },
          ].map(({ label, name, type = "text", required }) => (
            <div className="mb-6" key={name}>
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {label} {required && <span className="text-red-500">*</span>}
              </label>
              <input
                type={type}
                name={name}
                id={name}
                value={formData[name] || ""}
                onChange={handleInputChange}
                required={required}
                className="block w-full bg-blue-500/50 text-white border border-gray-600 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            </div>
          ))}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Percentage
            </label>
            <input
              type="text"
              value={calculatePercentage(
                formData.class10MarksObtained,
                formData.class10TotalMarks
              )}
              readOnly
              className="block w-full bg-blue-950 text-gray-400 border border-gray-600 rounded-lg p-3 cursor-not-allowed"
            />
          </div>

          <FileUpload
            label="Upload Class 10 Mark Sheet (PDF)"
            accept="application/pdf"
            onChange={(e) => handlePdfUpload(e, "class10MarkSheet")}
            file={pdfFiles.class10MarkSheet}
            clearFile={() => clearPdfFile("class10MarkSheet")}
            className="mb-6"
          />
        </div>
      </div>
    </>
  );
};

const Class12Details = ({
  formData,
  handleInputChange,
  pdfFiles,
  handlePdfUpload,
  clearPdfFile,
}) => {
  // Function to calculate percentage
  const calculatePercentage = (marksObtained, totalMarks) => {
    if (marksObtained && totalMarks && totalMarks > 0) {
      return (
        (parseFloat(marksObtained) / parseFloat(totalMarks)) *
        100
      ).toFixed(2);
    }
    return ""; // Return empty if no valid data
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-blue-950 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-100 mb-6">
          Class 12 Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
          {[
            {
              label: "Name of Institute",
              name: "class12Institute",
              required: true,
            },
            {
              label: "Month Year of Passing",
              name: "class12PassingDate",
              type: "month",
              required: true,
            },
            {
              label: "Total Marks Obtained",
              name: "class12MarksObtained",
              type: "number",
              required: true,
            },
            {
              label: "Out of Total Marks",
              name: "class12TotalMarks",
              type: "number",
              required: true,
            },
          ].map(({ label, name, type = "text", required }) => (
            <div className="mb-6" key={name}>
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {label} {required && <span className="text-red-500">*</span>}
              </label>
              <input
                type={type}
                name={name}
                id={name}
                value={formData[name] || ""}
                onChange={handleInputChange}
                required={required}
                className="block w-full bg-blue-500/50 text-white border border-gray-600 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            </div>
          ))}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Percentage
            </label>
            <input
              type="text"
              value={calculatePercentage(
                formData.class12MarksObtained,
                formData.class12TotalMarks
              )}
              readOnly
              className="block w-full bg-blue-950 text-gray-400 border border-gray-600 rounded-lg p-3 cursor-not-allowed"
            />
          </div>

          <FileUpload
            label="Upload Class 12 Mark Sheet (PDF)"
            accept="application/pdf"
            onChange={(e) => handlePdfUpload(e, "class12MarkSheet")}
            file={pdfFiles.class12MarkSheet}
            clearFile={() => clearPdfFile("class12MarkSheet")}
            className="mb-6"
          />
        </div>
      </div>
    </>
  );
};

const CurrentEducationDetails = ({
  formData,
  handleInputChange,
  pdfFiles,
  handlePdfUpload,
  clearPdfFile,
}) => {
  // Function to calculate percentage
  const calculatePercentage = (marksObtained, totalMarks) => {
    if (marksObtained && totalMarks && totalMarks > 0) {
      return (
        (parseFloat(marksObtained) / parseFloat(totalMarks)) *
        100
      ).toFixed(2);
    }
    return ""; // Return empty if no valid data
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-blue-950 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-100 mb-6">
          Current Education Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
          {[
            {
              label: "Name of Institute",
              name: "currentInstitute",
              required: true,
            },
            {
              label: "Program/Course Name",
              name: "currentProgram",
              required: true,
            },
            {
              label: "Year of Enrollment",
              name: "currentYearOfEnrollment",
              type: "number",
              required: true,
            },
            {
              label: "Expected Year of Graduation",
              name: "expectedGraduationYear",
              type: "number",
              required: true,
            },
            {
              label: "Total Marks Obtained",
              name: "currentMarksObtained",
              type: "number",
              required: true,
            },
            {
              label: "Out of Total Marks",
              name: "currentTotalMarks",
              type: "number",
              required: true,
            },
          ].map(({ label, name, type = "text", required }) => (
            <div className="mb-6" key={name}>
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {label} {required && <span className="text-red-500">*</span>}
              </label>
              <input
                type={type}
                name={name}
                id={name}
                value={formData[name] || ""}
                onChange={handleInputChange}
                required={required}
                className="block w-full bg-blue-500/50 text-white border border-gray-600 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            </div>
          ))}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Percentage
            </label>
            <input
              type="text"
              value={calculatePercentage(
                formData.currentMarksObtained,
                formData.currentTotalMarks
              )}
              readOnly
              className="block w-full bg-blue-950 text-gray-400 border border-gray-600 rounded-lg p-3 cursor-not-allowed"
            />
          </div>

          <FileUpload
            label="Upload Current Semester Mark Sheet (PDF)"
            accept="application/pdf"
            onChange={(e) => handlePdfUpload(e, "currentMarkSheet")}
            file={pdfFiles.currentMarkSheet}
            clearFile={() => clearPdfFile("currentMarkSheet")}
            className="mb-6"
          />
        </div>
      </div>
    </>
  );
};

const Profile = () => {
  const [image, setImage] = useState(null);
  const [pdfFiles, setPdfFiles] = useState({
    incomeCertificate: null,
    bankPassbook: null,
    aadharcard: null,
    tuitionFeeReceipt: null,
    nonTuitionFeeReceipt: null,
    class10MarkSheet: null,
    class12MarkSheet: null,
    currentEducationMarkSheet: null,
  });

  const [cloudinaryUrls, setCloudinaryUrls] = useState({
    incomeCertificate: null,
    bankPassbook: null,
    aadharcard: null,
    tuitionFeeReceipt: null,
    nonTuitionFeeReceipt: null,
    class10MarkSheet: null,
    class12MarkSheet: null,
    currentEducationMarkSheet: null,
  });

  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    dob: "",
    gender: "",
    category: "",
    email: "",
    mobileNumber: "",
    parentName: "",
    occupation: "",
    parentMobile: "",
    incomelimit: "",
    village: "",
    block: "",
    state: "",
    pin: "",
    bankAccount: "",
    ifscCode: "",
    bankName: "",
    bankBranch: "",
    courseLevel: "",
    courseName: "",
    tuitionFees: "",
    nonTuitionFees: "",
    class10Institute: "",
    class10PassingDate: "",
    class10MarksObtained: "",
    class10TotalMarks: "",
    class12Institute: "",
    class12PassingDate: "",
    class12MarksObtained: "",
    class12TotalMarks: "",
    currentEducationBatch: "",
    currentCgpaObtained: "",
    currentCgpaTotal: "",
    currentSemester: "",
  });

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const email = userInfo.email;

    Femail = email;

    setFormData((prev) => ({ ...prev, email: Femail }));

    console.log("f", Femail);

    const endpoint1 = "https://group7-osp-forked.onrender.com/api/user/getprofile/";
    const id2 = endpoint1 + email;

    console.log(id2);

    const fetchData = async () => {
      try {
        console.log(id2);

        const response = await fetch(id2, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          const data = await response.json();

          const formattedData = {
            firstname: String(data.first_name || ""),
            middlename: String(data.middle_name || ""),
            lastname: String(data.last_name || ""),
            dob: String(data.dob || ""),
            gender: String(data.gender || ""),
            category: String(data.category || ""),
            email: String(data.email || ""),
            mobileNumber: String(data.mobilenumber || ""),
            parentName: String(data.parent_name || ""),
            occupation: String(data.occupation || ""),
            parentMobile: String(data.parentmobile || ""),
            incomelimit: String(data.incomelimit || ""),
            village: String(data.village || ""),
            block: String(data.block || ""),
            state: String(data.state || ""),
            pin: String(data.pin || ""),
            bankAccount: String(data.bankaccount || ""),
            ifscCode: String(data.ifsccode || ""),
            bankName: String(data.bank_name || ""),
            bankBranch: String(data.branch_name || ""),
            courseLevel: String(data.courselevel || ""),
            courseName: String(data.coursename || ""),
            tuitionFees: String(data.tuitionfees || ""),
            nonTuitionFees: String(data.nontuitionfees || ""),
            class10Institute: String(data.class10institute || ""),
            class10PassingDate: String(data.class10passingdate || ""),
            class10MarksObtained: String(data.class10marksobtained || ""),
            class10TotalMarks: String(data.class10totalmarks || ""),
            class12Institute: String(data.class12institute || ""),
            class12PassingDate: String(data.class12passingdate || ""),
            class12MarksObtained: String(data.class12marksobtained || ""),
            class12TotalMarks: String(data.class12totalmarks || ""),
            currentEducationBatch: String(data.currenteducationbatch || ""),
            currentCgpaObtained: String(data.currentcgpaobtained || ""),
            currentCgpaTotal: String(data.currentcgpatotal || ""),
            currentSemester: String(data.current_semester || ""),
          };

          console.log(formattedData);
          // console.log('3');

          setFormData(formattedData);
          // console.log(formData);
          // console.log(4);
        }
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    const endpoint = "https://group7-osp-forked.onrender.com/api/user/getemail/";
    const id = endpoint + email;

    console.log(email);

    (async () => {
      try {
        const response = await fetch(id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        });

        if (response.ok) {
          console.log("Email is present in the database.");
          fetchData();
        } else if (response.status === 404) {
          console.log("Email not found in the database.");
        } else {
          console.error("An error occurred while checking the email.");
        }
      } catch (error) {
        console.error("Error checking email:", error);
      }
    })();

    // const savedData = localStorage.getItem("profileData");
    // if (savedData) {
    //   const parsedData = JSON.parse(savedData);
    //   setFormData(parsedData.formData || {});
    //   setPdfFiles(parsedData.pdfFiles || {});
    //   if (parsedData.image) {
    //     setImage(parsedData.image);
    //     setPreview(parsedData.image);
    //   }
    // }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePdfUpload = (e, key) => {
    const file = e.target.files[0];
    setPdfFiles((prev) => ({ ...prev, [key]: file }));
  };

  const clearPdfFile = (key) => {
    setPdfFiles((prev) => ({ ...prev, [key]: null }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    //console.log("saved ");
    //console.log(formData);

    for (const key in pdfFiles) {
      const file = pdfFiles[key];
      if (file) {
        const formData2 = new FormData();
        formData2.append("file", file);

        const endpoint2 = `https://group7-osp-forked.onrender.com/api/user/pdf/${Femail}/${key}`;

        console.log("ff", endpoint2);

        try {
          const response = await fetch(endpoint2, {
            method: "POST",
            body: formData2,
          });

          if (!response.ok) {
            throw new Error("File upload failed.");
          }

          const data = await response.json();
          const cloudinaryUrl = data.cloudinaryUrl;

          setCloudinaryUrls((prevState) => ({
            ...prevState,
            [key]: cloudinaryUrl,
          }));
        } catch (error) {
          console.error("Error uploading file:", error);
          alert("Error uploading file: " + error.message);
        }
      }
    }

    console.log(cloudinaryUrls);

    console.log("out of file");

    try {
      const response = await fetch("https://group7-osp-forked.onrender.com/api/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("res from server");
      console.log(data);

      if (response.ok) {
        console.log("data in db");
        const profileData = { formData, image: preview, pdfFiles };
        localStorage.setItem("profileData", JSON.stringify(profileData));
        alert("Profile saved successfully!");
      } else {
        alert("Login failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred while logging in.");
    }
  };

  const handleClearForm = () => {
    setFormData({
      firstname: "",
      middlename: "",
      lastname: "",
      dob: "",
      gender: "",
      category: "",
      mobileNumber: "",
      parentName: "",
      occupation: "",
      parentMobile: "",
      incomelimit: "",
      village: "",
      block: "",
      state: "",
      pin: "",
      bankAccount: "",
      ifscCode: "",
      bankName: "",
      bankBranch: "",
      courseLevel: "",
      courseName: "",
      tuitionFees: "",
      nonTuitionFees: "",
      class10Institute: "",
      class10PassingDate: "",
      class10MarksObtained: "",
      class10TotalMarks: "",
      class12Institute: "",
      class12PassingDate: "",
      class12MarksObtained: "",
      class12TotalMarks: "",
      currentEducationBatch: "",
      currentCgpaObtained: "",
      currentCgpaTotal: "",
      currentSemester: "",
    });
    setImage(null);
    setPreview(null);
    setPdfFiles({
      incomeCertificate: null,
      bankPassbook: null,
      aadharcard: null,
      tuitionFeeReceipt: null,
      nonTuitionFeeReceipt: null,
      class10MarkSheet: null,
      class12MarkSheet: null,
      currentEducationMarkSheet: null,
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-blue-800 to-blue-600 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl bg-gradient-to-br from-blue-500 via-blue-800 to-blue-600 rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Student Details
          </h2>

          <form onSubmit={handleSave} className="text-white grid gap-6">
            {/* Personal Details */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Personal Details
              </h3>
              <div className="flex items-center gap-6 mb-6">
                <div className="relative w-32 h-32 border border-slate-500 rounded-full overflow-hidden flex justify-center items-center bg-slate-800">
                  {preview ? (
                    <>
                      <img
                        src={preview}
                        alt="Profile Preview"
                        className="object-cover w-full h-full"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1 hover:bg-red-600"
                        onClick={() => {
                          setImage(null);
                          setPreview(null);
                        }}
                      >
                        ✖
                      </button>
                    </>
                  ) : (
                    <p className="text-gray-400">No chosen file</p>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-slate-800 file:text-gray-200 hover:file:bg-slate-900"
                />
              </div>
            </div>

            {/* Other Components */}
            <div className="space-y-6">
              <PersonalDetails
                formData={formData}
                handleInputChange={handleInputChange}
              />
              <CommunicationAddress
                formData={formData}
                handleInputChange={handleInputChange}
                pdfFiles={pdfFiles}
                handlePdfUpload={handlePdfUpload}
                clearPdfFile={clearPdfFile}
              />
              <BankDetails
                formData={formData}
                handleInputChange={handleInputChange}
                pdfFiles={pdfFiles}
                handlePdfUpload={handlePdfUpload}
                clearPdfFile={clearPdfFile}
              />
              <CurrentAcademicDetails
                formData={formData}
                handleInputChange={handleInputChange}
                pdfFiles={pdfFiles}
                handlePdfUpload={handlePdfUpload}
                clearPdfFile={clearPdfFile}
              />
              <Class10Details
                formData={formData}
                handleInputChange={handleInputChange}
                pdfFiles={pdfFiles}
                handlePdfUpload={handlePdfUpload}
                clearPdfFile={clearPdfFile}
              />
              <Class12Details
                formData={formData}
                handleInputChange={handleInputChange}
                pdfFiles={pdfFiles}
                handlePdfUpload={handlePdfUpload}
                clearPdfFile={clearPdfFile}
              />
              <CurrentEducationDetails
                formData={formData}
                handleInputChange={handleInputChange}
                pdfFiles={pdfFiles}
                handlePdfUpload={handlePdfUpload}
                clearPdfFile={clearPdfFile}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={handleClearForm}
                className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Clear All
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
