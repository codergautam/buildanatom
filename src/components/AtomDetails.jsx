const AtomDetails = ({ protons, neutrons, electrons }) => {
  const elementName = '...'; // Logic to determine element name
  const netCharge = protons - electrons;
  const massNumber = protons + neutrons;

  return (
    <div>
      <div>Element: {elementName}</div>
      <div>Net Charge: {netCharge}</div>
      <div>Mass Number: {massNumber}</div>
    </div>
  );
};

export default AtomDetails;
