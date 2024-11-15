const pool = require("../config/db");

const editScholarship = async (req, res) => {
  console.log("Reached editScholarship");

  console.log(req.params);
  const scholarship_id = req.params.scholarship_id;
  console.log(scholarship_id);

  // Destructuring the request body
  const {
    scholarship_name,
    amount,
    end_date,
    description,
    education_level,
    eligible_courses,
    min_percentage,
    annual_family_income,
    documents_required,
    benefits,
  } = req.body;

  // Input validation
  if (
    !scholarship_name ||
    !amount ||
    !end_date ||
    !description ||
    !education_level ||
    !eligible_courses ||
    !min_percentage ||
    !annual_family_income ||
    !documents_required ||
    !benefits
  ) {
    console.error("Please Input all the Fields");
    return res.status(400).json("Please Input all the Fields");
  }

  const eligiblecourses = JSON.stringify(eligible_courses);
  const documentsrequired = JSON.stringify(documents_required);
  try {
    // Update query for Scholarships table
    const updateQuery = `
    UPDATE osp.Scholarships
    SET 
      scholarship_name = $1,
      amount = $2,
      end_date = $3,
      description = $4,
      education_level = $5,
      eligible_courses = $6,
      min_percentage = $7,
      annual_family_income = $8,
      documents_required = $9,
      benefits = $10
    WHERE scholarship_id = ${scholarship_id}
  `;


    // Array of values for parameterized query
    const values = [
      scholarship_name,
      amount,
      end_date,
      description,
      education_level,
      eligiblecourses,
      min_percentage,
      annual_family_income,
      documentsrequired,
      benefits,
    ];


    // Execute the update query
    const result = await pool.query(updateQuery, values);

    if (result.rowCount === 0) {
      console.error("Scholarship not found");
      return res.status(404).json("Scholarship not found");
    }

    console.log(`Updated scholarship: ${scholarship_name}`);
    res.status(200).json({
      message: "Scholarship updated successfully",
      scholarship_id,
    });
  } catch (error) {
    console.error("Error updating scholarship:", error.message);
    res.status(500).json({
      errMsg: "Internal Server Error",
    });
  }
};

module.exports = { editScholarship };
