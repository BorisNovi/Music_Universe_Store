import { Customer } from './api-interfaces';
import { APIAcceesToken } from './api-access-token';
import { CTP_PROJECT_KEY, CTP_API_URL, STORE_KEY, LOCAL_KEY } from './api-env-constants';
import { IUserData } from './api-interfaces';

const API_ACCESS_TOKEN = new APIAcceesToken();

export class APIUserActions {
  public CTP_PROJECT_KEY: string;

  public CTP_API_URL: string;

  public STORE_KEY: string;

  private keyAccessToken: string = LOCAL_KEY;

  private keyUserId: string = 'userID';

  constructor() {
    this.CTP_PROJECT_KEY = CTP_PROJECT_KEY;
    this.CTP_API_URL = CTP_API_URL;
    this.STORE_KEY = STORE_KEY;
  }

  public async registerUser(userData: IUserData): Promise<void> {
    const ACCESS_TOKEN = await API_ACCESS_TOKEN.getAccessToken();
    const url = `${this.CTP_API_URL}/${this.CTP_PROJECT_KEY}/me/signup`;

    if (!ACCESS_TOKEN) throw new Error('Failed to obtain access token.');

    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(userData),
      });

      if (response.status === 201) {
        this.saveTokensToLocalStorage(ACCESS_TOKEN);
      } else {
        const errorMessage = await response.text();
        throw new Error(JSON.parse(errorMessage).message);
      }
    } catch (error) {
      throw error;
    }
  }

  // eslint-disable-next-line max-lines-per-function
  public async loginUser(
    email: string,
    password: string,
    anonymousCart?: { id: string; typeId: string }
  ): Promise<Customer> {
    const ACCESS_TOKEN = await API_ACCESS_TOKEN.getAccessToken();
    const url = `${this.CTP_API_URL}/${this.CTP_PROJECT_KEY}/me/login`;

    if (!ACCESS_TOKEN) throw new Error('Failed to obtain access token.');

    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    };

    const userData = {
      email,
      password,
      anonymousCart,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(userData),
      });

      if (response.status === 200) {
        const data = await response.json();
        this.saveTokensToLocalStorage(ACCESS_TOKEN);
        localStorage.setItem(this.keyUserId, data.customer.id);
        return data.customer;
      } else {
        throw new Error(`${await response.json().then((data) => data.message)}`);
      }
    } catch (error) {
      throw error;
    }
  }

  //eslint-disable-next-line
  public async loginUserPassFlow(
    email: string,
    password: string,
    anonymousCart?: { id: string; typeId: string }
  ): Promise<Customer> {
    const ACCESS_TOKEN = await API_ACCESS_TOKEN.getCustomerAccessToken({
      username: email,
      password: password,
    });
    const url = `${this.CTP_API_URL}/${this.CTP_PROJECT_KEY}/me/login`;

    if (!ACCESS_TOKEN) throw new Error('Failed to obtain access token.');

    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    };

    const userData = {
      email,
      password,
      anonymousCart,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(userData),
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('userID', data.customer.id);
        this.saveTokensToLocalStorage(ACCESS_TOKEN);

        return data.customer;
      } else {
        throw new Error(`${await response.json().then((data) => data.message)}`);
      }
    } catch (error) {
      throw error;
    }
  }

  public logoutUser(): void {
    const accessToken: string | null = localStorage.getItem(this.keyAccessToken);

    if (accessToken) {
      localStorage.removeItem(this.keyAccessToken);
      localStorage.removeItem(this.keyUserId);
    }
  }

  private saveTokensToLocalStorage(accessToken: string): void {
    if (accessToken) {
      localStorage.setItem(this.keyAccessToken, accessToken);
    }
  }

  public async getCustomer(): Promise<Customer> {
    const ACCESS_TOKEN_LOCAL = localStorage.getItem(this.keyAccessToken);

    if (!ACCESS_TOKEN_LOCAL) throw new Error('Failed to obtain access token.');

    const url = `${this.CTP_API_URL}/${this.CTP_PROJECT_KEY}/me`;

    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN_LOCAL}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers,
      });

      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(`${await response.json().then((data) => data.message)}`);
      }
    } catch (error) {
      throw error;
    }
  }
}
