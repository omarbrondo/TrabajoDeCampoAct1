import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Checkbox,
  OutlinedInput,
  ListItemText,
} from "@mui/material";
import { useMemo, useState } from "react";
import Country from "./Country";
type FilterFunction = (c: Country) => boolean;

interface FilterCountryProps {
  onFilterChange: (_: FilterFunction[]) => void;
  subRegionesOptions: string[];
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function FilterCountry({
  onFilterChange,
  subRegionesOptions,
}: FilterCountryProps) {
  const [selectedFilter, setSelectedFilter] = useState<string[]>(["Todos"]);

  const filters = useMemo(
    () =>
      subRegionesOptions.reduce<Record<string, (c: Country) => boolean>>(
        (acc, subregion) => {
          acc[subregion] = (c: Country) =>
            c.subregion === (subregion === "Todos" ? c.subregion : subregion);
          return acc;
        },
        {}
      ),

    [subRegionesOptions]
  );

  const handleChange = (event: SelectChangeEvent<typeof selectedFilter>) => {
    const {
      target: { value },
    } = event;
    const values = typeof value === "string" ? value.split(",") : value;
    setSelectedFilter(values);

    onFilterChange(
      values
        .map((key) => filters[key as keyof typeof filters])
        .filter((value) => !!value)
    );
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="filter-simple-select-label" shrink>
          Filtro por Región
        </InputLabel>
        <Select
          label="Filtros"
          labelId="filter-simple-select-label"
          id="filter-simple-select"
          multiple
          value={selectedFilter}
          onChange={handleChange}
          input={<OutlinedInput label="Filtro por Región" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {subRegionesOptions.map((each: string) => (
            <MenuItem key={each} value={each}>
              <Checkbox checked={selectedFilter.includes(each)} />
              <ListItemText primary={each} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
