export const validationRules = {
  // GENERIC / COMMON RULES
  required: (msg = "This field is required") => [
    { required: true, message: msg },
  ],

  text: (msg = "Please enter valid text") => [
    { required: true, message: msg },
    { pattern: /^[A-Za-z ]+$/, message: "Only alphabets are allowed" },
  ],

  number: (msg = "Please enter a valid number") => [
    { required: true, message: msg },
    { pattern: /^[0-9]+$/, message: "Only numbers are allowed" },
  ],

//PERSONAL DETAILS
  fullName: [
    { required: true, message: "Please enter full name" },
    { pattern: /^[A-Za-z ]{3,}$/, message: "Name must contain only letters (min 3 characters)" },
  ],

  gender: [{ required: true, message: "Please select gender" }],

  dob: [{ required: true, message: "Please select date of birth" }],

  email: [
    { required: true, message: "Please enter email address" },
    { type: "email", message: "Please enter a valid email address" },
  ],

  phone: [
    { required: true, message: "Please enter phone number" },
    { pattern: /^[0-9]{10}$/, message: "Phone number must be 10 digits" },
  ],

  alternateNumber: [
    { pattern: /^[0-9]{10}$/, message: "Alternate number must be 10 digits" },
  ],

  aadhar: [
    { required: true, message: "Please enter Aadhar number" },
    { pattern: /^[0-9]{12}$/, message: "Aadhar must be exactly 12 digits" },
  ],

  occupation: [
    { pattern: /^[A-Za-z ]{2,}$/, message: "Occupation must contain only letters" },
  ],

  address: [{ required: true, message: "Please enter your permanent address" }],

// OWNERSHIP / PROPERTY DETAILS
  ownershipType: [
    { required: true, message: "Please select ownership type" },
  ],

  ownershipStatus: [
    { required: true, message: "Please select ownership status" },
  ],

  tenantStartDate: [
    { required: true, message: "Please select tenant start date" },
  ],

  tenantEndDate: [
    { required: true, message: "Please select tenant end date" },
  ],

  flatNumber: [
    { required: true, message: "Please enter flat number" },
    { pattern: /^[A-Za-z0-9\-]+$/, message: "Flat number can contain letters, numbers, and dashes only" },
  ],

  floor: [
    { required: true, message: "Please enter floor number" },
  ],

  parkingSlots: [
    { pattern: /^[0-9]+$/, message: "Parking slots must be a number" },
  ],

  vehicleDetails: [
    { pattern: /^[A-Za-z0-9 ,\-]{3,}$/, message: "Please enter valid vehicle details" },
  ],
//FAMILY DETAILS
  familyMemberName: [
    { required: true, message: "Please enter family member name" },
    { pattern: /^[A-Za-z ]{2,}$/, message: "Name must contain only letters" },
  ],

  familyRelation: [
    { required: true, message: "Please select relation" },
  ],

  familyGender: [
    { required: true, message: "Please select gender" },
  ],

  familyAge: [
    { pattern: /^[0-9]{1,3}$/, message: "Please enter a valid age" },
  ],

  familyMobile: [
    { pattern: /^[0-9]{10}$/, message: "Mobile number must be 10 digits" },
  ],

  familyAadhar: [
    { pattern: /^[0-9]{12}$/, message: "Aadhar must be exactly 12 digits" },
  ],
//EMERGENCY CONTACT
  emergencyName: [
    { required: true, message: "Please enter emergency contact name" },
    { pattern: /^[A-Za-z ]{3,}$/, message: "Name must contain only letters (min 3 characters)" }
  ],

  emergencyNumber: [
    { required: true, message: "Please enter emergency contact number" },
    { pattern: /^[0-9]{10}$/, message: "Emergency number must be 10 digits" },
  ],

  emergencyRelation: [
    { required: true, message: "Please select emergency relation" },
  ],
// FILE UPLOADS
  photoUpload: [
    { required: false, message: "Please upload a photo" },
  ],

  idProofUpload: [
    { required: false, message: "Please upload ID proof" },
  ],
};
