import {Autocomplete, FormControl} from "@mui/material";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import {SyntheticEvent} from "react";
import {RecipeCategory} from "../types/Recipe.ts";


export type MultipleCheckboxCategoryProps = {
    categories: string[],
    handleCategories: (event: SyntheticEvent<Element, Event>, value: string[]) => void;
}
export default function MultipleCheckboxCategory(props: Readonly<MultipleCheckboxCategoryProps>){
    const optionalCategories=Object.values(RecipeCategory);

    return(
            <FormControl sx={{ m: 1, width: 300 }}>
                <Stack spacing={3} sx={{ width: 500 }}>
                    <Autocomplete
                        multiple
                        id="categories-outlined"
                        options={optionalCategories}
                        defaultValue={props.categories}
                        onChange={(event, value) => {
                            props.handleCategories(event, value);}}
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Your Recipe Categories"
                                placeholder="Click or type to select Categories..."
                            />
                        )}
                    />
                </Stack>
            </FormControl>
    )
}