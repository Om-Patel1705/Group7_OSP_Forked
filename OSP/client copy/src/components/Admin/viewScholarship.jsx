import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../../index.css";
import { useContextState } from "../../context/userProvider";

const ViewScholarship = () => {
  const navigate = useNavigate();
  const { scholarship_id } = useParams();
  const [scholarshipName, setScholarshipName] = useState("");
  const [amount, setAmount] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [eligibleCourses, setEligibleCourses] = useState([]);
  const [minPercentage, setMinPercentage] = useState("");
  const [annualFamilyIncome, setAnnualFamilyIncome] = useState("");
  const [benefits, setBenefits] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { baseURL } = useContextState();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const response = await fetch(
          `https://group7-osp-forked.onrender.com/api/scholarship/${scholarship_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const datajson = await response.json();
        let objeC = JSON.parse(datajson.eligible_courses);
        setScholarshipName(datajson.scholarship_name);
        setAmount(datajson.amount);
        setEndDate(datajson.end_date);
        setDescription(datajson.description);
        setEducationLevel(datajson.education_level);
        setEligibleCourses(objeC);
        setMinPercentage(datajson.min_percentage);
        setAnnualFamilyIncome(datajson.annual_family_income);
        setBenefits(datajson.benefits);
        setNote(datajson.note);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching scholarship data:", err);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchScholarship();
  }, [scholarship_id]);

  const handleEdit = () => {
    navigate(`/admin/edit-scholarship/${scholarship_id}`, {
      state: {
        scholarship_id,
        scholarshipName,
        amount,
        endDate,
        description,
        educationLevel,
        eligibleCourses,
        minPercentage,
        annualFamilyIncome,
        benefits,
        note,
      },
    });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this scholarship?")) {
      fetch(`https://group7-osp-forked.onrender.com/api/scholarship/deleteScholarship/${scholarship_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.token}`,
        },
      })
        .then(() => {
          alert("Scholarship deleted successfully");
          navigate("/admin");
        })
        .catch((error) => console.error("Error deleting scholarship:", error));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return scholarshipName ? (
    <>
      <Navbar />
      <div className="bg-slate-600 min-h-screen p-8 flex items-center justify-center">
        <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-3xl p-6 shadow-xl w-full max-w-3xl">
          <div className="p-8 bg-blue-600 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-white mb-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm hover:bg-white/20 shadow-lg px-5 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:-translate-y-px hover:shadow-xl border border-white/20">
                {scholarshipName}
              </div>
            </h1>
            <div className="space-y-4">
              <div className="flex items-center justify-start text-white">
                <strong className="pr-3">Amount:</strong>
                <div className=" bg-white/10 backdrop-blur-sm text-white py-1 px-3 rounded-lg">
                  ₹ {amount}
                </div>
              </div>
              <div className="flex items-center justify-start text-white">
                <strong className="pr-3">End Date:</strong>
                <div className=" bg-white/10 backdrop-blur-sm text-white py-1 px-3 rounded-lg">
                  {new Date(endDate).toLocaleDateString()}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium text-white mb-2">
                  Description
                </h3>
                <pre className=" bg-white/10 backdrop-blur-sm text-white p-4 rounded-lg">
                  {description}
                </pre>
              </div>
              <div>
                <h3 className="text-xl font-medium text-white mb-2">
                  Eligibility Criteria
                </h3>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-start text-white mb-2">
                    <strong className="pr-3">Eligible Courses:</strong>
                    <div className="flex flex-wrap gap-2">
                      {eligibleCourses.length ? (
                        eligibleCourses.map((doc, index) => (
                          <div
                            key={index}
                            className=" bg-white/10 backdrop-blur-sm text-white py-1 px-3 rounded-lg"
                          >
                            {doc}
                          </div>
                        ))
                      ) : (
                        <span className="text-gray-300">None</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-start text-white">
                    <strong className="pr-3">Minimum Percentage (CPI):</strong>
                    <div className=" bg-white/10 backdrop-blur-sm text-white py-1 px-3 rounded-lg">
                      {minPercentage}
                    </div>
                  </div>
                  <div className="flex items-center justify-start text-white">
                    <strong className="pr-3">Annual Family Income:</strong>
                    <i className="text-gray-300 pr-3"> (less than) </i>
                    <div className=" bg-white/10 backdrop-blur-sm text-white py-1 px-3 rounded-lg">
                      ₹ {annualFamilyIncome}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium text-white mb-2">
                  Benefits
                </h3>
                <pre className=" bg-white/10 backdrop-blur-sm text-white p-4 rounded-lg">
                  {benefits}
                </pre>
              </div>
              <div>
                <h3 className="text-xl font-medium text-white mb-2">Note</h3>
                <pre className=" bg-white/10 backdrop-blur-sm text-white p-4 rounded-lg">
                  {note}
                </pre>
              </div>
              <div className="flex justify-center mt-6 gap-4">
                <button
                  className="bg-[#4A5F83] hover: bg-white/10 backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                  onClick={handleEdit}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <p>Scholarship data not available.</p>
  );
};

export default ViewScholarship;
