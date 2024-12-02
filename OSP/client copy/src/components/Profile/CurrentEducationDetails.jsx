import FileUpload from "./FileUpload";

const CurrentEducationDetails = ({
    formData,
    handleInputChange,
    pdfFiles,
    handlePdfUpload,
    clearPdfFile,
    cloudinaryUrls,
    viewFile,
  }) => {
    // Function to calculate percentage based on CGPA
    const calculateCgpaPercentage = (cgpaObtained, cgpaTotal) => {
      if (cgpaObtained && cgpaTotal && cgpaTotal > 0) {
        return (
          (parseFloat(cgpaObtained) / parseFloat(cgpaTotal)) * 100
        ).toFixed(2);
      }
      return ""; // Return empty if no valid data
    };
  
    // Array for batch options
    const batchOptions = [2020, 2021, 2022, 2023, 2024, 2025, 2026];
  
    // Array for semester options
    const semesterOptions = Array.from({ length: 8 }, (_, i) => i + 1);
  
    return (
      <>
        <div className="max-w-4xl mx-auto p-6 bg-blue-950 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-100 mb-6">
            Current Education Details
          </h3>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
            <div className="mb-6">
              <label
                htmlFor="currentEducationBatch"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Current Education Batch <span className="text-red-500">*</span>
              </label>
              <select
                name="currentEducationBatch"
                value={formData.currentEducationBatch || ""}
                onChange={handleInputChange}
                required
                className="block w-full bg-blue-500/50 text-white border border-gray-600 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
              >
                <option value="">Select Batch</option>
                {batchOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
  
            <div className="mb-6">
              <label
                htmlFor="currentSemester"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Current Semester <span className="text-red-500">*</span>
              </label>
              <select
                name="currentSemester"
                value={formData.currentSemester || ""}
                onChange={handleInputChange}
                required
                className="block w-full bg-blue-500/50 text-white border border-gray-600 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
              >
                <option value="">Select Semester</option>
                {semesterOptions.map((sem) => (
                  <option key={sem} value={sem}>
                    {sem}
                  </option>
                ))}
              </select>
            </div>
  
            <div className="mb-6">
              <label
                htmlFor="currentCgpaObtained"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                CGPA Obtained <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="currentCgpaObtained"
                value={formData.currentCgpaObtained || ""}
                onChange={handleInputChange}
                required
                className="block w-full bg-blue-500/50 text-white border border-gray-600 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                placeholder="Enter CGPA obtained"
              />
            </div>
  
            <div className="mb-6">
              <label
                htmlFor="currentCgpaTotal"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Total CGPA <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="currentCgpaTotal"
                value={formData.currentCgpaTotal || ""}
                onChange={handleInputChange}
                required
                className="block w-full bg-blue-500/50 text-white border border-gray-600 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                placeholder="Enter total CGPA"
              />
            </div>
  
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Percentage
              </label>
              <input
                type="text"
                value={calculateCgpaPercentage(
                  formData.currentCgpaObtained,
                  formData.currentCgpaTotal
                )}
                readOnly
                className="block w-full bg-blue-950 text-gray-400 border border-gray-600 rounded-lg p-3 cursor-not-allowed"
              />
            </div>
  
  
            <div className="flex">
            <FileUpload
              label="Upload Current Education Mark Sheet (PDF)"
              accept="application/pdf"
              onChange={(e) => handlePdfUpload(e, "currentEducationMarkSheet")}
              file={pdfFiles.currentEducationMarkSheet}
              clearFile={() => clearPdfFile("currentEducationMarkSheet")}
              cURL={cloudinaryUrls.currentEducationMarkSheet}
              document_name={"currentEducationMarkSheet"}
              viewFile = {viewFile}
              
            />
  
  </div>
  
            
          </div>
        </div>
      </>
    );
  };

  export default CurrentEducationDetails;