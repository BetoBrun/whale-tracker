export interface KnownWhale {
  address: string;
  label: string;
  firstSeen: string;
  type: 'fund' | 'trader' | 'validator' | 'unknown';
  notes?: string;
}

export const KNOWN_WHALES: KnownWhale[] = [
  {
    address: "0x1234567890abcdef1234567890abcdef12345678",
    label: "Hyperliquid Genesis",
    firstSeen: "2024-01-01",
    type: "fund",
    notes: "Early depositior, likely institutional"
  },
  {
    address: "0xabcdef1234567890abcdef1234567890abcdef12",
    label: "Wintermute Trading",
    firstSeen: "2024-02-15",
    type: "fund",
    notes: "Major market maker"
  },
  {
    address: "0x9876543210fedcba9876543210fedcba98765432",
    label: "Dialectic",
    firstSeen: "2024-03-01",
    type: "trader",
    notes: "Prominent crypto trader"
  },
  {
    address: "0xfedcba9876543210fedcba9876543210fedcba98",
    label: "Apollo Capital",
    firstSeen: "2024-04-10",
    type: "fund",
    notes: "Systematic trader"
  },
  {
    address: "0x5678901234abcdef5678901234abcdef56789012",
    label: "Validateur DAO",
    firstSeen: "2024-05-20",
    type: "validator",
    notes: "Validator collective"
  }
];

export function getWhaleLabel(address: string): string | undefined {
  const whale = KNOWN_WHALES.find(w => w.address.toLowerCase() === address.toLowerCase());
  return whale?.label;
}

export function isKnownWhale(address: string): boolean {
  return KNOWN_WHALES.some(w => w.address.toLowerCase() === address.toLowerCase());
}