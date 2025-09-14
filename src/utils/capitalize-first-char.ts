function capitalizeFirstChar(input: string) {
  const length = input.length;
  if (length > 1) {
    input = input[0].toUpperCase() + input.substring(1);
    return input;
  } else if (length === 1) {
    return input[0].toUpperCase();
  }
  return "";
}

export { capitalizeFirstChar };
