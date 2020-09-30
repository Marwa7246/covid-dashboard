import React from 'react'
import { Dropdown } from 'semantic-ui-react'



export default function DropdownList ({countryOptions, value, onChange}) {
  return (
  <Dropdown
    placeholder='Select Country'
    fluid
    selection
    // onClick={onChange}
    options={countryOptions}
    // value={value}
  />)
}

