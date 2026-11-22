const allowedInterests = new Set([
  'Study opportunities',
  'Institutional partnership',
  'Agent partnership',
  'Brand enquiry',
  'Other',
]);

const fieldRules = {
  name: { label: 'Name', max: 120 },
  email: { label: 'Email address', max: 254 },
  institution: { label: 'Institution or organization', max: 200 },
  message: { label: 'Message', max: 5000 },
};

function validateSubmission(req, res, next) {
  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
    return res.status(400).json({ error: 'The request body must be a JSON object.' });
  }

  const errors = {};
  const values = {};

  for (const [field, rule] of Object.entries(fieldRules)) {
    const value = req.body[field];
    if (typeof value !== 'string') {
      errors[field] = `${rule.label} is required.`;
      continue;
    }

    const trimmed = value.trim();
    if (!trimmed) {
      errors[field] = `${rule.label} is required.`;
    } else if (trimmed.length > rule.max) {
      errors[field] = `${rule.label} must be ${rule.max} characters or fewer.`;
    } else {
      values[field] = trimmed;
    }
  }

  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  } else if (values.email) {
    values.email = values.email.toLowerCase();
  }

  if (typeof req.body.interest !== 'string' || !allowedInterests.has(req.body.interest)) {
    errors.interest = 'Choose a valid area of interest.';
  } else {
    values.interest = req.body.interest;
  }

  if (Object.keys(errors).length) {
    return res.status(422).json({ error: 'Please correct the submitted fields.', fields: errors });
  }

  req.validatedSubmission = values;
  return next();
}

module.exports = { validateSubmission };
