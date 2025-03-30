import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import Country from "./Country";
import CardCountry from "./CardCountry";
import Filters from "./Filters";
import { Box, Typography } from "@mui/material";

type FilterFunction = (c: Country) => boolean;

export default function ListCardContry() {
  const [cardsData, setCardsData] = useState<Country[]>([]);
  const [filtros, setFiltros] = useState<FilterFunction[]>([() => true]);
  const [subregiones, setSubRegiones] = useState<string[]>(["Todos"]);

  const handleFilterChange = (newFilter: FilterFunction[]) => {
    setFiltros(() => newFilter);
  };

  useEffect(() => {
    const getData = async () => {
      await fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => {
          setCardsData(data);
          setSubRegiones([
            "Todos",
            ...new Set<string>(data.map((c: Country) => c.subregion)),
          ]);
        });
    };
    getData();
  }, []);

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Filters
          onFilterChange={handleFilterChange}
          subRegionesOptions={subregiones}
        />
        <Typography variant="body2" sx={{ p: 1 }}>
          {`Cantidad ${
            cardsData.filter((c: Country) =>
              filtros.some((fn: FilterFunction) => fn(c))
            ).length
          }`}{" "}
        </Typography>
      </Box>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {cardsData
          .filter((c: Country) => filtros.some((fn: FilterFunction) => fn(c)))
          .map((c: Country) => (
            <Grid key={c.numericCode} size={{ xs: 2, sm: 4, md: 4 }}>
              <CardCountry country={c}></CardCountry>
            </Grid>
          ))}
      </Grid>
    </>
  );
}
