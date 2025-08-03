// Moment.co API service functions
const MOMENT_API_BASE_URL = 'https://api.momentco.io';

interface MomentApiConfig {
  apiKey: string;
  isTestMode?: boolean;
}

class MomentApiService {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: MomentApiConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = MOMENT_API_BASE_URL;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Moment API Error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  // Billing API methods
  async getCustomers() {
    return this.makeRequest('/billing/customers');
  }

  async createCustomer(customerData: any) {
    return this.makeRequest('/billing/customers', {
      method: 'POST',
      body: JSON.stringify(customerData),
    });
  }

  async getCustomer(customerId: string) {
    return this.makeRequest(`/billing/customers/${customerId}`);
  }

  async createPayment(paymentData: any) {
    return this.makeRequest('/billing/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  async getPayments(customerId?: string) {
    const endpoint = customerId 
      ? `/billing/payments?customer_id=${customerId}`
      : '/billing/payments';
    return this.makeRequest(endpoint);
  }

  async getPayment(paymentId: string) {
    return this.makeRequest(`/billing/payments/${paymentId}`);
  }
}

// Export singleton instance
export const momentApi = new MomentApiService({
  apiKey: import.meta.env.VITE_MOMENT_API_KEY || 'pk_test_default',
  isTestMode: import.meta.env.VITE_MOMENT_TEST_MODE === 'true'
});

export default MomentApiService;