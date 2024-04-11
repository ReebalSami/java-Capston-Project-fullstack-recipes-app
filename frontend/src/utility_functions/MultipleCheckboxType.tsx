import {Autocomplete, FormControl} from "@mui/material";
import {RecipeType} from "../types/Recipe.ts";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import {SyntheticEvent, useState} from "react";


export type MultipleCheckboxTypeProps = {
    types: string[],
    handleTypes: (event: SyntheticEvent<Element, Event>, value: string[]) => void;
}
export default function MultipleCheckboxType(props: Readonly<MultipleCheckboxTypeProps>){
    const optionalTypes=Object.values(RecipeType);
    const [value, setValue] = useState<string[]>(props.types);


    return(
            <FormControl sx={{ m: 1, width: 300 }}>
                <Stack spacing={3} sx={{ width: 500 }}>
                    <Autocomplete
                        multiple
                        value={value}
                        id="types-outlined"
                        options={optionalTypes}
                        defaultValue={props.types}
                        onChange={(event, value) => {
                            setValue(value);
                            props.handleTypes(event, value);}}
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Your Recipe Types"
                                placeholder="Click or type to select types..."
                            />
                        )}
                    />
                </Stack>
            </FormControl>

    )
}