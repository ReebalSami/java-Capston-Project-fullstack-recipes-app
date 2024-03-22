import {FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent} from "@mui/material";
import {RecipeCategory, RecipeType} from "../types/Recipe.ts";


export type MultipleCheckboxProps={
    categories:string[],
    types: string[],
    changeCategories: (event: SelectChangeEvent<string[]>)=>void,
    changeTypes: (event: SelectChangeEvent<string[]>)=>void,
}
export default function MultipleCheckbox(props: Readonly<MultipleCheckboxProps>){
    const optionalCategories=Object.values(RecipeCategory);
    const optionalTypes=Object.values(RecipeType);

    return(
        <>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel>Categories</InputLabel>
                <Select
                    multiple
                    value={props.categories}
                    onChange={props.changeCategories}
                    input={<OutlinedInput label="Categories" />}
                >
                    {optionalCategories.map(category=>
                        <MenuItem
                            key={category}
                            value={category}
                        >
                            {category}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
            <br/>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel>Types</InputLabel>
                <Select
                    multiple
                    value={props.types}
                    onChange={props.changeTypes}
                    input={<OutlinedInput label="Types" />}
                >
                    {optionalTypes.map(type=>
                        <MenuItem
                            key={type}
                            value={type}
                        >
                            {type}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
            <br/>
        </>
    )
}