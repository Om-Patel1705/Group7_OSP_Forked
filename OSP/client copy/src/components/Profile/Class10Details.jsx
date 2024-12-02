import FileUpload from "./FileUpload";

const Class10Details = ({
    formData,
    handleInputChange,
    pdfFiles,
    handlePdfUpload,
    clearPdfFile,
    cloudinaryUrls,
    viewFile,
  }) => {
    // Function to calculate percentage
    const calculatePercentage = (marksObtained, totalMarks) => {
      if (marksObtained && totalMarks && totalMarks > 0) {
        return (
          (parseFloat(marksObtained) / parseFloat(totalMarks)) *
          100
        ).toFixed(2);
      }
      return "";
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
  
            <div className="flex">
            <FileUpload
              label="Upload Class 10 Mark Sheet (PDF)"
              accept="application/pdf"
              onChange={(e) => handlePdfUpload(e, "class10MarkSheet")}
              file={pdfFiles.class10MarkSheet}
              clearFile={() => clearPdfFile("class10MarkSheet")}
              className="mb-6"
              cURL={cloudinaryUrls.class10MarkSheet}
              document_name = {"class10MarkSheet"}
              viewFile = {viewFile}
            />
            </div>
  
         
  
           
          </div>
        </div>
      </>
    );
  };

export default Class10Details;