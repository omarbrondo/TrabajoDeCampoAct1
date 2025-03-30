import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  IconButtonProps,
  styled,
  Typography,
} from "@mui/material";
import Country from "./Country";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

interface CardCountryProps {
  country: Country;
}
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export default function CardCountry({ country }: CardCountryProps) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card>
      <CardHeader title={country.name.common === "Falkland Islands" ? "Islas Malvinas Argentinas": country.name.common}></CardHeader>
      <CardHeader subheader={`Codigo FIFA: ${country.fifa || "No pertenece a la FIFA"}`}></CardHeader>
      <CardMedia
        component="img"
        alt={country.name.common}
        height="140"
        image={country.flags.png}
      />

      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="ver más"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography
            sx={{ marginBottom: 2 }}
            variant="body2"
          ><Typography sx={{ marginBottom: 2 }} variant="body2">
          {`Nombre Nativo: ${
            country.name.common === "Falkland Islands"
              ? "Islas Malvinas"
              : country.name.nativeName?.eng?.common ||
                country.name.nativeName?.eng?.official ||
                country.name.nativeName?.spa?.common ||
                country.name.nativeName?.spa?.official ||
                "Nombre nativo no disponible"
          }`}
        </Typography>
        </Typography> 
          <Typography
            sx={{ marginBottom: 2 }}
            variant="body2"
          >{`alpha3Code: ${country.cca3}`}</Typography> 
          <Typography
            sx={{ marginBottom: 2 }}
            variant="body2"
          >{`Capital: ${country.capital}`}</Typography>
          <Typography
            sx={{ marginBottom: 2 }}
            variant="body2"
          >{`Poblacion: ${country.population}`}</Typography>
          <Typography
            sx={{ marginBottom: 2 }}
            variant="body2"
          >{`Codigo Teléfono: ${country.idd.root}${country.idd.suffixes}`}</Typography>
          <Typography
            sx={{ marginBottom: 2 }}
            variant="body2"
          >{`¿Es independiente?: ${country.independent ? "Es independiente" : "No es independiente"}`}</Typography>
           <Typography
            sx={{ marginBottom: 2 }}
            variant="body2"
          >{`Paises limitrofes: ${country.borders || "no tiene"}`}</Typography>

        </CardContent>
      </Collapse>
    </Card>
  );
}

const ExpandMore = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "expand", // Evita que 'expand' se pase al DOM
})<ExpandMoreProps>(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: expand ? "rotate(180deg)" : "rotate(0deg)", // Se usa 'expand' aquí
}));
