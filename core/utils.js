export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return "Email cannot be empty.";
  if (!re.test(email)) return "Ooops! We need a valid email address.";

  return "";
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) return "Password cannot be empty.";

  return "";
};

export const nameValidator = name => {
  if (!name || name.length <= 0) return "Name cannot be empty.";

  return "";
};

export const mobileValidator = mobile => {
  if (!mobile || mobile.length > 12 ||mobile.length<10) return "Enter Valid Mobile Number.";

  return "";
};

export const COMMONPATH = "http://www.jyeshtatechworld.com/jyeshta/api/v1/";
export const IMAGEPATH = "http://www.jyeshtatechworld.com/jyeshta/";
export const BLOGIMAGEPATH = "http://www.jyeshtatechworld.com/jyeshta/public/";

//export const IMAGEPATH = "https://saravieventplanner.com/lakeoilmanagement/uploads/";


