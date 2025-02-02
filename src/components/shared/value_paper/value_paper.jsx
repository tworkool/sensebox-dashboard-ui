import CustomCopyButton from "@components/shared/custom_copy_button/custom_copy_button";
import "./value_paper.scss";
import { Group } from "@mantine/core";
import ValueConverter from "@components/shared/value_converter/value_converter";
import { memo, useEffect, useRef } from "react";
import { useSettingsStore } from "@stores";

const ValuePaperItem = (props) => {
  const { color, value, unit, subtitle, withCopyButton = false } = props;
  const valueRef = useRef(null);
  const settingsStore = useSettingsStore();

  useEffect(() => {
    if (valueRef.current) {
      valueRef.current.classList.remove("value-paper__value--refresh");
      valueRef.current.classList.add("value-paper__value--refresh");
    }
  }, [color, value]);

  return <ValuePaperBare subtitle={subtitle} withCopyButton={withCopyButton}>
    <div className="value-paper__value" ref={valueRef}>
      {/* <span>{value}</span>
      <span>{unit}</span> */}
      { (value != undefined && value != null && unit) ? 
        <ValueConverter value={value} unit={unit}></ValueConverter> : 
        <><span>{settingsStore?.current?.fallbackNullValue}</span> <span></span></> 
      }
    </div>
  </ValuePaperBare>;
};

const ValuePaperBare = (props) => {
  const { children, subtitle, withCopyButton } = props;

  return (
    <div className="value-paper">
      <div className="value-paper__content">
        {children}
      </div>
      {subtitle && <div className="value-paper__subtitle">
        <Group gap="xs">
          <span>{subtitle}</span>
          {withCopyButton && <CustomCopyButton value={subtitle} />}
        </Group>
      </div>}
    </div>
  );
};

const ValuePaper = {
  Bare: memo(ValuePaperBare),
  Item: memo(ValuePaperItem),
  Grid: (props) => {
    return <div className="value-paper__grid">{props.children}</div>;
  },
};

export default ValuePaper;
