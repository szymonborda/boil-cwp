import { useState } from 'react';
import styles from './styles.module.scss';
import { MiddlemanIssueInputData, MiddlemanIssueOutputData } from './types';
import calculateMiddlemanIssue from './middleman';

function Projekt2() {
  const [isCalculated, setIsCalculated] = useState(false);
  const [inputData, setInputData] = useState<MiddlemanIssueInputData>({
    suppliers: [
      {
        supply: 45,
        purchasePrice: 6,
        transportCosts: [7, 4],
      },
      {
        supply: 25,
        purchasePrice: 7,
        transportCosts: [3, 5],
      },
    ],
    customers: [
      {
        demand: 30,
        sellingPrice: 12,
      },
      {
        demand: 30,
        sellingPrice: 13,
      },
    ],
  });
  const [outputData, setOutputData] = useState<MiddlemanIssueOutputData>({
    individualProfits: [],
    optimalTransport: [],
    totalCost: 0,
    income: 0,
    profit: 0,
  });
  const addCustomer = () => {
    const newData = structuredClone(inputData);
    newData.customers.push({
      demand: 0,
      sellingPrice: 0,
    });
    newData.suppliers.forEach((supplier) => {
      supplier.transportCosts.push(0);
    });
    setInputData(newData);
  };
  const removeCustomer = (index: number) => {
    const newData = structuredClone(inputData);
    newData.customers.splice(index, 1);
    newData.suppliers.forEach((supplier) => {
      supplier.transportCosts.splice(index, 1);
    });
    setInputData(newData);
  };
  const addSupplier = () => {
    const newData = structuredClone(inputData);
    newData.suppliers.push({
      supply: 0,
      purchasePrice: 0,
      transportCosts: Array(newData.customers.length).fill(0),
    });
    setInputData(newData);
  };
  const removeSupplier = (index: number) => {
    const newData = structuredClone(inputData);
    newData.suppliers.splice(index, 1);
    setInputData(newData);
  };
  const calculate = () => {
    const output = calculateMiddlemanIssue(structuredClone(inputData));
    console.log(output);
    setOutputData(output);
    setIsCalculated(true);
  };
  return (
    <div className="projekt2">
      <div className="header">
        <h1>Zagadnienie Pośrednika</h1>
        <h4>Projekt 2</h4>
      </div>
      <div className="panelContainer">
        <div className="panel">
          <table>
            <tbody>
              <tr>
                <td>
                  <span>Demand</span>
                </td>
                {
              inputData.customers.map((customer, index) => (
                <td key={`Customer ${index + 1}`}>
                  <span>{`Customer ${index + 1}`}</span>
                  <button type="button" onClick={() => removeCustomer(index)}>x</button>
                  <div>
                    <input
                      type="number"
                      value={customer.demand}
                      onChange={(event) => {
                        const newCustomers = [...inputData.customers];
                        newCustomers[index].demand = Number(event.target.value);
                        setInputData({ ...inputData, customers: newCustomers });
                      }}
                    />
                  </div>
                </td>
              ))
            }
                <td>
                  <button type="button" onClick={addCustomer}>Add customer</button>
                  <button type="button" onClick={addSupplier}>Add supplier</button>
                </td>
              </tr>
              {
            inputData.suppliers.map((supplier, index) => (
              <tr key={`Supplier ${index + 1}`} className={styles.supplier}>
                <td>
                  <span>{`Supplier ${index + 1}`}</span>
                  <button type="button" onClick={() => removeSupplier(index)}>x</button>
                  <span>Supply</span>
                  <input
                    type="number"
                    value={supplier.supply}
                    onChange={(event) => {
                      const newSuppliers = [...inputData.suppliers];
                      newSuppliers[index].supply = Number(event.target.value);
                      setInputData({ ...inputData, suppliers: newSuppliers });
                    }}
                  />
                </td>
                {
                  supplier.transportCosts.map((transportCost, transportCostIndex) => (
                    <td key={`Transport cost ${transportCostIndex + 1}`}>
                      <input
                        className={styles['transport-price-input']}
                        type="number"
                        value={transportCost}
                        onChange={(event) => {
                          const newSuppliers = [...inputData.suppliers];
                          newSuppliers[index]
                            .transportCosts[transportCostIndex] = Number(event.target.value);
                          setInputData({ ...inputData, suppliers: newSuppliers });
                        }}
                      />
                    </td>
                  ))
                }
                <td>
                  <span>Purchase price</span>
                  <input
                    type="number"
                    value={supplier.purchasePrice}
                    onChange={(event) => {
                      const newSuppliers = [...inputData.suppliers];
                      newSuppliers[index].purchasePrice = Number(event.target.value);
                      setInputData({ ...inputData, suppliers: newSuppliers });
                    }}
                  />
                </td>
              </tr>
            ))
          }
              <tr>
                <td>
                  <span>Selling price</span>
                </td>
                {
              inputData.customers.map((customer, index) => (
                <td key={`Customer bottom ${index + 1}`}>
                  <input
                    type="number"
                    value={customer.sellingPrice}
                    onChange={(event) => {
                      const newCustomers = [...inputData.customers];
                      newCustomers[index].sellingPrice = Number(event.target.value);
                      setInputData({ ...inputData, customers: newCustomers });
                    }}
                  />
                </td>
              ))
            }
                <td />
              </tr>
            </tbody>
          </table>
          <div>
            <button
              type="button"
              onClick={calculate}
            >
              Calculate
            </button>

          </div>
        </div>
        {isCalculated
          ? (
            <div className="panel">
              <table>
                <tbody>
                  <tr>
                    <td>Invidual profits</td>
                    <td />
                  </tr>

                  {outputData.individualProfits.map((profitLine) => (
                    <tr>
                      {profitLine.map((profit) => (
                        <td>
                          <input type="number" value={profit} disabled />
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td>Optimal transport</td>
                    <td />
                  </tr>
                  {outputData.optimalTransport.map((optiLine) => (
                    <tr>
                      {optiLine.map((opti) => (
                        <td>
                          <input type="number" value={opti} disabled />
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td>Total cost</td>
                    <td>{outputData.totalCost}</td>
                  </tr>
                  <tr>
                    <td>Income</td>
                    <td>{outputData.income}</td>
                  </tr>
                  <tr>
                    <td>Profit</td>
                    <td>{outputData.profit}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
          : null}
      </div>

    </div>
  );
}

export default Projekt2;
