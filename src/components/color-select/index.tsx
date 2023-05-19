import React, { FC, useEffect } from 'react';
import { useImmer } from 'use-immer';
import { SketchPicker } from 'react-color';
import styles from './colorSelect.less';

export interface IColorSelectProps {
  onChange: (value: string) => void;
  value: string;
}

const ColorSelect: FC<IColorSelectProps> = props => {
  const [state, setState] = useImmer({
    displayColorPicker: false,
    color: props.value,
  });

  useEffect(() => {
    if (props.value) {
      setState(draft => {
        draft.color = props.value;
      });
    }
  }, [props.value]);
  const handleClick = () => {
    setState(draft => {
      draft.displayColorPicker = !draft.displayColorPicker;
    });
  };

  const handleClose = () => {
    setState(draft => {
      draft.displayColorPicker = false;
    });
  };

  const handleChange = (color: any) => {
    // const colorRgba = getRGBAValue(color.rgb);
    const colorValue = color.hex;
    setState(draft => {
      draft.color = colorValue;
    });
    props.onChange(colorValue);

    handleClose();
  };

  return (
    <React.Fragment>
      <div className={styles.swatch} onClick={handleClick}>
        <div
          className={styles.color}
          style={{
            background: state.color,
          }}
        />
      </div>
      {state.displayColorPicker ? (
        <div className={styles.popover}>
          <div className={styles.cover} onClick={handleClose} />
          <SketchPicker color={state.color} onChange={handleChange} />
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default ColorSelect;
