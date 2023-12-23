const getStatusTextColor = (status) => {
  let textColor = 'white';

  switch (data.toUpperCase().trim()) {
    case 'GET':
      textColor = 'green';
      break;
    case 'POST':
      textColor = 'yellow';
      break;
    case 'PUT':
      textColor = 'blue';
      break;
    case 'DELETE':
      textColor = 'red';
      break;
  }

  return textColor;
};
