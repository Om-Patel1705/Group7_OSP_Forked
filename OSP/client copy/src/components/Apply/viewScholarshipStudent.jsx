import { useState, useEffect, Children } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContextState } from "../../context/userProvider";
import NavbarStudent from "../Navbar/Navbar";
import { ToastContainer, toast, Slide,Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../index.css";
const ViewScholarshipStudent = () => {
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
          `https://group7-osp-forked.onrender.com/api/user/viewscholarship/${scholarship_id}`
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
  const getTodayDate = () => {
    const today = new Date();
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const istDate = today.toLocaleString("en-IN", options);
    const [day, month, year] = istDate.split("/");
    return `${year}-${month}-${day}`;
  };
  const handleApply = async (e) => {
    e.preventDefault();

    const confirmSave = window.confirm(
      "Are you sure you want to Apply for this Scholarship details?"
    );
    if (!confirmSave) {
      return; // Exit the function if user does not confirm
    }

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    try {
      const response1 = await fetch(
        `https://group7-osp-forked.onrender.com/api/user/getApplicantId`,
        {
          method: "GET",
          headers: {
            email: userInfo.email,
          },
        }
      );

      if (!response1.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response1.json();

      const applicant_id = data.applicant.applicant_id;
      console.log("what the hell", applicant_id);
      const applied_date = getTodayDate();
      const applieddata = {
        scholarship_id,
        applied_date,
        applicant_id,
        status: "Pending",
      };

      const jsoneddata = JSON.stringify(applieddata);
      try {
        const response = await fetch(
          `https://group7-osp-forked.onrender.com/api/user/applyForScholarship/${scholarship_id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: jsoneddata,
          }
        );

        if (!response.ok) {
          if (response.status === 500) {
            const data = await response.json();

            if (data.errCode === 23505) {
              alert("You have already applied for this scholarship\n");
              throw new Error("Applied for this scholarship already");
              navigate(`/student/scholarship`);
            }
          }
          throw new Error("Failed to fetch data");
        }

        navigate(`/student/scholarship`);
      } catch (err) {
        console.error("Error fetching scholarship data:", err);
      }
    } catch (err) {
      toast.error("Profile not completed, Can't Apply");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return scholarshipName ? (
    <>
<ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition= {Bounce}
/>
      <NavbarStudent />
      <div className="bg-gradient-to-br rounded-lg from-black via-blue-800 to-blue-600 min-h-screen p-8 flex items-center justify-center">
        <div className="p-8 rounded-lg bg-blue-600 w-full max-w-3xl">
          <div className="p-8 bg-blue-900/50 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-white mb-6 text-center">
              <div className="bg-blue-500/50 backdrop-blur-sm hover:bg-white/20 shadow-lg px-5 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:-translate-y-px hover:shadow-xl border border-white/20">
                {scholarshipName}
              </div>
            </h1>
            <div className="space-y-4">
              <div className="flex items-center justify-start text-white">
                <strong className="pr-3">Amount:</strong>
                <div className=" bg-blue-100/10 backdrop-blur-sm text-white py-1 px-3 rounded-lg">
                  ₹ {amount}
                </div>
              </div>
              <div className="flex items-center justify-start text-white">
                <strong className="pr-3">End Date:</strong>
                <div className=" bg-blue-100/10 backdrop-blur-sm text-white py-1 px-3 rounded-lg">
                  {new Date(endDate).toLocaleDateString()}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium text-white mb-2">
                  Description
                </h3>
                <pre className=" bg-blue-100/10 backdrop-blur-sm text-white p-4 rounded-lg">
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
                            className=" bg-blue-100/10 backdrop-blur-sm text-white py-1 px-3 rounded-lg"
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
                    <div className=" bg-blue-100/10 backdrop-blur-sm text-white py-1 px-3 rounded-lg">
                      {minPercentage}
                    </div>
                  </div>
                  <div className="flex items-center justify-start text-white">
                    <strong className="pr-3">Annual Family Income:</strong>
                    <i className="text-gray-300 pr-3"> (less than) </i>
                    <div className=" bg-blue-100/10 backdrop-blur-sm text-white py-1 px-3 rounded-lg">
                      ₹ {annualFamilyIncome}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium text-white mb-2">
                  Benefits
                </h3>
                <pre className=" bg-blue-100/10 backdrop-blur-sm text-white p-4 rounded-lg">
                  {benefits}
                </pre>
              </div>
              <div>
                <h3 className="text-xl font-medium text-white mb-2">Note</h3>
                <pre className=" bg-blue-100/10 backdrop-blur-sm text-white p-4 rounded-lg">
                  {note}
                </pre>
              </div>
              <div className="flex justify-center mt-6 gap-4">
                <button
                  className="bg-green-500 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-300"
                  onClick={handleApply}
                >
                  Apply
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

export default ViewScholarshipStudent;
