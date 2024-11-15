import { useState, useEffect } from "react";
import "./AddScholarship.css";
import { useNavigate } from "react-router-dom";

const AdminAddScholarship = () => {
  const navigate = useNavigate();

  const documentOptions = [
    "ID Proof",
    "Income Certificate",
    "Marksheet",
    "Residence Proof",
  ];
  const education_levels = ["B.Tech", "M.Tech", "M.Sc", "M.Des", "Ph.D"];
  const eligible_coursesOptions = {
    "B.Tech": ["ICT", "ICT with CS", "MnC", "EVD"],
    "M.Tech": [
      "Machine Learning",
      "Software Systems",
      "VLSI and Embedded Systems",
    ],
    "M.Sc": ["IT", "AA", "DS"],
    "M.Des": ["CD"],
    "Ph.D": ["Regular", "Rolling"],
  };

  const [formData, setFormData] = useState({
    scholarship_name: "",
    amount: "",
    end_date: "",
    description: "",
    education_level: "",
    eligible_courses: [],
    min_percentage: "",
    annual_family_income: "",
    documents_required: [],
    benefits: "",
  });

  const [availableCourses, setAvailableCourses] = useState([]);

  useEffect(() => {
    if (formData.education_level) {
      setAvailableCourses(eligible_coursesOptions[formData.education_level]);
      setFormData((prevData) => ({
        ...prevData,
        eligible_courses: "",
      }));
    } else {
      setAvailableCourses([]);
    }
  }, [formData.education_level]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === "amount" || name === "annual_family_income") && value < 0) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: 0,
      }));
      return;
    }

    if (name === "min_percentage") {
      const numericValue = parseFloat(value);
      if (
        numericValue < 0 ||
        numericValue > 10 ||
        !/^\d*(\.\d{0,2})?$/.test(value)
      ) {
        return;
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDocumentChange = (e) => {
    const selectedDocument = e.target.value;
    if (
      selectedDocument &&
      !formData.documents_required.includes(selectedDocument)
    ) {
      setFormData((prevData) => ({
        ...prevData,
        documents_required: [...prevData.documents_required, selectedDocument],
      }));
    }
  };
  
  const handleCourseChange = (event) => {
    const selectedCourse = event.target.value;

    if (!formData.eligible_courses.includes(selectedCourse)) {
      setFormData((prevData) => ({
        ...prevData,
        eligible_courses: [...prevData.eligible_courses, selectedCourse],
      }));
    }
  };

  const removeCourse = (courseToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      eligible_courses: prevData.eligible_courses.filter(
        (course) => course !== courseToRemove
      ),
    }));
  };

  const removeDocument = (document) => {
    setFormData((prevData) => ({
      ...prevData,
      documents_required: prevData.documents_required.filter(
        (doc) => doc !== document
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const response = await fetch(
        "http://localhost:8080/api/scholarship/addScholarship",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        navigate("/admin");
      } else {
        alert("Submission failed: " + data.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred while submitting.");
    }
  };

  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const istDate = tomorrow.toLocaleString("en-IN", options);
    const [day, month, year] = istDate.split("/");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="admin-add-scholarship">
      <h1>Add Scholarship</h1>
      <form onSubmit={handleSubmit} className="admin-add-scholarship-form">
        <div className="form-grid">
          <div className="form-group">
            <label className="required">Scholarship Name</label>
            <input
              type="text"
              name="scholarship_name"
              value={formData.scholarship_name}
              onChange={handleChange}
              required
            />
          </div>

        <div className="form-group">
            <label className="required">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "-" || e.key === "+") {
                  e.preventDefault();
                }
              }}
              min="0"
              required
            />
          </div>


          <div className="form-group">
            <label className="required">End Date</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              min={getTomorrowDate()}
              required
            />
          </div>

          <div className="form-group">
            <label className="required">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <h3>Eligibility Criteria</h3>
        <div className="form-grid">
          <div className="form-group">
            <label className="required">Education Level</label>
            <select
              name="education_level"
              value={formData.education_level}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Education Level
              </option>
              {education_levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="required">Select Eligible Courses</label>
            <select
              onChange={handleCourseChange}
              value=""
              disabled={!formData.education_level}
            >
              <option value="" disabled>
                {formData.education_level
                  ? "Select a course"
                  : "Select Education Level first"}
              </option>
              {availableCourses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>

            <div className="selected-items">
              {Array.isArray(formData.eligible_courses) &&
                formData.eligible_courses.map((course) => (
                  <span key={course} className="item-chip">
                    {course}
                    <button type="button" onClick={() => removeCourse(course)}>
                      x
                    </button>
                  </span>
                ))}
            </div>
          </div>

          <div className="form-group">
            <label className="required">Minimum Percentage (CPI)</label>
            <input
              type="number"
              name="min_percentage"
              value={formData.min_percentage}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "-" || e.key === "+") {
                  e.preventDefault();
                }
              }}
              min="0"
              max="10"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label className="required">Annual Family Income</label>
            <input
              type="number"
              name="annual_family_income"
              value={formData.annual_family_income}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "-" || e.key === "+") {
                  e.preventDefault();
                }
              }}
              min="0"
              required
            />
          </div>
        </div>

        <h3>Documents Required</h3>
        <div className="form-group">
          <label className="required">Select Documents</label>
          <select onChange={handleDocumentChange} defaultValue="">
            <option value="" disabled>
              Select a document
            </option>
            {documentOptions.map((doc) => (
              <option key={doc} value={doc}>
                {doc}
              </option>
            ))}
          </select>
          <div className="selected-items">
            {formData.documents_required.map((document) => (
              <span key={document} className="item-chip">
                {document}
                <button type="button" onClick={() => removeDocument(document)}>
                  x
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Benefits</label>
          <textarea
            name="benefits"
            value={formData.benefits}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminAddScholarship;
