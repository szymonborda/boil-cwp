export interface Supplier {
  supply: number;
  purchasePrice: number;
  transportCosts: number[]; // transportCosts[i] - transport costs to i-th customer
}

export interface Customer {
  demand: number;
  sellingPrice: number;
}

export interface MiddlemanIssueInputData {
  suppliers: Supplier[];
  customers: Customer[];
}

export interface MiddlemanIssueOutputData {
  individualProfits: number[][];
  optimalTransport: number[][];
  totalCost: number;
  income: number;
  profit: number;
}
