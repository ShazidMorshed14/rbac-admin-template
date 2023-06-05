export const convertToVehicleMenu = (list) => {
  const convertedData = list.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  return convertedData;
};

export const convertToPackageMenu = (list) => {
  const convertedData = list.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  return convertedData;
};
