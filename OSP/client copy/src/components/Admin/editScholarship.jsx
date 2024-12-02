import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useContextState } from "../../context/userProvider";
import NavbarAdmin from "./Navbar";
import "../../index.css"
const AdminEditScholarship = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user, baseURL } = useContextState();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const scholarshipName = state.scholarshipName || "";
  const amount = state.amount || "";
  const endDate = state.endDate || "";
  const description = state.description || "";
  const educationLevel = state.educationLevel || "a";
  const eligibleCourses = state.eligibleCourses || [];
  const minPercentage = state.minPercentage || "";
  const annualFamilyIncome = state.annualFamilyIncome || "";
  const benefits = state.benefits || "";
  const scholarship_id = state.scholarship_id || "";
  const note = state.note || "";

  const educationLevels = ["B.Tech", "M.Tech", "M.Sc", "M.Des", "Ph.D"];
  const eligibleCoursesOptions = {
    "B.Tech": ["B.Tech ICT", "B.Tech ICT with CS", "B.Tech MnC", "B.Tech EVD"],
    "M.Tech": [
      "M.Tech Machine Learning",
      "M.Tech Software Systems",
      "M.Tech VLSI and Embedded Systems",
    ],
    "M.Sc": ["M.Sc IT", "M.Sc AA", "M.Sc DS"],
    "M.Des": ["M.Des CD"],
    "Ph.D": ["Ph.D Regular", "Ph.D Rolling"],
  };
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [formData, setFormData] = useState({
    scholarshipName: "",
    amount: "",
    endDate: "",
    description: "",
    educationLevel: "",
    eligibleCourses: [],
    minPercentage: "",
    annualFamilyIncome: "",
    benefits: "",
    note: "",
  });

  // Update formData when scholarship is loaded
  const [availableCourses, setAvailableCourses] = useState([]);

  useEffect(() => {
    setFormData({
      scholarshipName: scholarshipName || "",
      amount: amount || "",
      endDate: endDate ? formatDate(endDate) : "",
      description: description || "",
      eligibleCourses: Array.isArray(eligibleCourses) ? eligibleCourses : [],
      educationLevel: educationLevel || "",
      minPercentage: minPercentage || "",
      annualFamilyIncome: annualFamilyIncome || "",
      benefits: benefits || "",
      note: note || "",
    });
  }, []);

  useEffect(() => {
    if (formData.educationLevel) {
      setAvailableCourses(eligibleCoursesOptions[formData.educationLevel]);
    } else {
      setAvailableCourses([]);
    }
  }, [formData.educationLevel]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === "amount" || name === "annualFamilyIncome") && value < 0) {
      return;
    }

    if (name === "minPercentage") {
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

  const handleCourseChange = (event) => {
    const selectedCourse = event.target.value;

    // Check if the course is already selected
    if (!formData.eligibleCourses.includes(selectedCourse)) {
      setFormData((prevData) => ({
        ...prevData,
        eligibleCourses: [...prevData.eligibleCourses, selectedCourse],
      }));
    }
  };

  const removeCourse = (courseToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      eligibleCourses: prevData.eligibleCourses.filter(
        (course) => course !== courseToRemove
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmSave = window.confirm(
      "Are you sure you want to save the edited details?"
    );
    if (!confirmSave) {
      return; // Exit the function if user does not confirm
    }
    try {
      let form = formData;
      form.eligibleCourses = JSON.stringify(form.eligibleCourses);
      const formct = JSON.stringify(form);

      const response = await fetch(
        `https://group7-osp-forked.onrender.com/api/scholarship/editScholarship/${scholarship_id}`,
        {
          method: "PUT",
          headers: {
            "Accept-Type": "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${userInfo.token}`,
          },
          body: formct,
        }
      );

      const data = await response.json();
      if (response.ok) {
        navigate(`/admin/viewscholarship/${data.scholarship_id}`);
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
    <>
      <NavbarAdmin />
      <div className="p-8 bg-slate-600 min-h-screen flex items-center justify-center">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 shadow-xl w-full max-w-4xl">
          <h1 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-lg">
            Edit Scholarship
          </h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Scholarship Name */}
              <div className="flex flex-col">
                <label className="text-white font-medium mb-2 required">
                  Scholarship Name
                </label>
                <input
                  type="text"
                  name="scholarshipName"
                  value={formData.scholarshipName}
                  onChange={handleChange}
                  required
                  className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-lg shadow-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              {/* Amount */}
              <div className="flex flex-col">
                <label className="text-white font-medium mb-2 required">
                  Amount
                </label>
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
                  className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-lg shadow-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              {/* End Date */}
              <div className="flex flex-col">
                <label className="text-white font-medium mb-2 required">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  min={getTomorrowDate()}
                  required
                  className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-lg shadow-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              {/* Description */}
              <div className="col-span-1 md:col-span-2 flex flex-col">
                <label className="text-white font-medium mb-2 required">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-lg shadow-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>

            <h3 className="text-xl font-medium text-white">
              Eligibility Criteria
            </h3>

            {/* Eligibility Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Education Level */}
              <div className="flex flex-col">
                <label className="text-white font-medium mb-2 required">
                  Education Level
                </label>
                <select
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleChange}
                  required
                  className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-lg shadow-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="" disabled>
                    Select Education Level
                  </option>
                  {educationLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              {/* Eligible Courses */}
              <div className="flex flex-col">
                <label className="text-white font-medium mb-2 required">
                  Select Eligible Courses
                </label>
                <select
                  onChange={handleCourseChange}
                  value=""
                  disabled={!formData.educationLevel}
                  className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-lg shadow-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="" disabled>
                    {formData.educationLevel
                      ? "Select a course"
                      : "Select Education Level first"}
                  </option>
                  {availableCourses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {Array.isArray(formData.eligibleCourses) &&
                    formData.eligibleCourses.map((course) => (
                      <span
                        key={course}
                        className="bg-[#4A5F83] text-white py-1 px-3 rounded-lg shadow-md flex items-center gap-2"
                      >
                        {course}
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removeCourse(course)}
                        >
                          x
                        </button>
                      </span>
                    ))}
                </div>
              </div>

              {/* Minimum Percentage */}
              <div className="flex flex-col">
                <label className="text-white font-medium mb-2 required">
                  Minimum Percentage (CPI)
                </label>
                <input
                  type="number"
                  name="minPercentage"
                  value={formData.minPercentage}
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
                  className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-lg shadow-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              {/* Annual Family Income */}
              <div className="flex flex-col">
                <label className="text-white font-medium mb-2 required">
                  Annual Family Income
                </label>
                <input
                  type="number"
                  name="annualFamilyIncome"
                  value={formData.annualFamilyIncome}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "+") {
                      e.preventDefault();
                    }
                  }}
                  min="0"
                  required
                  className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-lg shadow-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>

            {/* Benefits */}
            <div className="flex flex-col">
              <label className="text-white font-medium mb-2">Benefits</label>
              <textarea
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-lg shadow-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Note */}
            <div className="flex flex-col">
              <label className="text-white font-medium mb-2">Note</label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-lg shadow-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#4A5F83] hover:bg-white/10 backdrop-blur-sm text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300"
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

export default AdminEditScholarship;
