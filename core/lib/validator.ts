export const validate_email = (email: string) => {
  if (!email) return true;

  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validate_instagram = (instagram: string) => {
  if (!instagram) return true;

  // validate instagram link with or without www, with or without https
  const re = /https:\/\/(www.)?instagram.com\/[a-zA-Z0-9_.]+/;
  return re.test(instagram);
};

export const validate_facebook = (facebook: string) => {
  if (!facebook) return true;

  const re = /https:\/\/(www.)?facebook.com\/[a-zA-Z0-9_.]+/;
  return re.test(facebook);
};

export const validate_twitter = (twitter: string) => {
  if (!twitter) return true;

  const re = /https:\/\/twitter.com\/[a-zA-Z0-9_.]+/;
  return re.test(twitter);
};

export const validate_line = (line: string) => {
  if (!line) return true;

  const re = /https:\/\/line.me\/[a-zA-Z0-9_.]+/;
  return re.test(line);
};

export const validate_phone = (phone: string) => {
  if (!phone) return true;
  // validate indonesia phone number
  const re = /0[0-9]{9}/;
  return re.test(phone);
};