import {Autocomplete} from '@mui/material';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import {RecipeIngredientsList} from "../types/Recipe";
import {SyntheticEvent} from "react";

type MultipleCheckboxOpenAiProps = {
    handleIngredients: (event: SyntheticEvent<Element, Event>, value: RecipeIngredientsList[]) => void;
}
export default function MultipleCheckboxOpenAi(props: Readonly<MultipleCheckboxOpenAiProps>) {
    const recipeIngredients = Object.values(RecipeIngredientsList);
    return (
        <Stack spacing={3} sx={{ width: 500 }}>
            <Autocomplete
                multiple
                id="tags-outlined"
                options={recipeIngredients}
                defaultValue={[]}
                onChange={(event, value) => {
                    props.handleIngredients(event, value);}}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Select Your Ingredients"
                        placeholder="Click or type to select ingredients..."
                        required={true}
                    />
                )}
            />
        </Stack>
    );
}