declare module "react-phone-input-material-ui" {
  import React from "react";

  export interface CountryData {
    name: string;
    dialCode: string;
    countryCode: string;
    format: string;
  }

  interface Style {
    containerClass?: string;
    inputClass?: string;
    buttonClass?: string;
    dropdownClass?: string;
    searchClass?: string;

    containerStyle?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
    buttonStyle?: React.CSSProperties;
    dropdownStyle?: React.CSSProperties;
    searchStyle?: React.CSSProperties;
  }

  interface PhoneInputEventsProps {
    onChange?(
      value: string,
      data: CountryData | {},
      event: React.ChangeEvent<HTMLInputElement>,
      formattedValue: string
    ): void;
    onFocus?(
      event: React.FocusEvent<HTMLInputElement>,
      data: CountryData | {}
    ): void;
    onBlur?(
      event: React.FocusEvent<HTMLInputElement>,
      data: CountryData | {}
    ): void;
    onClick?(
      event: React.MouseEvent<HTMLInputElement>,
      data: CountryData | {}
    ): void;
    onKeyDown?(event: React.KeyboardEvent<HTMLInputElement>): void;
    onEnterKeyPress?(event: React.KeyboardEvent<HTMLInputElement>): void;
    onMount?(
      value: string,
      data: CountryData | {},
      formattedValue: string
    ): void;
    isValid?:
      | ((
          value: string,
          country: object,
          countries: object[],
          hiddenAreaCodes: object[]
        ) => boolean | string)
      | boolean;
  }

  export interface PhoneInputProps extends PhoneInputEventsProps, Style {
    component: React.ComponentType<any>;
    country?: string | number;
    value?: string | null;

    onlyCountries?: string[];
    preferredCountries?: string[];
    excludeCountries?: string[];

    placeholder?: string;
    searchPlaceholder?: string;
    searchNotFound?: string;
    disabled?: boolean;

    autoFormat?: boolean;
    enableAreaCodes?: boolean;
    enableTerritories?: boolean;

    disableCountryCode?: boolean;
    disableDropdown?: boolean;
    enableLongNumbers?: boolean | number;
    countryCodeEditable?: boolean;
    enableSearch?: boolean;
    disableSearchIcon?: boolean;

    regions?: string | string[];

    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    localization?: { [key: string]: string };
    masks?: { [key: string]: string };
    areaCodes?: { [key: string]: string[] };

    preserveOrder?: string[];

    defaultMask?: string;

    alwaysDefaultMask?: boolean;
    prefix?: string;
    copyNumbersOnly?: boolean;
    renderStringAsFlag?: string;
    autocompleteSearch?: boolean;
    jumpCursorToEnd?: boolean;
    priority?: { [key: string]: number };
    enableAreaCodeStretch?: boolean;
    enableClickOutside?: boolean;
    showDropdown?: boolean;

    defaultErrorMessage?: string;
    label?: string;
    variant: "outlined" | "filled" | "standard";
    specialLabel?: string;
    disableInitialCountryGuess?: boolean;
    disableCountryGuess?: boolean;
  }
  const PhoneInput: React.ComponentType<PhoneInputProps>;
  export default PhoneInput;
}
