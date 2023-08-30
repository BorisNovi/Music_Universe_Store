import BaseComponent from '../../base/base-component/base-component';
import FieldsetPersonal from '../fieldset-profile/fieldset-personal-info/fieldset-personal-info';
import FieldsetShip from '../fieldset-profile/fieldset-shipping-address/fieldset-shipping-address';
import FieldsetBill from '../fieldset-profile/fieldset-billing-address/fieldset-billing-address';
import { Router } from '../../../router/router';
import { APIUserActions } from '../../../api/api-user-actions';
import { EmailPasswordCheck } from '../../../utils/email_password_check';
import { AddressCheck } from '../../../utils/address_check';
import { TagNames, Styles } from './enum';
import './profile-form.scss';

class ProfileForm extends BaseComponent {
  private form: HTMLFormElement;

  private personalInfo: HTMLDivElement;

  private shippingAddresses: HTMLDivElement;

  private billingAddresses: HTMLDivElement;

  private fieldSetPersonal: FieldsetPersonal;

  private fieldSetShippingList: FieldsetShip[];

  private fieldSetBillingList: FieldsetBill[];

  private api: APIUserActions;

  private router: Router | null = null;

  private keyAccessToken: string = '_cyber_(^-^)_punk_A';

  private hasFetchedData: boolean = false;

  constructor(
    api: APIUserActions,
    validatorEmail: EmailPasswordCheck,
    private validatorAddress: AddressCheck
  ) {
    super();
    this.form = this.createElement(TagNames.FORM, Styles.FORM);
    this.personalInfo = this.createElement(TagNames.DIV, Styles.INFO);
    this.shippingAddresses = this.createElement(TagNames.DIV, Styles.SHIPPING);
    this.billingAddresses = this.createElement(TagNames.DIV, Styles.BILLING);
    this.fieldSetPersonal = new FieldsetPersonal(validatorEmail, validatorAddress);
    this.fieldSetShippingList = [];
    this.fieldSetBillingList = [];
    this.api = api;

    this.createComponent();
    this.getUserData();
  }

  public async getUserData(): Promise<void> {
    try {
      const profileLink = document.querySelector(`a[href="/profile"]`) as HTMLAnchorElement;
      if (profileLink && !this.hasFetchedData) {
        profileLink.addEventListener('click', async (event) => {
          event.preventDefault();
          if (!this.hasFetchedData) {
            await this.fetchUserData();
          }
        });
      }
      await this.fetchUserData();
      this.disableAllInputs();
    } catch (error) {
      console.error('Failed to fetch customer data:', error);
    }
  }

  // eslint-disable-next-line max-lines-per-function
  private async fetchUserData(): Promise<void> {
    if (localStorage.getItem(this.keyAccessToken)) {
      const api = new APIUserActions();
      const {
        firstName,
        lastName,
        email,
        dateOfBirth,
        addresses,
        shippingAddressIds,
        billingAddressIds,
      } = await api.getPersonalInfo();
      this.fieldSetPersonal.setInputValues(firstName, lastName, email, dateOfBirth);

      shippingAddressIds.forEach((shippingAddressId) => {
        const shippingAddress = addresses.find((address) => address.id === shippingAddressId);
        if (shippingAddress) {
          const { streetName, streetNumber, postalCode, city, country } = shippingAddress;
          const fieldSetShipping = new FieldsetShip(this.validatorAddress);
          fieldSetShipping.setInputValues(streetName, streetNumber, postalCode, city, country);
          this.fieldSetShippingList.push(fieldSetShipping);
          this.shippingAddresses.append(fieldSetShipping.getElement());
        }
      });

      billingAddressIds.forEach((billingAddressId) => {
        const billingAddress = addresses.find((address) => address.id === billingAddressId);
        if (billingAddress) {
          const { streetName, streetNumber, postalCode, city, country } = billingAddress;
          const fieldSetBilling = new FieldsetBill(this.validatorAddress);
          fieldSetBilling.setInputValues(streetName, streetNumber, postalCode, city, country);
          this.fieldSetBillingList.push(fieldSetBilling);
          this.billingAddresses.append(fieldSetBilling.getElement());
        }
      });
      this.hasFetchedData = true;
    }
  }

  public getElement(): HTMLElement {
    return this.form;
  }

  public setRouter(router: Router): void {
    this.router = router;
  }

  private createComponent(): void {
    const { form, personalInfo, shippingAddresses, billingAddresses } = this;

    const fieldsetPersonalElement: HTMLElement = this.fieldSetPersonal.getElement();

    form.append(personalInfo, shippingAddresses, billingAddresses);

    personalInfo.append(fieldsetPersonalElement);
  }

  private disableAllInputs(): void {
    [
      this.fieldSetPersonal.inputFirstName,
      this.fieldSetPersonal.inputLastName,
      this.fieldSetPersonal.inputMail,
      this.fieldSetPersonal.inputDateBirth,
    ].forEach((input) => input.inputDisable());

    this.fieldSetShippingList.forEach((fieldSetShipping) => {
      fieldSetShipping.inputDisable();
    });

    this.fieldSetBillingList.forEach((fieldSetBilling) => {
      fieldSetBilling.inputDisable();
    });
  }
}

export default ProfileForm;
