import FileUpload from "./FileUpload";

const CommunicationAddress = ({
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
            label="Upload Aadharcard (PDF)"
            accept="application/pdf"
            onChange={(e) => handlePdfUpload(e, "aadharcard")}
            file={pdfFiles.aadharcard}
            clearFile={() => clearPdfFile("aadharcard")}
            className="text-white"
            cURL={cloudinaryUrls.aadharcard}
            document_name = {"aadharcard"}
            viewFile = {viewFile}
          />
        </div>
  
        <div>
          <FileUpload
            label="Upload Income Certificate (PDF)"
            accept="application/pdf"
            onChange={(e) => handlePdfUpload(e, "incomeCertificate")}
            file={pdfFiles.aadharcard}
            clearFile={() => clearPdfFile("incomeCertificate")}
            className="text-white"
            cURL={cloudinaryUrls.incomeCertificate}
            document_name = {"incomeCertificate"}
            viewFile = {viewFile}
          />
        </div>
  
      </div>
    </>
  );

  
export default CommunicationAddress;