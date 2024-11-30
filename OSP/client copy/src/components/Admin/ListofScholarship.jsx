import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarAdmin from "./Navbar";
import "../../index.css"

const ListofScholarship = () => {
  const [scholarships, setScholarships] = useState([]);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  console.log(scholarships);
  useEffect(() => {
    const fetchScholarships = async () => {
      console.log("Fetching list of scholarship");
      // console.log('working');
      try {
        const response = await fetch(
          `https://group7-osp-forked.onrender.com/api/scholarship/getScholarships`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        const data = await response.json();
        setScholarships(data);
      } catch (error) {
        console.error("Error fetching scholarships:", error);
      }
    };

    fetchScholarships();
  }, []);

  const handleViewApplicants = (id) => {
    console.log(id);
    navigate(`/scholarships/${id}/applicants`);
  };

  return (
    <>
    <NavbarAdmin />
    <div className="h-screen bg-slate-300 mx-auto px-4 py-6">
      <h1 className=" text-2xl font-bold text-black mb-6">
        List of Scholarships
      </h1>
      <div className="overflow-x-auto shadow-md rounded-lg bg-blue-200">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-700 text-white">
              <th className="py-3 px-4 border-b border-blue-200 text-left text-sm font-medium">
                No
              </th>
              <th className="py-3 px-4 border-b border-blue-200 text-left text-sm font-medium">
                Scholarship ID
              </th>
              <th className="py-3 px-4 border-b border-blue-200 text-left text-sm font-medium">
                Scholarship Name
              </th>
              <th className="py-3 px-4 border-b border-blue-200 text-left text-sm font-medium">
                Number of Applicants
              </th>
              <th className="py-3 px-4 border-b border-blue-200 text-left text-sm font-medium">
                View Applicants
              </th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((scholarship, index) => (
              <tr
                key={scholarship.scholarship_id}
                className={`${
                  index % 2 === 0 ? "bg-blue-700" : "bg-blue-700"
                } hover:bg-blue-600 transition-colors `}
              >
                <td className="py-3 px-4 border-b border-blue-800 text-sm text-white">
                  {index + 1}
                </td>
                <td className="py-3 px-4 border-b border-blue-800 text-sm text-white">
                  {scholarship.scholarship_id}
                </td>
                <td className="py-3 px-4 border-b border-blue-800 text-sm text-white">
                  {scholarship.scholarship_name}
                </td>
                <td className="py-3 px-4 border-b border-blue-800 text-sm text-white">
                  {scholarship.applicants_count}
                </td>
                <td className="py-3 px-4 border-b border-blue-800 text-sm text-white">
                  <button
                    className="bg-blue-600 hover:bg-blue-500 text-white py-1 px-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    onClick={() =>
                      handleViewApplicants(scholarship.scholarship_id)
                    }
                  >
                    View Applicants
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default ListofScholarship;
