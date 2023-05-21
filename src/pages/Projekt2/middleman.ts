import { MiddlemanIssueInputData, MiddlemanIssueOutputData } from './types';

export default function calculateMiddlemanIssue(
  input: MiddlemanIssueInputData,
): MiddlemanIssueOutputData {
  const { suppliers, customers } = input;

  let numSuppliers = suppliers.length;
  let numCustomers = customers.length;

  // Calculate total supply and demand
  let totalSupply = 0;
  let totalDemand = 0;

  for (let i = 0; i < numSuppliers; i += 1) {
    totalSupply += suppliers[i].supply;
  }

  for (let i = 0; i < numCustomers; i += 1) {
    totalDemand += customers[i].demand;
  }

  // Adjust supply and demand to be equal
  if (totalSupply > totalDemand) {
    // Add a dummy customer with zero demand
    customers.push({ demand: totalSupply - totalDemand, sellingPrice: 0 });
    numCustomers += 1;
  } else if (totalDemand > totalSupply) {
    // Add a dummy supplier with zero supply
    suppliers.push({
      supply: totalDemand - totalSupply,
      purchasePrice: 0,
      transportCosts: new Array(numCustomers).fill(0),
    });
    numSuppliers += 1;
  }

  // Initialize arrays to store intermediate results
  const individualProfits: number[][] = [];
  const optimalTransport: number[][] = [];

  // Calculate individual profits and optimal transport
  let totalCost = 0;
  let income = 0;

  for (let i = 0; i < numSuppliers; i += 1) {
    const supplier = suppliers[i];
    const { transportCosts } = supplier;
    const { supply } = supplier;
    const { purchasePrice } = supplier;

    const supplierProfits: number[] = [];
    const supplierTransport: number[] = [];

    for (let j = 0; j < numCustomers; j += 1) {
      const customer = customers[j];
      const { demand } = customer;
      const { sellingPrice } = customer;

      const transportCost = transportCosts[j];
      const profit = (sellingPrice - purchasePrice) * Math.min(supply, demand);
      const transportQuantity = Math.min(supply, demand);

      supplierProfits.push(profit);
      supplierTransport.push(transportQuantity);
      totalCost += transportCost * transportQuantity;
      income += sellingPrice * transportQuantity;
    }

    individualProfits.push(supplierProfits);
    optimalTransport.push(supplierTransport);
  }

  // Calculate profit
  const profit = income - totalCost;

  return {
    individualProfits,
    optimalTransport,
    totalCost,
    income,
    profit,
  };
}
