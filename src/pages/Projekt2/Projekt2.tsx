import { useState } from 'react';
import styles from './styles.module.scss';

interface Supplier {
  supply: number;
  purchasePrice: number;
  transportCosts: number[]; // transportCosts[i] - transport costs to i-th customer
}

interface Customer {
  demand: number;
  sellingPrice: number;
}

interface MiddlemanIssueInputData {
  suppliers: Supplier[];
  customers: Customer[];
}

function Projekt2() {
  const [inputData, setInputData] = useState<MiddlemanIssueInputData>({
    suppliers: [
      {
        supply: 0,
        purchasePrice: 0,
        transportCosts: [0, 0],
      },
      {
        supply: 0,
        purchasePrice: 0,
        transportCosts: [0, 0],
      },
    ],
    customers: [
      {
        demand: 0,
        sellingPrice: 0,
      },
      {
        demand: 0,
        sellingPrice: 0,
      },
    ],
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
  return (
    <div className="projekt2">
      <div className="header">
        <h1>Zagadnienie Pośrednika</h1>
        <h4>Projekt 2</h4>
      </div>
      <div className="panelContainer">
        <table>
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
                    <td>
                      <input
                        className={styles['transport-price-input']}
                        key={`Transport cost ${transportCostIndex + 1}`}
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
        </table>
      </div>
    </div>
  );
}

export default Projekt2;
