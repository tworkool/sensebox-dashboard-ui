import { Menu, NumberFormatter } from '@mantine/core';
import React, { useState, useEffect, useMemo } from 'react';
import convert, { getMeasureKind, Unit } from "convert";

// INTERNAL MAPPING FOR MEASURE KINDS IN CONVERT LIBRARY
enum MeasureKind {
  Angle = 0,
  Area = 1,
  Data = 2,
  Energy = 3,
  Force = 4,
  Length = 5,
  Mass = 6,
  Power = 7,
  Pressure = 8,
  Temperature = 9,
  Time = 10,
  Volume = 11
}

function getImportantConversionUnits(measureKind: MeasureKind): { shortName: string, fullName: string }[] {
  switch (measureKind) {
    case MeasureKind.Angle:
      return [
        { shortName: 'deg', fullName: 'degrees' },
        { shortName: 'rad', fullName: 'radians' },
        { shortName: 'grad', fullName: 'gradians' }
      ];
    case MeasureKind.Area:
      return [
        { shortName: 'm²', fullName: 'square meters' },
        { shortName: 'ha', fullName: 'hectares' },
        { shortName: 'ac', fullName: 'acres' },
        { shortName: 'ft²', fullName: 'square feet' }
      ];
    case MeasureKind.Data:
      return [
        { shortName: 'B', fullName: 'bytes' },
        { shortName: 'KB', fullName: 'kilobytes' },
        { shortName: 'MB', fullName: 'megabytes' },
        { shortName: 'GB', fullName: 'gigabytes' },
        { shortName: 'TB', fullName: 'terabytes' }
      ];
    case MeasureKind.Energy:
      return [
        { shortName: 'J', fullName: 'joules' },
        { shortName: 'cal', fullName: 'calories' },
        { shortName: 'kWh', fullName: 'kilowatt-hours' }
      ];
    case MeasureKind.Force:
      return [
        { shortName: 'N', fullName: 'newtons' },
        { shortName: 'lbf', fullName: 'pounds-force' },
        { shortName: 'kgf', fullName: 'kilograms-force' }
      ];
    case MeasureKind.Length:
      return [
        { shortName: 'm', fullName: 'meters' },
        { shortName: 'km', fullName: 'kilometers' },
        { shortName: 'mi', fullName: 'miles' },
        { shortName: 'ft', fullName: 'feet' },
        { shortName: 'in', fullName: 'inches' }
      ];
    case MeasureKind.Mass:
      return [
        { shortName: 'g', fullName: 'grams' },
        { shortName: 'kg', fullName: 'kilograms' },
        { shortName: 'lb', fullName: 'pounds' },
        { shortName: 'oz', fullName: 'ounces' }
      ];
    case MeasureKind.Power:
      return [
        { shortName: 'W', fullName: 'watts' },
        { shortName: 'kW', fullName: 'kilowatts' },
        { shortName: 'hp', fullName: 'horsepower' }
      ];
    case MeasureKind.Pressure:
      return [
        { shortName: 'Pa', fullName: 'pascals' },
        { shortName: 'bar', fullName: 'bars' },
        { shortName: 'psi', fullName: 'pounds per square inch' },
        { shortName: 'atm', fullName: 'atmospheres' }
      ];
    case MeasureKind.Temperature:
      return [
        { shortName: 'C', fullName: 'celsius' },
        { shortName: 'F', fullName: 'fahrenheit' },
        { shortName: 'K', fullName: 'kelvin' }
      ];
    case MeasureKind.Time:
      return [
        { shortName: 's', fullName: 'seconds' },
        { shortName: 'min', fullName: 'minutes' },
        { shortName: 'h', fullName: 'hours' },
        { shortName: 'd', fullName: 'days' }
      ];
    case MeasureKind.Volume:
      return [
        { shortName: 'L', fullName: 'liters' },
        { shortName: 'mL', fullName: 'milliliters' },
        { shortName: 'm³', fullName: 'cubic meters' },
        { shortName: 'gal', fullName: 'gallons' }
      ];
    default:
      return [];
  }
}

interface ValueConverterProps {
  value: number;
  unit: Unit;
};

const ValueConverter = (props: ValueConverterProps) => {
  const { value, unit } = props;
  const [updatedUnit, setUpdatedUnit] = useState<Unit>(unit);
  const [originalUnit, setOriginalUnit] = useState<Unit>(unit);

  useEffect(() => {
    if (unit !== originalUnit) {
      // unit has changed
      setOriginalUnit(unit);
      setUpdatedUnit(unit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit]);

  const convertedValue = useMemo(() => {
    console.log("TEST",getMeasureKind(originalUnit));
    if (!getMeasureKind(originalUnit)) return value;
    return convert(value, originalUnit).to(updatedUnit);
  }, [value, originalUnit, updatedUnit]);

  const availableConversionUnits = useMemo(() => {
    try {
      return getImportantConversionUnits(getMeasureKind(originalUnit));
    } catch (e) {
      console.error(e);
      return [];
    }
  }, [originalUnit]);

  return (
    <Menu offset={5} withArrow>
      <Menu.Target>
        <div className="value-converter">
          <NumberFormatter value={convertedValue} decimalScale={2} thousandSeparator />
          <span>{updatedUnit}</span>
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        {availableConversionUnits.length !== 0 ? availableConversionUnits.map((unit, index) => <Menu.Item key={index} onClick={() => { setUpdatedUnit(unit.shortName as Unit); }}>
          {`${unit.fullName} (${unit.shortName})`}
        </Menu.Item>) : <Menu.Item disabled>No conversion available</Menu.Item>}
      </Menu.Dropdown>
    </Menu>
  );
};

export default ValueConverter;
