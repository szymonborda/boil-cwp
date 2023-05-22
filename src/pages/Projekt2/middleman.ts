import { MiddlemanIssueInputData, MiddlemanIssueOutputData } from './types';

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
  }

  // Initialize arrays to store intermediate results
  const individualProfits: number[][] = [];
  const optimalTransport: number[][] = [];

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
    }
  } else if (totalDemand > totalSupply) {
    // Add a dummy supplier with zero supply
    suppliers.push({ supply: totalDemand, purchasePrice: 0, transportCosts: new Array(numCustomers).fill(0) });
    numSuppliers += 1;
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

      totalCost += transportCost * transportQuantity;
      income += sellingPrice * transportQuantity;
    }
  }

  /*
  // Perform the Minimum Cell Cost Method
  let remainingSupply = totalSupply;
  let remainingDemand = totalDemand;

  while (remainingSupply > 0 && remainingDemand > 0) {
    let minCost = Infinity;
    let minSupplier = -1;
    let minCustomer = -1;

    // Find the minimum cost cell
    for (let i = 0; i < numSuppliers; i += 1) {
      for (let j = 0; j < numCustomers; j += 1) {
        if (optimalTransport[i][j] === 0 && individualProfits[i][j] / suppliers[i].supply < minCost) {
          minCost = individualProfits[i][j] / suppliers[i].supply;
          minSupplier = i;
          minCustomer = j;
        }
      }
    }

    const { supply } = suppliers[minSupplier];
    const { demand } = customers[minCustomer];
    const transportQuantity = Math.min(supply, demand);

    optimalTransport[minSupplier][minCustomer] = transportQuantity;
    remainingSupply -= transportQuantity;
    remainingDemand -= transportQuantity;
  }

  // Calculate total cost, income, and profit
  let totalCost = 0;
  let income = 0;

  for (let i = 0; i < numSuppliers; i += 1) {
    const supplier = suppliers[i];
    const { transportCosts } = supplier;

    for (let j = 0; j < numCustomers; j += 1) {
      const transportQuantity = optimalTransport[i][j];
      const transportCost = transportCosts[j];
      const { sellingPrice } = customers[j];

      totalCost += transportCost * transportQuantity;
      income += sellingPrice * transportQuantity;
    }
  }

  // Calculate profit
  const profit = income - totalCost;
  */
  // const totalCost = 0;
  // const income = 0;
  const profit = income - totalCost;
  return {
    individualProfits,
    optimalTransport,
    totalCost,
    income,
    profit,
  };
}