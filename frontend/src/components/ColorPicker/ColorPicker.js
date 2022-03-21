import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { colors } from "../../utils";
import ColorSample from "./ColorSample";

const ColorPicker = ({ value, onChange, id, name, label, ...otherProps }) => {
  return (
    <TextField
      select
      value={value}
      onChange={onChange}
      id={id}
      name={name}
      label={label}
      {...otherProps}
    >
      {colors.map((color, index) => (
        <MenuItem key={index} value={color}>
          <ColorSample color={color} />
        </MenuItem>
      ))}
    </TextField>
  );
};

export default ColorPicker;
