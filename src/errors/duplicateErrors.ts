export const handleDuplicateError = (error: any) => {
  const match = error.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  const errors = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];
  return errors;
};
