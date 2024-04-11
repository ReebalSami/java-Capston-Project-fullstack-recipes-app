import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {SyntheticEvent} from "react";
import {RecipeOrigin, recipeOrigins} from "../types/RecipeOrigin.ts";

type CountrySelectProps = {
    handleOrigins: (event: SyntheticEvent<Element, Event>, value: RecipeOrigin | null) => void;
}
export default function OriginSelect(props: Readonly<CountrySelectProps>) {
    return (
        <Autocomplete
            id="country-select-demo"
            sx={{ width: 300 }}
            options={recipeOrigins}
            autoHighlight
            onChange={props.handleOrigins}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {option.label}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Choose a country"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password',
                    }}
                />
            )}
        />
    );
}

