import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContextState } from "../../context/userProvider";
import NavbarAdmin from "./Navbar";

const ApplicantData = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id, sid } = useParams();
  const { baseURL } = useContextState();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch(
          `https://group7-osp-forked.onrender.com/api/scholarship/getApplicantData?id=${id}&scholarship_id=${sid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const { data } = await response.json();
        // console.log(data);
        setApplicants(data);
        const initialStatus = data.reduce((acc, applicant) => {
          acc[applicant.applicant_id] = applicant.status;
          return acc;
        }, {});
        setSelectedStatus(initialStatus);
      } catch (err) {
        console.error("Error fetching applicants:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [id, userInfo.token]);

  const handleStatusChange = (applicantId, status) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [applicantId]: status,
    }));
  };

  const handleSaveStatus = async (applicantId) => {
    const status = selectedStatus[applicantId];
    try {
      const response = await fetch(
        `https://group7-osp-forked.onrender.com/api/scholarship/statusUpdate`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${userInfo.token}`,
          },
          body: JSON.stringify({
            applicant_id: applicantId,
            s_id: sid,
            statusToUpdate: status,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const updatedApplicants = [...applicants];
      const index = updatedApplicants.findIndex(
        (applicant) => applicant.applicant_id === applicantId
      );
      if (index !== -1) {
        updatedApplicants[index].status = status;
        setApplicants(updatedApplicants);
      }

      alert("Status updated successfully!");
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavbarAdmin />
      <div className="min-h-screen bg-gray-100 px-6 py-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Applicant Details
        </h2>
        <div className="space-y-8">
          {applicants.map((applicant) => (
            <div
              key={applicant.applicant_id}
              className="bg-blue-300 shadow-md rounded-lg p-6"
            >
              <table className="w-full table-auto border-collapse">
                <tbody>
                  {[
    ["ID", applicant.applicant_id || "No data uploaded"],
    [
      "Name",
      applicant.first_name || applicant.middle_name || applicant.last_name
        ? `${applicant.first_name} ${applicant.middle_name || ""} ${applicant.last_name}`
        : "No data uploaded",
    ],
    ["DOB", applicant.dob ? new Date(applicant.dob).toLocaleDateString() : "No data uploaded"],
    ["Gender", applicant.gender || "No data uploaded"],
    ["Category", applicant.category || "No data uploaded"],
    ["Email", applicant.email || "No data uploaded"],
    ["Mobile", applicant.mobile_number || "No data uploaded"],
    ["Parent Name", applicant.parent_name || "No data uploaded"],
    ["Occupation", applicant.occupation || "No data uploaded"],
    ["Income", applicant.income || "No data uploaded"],
    ["Parent Mobile", applicant.parent_mobile || "No data uploaded"],
    ["Current Semester", applicant.current_semester || "No data uploaded"],
    ["Year of Admission", applicant.year_of_admission || "No data uploaded"],
    ["Street Address", applicant.street_address || "No data uploaded"],
    ["Pin Code", applicant.pin_code || "No data uploaded"],
    ["District", applicant.district_name || "No data uploaded"],
    ["Department", applicant.department_name || "No data uploaded"],
    ["Tuition Fees", applicant.tuition_fees || "No data uploaded"],
    ["Non-Tuition Fees", applicant.non_tuition_fees || "No data uploaded"],
    ["Status", applicant.status || "No data uploaded"],
    [
      "Income Certificate",
      applicant.income_certificate ? (
        <a
          href={applicant.income_certificate}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View Document
        </a>
      ) : (
        "No data uploaded"
      ),
    ],
    [
      "Bank Passbook",
      applicant.bank_passbook ? (
        <a
          href={applicant.bank_passbook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View Document
        </a>
      ) : (
        "No data uploaded"
      ),
    ],
    [
      "Aadhar Card",
      applicant.aadhar_card ? (
        <a
          href={applicant.aadhar_card}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View Document
        </a>
      ) : (
        "No data uploaded"
      ),
    ],
    [
      "Tuition Fee Receipt",
      applicant.tuition_fee_receipt ? (
        <a
          href={applicant.tuition_fee_receipt}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View Document
        </a>
      ) : (
        "No data uploaded"
      ),
    ],
    [
      "Non-Tuition Fee Receipt",
      applicant.non_tuition_fee_receipt ? (
        <a
          href={applicant.non_tuition_fee_receipt}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View Document
        </a>
      ) : (
        "No data uploaded"
      ),
    ],
    [
      "Class 10 Marksheet",
      applicant.class_10_mark_sheet ? (
        <a
          href={applicant.class_10_mark_sheet}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View Document
        </a>
      ) : (
        "No data uploaded"
      ),
    ],
    [
      "Class 12 Marksheet",
      applicant.class_12_mark_sheet ? (
        <a
          href={applicant.class_12_mark_sheet}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View Document
        </a>
      ) : (
        "No data uploaded"
      ),
    ],
    [
      "Current Education Marksheet",
      applicant.current_education_mark_sheet ? (
        <a
          href={applicant.current_education_mark_sheet}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View Document
        </a>
      ) : (
        "No data uploaded"
      ),
    ],
  ].map(([label, value]) => (
                    <tr key={label} className="border-b">
                      <th className="text-left py-2 px-4 font-medium w-1/3">
                        {label}
                      </th>
                      <td className="py-2 px-4 w-2/3">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 flex items-center justify-between">
                <div className="relative">
                  <select
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg focus:outline-none cursor-pointer"
                    value={
                      selectedStatus[applicant.applicant_id] || applicant.status
                    }
                    onChange={(e) =>
                      handleStatusChange(applicant.applicant_id, e.target.value)
                    }
                  >
                    {[
                      "Accepted",
                      "Rejected",
                      "Under Review",
                      "Documents Verified",
                      "Status",
                    ].map((status) => (
                      <option
                        key={status}
                        value={status}
                        className="bg-gray-200 text-black"
                      >
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedStatus[applicant.applicant_id] === "Accepted"
                      ? "bg-green-500 text-white"
                      : selectedStatus[applicant.applicant_id] === "Rejected"
                      ? "bg-red-500 text-white"
                      : selectedStatus[applicant.applicant_id] ===
                        "Under Review"
                      ? "bg-yellow-300"
                      : selectedStatus[applicant.applicant_id] ===
                        "Documents Verified"
                      ? "bg-orange-400"
                      : "bg-gray-300"
                  }`}
                >
                  {selectedStatus[applicant.applicant_id] || applicant.status}
                </span>
                <button
                  onClick={() => handleSaveStatus(applicant.applicant_id)}
                  className="bg-green-600 text-white py-2 px-4 rounded-lg focus:outline-none"
                >
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ApplicantData;
