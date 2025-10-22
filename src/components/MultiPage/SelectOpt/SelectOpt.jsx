import "./SelectOpt.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectOpt=({selecValue,dispatch,optionArr,optionName})=>{
    
  
const handleChange = (event) => {
    dispatch({type:optionName,value:event.target.value
    });
    
  };


  return (
    <FormControl       className="select-opt-cont-class"
 sx={{ m: 1, minWidth: 120 }} error>
      <Select
      className="select-opt-class"
        value={selecValue[optionName].value}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        {
            optionArr.map((opt)=>(
                <MenuItem key={opt.value} value={opt.value}>{opt.name}</MenuItem>
            ))
        }
      </Select>
    </FormControl>
  );
}

export default SelectOpt;
