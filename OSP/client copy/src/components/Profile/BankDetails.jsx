import FileUpload from "./FileUpload";

const BankDetails = ({
    formData,
    handleInputChange,
    pdfFiles,
    handlePdfUpload,
    clearPdfFile,
    cloudinaryUrls,
    viewFile,
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
  
  
  <div className="flex">
  <FileUpload
            label="Upload Bank Passbook (PDF)"
            accept="application/pdf"
            onChange={(e) => handlePdfUpload(e, "bankPassbook")}
            file={pdfFiles.bankPassbook}
            clearFile={() => clearPdfFile("bankPassbook")}
            cURL={cloudinaryUrls.bankPassbook}
            document_name = {"bankPassbook"}
            viewFile = {viewFile}
          />
  </div>
          
        </div>
      </div>
    </>
  );

  
export default BankDetails;