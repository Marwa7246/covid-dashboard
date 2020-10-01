import React, { useState } from 'react';
import { Dropdown } from 'semantic-ui-react';

const MAX_COUNTRIES_SELECTION = 3;

const AllCountriesSelection = () => {
  const [allCountries, setAllCountries] = useState([]);

  const countryOptions = [
    { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
    { key: 'ca', value: 'ca', flag: 'ca', text: 'Canada' },
    { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
  
  ]

  const handleAllCountriesChange= (e: any, data?: any) => {
    if (data.value.length <= MAX_COUNTRIES_SELECTION) {
      setAllCountries(data.value);
    }
  };
  console.log(allCountries)

  return (
    <Dropdown
      placeholder="Select Up to 3 Countries"
      onChange={handleAllCountriesChange}
      value={allCountries}
      fluid
      multiple
      selectOnNavigation={false}
      search
      selection
      options={countryOptions}
    />
  );
};
export default AllCountriesSelection;
