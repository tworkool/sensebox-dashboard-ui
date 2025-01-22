import { Menu } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import convert, { getMeasureKind } from "convert";

const ValueConverter = (props) => {
  const { value, unit, children } = props;
  const [convertedValue, setConvertedValue] = useState(value);
  const [convertedUnit, setConvertedUnit] = useState(unit);

  /* useEffect(() => {
    console.log(getMeasureKind(unit), convert(value, unit));
    if (unit === convertedUnit) return;
    // reset unit and value
    setConvertedUnit(unit);
    setConvertedValue(value);
    // TODO: implement previous/original value, or it wont work
  }, [value, unit]); */

  return (
    <Menu>
      <Menu.Target>
        <div className="value-converter">
          {React.Children.map(children, child => {
            if (child.type === ValueConverterValue) {
              return React.cloneElement(child, { value: convertedValue });
            }
            if (child.type === ValueConverterUnit) {
              return React.cloneElement(child, { unit: convertedUnit });
            }
            return child;
          })}
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={() => {
            /* const conversion = convert(value, unit).to("best");
            setConvertedUnit(conversion.unit);
            setConvertedValue(conversion.quantity); */

            const conversion = convert(value, unit).to("mg");
            setConvertedUnit("mg");
            setConvertedValue(conversion);

            console.log(conversion, value, unit);
          }}>
          best
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

const ValueConverterValue = (props) => {
  const { value, children } = props;
  return React.cloneElement(children, {}, value);
};

const ValueConverterUnit = (props) => {
  const { unit, children } = props;
  return React.cloneElement(children, {}, unit);
};

ValueConverter.Value = ValueConverterValue;
ValueConverter.Unit = ValueConverterUnit;

export default ValueConverter;
