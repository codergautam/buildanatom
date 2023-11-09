import * as pt from 'ptable';

const AtomDetails = ({ protons, neutrons, electrons }) => {
  const element = pt(protons);
  if(!element) {
    return <div>No atom found</div>;
  }
  const elementSymbol = element.symbol;
  const netCharge = protons - electrons;
  const massNumber = protons + neutrons;

  return (
    <div className="text-center p-4 rounded-lg shadow-md bg-gray-100 flex flex-col items-center space-y-2">
      <h1 className="text-3xl font-bold text-gray-800 w-48 text-right">{element.name || 'Unknown Element'}</h1>
      <p className="text-xl text-gray-700">Protons: <span className="font-semibold">{protons}</span></p>
      <p className="text-xl text-gray-700">Neutrons: <span className="font-semibold">{neutrons}</span></p>
      <p className="text-xl text-gray-700">Electrons: <span className="font-semibold">{electrons}</span></p>
      <p className="text-xl text-gray-700">Net Charge: <span className="font-semibold">{netCharge}</span></p>
      <p className="text-xl text-gray-700">Mass Number: <span className="font-semibold">{massNumber}</span></p>
      {/* Render the chemical symbol with mass number as a subscript */}
      <div className="rounded-lg shadow-md bg-gray-200 p-3 mt-4">
        <p className="font-bold text-gray-800 text-2xl">{elementSymbol}<sub>{massNumber}</sub></p>
      </div>
      {/* End chemical symbol rendering */}
    </div>
  );
};

export default AtomDetails;