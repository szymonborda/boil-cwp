import { MiddlemanIssueInputData, MiddlemanIssueOutputData } from './types';

// eslint-disable-next-line max-len
export default function calculateMiddlemanIssue(input: MiddlemanIssueInputData): MiddlemanIssueOutputData {
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
  } let individualProfits: number[][] = []; let optimalTransport: number[][] = [];

  // Calculate individual profits and initialize optimal transport with zeros
  for (let i = 0; i < numSuppliers; i += 1) {
    const supplier = suppliers[i];
    const { transportCosts } = supplier;
    const { purchasePrice } = supplier;

    const supplierProfits: number[] = [];
    const supplierTransport: number[] = new Array(numCustomers).fill(0);

    for (let j = 0; j < numCustomers; j += 1) {
      const customer = customers[j];
      const { sellingPrice } = customer;

      const transportCost = transportCosts[j];
      const profit = sellingPrice - purchasePrice - transportCost;

      supplierProfits.push(profit);
    }

    individualProfits.push(supplierProfits);
    optimalTransport.push(supplierTransport);
  }

  // Adjust supply and demand to be equal
  if (totalSupply > totalDemand) {
    // Add a dummy customer with zero demand
    customers.push({ demand: totalSupply, sellingPrice: 0 });
    numCustomers += 1;
    for (let i = 0; i < numSuppliers; i += 1) {
      individualProfits[i].push(0);
      optimalTransport[i].push(0);
      suppliers[i].transportCosts.push(0);
    }
  } else if (totalDemand > totalSupply) {
    // Add a dummy supplier with zero supply
    // eslint-disable-next-line max-len
    suppliers.push({ supply: totalDemand, purchasePrice: 0, transportCosts: new Array(numCustomers).fill(0) });
    numSuppliers += 1;
    // eslint-disable-next-line max-len
    suppliers.push({ supply: totalDemand, purchasePrice: 0, transportCosts: new Array(numCustomers).fill(0) });
    const arr: number[] = [];
    for (let i = 0; i < numCustomers; i += 1) {
      arr.push(0);
    }
    individualProfits.push(arr);
    optimalTransport.push(arr);
  }

  // Perform the Minimum Cell Cost Method
  let remainingSupply = totalSupply;
  let remainingDemand = totalDemand;

  while (remainingSupply > 0 && remainingDemand > 0) {
    let maxProfit = -Infinity;
    let maxSupplier = -1;
    let maxCustomer = -1;

    // Find the maximum profit cell
    for (let i = 0; i < numSuppliers; i += 1) {
      for (let j = 0; j < numCustomers; j += 1) {
        if (optimalTransport[i][j] === 0 && individualProfits[i][j] > maxProfit) {
          maxProfit = individualProfits[i][j];
          maxSupplier = i;
          maxCustomer = j;
        }
      }
    }
    const { supply } = suppliers[maxSupplier];
    const { demand } = customers[maxCustomer];
    const transportQuantity = Math.min(supply, demand, remainingSupply, remainingDemand);

    optimalTransport[maxSupplier][maxCustomer] = transportQuantity;
    remainingSupply -= transportQuantity;
    remainingDemand -= transportQuantity;
    if (remainingDemand === 0 || remainingSupply === 0) {
      optimalTransport[maxSupplier][maxCustomer] = 0;
    }
  }

  // Calculate total cost, income, and profit
  let totalCost = 0;
  let income = 0;

  for (let i = 0; i < numSuppliers; i += 1) {
    const supplier = suppliers[i];
    const { transportCosts, purchasePrice } = supplier;

    for (let j = 0; j < numCustomers; j += 1) {
      const transportQuantity = optimalTransport[i][j];
      const transportCost = transportCosts[j];
      const { sellingPrice } = customers[j];
      totalCost += (transportCost + purchasePrice) * transportQuantity;
      income += sellingPrice * transportQuantity;
    }
  }
  // Delete dummy results
  individualProfits = individualProfits.map((subArr) => {
    if (subArr.length > 0) {
      subArr.pop();
    }
    return subArr;
  });
  optimalTransport = optimalTransport.map((subArr) => {
    if (subArr.length > 0) {
      subArr.pop();
    }
    return subArr;
  });

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
