const pool = require("../config/db");

const handelprofiledata = async (req, res) => {
  const formData = req.body;
  //console.log(formData);

  try {
    // await pool.query('BEGIN');
    let stateId;
    const stateQuery = "SELECT * FROM osp.states WHERE state_name = $1";
    const state = formData.state;
    const stateResult = await pool.query(stateQuery, [state]);
    // console.log('first' , stateResult.rows);

    if (stateResult.rows.length > 0) {
      stateId = stateResult.rows[0].state_id;
    } else {
      const stateInsertQuery =
        "INSERT INTO osp.states (state_name) VALUES ($1) RETURNING state_id";
      const stateInsertResult = await pool.query(stateInsertQuery, [state]);
      //console.log('second' , stateInsertResult.rows);
      stateId = stateInsertResult.rows[0].state_id;
    }

    // console.log(stateId , typeof(stateId));

    let districtId;
    const distric = formData.block;
    // console.log(distric);
    const districtQuery =
      "SELECT district_id FROM osp.districts WHERE district_name = $1 AND state_id = $2";
    const districtResult = await pool.query(districtQuery, [distric, stateId]);
    //console.log(districtResult.rows);

    if (districtResult.rows.length > 0) {
      districtId = districtResult.rows[0].district_id;
    } else {
      const districtInsertQuery =
        "INSERT INTO osp.districts (district_name, state_id) VALUES ($1, $2) RETURNING district_id";
      const districtInsertResult = await pool.query(districtInsertQuery, [
        distric,
        stateId,
      ]);
      //console.log(districtInsertResult.rows);
      districtId = districtInsertResult.rows[0].district_id;
    }

    // Step 3: Insert or update address details
    let addressId;
    const address = formData.village;
    const pin = formData.pin;
    const addressQuery =
      "SELECT address_id FROM osp.addresses WHERE street_address = $1 AND pin_code = $2 AND district_id = $3";
    const addressResult = await pool.query(addressQuery, [
      address,
      pin,
      districtId,
    ]);

    if (addressResult.rows.length > 0) {
      addressId = addressResult.rows[0].address_id;
    } else {
      const addressInsertQuery =
        "INSERT INTO osp.addresses (street_address, pin_code, district_id) VALUES ($1, $2, $3) RETURNING address_id";
      const addressInsertResult = await pool.query(addressInsertQuery, [
        address,
        pin,
        districtId,
      ]);
      addressId = addressInsertResult.rows[0].address_id;
    }

    //console.log(addressId);

    let ifscCode;
    const ifsc = formData.ifscCode;
    const bank = formData.bankName;
    const branch = formData.bankBranch;

    const ifscQuery =
      "SELECT ifsc_code FROM osp.IFSC_Details WHERE ifsc_code = $1";
    const ifscResult = await pool.query(ifscQuery, [ifsc]);

    if (ifscResult.rows.length > 0) {
      ifscCode = ifscResult.rows[0].ifsc_code;
    } else {
      const ifscInsertQuery =
        "INSERT INTO osp.IFSC_Details (ifsc_code, bank_name, branch_name) VALUES ($1, $2, $3) RETURNING ifsc_code";
      const ifscInsertResult = await pool.query(ifscInsertQuery, [
        ifsc,
        bank,
        branch,
      ]);
      ifscCode = ifscInsertResult.rows[0].ifsc_code;
    }

    //console.log(ifscCode);

    // Step 2: Insert or get bank account number details
    let bankAccountNo;
    const bank_account_no = formData.bankAccount;
    const bankQuery =
      "SELECT bank_account_no FROM osp.Bank_Details WHERE bank_account_no = $1";
    const bankResult = await pool.query(bankQuery, [bank_account_no]);

    if (bankResult.rows.length > 0) {
      bankAccountNo = bankResult.rows[0].bank_account_no;
    } else {
      const bankInsertQuery =
        "INSERT INTO osp.Bank_Details (bank_account_no, ifsc_code) VALUES ($1, $2) RETURNING bank_account_no";
      const bankInsertResult = await pool.query(bankInsertQuery, [
        bank_account_no,
        ifscCode,
      ]);
      bankAccountNo = bankInsertResult.rows[0].bank_account_no;
    }

    //console.log(bank_account_no);

    let departmentName;
    const courselevel = formData.courseLevel;
    const coursename = formData.courseName;
    const departmentQuery =
      "SELECT department_name FROM osp.Departments_with_Programs WHERE department_name = $1 AND program_name = $2";
    const departmentResult = await pool.query(departmentQuery, [
      coursename,
      courselevel,
    ]);

    if (departmentResult.rows.length > 0) {
      departmentName = departmentResult.rows[0].department_name;
    } else {
      const departmentInsertQuery =
        "INSERT INTO osp.Departments_with_Programs (department_name, program_name) VALUES ($1, $2) RETURNING department_name";
      const departmentInsertResult = await pool.query(departmentInsertQuery, [
        coursename,
        courselevel,
      ]);
      departmentName = departmentInsertResult.rows[0].department_name;
    }

    // Step 2: Insert or get education details
    let collegeId;
    //const college_id = formData.college_id;
    const t_fees = formData.tuitionFees;
    const n_fees = formData.nonTuitionFees;
    const educationQuery =
      "SELECT college_id FROM osp.Education_Details WHERE department_name = $1 AND tuition_fees = $2 AND non_tuition_fees = $3";
    const educationResult = await pool.query(educationQuery, [
      departmentName,
      t_fees,
      n_fees,
    ]);

    if (educationResult.rows.length > 0) {
      collegeId = educationResult.rows[0].college_id;
    } else {
      const educationInsertQuery =
        "INSERT INTO osp.Education_Details (department_name, tuition_fees, non_tuition_fees) VALUES ($1, $2, $3) RETURNING college_id";
      const educationInsertResult = await pool.query(educationInsertQuery, [
        departmentName,
        t_fees,
        n_fees,
      ]);
      collegeId = educationInsertResult.rows[0].college_id;
    }

    //console.log("clg", collegeId);

    // const insertUserQuery = `
    //     INSERT INTO osp.users (email, username, password, role)
    //     VALUES ($1, $2, $3, $4)
    //     ON CONFLICT (email)
    //     DO NOTHING;
    // `;

     const email = formData.email; 
     //console.log('f' , email);
    // const username = "placeholder_username"; // Placeholder username
    // const password = "placeholder_password"; // Placeholder password (you can hash this later)
    // const role = "user"; // Placeholder role (you can modify this as needed)

    // const userresult = await pool.query(insertUserQuery, [
    //   email,
    //   username,
    //   password,
    //   role,
    // ]);

    //console.log(userresult.rows);

    const insertOrUpdateApplicantQuery = `
                INSERT INTO osp.applicants (
                    first_name, middle_name, last_name, dob, gender, category,email,
                    mobile_number, parent_name, occupation, income, parent_mobile, current_semester,
                    year_of_admission, current_cgpa_obtained , current_cgpa_total , address_id, bank_account_no, college_id
                )
                VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15 , $16 , $17 , $18 , $19
                )
        ON CONFLICT (email)
        DO UPDATE SET
            first_name = EXCLUDED.first_name,
            middle_name = EXCLUDED.middle_name,
            last_name = EXCLUDED.last_name,
            dob = EXCLUDED.dob,
            gender = EXCLUDED.gender,
            category = EXCLUDED.category,
            mobile_number = EXCLUDED.mobile_number,
            parent_name = EXCLUDED.parent_name,
            occupation = EXCLUDED.occupation,
            income = EXCLUDED.income,
            parent_mobile = EXCLUDED.parent_mobile,
            current_semester = EXCLUDED.current_semester,
            year_of_admission = EXCLUDED.year_of_admission,
            current_cgpa_obtained = EXCLUDED.current_cgpa_obtained,
            current_cgpa_total = EXCLUDED.current_cgpa_total,
            address_id = EXCLUDED.address_id,
            bank_account_no = EXCLUDED.bank_account_no,
            college_id = EXCLUDED.college_id
        RETURNING applicant_id;
    `;

    const firstname = formData.firstname;
    //console.log(firstname , typeof(firstname));
    const middlename = formData.middlename;
    const lastname = formData.lastname;
    const dob = formData.dob;
    //console.log(dob , typeof(dob));
    const gender = formData.gender;
    //console.log(gender , typeof(gender));
    const category = formData.category;
    //console.log(category , typeof(category));
    const mobileNumber = formData.mobileNumber;
    // console.log(mobileNumber , typeof(mobileNumber));
    const parentName = formData.parentName;
    //console.log(parentName , typeof(parentName));
    const occupation = formData.occupation;
    // console.log(occupation , typeof(occupation));
    const parentMobile = formData.parentMobile;
    //console.log(parentMobile , typeof(parentMobile));
    const currentSemester = formData.currentSemester;
    //console.log(currentSemester , typeof(currentSemester));
    const currentEducationBatch = formData.currentEducationBatch;
    //  console.log(currentEducationBatch , typeof(currentEducationBatch));
    const incomelimit = formData.incomelimit;

    const current_cgpa_obtained = formData.currentCgpaObtained;
    const current_cgpa_total = formData.currentCgpaTotal;

    (async () => {
      try {
        const result = await pool.query(insertOrUpdateApplicantQuery, [
          firstname,
          middlename,
          lastname,
          dob,
          gender,
          category,
          email,
          mobileNumber,
          parentName,
          occupation,
          incomelimit,
          parentMobile,
          currentSemester,
          currentEducationBatch,
          current_cgpa_obtained,
          current_cgpa_total,
          addressId,
          bankAccountNo,
          collegeId,
        ]);
        const applicantId = result.rows[0].applicant_id;
        //console.log('added' , applicantId)

        const insertOrUpdateClass10Query = `
            INSERT INTO osp.class10_details (
    applicant_id, institute_name, passing_date, marks_obtained, total_marks
                ) 
                VALUES (
                    $1, $2, $3, $4, $5
                ) 
                ON CONFLICT (applicant_id) 
                DO UPDATE SET 
                    institute_name = EXCLUDED.institute_name,
                    passing_date = EXCLUDED.passing_date,
                    marks_obtained = EXCLUDED.marks_obtained,
                    total_marks = EXCLUDED.total_marks
                RETURNING class10_id;

        `;

        //console.log()

        const class10Institute = formData.class10Institute;
        const class10PassingDate = formData.class10PassingDate;
        const class10MarksObtained = formData.class10MarksObtained;
        const class10TotalMarks = formData.class10TotalMarks;
      

        const result10 = await pool.query(insertOrUpdateClass10Query, [
          applicantId,
          class10Institute,
          class10PassingDate,
          class10MarksObtained,
          class10TotalMarks,
        ]);

          //console.log('result10' , result10.rows[0]);

        const insertOrUpdateClass12Query = `
        INSERT INTO osp.class12_details (
    applicant_id, institute_name, passing_date, marks_obtained, total_marks
            ) 
            VALUES (
                $1, $2, $3, $4, $5
            ) 
            ON CONFLICT (applicant_id) 
            DO UPDATE SET 
                institute_name = EXCLUDED.institute_name,
                passing_date = EXCLUDED.passing_date,
                marks_obtained = EXCLUDED.marks_obtained,
                total_marks = EXCLUDED.total_marks
            RETURNING class12_id;


    `;

        const class12Institute = formData.class12Institute;
        const class12PassingDate = formData.class12PassingDate;
        const class12MarksObtained = formData.class12MarksObtained;
        const class12TotalMarks = formData.class12TotalMarks;
        // const [year1, month1] = class12PassingDate.split('-');
        // const formattedDate1 = `${year1}-${month1.padStart(2, '0')}-01`; // Format to 'YYYY-MM-DD'

        const result12 = await pool.query(insertOrUpdateClass12Query, [
          applicantId, // The applicant ID obtained from the first query
          class12Institute,
          class12PassingDate, // The formatted date in 'YYYY-MM-DD'
          class12MarksObtained,
          class12TotalMarks,
        ]);

        console.log("added to DB");

        return res.status(200).json({
          message: "Profile saved successfully!",
          success: true,
        });
      } catch (error) {
        console.error("Error inserting applicant:", error);
        return;
      }
    })();

    if (!applicantId) {
      console.log("not alvaiable");
    } else {
      console.log(applicantId);
    }
  } catch (error) {}
};

module.exports = { handelprofiledata };
